// One-time import of the projects in app/data.js (and their photos in public/img) into Sanity.
// Usage: SANITY_PROJECT_ID=xxxx SANITY_TOKEN=yyyy node scripts/import-to-sanity.mjs
import { createClient } from '@sanity/client';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const projectId = process.env.SANITY_PROJECT_ID;
const token = process.env.SANITY_TOKEN;
if (!projectId || !token) { console.error('Set SANITY_PROJECT_ID and SANITY_TOKEN'); process.exit(1); }
const client = createClient({ projectId, dataset: process.env.SANITY_DATASET || 'production', apiVersion: '2024-10-01', token, useCdn: false });

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const tmp = mkdtempSync(path.join(tmpdir(), 'pv-'));
writeFileSync(path.join(tmp, 'data.mjs'), readFileSync(path.join(root, 'app/data.js'), 'utf8'));
const { PROJECTS, HERO_PHOTOS, ABOUT_PHOTO } = await import(path.join(tmp, 'data.mjs'));

const cache = new Map();
async function image(src) {
  if (!src) return undefined;
  if (!cache.has(src)) {
    const file = path.join(root, 'public', src.replace(/^\//, ''));
    const asset = await client.assets.upload('image', readFileSync(file), { filename: path.basename(file) });
    cache.set(src, asset._id);
    console.log('  uploaded', path.basename(file));
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: cache.get(src) } };
}
const key = () => Math.random().toString(36).slice(2, 10);
const slugify = (n) => n.toLowerCase().replace(/&/g, ' and ').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const FIRST = ['Stradivarius', 'Boggi Milano', 'Mango', 'Pull&Bear', 'Bershka', 'Oysho', 'Salsa Jeans', 'Decathlon'];

for (const p of PROJECTS) {
  console.log(p.name);
  const slug = slugify(p.name);
  const doc = {
    _id: `project-${slug}`, _type: 'project', name: p.name, slug: { _type: 'slug', current: slug },
    status: p.status || 'Completed', sector: p.sector || 'Retail',
    location: p.location || undefined, country: p.country || (['Cyprus', 'Romania'].includes(p.location) ? p.location : undefined),
    services: p.services || [], galleryTall: p.galleryTall !== false,
    cover: await image(p.img), logo: await image(p.logo), logoBg: p.logoBg || undefined,
    gallery: p.gallery ? await Promise.all(p.gallery.map(async (g) => ({ ...(await image(g)), _key: key() }))) : undefined,
    locations: p.locations ? await Promise.all(p.locations.map(async (l) => ({ _type: 'branch', _key: key(), name: l.name, image: await image(l.img), map: l.map || undefined }))) : undefined,
    featured: FIRST.includes(p.name), order: FIRST.includes(p.name) ? FIRST.indexOf(p.name) + 1 : undefined,
  };
  Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);
  await client.createOrReplace(doc);
}
await client.createOrReplace({
  _id: 'settings', _type: 'settings',
  heroPhotos: await Promise.all(HERO_PHOTOS.map(async (h) => ({ ...(await image(h.src)), _key: key() }))),
  aboutPhoto: await image(ABOUT_PHOTO),
});
console.log('Done:', PROJECTS.length, 'projects');
