import { ReactNode } from 'react'

interface LoginLayoutProps {
  sidebar: ReactNode;
  form: ReactNode;
}

export const LoginLayout = ({ sidebar, form }: LoginLayoutProps) => (
  <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 to-blue-100">
    {/* Sidebar Desktop */}
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-800 text-white p-12 flex-col justify-center">
      {sidebar}
    </div>

    {/* Form Login */}
    <div className="flex flex-1 items-center justify-center p-4 md:p-8">
      {form}
    </div>
  </div>
)