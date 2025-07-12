interface CheckboxProps {
  id: string;
  label: string;
}

export const Checkbox = ({ id, label }: CheckboxProps) => (
  <div className="flex items-center">
    <input
      id={id}
      name={id}
      type="checkbox"
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
      {label}
    </label>
  </div>
)