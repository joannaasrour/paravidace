'use client';

import { useEffect, useMemo, useState } from 'react';
import { HERO_PHOTOS, ABOUT_PHOTO, PROJECTS, CONTACT } from './data';

const pad = (n) => (n < 10 ? '0' : '') + n;

function Mark({ width = 5, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={width} aria-hidden="true">
      <path d="M80.64 24.29 A40 40 0 1 0 80.64 75.71" />
      <path d="M68.07 29.93 A27 27 0 1 0 68.07 70.07" />
      <path d="M23 50 H63" />
    </svg>
  );
}

function Photo({ src, alt, label = 'Photo', pos, className = '' }) {
  return (
    <div className={'ph ' + className}>
      {src ? <img src={src} alt={alt} loading="lazy" style={pos ? { objectPosition: pos } : undefined} /> : <span className="empty">{label}</span>}
    </div>
  );
}

function Card({ p, shape = '' }) {
  const where = p.country ? `${p.location}, ${p.country}` : p.location;
  return (
    <article className="card">
      <Photo src={p.img} alt={p.name} className={shape} />
      <div className="cap">
        <h3>{p.name}</h3>
        <span className="loc">{where}</span>
        {p.services?.length > 0 && <span className="svc">{p.services.join('  ·  ')}</span>}
      </div>
    </article>
  );
}

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
            <h1>Designed, engineered<br />and built as one.</h1>
            <div className="sub"><span>Lebanon</span><i /><span>Cyprus</span><i /><span>30+ years</span></div>
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

const ORDER = ['Retail', 'Restaurants', 'Supermarkets', 'Commercial', 'Residential'];

function PreviousWork() {
  const done = PROJECTS.filter((p) => p.status !== 'Upcoming');
  const sectors = ['All', ...ORDER.filter((s) => done.some((p) => p.sector === s))];
  const [current, setCurrent] = useState('All');
  const [shown, setShown] = useState(6);
  const all = done.filter((p) => current === 'All' || p.sector === current);
  const list = all.slice(0, shown);
  const left = list.filter((_, k) => k % 2 === 0);
  const right = list.filter((_, k) => k % 2 === 1);
  const shape = (k) => (k % 4 === 0 || k % 4 === 3 ? 'tall' : 'wide');
  return (
    <section id="projects">
      <div className="wrap">
        <div className="head">
          <div><p className="kicker">Completed</p><h2 className="title">Previous work</h2></div>
          {sectors.length > 2 && (
            <div className="filters" role="group" aria-label="Filter projects">
              {sectors.map((s) => (
                <button key={s} type="button" aria-pressed={s === current} onClick={() => { setCurrent(s); setShown(6); }}>{s}</button>
              ))}
            </div>
          )}
        </div>
        {list.length ? (
          <div className="gallery">
            <div className="col">{left.map((p, k) => <Card key={p.name} p={p} shape={shape(k * 2)} />)}</div>
            <div className="col">{right.map((p, k) => <Card key={p.name} p={p} shape={shape(k * 2 + 1)} />)}</div>
          </div>
        ) : <p className="muted">No projects in this category yet.</p>}
        {all.length > shown && (
          <div className="more"><button type="button" className="btn-line" onClick={() => setShown(shown + 6)}>See more</button></div>
        )}
      </div>
    </section>
  );
}

function Upcoming() {
  const up = PROJECTS.filter((p) => p.status === 'Upcoming');
  const [shown, setShown] = useState(3);
  if (!up.length) return null;
  return (
    <section id="upcoming">
      <div className="wrap">
        <div className="head"><div><p className="kicker">Coming soon</p><h2 className="title">Upcoming</h2></div></div>
        <div className="upgrid">{up.slice(0, shown).map((p) => <Card key={p.name} p={p} />)}</div>
        {up.length > shown && (
          <div className="more"><button type="button" className="btn-line" onClick={() => setShown(shown + 3)}>See more</button></div>
        )}
      </div>
    </section>
  );
}

function ContactLine({ label, value, placeholder, href }) {
  const [copied, setCopied] = useState(false);
  const text = value || placeholder;
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }, () => {});
  };
  return (
    <div className="ln">
      <div>
        <span className="k">{label}</span>
        {href ? <a className="v" href={href} target="_blank" rel="noopener">{text}</a> : <span className={'v' + (value ? '' : ' todo')}>{text}</span>}
      </div>
      <button className="copy" type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}

export default function Home() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    const on = () => setSolid(window.scrollY > (hero?.offsetHeight || 600) - 90);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <header className={solid ? 'solid' : ''}>
        <div className="wrap nav">
          <a className="logo" href="#top" aria-label="Paravidace home"><Mark />Paravidace</a>
          <ul>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#upcoming">Upcoming</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </header>

      <main id="top">
        <Hero />

        <div className="intro">
          <div className="wrap">
            <div className="left">
              <p className="kicker">Paravidace</p>
              <h2>Spaces that open on time <strong>and last for years.</strong></h2>
            </div>
            <div className="right">
              <p>We are a contracting and engineering firm working across Lebanon and Cyprus. From fashion stores at Le Mall Dbayeh to restaurants, supermarkets and private homes, we carry each project from the first drawing to handover, with design, engineering and construction under one roof.</p>
              <a className="go" href="#projects">Discover our work &rarr;</a>
            </div>
          </div>
        </div>

        <div className="numbers" aria-label="Key figures">
          <div className="wrap">
            <div className="num"><b>30+</b><span>Years of experience</span></div>
            <div className="num"><b>100+</b><span>Projects completed</span></div>
            <div className="num"><b>2</b><span>Countries</span></div>
            <div className="num"><b>4</b><span>Services in-house</span></div>
          </div>
        </div>

        <PreviousWork />
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
              <p className="muted">Paravidace is led by its founder and CEO, who has spent more than thirty years designing and building across Lebanon and Cyprus. Every project is followed personally, from the first meeting to the final inspection.</p>
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
              <a className="btn-line" href="https://www.instagram.com/paravidace/" target="_blank" rel="noopener">Message us</a>
            </div>
            <div className="lines">
              <ContactLine label="Instagram" value={CONTACT.instagram} href="https://www.instagram.com/paravidace/" />
              <ContactLine label="Phone / WhatsApp" value={CONTACT.phone} placeholder="+961 00 000 000" />
              <ContactLine label="Email" value={CONTACT.email} placeholder="info@paravidace.com" />
              <ContactLine label="Office" value={CONTACT.office} placeholder="Address" />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="mark">
            <Mark width={4} color="#D9C7A6" />
            <div><b>Paravidace</b><span>Contracting &amp; Engineering</span></div>
          </div>
          <div className="row"><span>© {new Date().getFullYear()} Paravidace</span><span>Architecture · Engineering · Contracting · Consultation</span></div>
        </div>
      </footer>
    </>
  );
}
