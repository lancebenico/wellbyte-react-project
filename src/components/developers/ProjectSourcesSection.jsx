import { ExternalLink } from 'lucide-react'
import { PROJECT_SOURCES } from '../../utils/constants/developers'

export default function ProjectSourcesSection() {
  return (
    <section className="retro-window overflow-hidden mt-8" aria-labelledby="project-sources-heading">
      <div className="retro-titlebar bg-[#fafafa]">
        <h2
          id="project-sources-heading"
          className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted"
        >
          Project sources &amp; references
        </h2>
      </div>
      <ul className="divide-y divide-black/[0.06] bg-white">
        {PROJECT_SOURCES.map((source) => (
          <li key={source.name} className="px-5 py-3.5 sm:px-6">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 text-sm font-semibold text-cics-red hover:text-cics-red-dark"
            >
              <span>{source.name}</span>
              <ExternalLink
                className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100"
                aria-hidden
              />
            </a>
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">{source.purpose}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
