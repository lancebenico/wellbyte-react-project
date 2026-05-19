export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = '',
  titleClassName = '',
  align = 'left',
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : align === 'right' ? 'text-right ml-auto' : ''

  return (
    <header className={`mb-8 sm:mb-10 max-w-full ${alignClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="text-[clamp(0.625rem,1.5vw,0.6875rem)] font-semibold uppercase tracking-[0.1em] text-cics-red mb-2">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h1
          className={`text-[clamp(1.5rem,4vw,2rem)] font-semibold tracking-tight text-text-primary mb-2 ${titleClassName}`.trim()}
        >
          {typeof title === 'string' ? title : <>{title}</>}
        </h1>
      ) : null}
      {subtitle ? (
        <p className="text-[clamp(0.875rem,2vw,0.9375rem)] text-text-secondary max-w-xl leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
