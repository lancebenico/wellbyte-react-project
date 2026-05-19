const VARIANT_CLASS = {
  primary: 'retro-btn-pink',
  secondary: 'retro-btn-blue',
  purple: 'retro-btn-purple',
  default: '',
}

const SIZE_CLASS = {
  sm: '!text-xs !px-2.5 !py-1',
  md: '',
  lg: '!text-sm !px-4 !py-2.5',
}

export default function Button({
  label,
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const content = label ?? children
  const variantClass = VARIANT_CLASS[variant] ?? VARIANT_CLASS.default
  const sizeClass = SIZE_CLASS[size] ?? SIZE_CLASS.md

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`retro-btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {content}
    </button>
  )
}
