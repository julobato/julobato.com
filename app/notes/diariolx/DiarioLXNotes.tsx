'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Arrow, Node } from '@/components/Diagram'
import { useLang } from '@/components/LangProvider'
import { rich } from '@/components/Rich'
import { Topbar } from '@/components/Topbar'
import { NOTES, PERMISSIONS, REPORT_URL, ROLE_ORDER, TRANSITIONS, UPLOAD_CODE, type NodeId, type Role } from '@/lib/notes/diariolx'
import type { Key } from '@/lib/i18n'

const SECTIONS = ['tldr', 'architecture', 'decisions', 'uploads', 'workflow', 'security', 'cicd', 'details', 'changes']

/** Lanes of the upload sequence diagram: browser, backend, storage. */
const LANES = 3
const UPLOAD_STEPS: { from: number; to: number; label: Key; accent?: boolean }[] = [
  { from: 0, to: 1, label: 's1' },
  { from: 1, to: 0, label: 's2' },
  { from: 0, to: 2, label: 's3', accent: true },
  { from: 0, to: 1, label: 's4' },
  { from: 1, to: 2, label: 's5' }
]
const laneCenter = (lane: number) => ((2 * lane + 1) / (2 * LANES)) * 100

/** Real annotations on the signed upload route in MediaController. */
const ANNOTATIONS = `@RequireRole(UserRole.CONTRIBUTOR)
@PostMapping(Uris.Media.GET_SIGNED_URL)
@MayReturnSignedUrlOk
@MayReturnUnauthorized
@MayReturnBadRequest`

/** What those annotations turn into on the generated docs page. */
const DOC_RESPONSES = [['200', 'OK'], ['400', 'Bad Request'], ['401', 'Unauthorized']]

/** The bootstrap payload, trimmed to its top-level groups. */
const BOOTSTRAP_OUT = `{
  "api": {
    "auth": { "login": …, "refresh": … },
    "guest": { "homepage": …, "getContent": … },
    "backoffice": null
  }
}`
const BOOTSTRAP_IN = `{
  "api": {
    "auth": { "login": …, "refresh": … },
    "guest": { "homepage": …, "getContent": … },
    "backoffice": { "contents": …, "medias": …, "users": … }
  }
}`

/** The public menu, and the sections admins can switch off. */
const MENU = ['A Fundo', 'Secções', 'Fotografia', 'Podcasts', 'Vídeos']
const TOGGLES = ['Fotografia', 'Podcasts', 'Vídeos']

const can = (role: Role, min: Role) => ROLE_ORDER.indexOf(role) >= ROLE_ORDER.indexOf(min)

/** Highlights the table of contents entry for the section currently on screen. */
function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return active
}

function SectionHead({ title }: { title: string }) {
  return <h2 className="notes-h2">{title}</h2>
}

