import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset, apiVersion } from '../../sanity/env';
import { PROJECTS, HERO_PHOTOS, ABOUT_PHOTO } from '../data';

const client = projectId ? createClient({ projectId, dataset, apiVersion, useCdn: true }) : null;
const builder = client ? imageUrlBuilder(client) : null;
const url = (img, w = 1600) => (img && img.asset && builder ? builder.image(img).width(w).fit('max').auto('format').quality(82).url() : '');

const QUERY = `{
  "projects": *[_type == "project"] | order(name asc) {
    name, "slug": slug.current, status, sector, location, country, services, year,
    cover, gallery, galleryTall, logo, logoBg, featured, order,
    locations[]{ name, image, map }
  },
  "settings": *[_type == "settings"][0]{ heroPhotos, aboutPhoto }
}`;

export async function getContent() {
  if (!client) return { projects: PROJECTS, heroPhotos: HERO_PHOTOS, aboutPhoto: ABOUT_PHOTO };
  try {
    const { projects, settings } = await client.fetch(QUERY, {}, { next: { revalidate: 60 } });
    const mapped = (projects || []).map((p) => ({
      name: p.name,
      slug: p.slug,
      status: p.status || 'Completed',
      sector: p.sector || 'Retail',
      location: p.location || '',
      country: p.country || '',
      services: p.services || [],
      year: p.year,
      img: url(p.cover),
      gallery: (p.gallery || []).map((g) => url(g)).filter(Boolean),
      galleryTall: p.galleryTall !== false,
      logo: url(p.logo, 700),
      logoBg: p.logoBg || '',
      featured: !!p.featured,
      order: p.order,
      locations: (p.locations || []).length ? p.locations.map((l) => ({ name: l.name, img: url(l.image), map: l.map || '' })) : undefined,
    }));
    const hero = (settings?.heroPhotos || []).map((h) => ({ src: url(h, 2200), pos: h.hotspot ? `${Math.round(h.hotspot.x * 100)}% ${Math.round(h.hotspot.y * 100)}%` : '50% 50%' }));
    return {
      projects: mapped.length ? mapped : PROJECTS,
      heroPhotos: hero.length ? hero : HERO_PHOTOS,
      aboutPhoto: url(settings?.aboutPhoto) || ABOUT_PHOTO,
    };
  } catch (e) {
    console.error('Sanity fetch failed, using local data', e);
    return { projects: PROJECTS, heroPhotos: HERO_PHOTOS, aboutPhoto: ABOUT_PHOTO };
  }
}
