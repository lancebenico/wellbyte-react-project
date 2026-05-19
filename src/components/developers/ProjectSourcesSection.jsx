import { ExternalLink } from 'lucide-react'
import {
  PROFESSIONAL_IMAGE_REFERENCES,
  PROJECT_TECH_REFERENCES,
} from '../../utils/constants/developers'

function ReferenceList({ items }) {
  return (
    <ul className="divide-y divide-black/[0.06] bg-white">
      {items.map((ref) => (
        <li key={ref.url} className="px-5 py-3.5 sm:px-6">
          <a
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 text-sm font-semibold text-cics-red hover:text-cics-red-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-cics-red/40 focus-visible:ring-offset-2 rounded-sm"
          >
            <span>{ref.name}</span>
            <ExternalLink
              className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100"
              aria-hidden
            />
          </a>
          {ref.purpose ? (
            <p className="mt-1 text-xs text-text-secondary leading-relaxed">{ref.purpose}</p>
          ) : null}
          <p className="mt-1 text-[11px] text-text-muted break-all">{ref.url}</p>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectSourcesSection() {
  return (
    <section className="mt-8 space-y-6" aria-labelledby="references-heading">
      <h2 id="references-heading" className="sr-only">
        Project references
      </h2>

      <div className="retro-window overflow-hidden">
        <div className="retro-titlebar bg-[#fafafa]">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            Professional references
          </h3>
        </div>
        <p className="px-5 pt-4 pb-2 text-xs text-text-secondary leading-relaxed bg-white sm:px-6">
          Institutional and campus imagery used on the home page and throughout WellByte is
          credited to the following official sources.
        </p>
        <ReferenceList items={PROFESSIONAL_IMAGE_REFERENCES} />
      </div>

      <div className="retro-window overflow-hidden">
        <div className="retro-titlebar bg-[#fafafa]">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            Libraries &amp; APIs
          </h3>
        </div>
        <p className="px-5 pt-4 pb-2 text-xs text-text-secondary leading-relaxed bg-white sm:px-6">
          Third-party tools and services integrated into this application.
        </p>
        <ReferenceList items={PROJECT_TECH_REFERENCES} />
      </div>
    </section>
  )
}
