/** Small building blocks for the HTML diagrams in posts. */

export const Arrow = ({ dashed, down }: { dashed?: boolean; down?: boolean }) => (
  <span className="arrow" aria-hidden="true">{down ? '↓' : dashed ? '⇢' : '→'}</span>
)

type NodeProps = { title: string; sub?: string; variant?: 'accent' | 'dashed' }

export const Node = ({ title, sub, variant }: NodeProps) => (
  <span className={`node${variant ? ` node--${variant}` : ''}`}>
    {title}
    {sub && <small>{sub}</small>}
  </span>
)
