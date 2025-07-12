import type { ReactNode } from 'react'

interface FormGroupProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

export const FormGroup = ({ 
  label, 
  htmlFor, 
  children,
  className = ''
}: FormGroupProps) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={htmlFor} className="block text-gray-700 font-medium mb-1 text-xs md:text-sm">
      {label}
    </label>
    {children}
  </div>
)