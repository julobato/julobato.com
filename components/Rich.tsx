import { Fragment, type ReactNode } from 'react'

/** Names that are always shown in italics. */
const ITALIC = ['DiárioLX']

/** Names that always link to their site. */
const LINKS: Record<string, string> = {
  ESCS: 'https://www.escs.upl.pt',
  LIACOM: 'https://liacom.escs.ipl.pt'
}

const PATTERN = new RegExp(`(${[...ITALIC, ...Object.keys(LINKS)].join('|')})`)

/** Renders plain text, putting italic names in <em> and linking known names. */
export const rich = (text: string): ReactNode =>
  text.split(PATTERN).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    if (LINKS[part]) return <a key={i} href={LINKS[part]} target="_blank" rel="noopener noreferrer">{part}</a>
    return <em key={i}>{part}</em>
  })