export function DiarioLXNotes() {
  const { lang, t } = useLang()
  const n = NOTES[lang]
  const active = useActiveSection()
  const [node, setNode] = useState<NodeId>('router')
  const [step, setStep] = useState(0)
  const [role, setRole] = useState<Role>('contributor')
  const [decision, setDecision] = useState<[number, number]>([0, 0])
  const [loggedIn, setLoggedIn] = useState(false)
  const [menu, setMenu] = useState<Record<string, boolean>>({})
  const picked = n.decisions.groups[decision[0]][1][decision[1]]

  const archNode = (id: NodeId, variant?: 'accent') => {
    const [title, sub] = n.arch.nodes[id][0].split(' · ')
    return (
      <button
        type="button"
        className={`node node--button${variant ? ` node--${variant}` : ''}`}
        aria-pressed={node === id}
        onClick={() => setNode(id)}
      >
        {title}
        {sub && <small>{sub}</small>}
      </button>
    )
  }

  const snippet = UPLOAD_CODE[step]

  return (
    <div className="notes">
      <Topbar />
      <div className="notes-grid">
        <aside className="notes-side">
          <ol className="notes-toc notes-toc--plain">
            {SECTIONS.map((id, i) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                  {n.toc[i]}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <main className="notes-main">
          <header className="notes-hero notes-hero--post">
            <h1 className="notes-h1--post">{rich(n.hero.sheetTitle)}</h1>
            <p className="notes-lede">{n.hero.sheetLede}</p>
            <dl className="notes-facts">
              {n.hero.facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div>
                <dt>{n.hero.story}</dt>
                <dd><Link href="/blog/diariolx">{rich(n.postLink)}</Link></dd>
              </div>
              <div>
                <dt>{n.hero.report}</dt>
                <dd><a href={REPORT_URL} target="_blank" rel="noopener noreferrer">{n.hero.reportLink} ↗</a></dd>
              </div>
            </dl>
          </header>

          <section id="tldr" className="notes-section notes-tldr-section">
            <SectionHead title={n.toc[0]} />
            <ul className="notes-card notes-summary-hl">
              {n.summary.map(([label, text]) => (
                <li key={label}><span className="highlight">{label}</span> {text}</li>
              ))}
            </ul>
          </section>


          <section id="architecture" className="notes-section">
            <SectionHead title={n.toc[1]} />
            <p>{n.arch.intro}</p>
            <figure className="diagram">
              <div className="arch">
                {archNode('browser')}
                <span className="note"><Arrow down /> HTTPS</span>
                <div className="box">
                  <span className="box-label">{t('aVm')}</span>
                  {archNode('tls')}
                  <Arrow down />
                  <div className="box">
                    <span className="box-label">Docker Compose</span>
                    {archNode('router')}
                    <div className="routes">
                      <div className="route">
                        <code className="path">/</code><Arrow down />
                        {archNode('react')}
                      </div>
                      <div className="route">
                        <code className="path">/api</code><Arrow down />
                        {archNode('spring')}<Arrow down />
                        {archNode('postgres')}
                      </div>
                      <div className="route">
                        <code className="path">/media</code><Arrow down />
                        {archNode('seaweed', 'accent')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="notes-panel" aria-live="polite">
                <p className="notes-label">{n.arch.nodes[node][0]}</p>
                <p>{n.arch.nodes[node][1]}</p>
              </div>
              <figcaption>{n.arch.caption}</figcaption>
            </figure>
            <h3 className="notes-h3">{n.arch.cacheTitle}</h3>
            <p>{n.arch.cacheIntro}</p>
            <div className="notes-table">
              <table className="notes-stack">
                <thead>
                  <tr>{n.arch.cacheHead.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {n.arch.cache.map(([path, time, why]) => (
                    <tr key={path}>
                      <td><code>{path}</code></td>
                      <td className={`notes-nowrap${time === n.arch.cache[0][1] ? ' notes-muted' : ''}`}>{time}</td>
                      <td>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="notes-small">{n.arch.cacheNote}</p>
          </section>

          <section id="decisions" className="notes-section">
            <SectionHead title={n.toc[2]} />
            <p>{n.decisions.intro}</p>
            <div className="notes-decisions">
              {n.decisions.groups.map(([group, items], g) => (
                <div key={group} className="notes-decision-group">
                  <p className="notes-label">{group}</p>
                  <div className="notes-chips">
                    {items.map(([chosen, over], i) => (
                      <button
                        key={chosen}
                        type="button"
                        className="notes-chip"
                        aria-pressed={decision[0] === g && decision[1] === i}
                        onClick={() => setDecision([g, i])}
                      >
                        <strong>{chosen}</strong>
                        <s>{over}</s>
                      </button>
                    ))}
                  </div>
                  {decision[0] === g && (
                  <div className="notes-panel notes-decision-panel" aria-live="polite">
                    <p className="notes-label">
                      {picked[0]} · <span className="notes-over">{n.decisions.over} {picked[1]}</span>
                    </p>
                    <p>{picked[2]}</p>
                    {picked[3] && <a className="notes-more" href="#changes">{picked[3]}</a>}
                  </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="uploads" className="notes-section">
            <SectionHead title={n.toc[3]} />
            <p>{n.upload.intro}</p>
            <figure className="diagram">
              <div className="seq">
                <div className="seq-heads">
                  <Node title={t('browser')} />
                  <Node title="Spring Boot" />
                  <Node title="SeaweedFS" variant="accent" />
                </div>
                {Array.from({ length: LANES }, (_, lane) => (
                  <span key={lane} className="seq-life" style={{ left: `${laneCenter(lane)}%` }} aria-hidden="true" />
                ))}
                <ol className="seq-steps">
                  {UPLOAD_STEPS.map(({ from, to, label, accent }, i) => (
                    <li
                      key={label}
                      className={`seq-step seq-step--${to > from ? 'right' : 'left'}${accent ? ' seq-step--accent' : ''}${i === step ? ' seq-step--active' : ''}`}
                      style={{ marginLeft: `${laneCenter(Math.min(from, to))}%`, width: `${(Math.abs(to - from) / LANES) * 100}%` }}
                    >
                      <button type="button" onClick={() => setStep(i)} aria-pressed={i === step}>
                        {i + 1} · {t(label)}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="notes-panel" aria-live="polite">
                <div className="notes-stepper">
                  <p className="notes-label">{n.upload.step} {step + 1} {n.upload.of} {UPLOAD_STEPS.length}</p>
                  <div className="notes-stepper-buttons">
                    <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>← {n.upload.prev}</button>
                    <button type="button" onClick={() => setStep((s) => Math.min(UPLOAD_STEPS.length - 1, s + 1))} disabled={step === UPLOAD_STEPS.length - 1}>{n.upload.next} →</button>
                  </div>
                </div>
                <p>{n.upload.steps[step]}</p>
                <div className="notes-code">
                  <span className="notes-code-file">{snippet.file}</span>
                  <pre><code>{snippet.code}</code></pre>
                </div>
              </div>
            </figure>
          </section>

          <section id="workflow" className="notes-section">
            <SectionHead title={n.toc[4]} />
            <p>{n.workflow.intro}</p>
            <div className="notes-roles" role="group">
              {ROLE_ORDER.map((r) => (
                <button key={r} type="button" aria-pressed={role === r} onClick={() => setRole(r)}>
                  {n.workflow.roles[r]}
                </button>
              ))}
            </div>
            <ul className="notes-transitions">
              {TRANSITIONS.map(({ from, to, min }, i) => {
                const allowed = can(role, min)
                return (
                  <li key={i} className={allowed ? '' : 'is-off'}>
                    <span className="notes-state">{n.workflow.states[from]}</span>
                    <Arrow />
                    <span className={`notes-state${to === 'approved' ? ' notes-state--accent' : ''}`}>{n.workflow.states[to]}</span>
                    <span className="notes-action">{n.workflow.actions[i]}</span>
                    <span className="notes-badge" aria-hidden="true">{allowed ? '✓' : '—'}</span>
                    <span className="sr-only">{allowed ? n.workflow.can : n.workflow.cannot}</span>
                  </li>
                )
              })}
            </ul>
            <p className="notes-small">{n.workflow.note}</p>
          </section>

          <section id="security" className="notes-section">
            <SectionHead title={n.toc[5]} />
            <p>{n.perms.intro}</p>
            <div className="notes-table">
              <table>
                <thead>
                  <tr>
                    <th>{n.perms.action}</th>
                    {ROLE_ORDER.map((r) => <th key={r}>{n.workflow.roles[r]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {n.perms.rows.map((row, i) => (
                    <tr key={row}>
                      <td>{row}</td>
                      {ROLE_ORDER.map((r) => (
                        <td key={r} className={can(r, PERMISSIONS[i]) ? 'yes' : 'no'}>{can(r, PERMISSIONS[i]) ? '✓' : '—'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="notes-h3">{n.perms.extraTitle}</h3>
            <figure className="notes-devtools">
              <div className="notes-table">
                <table>
                  <thead>
                    <tr>{n.perms.cookieHead.map((h) => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {n.perms.cookies.map(([name, expires]) => (
                      <tr key={name}>
                        <td><code>{name}</code></td>
                        <td>{expires}</td>
                        <td className="yes">✓</td>
                        <td>Strict</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <figcaption>{n.perms.cookieCaption}</figcaption>
            </figure>
            <div className="notes-facts-grid">
              {n.perms.facts.map(([title, text]) => (
                <div key={title} className="notes-card">
                  <h4 className="notes-card-title">{title}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="cicd" className="notes-section">
            <SectionHead title={n.toc[6]} />
            <figure className="diagram">
              <p className="notes-label">{n.tests.deploy.push}</p>
              <div className="flow flow--steps">
                <Node title="git push" /><Arrow />
                <Node title="GitHub Actions" /><Arrow />
                <Node title={n.tests.deploy.tests} sub="gradle check · Playwright" />
              </div>
              <p className="notes-label notes-label--space">{n.tests.deploy.release}</p>
              <div className="flow flow--steps">
                <Node title={n.tests.deploy.images} sub={n.tests.deploy.imageNames.join(' · ')} /><Arrow />
                <Node title={n.tests.deploy.registry} sub="GHCR" /><Arrow />
                <Node title={n.tests.deploy.server} sub={n.tests.deploy.serverSub} variant="accent" />
              </div>
              <figcaption>{n.tests.deploy.note}</figcaption>
            </figure>
            <h3 className="notes-h3">{n.tests.title}</h3>
            <p>{n.tests.intro}</p>
            <div className="notes-table">
              <table className="notes-stack">
                <thead>
                  <tr>{n.tests.head.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {n.tests.rows.map(([layer, tool, what]) => (
                    <tr key={layer}>
                      <td><strong>{layer}</strong></td>
                      <td className="notes-nowrap">{tool}</td>
                      <td>{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </section>

          <section id="details" className="notes-section">
            <SectionHead title={n.toc[7]} />
            <div className="notes-cards notes-cards--visual">
              <div className="notes-card">
                <h3 className="notes-card-title">{n.details[0][0]}</h3>
                <div className="notes-docgen">
                  <pre className="notes-mini-code"><code>{ANNOTATIONS}</code></pre>
                  <span className="arrow notes-docgen-arrow" aria-hidden="true">↓ /docs</span>
                  <div className="notes-doc">
                    <div className="notes-doc-route">
                      <span className="notes-doc-method">POST</span>
                      <code>/api/backoffice/medias/signed-url</code>
                    </div>
                    <div className="notes-doc-codes">
                      {DOC_RESPONSES.map(([code, label]) => (
                        <span key={code} className={`notes-doc-code notes-doc-code--${code[0]}`}>{code} {label}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p>{n.details[0][1]}</p>
              </div>

              <div className="notes-card">
                <h3 className="notes-card-title">{n.details[1][0]}</h3>
                <div className="notes-roles notes-roles--small" role="group">
                  <button type="button" aria-pressed={!loggedIn} onClick={() => setLoggedIn(false)}>{n.loggedOut}</button>
                  <button type="button" aria-pressed={loggedIn} onClick={() => setLoggedIn(true)}>{n.loggedIn}</button>
                </div>
                <pre className="notes-mini-code"><code>{loggedIn ? BOOTSTRAP_IN : BOOTSTRAP_OUT}</code></pre>
                <p>{n.details[1][1]}</p>
              </div>

              <div className="notes-card">
                <h3 className="notes-card-title">{n.details[2][0]}</h3>
                <div className="notes-mini-site" aria-hidden="true">
                  <span className="notes-mini-logo">{rich('DiárioLX')}</span>
                  <div className="notes-mini-nav">
                    {MENU.filter((item) => menu[item] !== false).map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
                <div className="notes-switches">
                  {TOGGLES.map((item) => (
                    <label key={item} className="notes-switch">
                      <span>{item}</span>
                      <input type="checkbox" role="switch" checked={menu[item] !== false} onChange={(e) => setMenu({ ...menu, [item]: e.target.checked })} />
                    </label>
                  ))}
                </div>
                <p>{n.details[2][1]}</p>
              </div>

              <div className="notes-card">
                <h3 className="notes-card-title">{n.details[3][0]}</h3>
                <ol className="notes-blocks" aria-hidden="true">
                  {n.blocks.map((block, i) => (
                    <li key={block} className={`notes-block notes-block--${i}`}>
                      <span className="notes-num">{i + 1}</span> {block}
                      {(i === 2 || i === 4) && <code className="notes-block-link">media_id → medias</code>}
                    </li>
                  ))}
                </ol>
                <p>{n.details[3][1]}</p>
              </div>
            </div>
          </section>

          <section id="changes" className="notes-section">
            <SectionHead title={n.toc[8]} />
            <p>{n.changesIntro}</p>
            <div className="notes-changes">
              {n.changes.map(([title, then, next, why]) => (
                <div key={title} className="notes-change">
                  <h3 className="notes-card-title">{title}</h3>
                  <div className="notes-change-flow">
                    <div className="notes-change-then">
                      <span className="notes-label">{n.then}</span>
                      <span>{then}</span>
                    </div>
                    <Arrow />
                    <div className="notes-change-now">
                      <span className="notes-label">{n.now}</span>
                      <strong>{next}</strong>
                    </div>
                  </div>
                  <details className="notes-why">
                    <summary>{n.why}</summary>
                    <p>{why}</p>
                  </details>
                </div>
              ))}
            </div>
          </section>

          <footer className="notes-footer">
            <Link href="/blog/diariolx">{n.back}</Link>
            <a href="mailto:contato@julobato.com">contato@julobato.com</a>
          </footer>
        </main>
      </div>
    </div>
  )
}
