export const LOGO_PATHS = {
  ust: '/pictures/univlogo.png',
  cics: '/pictures/collegelogo.png',
}

export default function InstitutionLogos({ className = '', size = 'md' }) {
  const dim = size === 'lg' ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]'

  return (
    <div className={`flex items-center justify-center gap-6 sm:gap-10 ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <img
          src={LOGO_PATHS.ust}
          alt="University of Santo Tomas logo"
          className={`${dim} object-contain`}
        />
        <span className="text-[10px] font-medium uppercase tracking-wide text-cics-red-dark/70">
          UST
        </span>
      </div>
      <div className="hidden sm:block w-px h-14 bg-cics-red/25" aria-hidden />
      <div className="flex flex-col items-center gap-2">
        <img
          src={LOGO_PATHS.cics}
          alt="CICS logo"
          className={`${dim} object-contain`}
        />
        <span className="text-[10px] font-medium uppercase tracking-wide text-cics-red-dark/70">
          CICS
        </span>
      </div>
    </div>
  )
}
