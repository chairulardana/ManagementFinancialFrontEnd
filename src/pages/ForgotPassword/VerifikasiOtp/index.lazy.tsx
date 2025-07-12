import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { usePostApiAuthVerifyOtp, usePostApiAuthResendOtp } from '@/kubb'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'

const formSchema = z.object({
  otp: z.string().length(6, 'OTP harus terdiri dari 6 digit').regex(/^\d{6}$/, 'OTP harus berupa angka'),
})

export const Route = createLazyFileRoute('/ForgotPassword/VerifikasiOtp/')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const navigate = useNavigate()
  const email = localStorage.getItem('resetPasswordEmail') || ''
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [resendTimer, setResendTimer] = useState(300) // 300 detik = 5 menit

  // Verify OTP mutation
  const { mutate: verifyOtp, isPending: isVerifying, isSuccess } = usePostApiAuthVerifyOtp({
    mutation: {
      onSuccess: (data) => {
        toast.success('OTP Valid!', {
          description: data.message || 'OTP Anda valid, silakan masukkan password baru.',
        })
        navigate({ to: '/ForgotPassword/SetNewPassword' })
      },
      onError: (error) => {
        toast.error('Verifikasi Gagal', {
          description: error.message || 'Terjadi kesalahan saat memverifikasi OTP.',
        })
      }
    }
  })

  // Resend OTP mutation
  const { mutate: resendOtp, isPending: isResending } = usePostApiAuthResendOtp({
    mutation: {
      onSuccess: (data) => {
        toast.success('OTP Baru Dikirim', {
          description: data.message || 'Kode OTP baru telah dikirim ke email Anda.',
        })
        setResendTimer(300) // Reset cooldown timer ke 5 menit
      },
      onError: (error) => {
        toast.error('Gagal Mengirim OTP', {
          description: error.message || 'Terjadi kesalahan saat mengirim ulang OTP.',
        })
      }
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    verifyOtp({ data: { email, otp: values.otp } })
  }

  // Handle OTP input changes
  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === '') {
      const otp = form.getValues('otp').split('')
      otp[index] = value
      form.setValue('otp', otp.join(''), { shouldValidate: true })
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  // Handle backspace key
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && !form.getValues('otp')[index]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle OTP resend
  const handleResendOtp = () => {
    if (email && resendTimer === 0) {
      resendOtp({ data: { email } })
    }
  }

  // Format waktu menjadi menit:detik
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Auto focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer === 0) return

    const timerId = setTimeout(() => {
      setResendTimer(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearTimeout(timerId)
  }, [resendTimer])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center px-6 pt-8 pb-4">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 0H9a2 2 0 01-2-2V9a2 2 0 012-2h2m-4 6h.01M15 11h.01" />
            </svg>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Verifikasi OTP</CardTitle>
          <CardDescription className="mt-2 text-gray-600 text-sm sm:text-base">
            Masukkan 6 digit kode yang dikirim ke <span className="font-semibold text-blue-600 break-all">{email || 'email Anda'}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-2">
                {[...Array(6)].map((_, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={form.watch('otp')[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    autoComplete="one-time-code"
                    className="h-14 sm:h-16 w-full text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                    placeholder="0"
                    disabled={isSuccess}
                  />
                ))}
              </div>
              
              {form.formState.errors.otp && (
                <p className="mt-2 text-sm text-red-500 text-center">
                  {form.formState.errors.otp.message}
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                type="submit" 
                disabled={isVerifying || isSuccess}
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memverifikasi...
                  </>
                ) : isSuccess ? (
                  'OTP Valid'
                ) : (
                  'Verifikasi OTP'
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2">
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={handleResendOtp}
                  disabled={isResending || resendTimer > 0}
                  className={`py-5 text-blue-600 font-medium hover:text-blue-800 hover:bg-blue-50 ${
                    resendTimer > 0 || isResending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Ulang OTP'
                  )}
                </Button>
                
                {resendTimer > 0 && (
                  <span className="text-sm text-gray-500">
                    ({formatTime(resendTimer)})
                  </span>
                )}
              </div>
            </div>
          </form>

          {isSuccess && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center animate-fade-in">
              <p className="font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                OTP valid!
              </p>
              <p className="text-sm mt-1">
                Mengarahkan ke halaman reset password...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}