import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, caseNotes } from '@/lib/data/projects';
import s from '@/components/case.module.scss';

type Params = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Shubham Parsana` : 'Project', description: p?.summary };
}

export default async function Case({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i], next = projects[(i + 1) % projects.length], n = caseNotes[slug];
  return (
    <main id="main" className={s.page}>
      <div className={s.inner}>
        <p className={s.mono}>Fig. {p.index} · {p.kicker}</p>
        <h1 className={s.h1}>{p.title}</h1>
        <p className={s.lead}>{p.summary}</p>
        <dl className={s.meta}>
          <div><dt>Role</dt><dd>{n.role}</dd></div>
          <div><dt>Stack</dt><dd>{p.stack.join(', ')}</dd></div>
          <div><dt>Links</dt><dd>{p.links.live ? <a href={p.links.live}>Live demo</a> : 'Demo link coming'}{p.links.github && <> · <a href={p.links.github}>GitHub</a></>}</dd></div>
        </dl>
        <section className={s.block}><h2>Architecture notes</h2><p>{n.architecture}</p></section>
        {n.improve && <section className={s.block}><h2>What I’d improve</h2><p>{n.improve}</p></section>}
        <nav className={s.nav} aria-label="Project navigation">
          <Link href="/#work">All work</Link>
          <Link href={`/work/${next.slug}`}>Next: {next.title}</Link>
        </nav>
      </div>
    </main>
  );
}
