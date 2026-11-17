'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HERO_PHOTOS, ABOUT_PHOTO, PROJECTS, CONTACT, slugOf, coverOf, isMulti } from './data';
import { Header, Footer, Photo, ProjectCard } from './components';

const pad = (n) => (n < 10 ? '0' : '') + n;

function Hero() {
  const n = HERO_PHOTOS.length;
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n, tick]);
  const go = (d) => { setI((x) => (x + d + n) % n); setTick((t) => t + 1); };
  return (
    <div className="hero" id="hero">
      {HERO_PHOTOS.map((h, k) => (
        <div key={k} className={'slide' + (k === i ? ' on' : '')}>
          <Photo src={h.src} alt="Paravidace project" label={'Main photo ' + (k + 1)} pos={h.pos} />
        </div>
      ))}
      <div className="hero-copy">
        <div className="wrap">
          <div>
            <h1>Built as one.</h1>
            <div className="sub"><span>Lebanon</span><i /><span>Cyprus</span><i /><span>Romania</span><i /><span>30+ years</span></div>
          </div>
          {n > 1 && (
            <div className="counter">
              <span>{pad(i + 1)} / {pad(n)}</span>
              <div className="btns">
                <button type="button" aria-label="Previous photo" onClick={() => go(-1)}>←</button>
                <button type="button" aria-label="Next photo" onClick={() => go(1)}>→</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectedWork() {
  const featured = PROJECTS.filter((p) => p.status !== 'Upcoming' && coverOf(p)).slice(0, 8);
  const others = PROJECTS.filter((p) => p.status !== 'Upcoming' && !featured.includes(p));
  return (
    <section id="projects">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker">Selected work</p><h2 className="title">Projects</h2></div>
          <Link className="go" href="/projects">View all projects &rarr;</Link>
        </div>
        {featured.length > 0 && (
          <div className="sq-grid">
            {featured.map((p) => <ProjectCard key={p.name} p={p} />)}
          </div>
        )}
        {others.length > 0 && (
          <div className="also">
            <p className="kicker">Also by Paravidace</p>
            <ul>
              {others.map((p) => (
                <li key={p.name}>
                  <Link href={`/projects/${slugOf(p)}`}>
                    {p.name}{isMulti(p) && <sup>{p.locations.length}</sup>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="more"><Link className="btn-line" href="/projects">View all projects</Link></div>
      </div>
    </section>
  );
}

function Upcoming() {
  const up = PROJECTS.filter((p) => p.status === 'Upcoming');
  if (!up.length) return null;
  return (
    <section id="upcoming">
      <div className="wrap">
        <div className="head"><div><p className="kicker">Coming soon</p><h2 className="title">Upcoming</h2></div></div>
        <div className="up-list">
          {up.map((p) => (
            <Link key={p.name} href={`/projects/${slugOf(p)}`} className="up-item">
              {p.logo && (
                <span className={'logo-tile' + (p.logoBg ? ' filled' : '')} style={p.logoBg ? { background: p.logoBg } : undefined}>
                  <img src={p.logo} alt={`${p.name} logo`} loading="lazy" />
                </span>
              )}
              <span className="up-where">{p.location}{p.country ? `, ${p.country}` : ''}</span>
              <span className="up-name">{p.name}</span>
              <span className="up-tag">In progress</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactLine({ label, value, placeholder, href, external = true }) {
  const [copied, setCopied] = useState(false);
  const text = value || placeholder;
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }, () => {});
  };
  return (
    <div className="ln">
      <div>
        <span className="k">{label}</span>
        {href ? <a className="v" href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{text}</a> : <span className={'v' + (value ? '' : ' todo')}>{text}</span>}
      </div>
      <button className="copy" type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header overHero />
      <main id="top">
        <Hero />

        <div className="intro">
          <div className="wrap">
            <div className="left">
              <p className="kicker">Paravidace</p>
              <h2>Spaces built to last.</h2>
            </div>
            <div className="right">
              <p>Paravidace designs and builds commercial spaces across Lebanon, Cyprus and Romania: retail stores, restaurants, supermarkets and much more, along with private homes. International brands trust us to deliver their stores to their exact standards, on time.</p>
              <p>We handle every project from the first drawing to handover, with architecture, engineering and construction under one roof. One team stays responsible for the whole job, so the space we draw is the space we deliver.</p>
              <Link className="go" href="/projects">Discover our work &rarr;</Link>
            </div>
          </div>
        </div>

        <div className="numbers" aria-label="Key figures">
          <div className="wrap">
            <div className="num"><b>30+</b><span>Years of experience</span></div>
            <div className="num"><b>1000+</b><span>Projects completed</span></div>
            <div className="num"><b>3</b><span>Countries</span></div>
            <div className="num"><b>4</b><span>Services in-house</span></div>
          </div>
        </div>

        <SelectedWork />
        <Upcoming />

        <section id="services">
          <div className="wrap">
            <div className="head"><div><p className="kicker">What we do</p><h2 className="title">Services</h2></div></div>
            <div className="services">
              <div className="srow"><h3>Architecture</h3><p>Concepts, layouts, interiors and shopfronts, through to permit drawings and 3D visuals.</p></div>
              <div className="srow"><h3>Engineering</h3><p>Structural design, electrical and mechanical coordination, and supervision on site.</p></div>
              <div className="srow"><h3>Contracting</h3><p>New construction, renovation, extensions, commercial fit-out and fine finishing.</p></div>
              <div className="srow"><h3>Consultation</h3><p>Feasibility, budgets, tender advice and full project management.</p></div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap about">
            <Photo src={ABOUT_PHOTO} alt="Paravidace project" />
            <div className="body">
              <p className="kicker">The founder</p>
              <h2 className="title" style={{ fontSize: 'clamp(30px,3.6vw,50px)' }}>Three decades on site.</h2>
              <p className="muted">Paravidace is led by its founder and CEO, who has spent more than thirty years designing and building across Lebanon, and now in Cyprus and Romania. Every project is followed personally, from the first meeting to the final inspection.</p>
              <p className="muted">Because architecture, engineering and construction sit within one team, the vision drawn on paper is the one delivered on site.</p>
              <div className="sign"><b>Founder &amp; CEO</b><span>Paravidace</span></div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="wrap contact">
            <div className="lead">
              <p className="kicker">Contact</p>
              <h2 className="title">Let&apos;s build<br />something lasting.</h2>
              <a className="btn-line" href={CONTACT.whatsapp} target="_blank" rel="noopener">Message us on WhatsApp</a>
            </div>
            <div className="lines">
              <ContactLine label="Phone / WhatsApp" value={CONTACT.phone} placeholder="+961 00 000 000" href={CONTACT.whatsapp} />
              <ContactLine label="Email" value={CONTACT.email} placeholder="info@paravidace.com" href={CONTACT.email ? 'mailto:' + CONTACT.email : undefined} external={false} />
              <ContactLine label="Office" value={CONTACT.office} placeholder="Address" />
              <ContactLine label="Instagram" value={CONTACT.instagram} href="https://www.instagram.com/paravidace/" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
