export default function SelectDropdown({
  id,
  label,
  error,
  options = [],
  placeholder = 'Select…',
  className = '',
  selectClassName = '',
  ...selectProps
}) {
  const selectId = id || (label ? `${label.replace(/\s+/g, '-').toLowerCase()}-select` : undefined)

  return (
    <div className={`w-full min-w-0 ${className}`.trim()}>
      {label ? (
        <label htmlFor={selectId} className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={`retro-input w-full min-w-0 appearance-none ${selectClassName} ${error ? 'border-red-400' : ''}`.trim()}
        aria-invalid={error ? 'true' : undefined}
        {...selectProps}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt) => {
          const value = typeof opt === 'object' ? opt.value : opt
          const optLabel = typeof opt === 'object' ? opt.label : opt
          return (
            <option key={String(value)} value={value}>
              {optLabel}
            </option>
          )
        })}
      </select>
      {error ? (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
