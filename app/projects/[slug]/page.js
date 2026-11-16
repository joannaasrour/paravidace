import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS, slugOf, isMulti, coverOf, whereOf, countryOf } from '../../data';
import { Header, Footer, Photo } from '../../components';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: slugOf(p) }));
}

export function generateMetadata({ params }) {
  const p = PROJECTS.find((x) => slugOf(x) === params.slug);
  if (!p) return {};
  return { title: `${p.name} · Paravidace`, description: `${p.name}, ${whereOf(p)}. A ${p.sector.toLowerCase()} project by Paravidace.` };
}

export default function ProjectPage({ params }) {
  const i = PROJECTS.findIndex((x) => slugOf(x) === params.slug);
  if (i < 0) notFound();
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const multi = isMulti(p);
  const cover = coverOf(p);
  const withPhoto = multi ? p.locations.filter((l) => l.img) : [];
  const noPhoto = multi ? p.locations.filter((l) => !l.img) : [];
  const country = countryOf(p);

  return (
    <>
      <Header />
      <main className="sub-page">
        <div className="page-top">
          <div className="wrap">
            <Link className="back" href="/projects">&larr; All projects</Link>
            <h1 className="page-title">{p.name}</h1>
            <dl className="facts-row">
              <div><dt>{multi ? 'Locations' : 'Location'}</dt><dd>{multi ? `${p.locations.length} branches${country ? ', ' + country : ''}` : whereOf(p)}</dd></div>
              <div><dt>Type</dt><dd>{p.sector}</dd></div>
              <div><dt>Status</dt><dd>{p.status === 'Upcoming' ? 'In progress' : 'Completed'}</dd></div>
              {p.services?.length > 0 && <div><dt>Services</dt><dd>{p.services.join(', ')}</dd></div>}
            </dl>
          </div>
        </div>

        {!multi && cover && (
          <div className="wrap"><Photo src={cover} alt={p.name} className="detail-photo" /></div>
        )}
        {!multi && !cover && p.logo && (
          <div className="wrap">
            <div className={'logo-tile detail-logo' + (p.logoBg ? ' filled' : '')} style={p.logoBg ? { background: p.logoBg } : undefined}>
              <img src={p.logo} alt={`${p.name} logo`} />
            </div>
          </div>
        )}

        {multi && (
          <div className="wrap">
            {withPhoto.length > 0 && (
              <div className="photo-grid">
                {withPhoto.map((l) => (
                  <article key={l.name} className="loc-card">
                    <Photo src={l.img} alt={`${p.name} ${l.name}`} />
                    <div className="loc-cap"><h3>{l.name}</h3><span className="loc">{country}</span>{l.map && <a className="maplink" href={l.map} target="_blank" rel="noopener">View on map ↗</a>}</div>
                  </article>
                ))}
              </div>
            )}
            {noPhoto.length > 0 && (
              <div className="branch-list">
                <p className="kicker">{withPhoto.length ? 'More branches' : 'Branches'}</p>
                <ol>
                  {noPhoto.map((l) => (
                    <li key={l.name}>
                      <span>{l.name}</span>
                      {l.map ? <a className="maplink" href={l.map} target="_blank" rel="noopener">View on map ↗</a> : <small>{country}</small>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        <div className="wrap">
          <div className="detail-cta">
            <div>
              <p className="kicker">Planning a similar space?</p>
              <h2 className="title" style={{ fontSize: 'clamp(28px,3.4vw,46px)' }}>Let&apos;s talk about your project.</h2>
            </div>
            <div className="detail-cta-links">
              <Link className="btn-line" href="/#contact">Contact us</Link>
              <Link className="go" href={`/projects/${slugOf(next)}`}>Next: {next.name} &rarr;</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
