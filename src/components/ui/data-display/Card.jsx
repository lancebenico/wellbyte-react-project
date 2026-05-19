export default function Card({ children, className = '', variant = '', ...props }) {
  const variantClass = variant ? `retro-window-${variant}` : ''
  return (
    <div className={`retro-window ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
