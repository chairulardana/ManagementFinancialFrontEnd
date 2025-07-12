import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { usePostApiAuthSetPassword } from '@/kubb'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

// Password strength checker
const getPasswordStrength = (password: string) => {
  if (!password) return { score: 0, label: '', width: '0%' }
  
  let score = 0;
  
  // Length
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character types
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
  
  // Deductions for weak patterns
  if (/(.)\1\1/.test(password)) score -= 1;
  
  let label = '', width = '0%', color = '';
  
  if (score < 3) {
    label = 'Lemah';
    width = '33%';
    color = 'bg-red-500';
  } else if (score < 5) {
    label = 'Sedang';
    width = '66%';
    color = 'bg-yellow-500';
  } else {
    label = 'Kuat';
    width = '100%';
    color = 'bg-green-500';
  }
  
  return { score, label, width, color };
};

// Form validation schema
const formSchema = z.object({
  password: z.string()
    .min(8, 'Password harus minimal 8 karakter')
    .refine(password => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
      return hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
    }, {
      message: 'Harus mengandung huruf besar, huruf kecil, angka, dan simbol'
    }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"]
});

export const Route = createLazyFileRoute('/ForgotPassword/SetNewPassword/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const strength = getPasswordStrength(password);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const email = localStorage.getItem('resetPasswordEmail') || '';

  const { mutate, isPending, isSuccess } = usePostApiAuthSetPassword({
    mutation: {
      onSuccess: (data) => {
        toast.success('Password Diperbarui!', {
          description: data.message || 'Password Anda berhasil diperbarui. Silakan login dengan password baru Anda.',
        });
        
        // Clear email from localStorage
        localStorage.removeItem('resetPasswordEmail');
        
        // Navigate to login page
        setTimeout(() => {
          navigate({ to: '/Login' });
        }, 1500); // Delay 1.5 detik sebelum navigate
      },
      onError: (error) => {
        toast.error('Gagal Memperbarui Password', {
          description: error.message || 'Terjadi kesalahan saat memperbarui password.',
        });
      }
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ data: { email, password: values.password } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center px-6 pt-8 pb-4">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Atur Password Baru</CardTitle>
          <CardDescription className="mt-2 text-gray-600 text-sm sm:text-base">
            Buat password baru untuk akun <span className="font-semibold text-blue-600 break-all">{email || 'Anda'}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password Baru
                </label>
                <div className="relative">
                  <Input
                    {...form.register('password')}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password baru"
                    className="py-5 pr-10"
                    onChange={(e) => {
                      form.setValue('password', e.target.value);
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs font-medium ${strength.score < 3 ? 'text-red-500' : strength.score < 5 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {strength.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {password.length}/12
                    </span>
                  </div>
                </div>
                
                {form.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              
              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Input
                    {...form.register('confirmPassword')}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Konfirmasi password baru"
                    className="py-5 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {form.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              
              {/* Password Requirements */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">Persyaratan Password:</p>
                <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                  <li className={password.length >= 8 ? 'text-green-600' : ''}>
                    Minimal 8 karakter
                  </li>
                  <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                    Mengandung huruf besar (A-Z)
                  </li>
                  <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                    Mengandung huruf kecil (a-z)
                  </li>
                  <li className={/\d/.test(password) ? 'text-green-600' : ''}>
                    Mengandung angka (0-9)
                  </li>
                  <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-600' : ''}>
                    Mengandung simbol (!@#$%^&*, dll)
                  </li>
                </ul>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isPending || isSuccess}
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Memperbarui...
                </>
              ) : isSuccess ? (
                'Password Diperbarui!'
              ) : (
                'Atur Password Baru'
              )}
            </Button>
          </form>

          {isSuccess && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center animate-fade-in">
              <p className="font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Password berhasil diperbarui!
              </p>
              <p className="text-sm mt-1">
                Mengarahkan ke halaman login...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}