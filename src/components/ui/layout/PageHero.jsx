import { createElement } from 'react'

export function HeroStat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/12 px-4 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="flex items-start gap-3">
        {Icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-cics-red">
            {createElement(Icon, { className: 'h-4 w-4', 'aria-hidden': true })}
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-none tabular-nums">{value}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/72">
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  stats = [],
  asideLabel,
  asideChildren,
  placement = 'right',
  className = '',
}) {
  const asideContent = (
    <div className={`relative flex h-full min-w-0 flex-col justify-center gap-4 ${placement === 'center' ? 'items-center text-center' : ''}`}>
      {asideLabel ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cics-red-muted">
          {asideLabel}
        </p>
      ) : null}
      {asideChildren ? (
        <div className={placement === 'center' ? 'mx-auto flex w-full max-w-4xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:[&>*]:flex-1' : 'space-y-3'}>
          {asideChildren}
        </div>
      ) : stats.length ? (
        <div className={placement === 'center' ? 'mx-auto grid w-full max-w-5xl justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-3'}>
          {stats.map((stat) => (
            <HeroStat key={`${stat.label}-${stat.value}`} {...stat} />
          ))}
        </div>
      ) : null}
    </div>
  )

  const titleClass =
    placement === 'left'
      ? 'text-[clamp(1.85rem,4.6vw,3.1rem)]'
      : 'text-[clamp(2.1rem,6vw,3.75rem)]'

  const headingBlock = (
    <div className={`flex min-w-0 flex-col justify-center px-4 py-7 sm:px-8 sm:py-8 lg:px-10 ${placement === 'center' ? 'items-center text-center' : ''}`}>
      <div className={`mb-4 flex flex-wrap items-center gap-3 ${placement === 'center' ? 'justify-center' : ''}`}>
        {Icon ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cics-red text-white shadow-[0_8px_20px_rgba(155,35,53,0.22)]">
            {createElement(Icon, { className: 'h-5 w-5', 'aria-hidden': true })}
          </span>
        ) : null}
        {eyebrow ? (
          <span className="rounded-full border border-cics-red/12 bg-cics-red-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-cics-red-dark">
            {eyebrow}
          </span>
        ) : null}
      </div>
      <h1 className={`max-w-3xl ${titleClass} font-extrabold uppercase leading-[0.98] tracking-tight text-text-primary text-balance break-words ${placement === 'center' ? 'mx-auto' : ''}`}>
        {title}
      </h1>
      {subtitle ? (
        <p className={`mt-5 max-w-3xl text-sm font-medium leading-relaxed text-text-secondary sm:text-base ${placement === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )

  if (placement === 'center') {
    return (
      <section
        className={`relative mb-6 overflow-hidden rounded-[1.75rem] border border-cics-red/10 bg-white shadow-[0_18px_50px_rgba(74,15,24,0.08)] ${className}`.trim()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(253,242,243,0.95),transparent_40%),linear-gradient(180deg,rgba(247,246,243,0.58),rgba(255,255,255,0))]" />
        <div className="relative">
          {headingBlock}
          <aside className="relative bg-cics-red-deep px-4 py-6 sm:px-7">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(232,196,200,0.18),transparent_48%),radial-gradient(circle_at_100%_0%,rgba(155,35,53,0.68),transparent_42%)]" />
            {asideContent}
          </aside>
        </div>
      </section>
    )
  }

  const asideClass =
    placement === 'left'
      ? 'relative bg-cics-red-deep px-5 py-6 sm:px-7 lg:rounded-r-[1.75rem]'
      : 'relative bg-cics-red-deep px-5 py-6 sm:px-7 lg:rounded-l-[1.75rem]'

  return (
    <section
      className={`relative mb-6 overflow-hidden rounded-[1.75rem] border border-cics-red/10 bg-white shadow-[0_18px_50px_rgba(74,15,24,0.08)] ${className}`.trim()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(253,242,243,0.95),transparent_34%),linear-gradient(180deg,rgba(247,246,243,0.58),rgba(255,255,255,0))]" />
      <div className={`relative grid min-h-[18rem] grid-cols-1 ${
        placement === 'left'
          ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)]'
          : 'lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]'
      }`}>
        {placement === 'left' ? (
          <>
            <aside className={`${asideClass} lg:order-first`}>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(232,196,200,0.18),transparent_48%),radial-gradient(circle_at_0%_0%,rgba(155,35,53,0.68),transparent_42%)]" />
              {asideContent}
            </aside>
            {headingBlock}
          </>
        ) : (
          <>
            {headingBlock}
            <aside className={asideClass}>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(232,196,200,0.18),transparent_48%),radial-gradient(circle_at_100%_0%,rgba(155,35,53,0.68),transparent_42%)]" />
              {asideContent}
            </aside>
          </>
        )}
      </div>
    </section>
  )
}
