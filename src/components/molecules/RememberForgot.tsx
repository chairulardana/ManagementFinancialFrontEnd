import { Checkbox } from "../atoms/Checkbox";

export const RememberForgot = () => (
  <div className="flex items-center justify-between mb-6">
    <Checkbox id="remember-me" label="Ingat saya" />
    <div className="text-sm">
      <a href="/ForgotPassword/SendEmail" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
        Lupa password?
      </a>
    </div>
  </div>
)