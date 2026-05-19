export default function DeveloperCard({ developer }) {
  return (
    <article className="retro-window overflow-hidden border-black/[0.08]">
      <div className="retro-titlebar bg-[#fafafa]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted truncate">
          {developer.name}
        </span>
      </div>

      <div className="p-6 bg-white">
        <div
          className="w-14 h-14 rounded-md border overflow-hidden mb-4"
          style={{
            background: developer.avatarGradient,
            borderColor: developer.accentColor,
          }}
        >
          {developer.image ? (
            <img
              src={developer.image}
              alt={developer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-white/95">
              {developer.initials}
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-text-primary">{developer.name}</h3>
      </div>
    </article>
  )
}
