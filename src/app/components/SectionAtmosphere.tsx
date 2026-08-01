type Tone = 'light' | 'dark' | 'slate'

type Props = {
  tone?: Tone
  grid?: boolean
  className?: string
}

/** Soft mesh + optional engineering grid — atmosphere without flat fills */
export default function SectionAtmosphere({
  tone = 'light',
  grid = true,
  className = '',
}: Props) {
  const blobs =
    tone === 'dark'
      ? [
          'bg-blue-600/25 w-[42%] h-[55%] -top-[10%] -left-[8%]',
          'bg-slate-500/20 w-[38%] h-[48%] top-[30%] -right-[12%] [animation-delay:-5s]',
          'bg-cyan-700/15 w-[30%] h-[40%] -bottom-[15%] left-[35%] [animation-delay:-9s]',
        ]
      : tone === 'slate'
        ? [
            'bg-blue-500/15 w-[40%] h-[50%] -top-[12%] right-[5%]',
            'bg-slate-400/20 w-[35%] h-[45%] bottom-0 -left-[10%] [animation-delay:-6s]',
            'bg-sky-400/10 w-[28%] h-[35%] top-[40%] left-[45%] [animation-delay:-11s]',
          ]
        : [
            'bg-blue-400/20 w-[42%] h-[55%] -top-[10%] -left-[8%]',
            'bg-sky-300/15 w-[38%] h-[48%] top-[25%] -right-[12%] [animation-delay:-5s]',
            'bg-slate-300/25 w-[30%] h-[40%] -bottom-[15%] left-[30%] [animation-delay:-9s]',
          ]

  return (
    <div className={`apsod-mesh ${className}`} aria-hidden>
      {blobs.map((cls) => (
        <div key={cls} className={`apsod-mesh-blob ${cls}`} />
      ))}
      {grid ? <div className="apsod-grid-fade" /> : null}
    </div>
  )
}
