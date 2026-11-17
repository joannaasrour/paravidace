'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { PROJECTS, CONTACT, SECTOR_ORDER, slugOf, isMulti, coverOf, whereOf } from './data';

export function Mark({ width = 5, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={width} aria-hidden="true">
      <path d="M80.64 24.29 A40 40 0 1 0 80.64 75.71" />
      <path d="M68.07 29.93 A27 27 0 1 0 68.07 70.07" />
      <path d="M23 50 H63" />
    </svg>
  );
}

export function Photo({ src, alt, label = 'Photo', pos, className = '' }) {
  return (
    <div className={'ph ' + className}>
      {src ? <img src={src} alt={alt} loading="lazy" style={pos ? { objectPosition: pos } : undefined} /> : <span className="empty">{label}</span>}
    </div>
  );
}

export function Header({ overHero = false }) {
  const [solid, setSolid] = useState(!overHero);
  useEffect(() => {
    if (!overHero) return;
    const hero = document.getElementById('hero');
    const on = () => setSolid(window.scrollY > (hero?.offsetHeight || 600) - 90);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [overHero]);
  return (
    <header className={solid ? 'solid' : ''}>
      <div className="wrap nav">
        <Link className="logo" href="/" aria-label="Paravidace home"><Mark />Paravidace</Link>
        <ul>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="mark">
          <Mark width={4} color="#D9C7A6" />
          <div><b>Paravidace</b><span>Contracting &amp; Engineering</span></div>
        </div>
        <div className="row">
          <span>© {new Date().getFullYear()} Paravidace</span>
          <span>{CONTACT.phone} · {CONTACT.email}</span>
        </div>
      </div>
    </footer>
  );
}

/* photo card that links to the project's page */
export function ProjectCard({ p, shape = '' }) {
  const multi = isMulti(p);
  const where = whereOf(p);
  return (
    <Link className="card linkcard" href={`/projects/${slugOf(p)}`}>
      <div className="ph-wrap">
        <Photo src={coverOf(p)} alt={p.name} className={shape} />
        {multi && <span className="count">{p.locations.length}<small>locations</small></span>}
      </div>
      <div className="cap">
        <h3>{p.name}</h3>
        <span className="loc">{where}</span>
        {p.services?.length > 0 && <span className="svc">{p.services.join('  ·  ')}</span>}
      </div>
    </Link>
  );
}

/* full projects page: filters, search, photo cards, and an index of every project */
export function ProjectsIndex() {
  const sectors = ['All', ...SECTOR_ORDER.filter((s) => PROJECTS.some((p) => p.sector === s))];
  const [sector, setSector] = useState('All');
  const [status, setStatus] = useState('All');
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PROJECTS.filter((p) =>
      (sector === 'All' || p.sector === sector) &&
      (status === 'All' || p.status === status) &&
      (!term || [p.name, p.location, p.country, ...(p.locations || []).map((l) => l.name)].join(' ').toLowerCase().includes(term))
    );
  }, [sector, status, q]);
  const FIRST = ['Stradivarius', 'Boggi Milano', 'Mango', 'Pull&Bear', 'Bershka', 'Oysho', 'Salsa Jeans', 'Decathlon'];
  const rank = (p) => { const i = FIRST.indexOf(p.name); return i < 0 ? 99 : i; };
  const withPhoto = list.filter((p) => coverOf(p)).sort((a, b) => rank(a) - rank(b));
  const branches = PROJECTS.reduce((n, p) => n + (isMulti(p) ? p.locations.length : 1), 0);

  return (
    <>
      <div className="page-top">
        <div className="wrap">
          <p className="kicker">Portfolio</p>
          <h1 className="page-title">Projects</h1>
          <p className="page-lede">Commercial stores, restaurants, supermarkets and much more, built all over Lebanon and abroad. Below is a selection of our work: {PROJECTS.length} brands across {branches} locations, and growing.</p>
        </div>
      </div>

      <div className="wrap">
        <div className="tools">
          <div className="filters" role="group" aria-label="Filter by type">
            {sectors.map((s) => <button key={s} type="button" aria-pressed={s === sector} onClick={() => setSector(s)}>{s}</button>)}
          </div>
          <div className="tools-right">
            <div className="filters" role="group" aria-label="Filter by status">
              {['All', 'Completed', 'Upcoming'].map((s) => <button key={s} type="button" aria-pressed={s === status} onClick={() => setStatus(s)}>{s === 'All' ? 'Any status' : s}</button>)}
            </div>
            <label className="search">
              <span className="sr">Search projects</span>
              <input id="project-search" type="search" placeholder="Search a brand or place" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>
        </div>

        {withPhoto.length > 0 && (
          <div className="sq-grid">
            {withPhoto.map((p) => <ProjectCard key={p.name} p={p} />)}
          </div>
        )}

        <div className="index">
          <div className="index-head">
            <span>Project</span><span>Location</span><span>Type</span><span>Status</span>
          </div>
          {list.length === 0 && <p className="muted index-empty">No project matches this search.</p>}
          {list.map((p) => (
            <Link key={p.name} href={`/projects/${slugOf(p)}`} className="index-row">
              <span className="i-name">{p.name}</span>
              <span className="i-loc">{whereOf(p)}</span>
              <span className="i-type">{p.sector}</span>
              <span className={'i-status' + (p.status === 'Upcoming' ? ' up' : '')}>{p.status}</span>
              <span className="i-go" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
