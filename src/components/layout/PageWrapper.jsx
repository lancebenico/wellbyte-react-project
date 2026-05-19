export default function PageWrapper({
  children,
  className = '',
  maxWidth = 'max-w-6xl',
  paddingTop = 'pt-14 sm:pt-16 md:pt-20',
  paddingBottom = 'pb-10 sm:pb-12 md:pb-16',
}) {
  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden ${paddingTop} ${paddingBottom} px-3 sm:px-4 md:px-6 ${className}`.trim()}
    >
      <div className={`mx-auto w-full ${maxWidth}`}>{children}</div>
    </div>
  )
}
