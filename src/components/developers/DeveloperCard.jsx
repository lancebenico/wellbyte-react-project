export default function DeveloperCard({ developer }) {
  return (
    <article className="retro-window overflow-hidden border-cics-red/10 shadow-[0_14px_40px_rgba(74,15,24,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(74,15,24,0.1)]">
      <div className="retro-titlebar bg-cics-red-light/50">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-cics-red-dark truncate">
          {developer.name}
        </span>
      </div>

      <div className="p-5 bg-white">
        <div
          className="relative mb-5 h-72 w-full overflow-hidden rounded-2xl border bg-white sm:h-[22rem] xl:h-80"
          style={{
            background: developer.avatarGradient,
            borderColor: developer.accentColor,
          }}
        >
          {developer.image ? (
            <img
              src={developer.image}
              alt={developer.name}
              className="w-full h-full object-contain object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-semibold text-white/95">
              {developer.initials}
            </div>
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-cics-red-deep shadow-sm">
            {developer.initials}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-text-primary">{developer.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {developer.description}
        </p>
        {developer.photoSource && (
          <p className="mt-3 text-[11px] leading-relaxed text-text-muted border-t border-black/[0.06] pt-3">
            <span className="font-semibold text-cics-red-dark">Photo source: </span>
            {developer.photoSource}
          </p>
        )}
      </div>
    </article>
  )
}
