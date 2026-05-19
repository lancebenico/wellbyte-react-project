export default function InputField({
  id,
  label,
  error,
  className = '',
  inputClassName = '',
  multiline = false,
  rows = 4,
  ...inputProps
}) {
  const inputId = id || (label ? `${label.replace(/\s+/g, '-').toLowerCase()}-input` : undefined)
  const noteClass = multiline ? 'retro-input-note' : ''
  const InputTag = multiline ? 'textarea' : 'input'

  return (
    <div className={`w-full min-w-0 ${className}`.trim()}>
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      ) : null}
      <InputTag
        id={inputId}
        rows={multiline ? rows : undefined}
        className={`retro-input w-full min-w-0 ${noteClass} ${inputClassName} ${error ? 'border-red-400' : ''}`.trim()}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        {...inputProps}
      />
      {error ? (
        <p id={inputId ? `${inputId}-error` : undefined} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
