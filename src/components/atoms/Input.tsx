export function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
  required,
  className,
}: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition
          ${icon ? 'pl-10' : 'pl-3'}
          pr-3
          ${className ?? ""}
        `}
      />
    </div>
  );
}