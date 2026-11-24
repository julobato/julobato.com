'use client'

import Link from 'next/link'
import { POSTS } from '@/lib/posts'
import { Duration, Month, Range } from './Dates'
import { useLang } from './LangProvider'
import { Topbar } from './Topbar'

export function Home() {
  const { t } = useLang()
  return (
    <div className="wrap">
      <Topbar />

      <header className="intro">
        <div>
          <h1>Julianne Lobato</h1>
          <span className="muted">{t('role')}</span>
        </div>
        {/* intro1 contains a <span class="highlight"> from the translation table */}
        <p dangerouslySetInnerHTML={{ __html: t('intro1') }} />
        <p>{t('intro2')}</p>
      </header>

      <main className="content">
        <section className="section">
          <h2>{t('work')}</h2>

          <article className="job">
            <div className="job-head">
              <a className="job-name" href="https://gapstars.net">Gapstars ↗</a>
              <span className="small muted"><Duration from="2024-11" /></span>
            </div>
            <p>{t('gapstarsDesc')}</p>
            <ul className="timeline">
              <li className="current">Full Stack Developer <span className="small muted">· <Range from="2025-07" /></span></li>
              <li>Backend Developer <span className="small muted">· <Range from="2024-11" to="2025-06" /></span></li>
            </ul>
            <ul className="pills">
              {['Python', 'Flask', 'MongoDB', 'Vue 3', 'TypeScript', 'GCP', 'Terraform'].map((s) => <li key={s}>{s}</li>)}
            </ul>
          </article>

          <article className="job">
            <div className="job-head">
              <span className="job-name">Magroove <span className="muted closed">{t('closed')}</span></span>
              <span className="small muted"><Duration from="2020-07" to="2024-10" /></span>
            </div>
            <p>{t('magrooveDesc')}</p>
            <ul className="timeline">
              <li>Full Stack Developer <span className="small muted">· <Range from="2022-07" to="2024-10" /></span></li>
              <li>Full Stack Developer Jr <span className="small muted">· <Range from="2021-09" to="2022-06" /></span></li>
              <li>Developer Intern <span className="small muted">· <Range from="2020-07" to="2021-08" /></span></li>
            </ul>
            <ul className="pills">
              {['React', 'Python', 'Docker', 'AWS', 'Redis', 'Elasticsearch', 'Stripe'].map((s) => <li key={s}>{s}</li>)}
            </ul>
          </article>
        </section>

        <section className="section">
          <h2>{t('education')}</h2>
          <div className="row">
            <span className="small muted">2023 — 2026</span>
            <div>
              <strong>{t('iselCourse')}</strong>
              <a className="muted" href="https://www.isel.pt">Instituto Superior de Engenharia de Lisboa ↗</a>
              <span>{t('scholarship')}</span>
            </div>
          </div>
          <div className="row">
            <span className="small muted">2017 — 2023</span>
            <div>
              <strong>{t('uspCourse')}</strong>
              <a className="muted" href="https://www.ime.usp.br">Instituto de Matemática e Estatística, Universidade de São Paulo ↗</a>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>{t('writing')}</h2>
          {POSTS.map((post) => (
            <div className="row" key={post.slug}>
              <span className="small muted"><Month value={post.month} /></span>
              <Link href={`/blog/${post.slug}`}>{t(post.title)}</Link>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <a href="mailto:contato@julobato.com">contato@julobato.com</a>
        <a href="https://github.com/julobato/">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/julianne-lobato/">LinkedIn ↗</a>
        <a href="https://instagram.com/arakonfilm/">Instagram ↗</a>
        <a href="https://vsco.co/jlo/">VSCO ↗</a>
      </footer>
    </div>
  )
}
