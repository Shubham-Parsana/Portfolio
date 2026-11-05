import { profile, about, stack, log } from '@/lib/data/profile';
import CopyEmail from './CopyEmail';
import Waveform from './Waveform';
import c from './Chapters.module.scss';

export function About() {
  return (
    <section id="about" data-chapter="2" className={`${c.sec} ${c.about}`} aria-labelledby="about-t">
      <h2 id="about-t" className={c.h2}>A student who <em>ships</em>.</h2>
      <div className={c.aboutGrid}>
        <div className={c.aboutText}>
          {about.bio.map((p) => <p key={p}>{p}</p>)}
          <ul className={c.chips}>{profile.stats.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className={c.mono}>Languages: {profile.languages.join(' / ')}</p>
        </div>
        <figure className={c.fig} data-scroll data-scroll-speed="0.08">
          <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth=".75" aria-hidden="true">
            <circle cx="200" cy="200" r="140" />
            <g className={c.ring}>{[0, 60, 120].map((r) => <ellipse key={r} cx="200" cy="200" rx="140" ry="48" transform={`rotate(${r} 200 200)`} />)}</g>
            <g className={`${c.ring} ${c.rev}`}><circle cx="200" cy="200" r="180" strokeDasharray="2 6" /><circle cx="380" cy="200" r="5" fill="#FF6B2C" stroke="none" /></g>
            <path d="M200 10v30M200 360v30M10 200h30M360 200h30" />
          </svg>
          <figcaption>Fig. 02 · orbit study</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Stack() {
  const all = stack.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const row = (items: string[], rev?: boolean) => (
    <div className={`${c.marquee} ${rev ? c.rev : ''}`} aria-hidden="true"><div>{[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}</div></div>
  );
  return (
    <section id="stack" data-chapter="4" className={c.sec} aria-labelledby="stack-t">
      <h2 id="stack-t" className={c.h2}>Toolkit</h2>
      <div className={c.groups}>
        {stack.map((g) => (<div key={g.title}><h3>{g.title}</h3><ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul></div>))}
      </div>
      {row(all.slice(0, half))}{row(all.slice(half), true)}
    </section>
  );
}

export function Log() {
  return (
    <section id="signal" data-chapter="5" className={`${c.sec} ${c.log}`} aria-labelledby="log-t">
      <h2 id="log-t" className={c.h2}>Signal <em>log</em></h2>
      <Waveform />
      <ol>
        {log.map((e) => (
          <li key={e.title}><span className={c.mono}>{e.when}</span><div><h3>{e.title}</h3>{e.note && <p>{e.note}</p>}</div></li>
        ))}
      </ol>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" data-chapter="6" className={`${c.sec} ${c.contact}`} aria-labelledby="contact-t">
      <div>
        <h2 id="contact-t" className={`${c.h2} ${c.huge}`}>Let’s close the <em>loop</em>.</h2>
        <CopyEmail email={profile.email} />
        <ul className={c.links}>
          <li><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href={profile.links.resume} download>Résumé</a></li>
        </ul>
      </div>
    </section>
  );
}
