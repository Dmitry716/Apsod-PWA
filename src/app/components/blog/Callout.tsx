import { ReactNode } from "react"

interface CalloutProps {
  type?: "info" | "tip" | "warn"
  label?: string
  children: ReactNode
}

const ICONS = {
  info: "💡",
  tip: "✨",
  warn: "⚠️",
}

export default function Callout({ type = "info", label, children }: CalloutProps) {
  return (
    <div className={`blog-callout blog-callout--${type}`} role="note">
      {label && (
        <div className="blog-callout__label">
          <span aria-hidden="true">{ICONS[type]}</span>
          {label}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
