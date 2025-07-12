import { createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { usePostApiAuthResetPasswordRequest } from '@/kubb'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'  // Import useNavigate


const formSchema = z.object({
  email: z.string().email('Email tidak valid').min(1, 'Email harus diisi'),
})

export const Route = createLazyFileRoute('/ForgotPassword/SendEmail/')({
  component: SendEmailPage,
})

function SendEmailPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const navigate = useNavigate()  // Initialize navigate

  // Hook untuk API request
  const { mutate, isPending, isSuccess } = usePostApiAuthResetPasswordRequest({
    mutation: {
      onSuccess: (data) => {
        // Simpan email di localStorage untuk digunakan di halaman berikutnya
        localStorage.setItem('resetPasswordEmail', form.getValues('email'))
        
        toast.success('Email Terkirim!', {
          description: data.message || 'OTP telah dikirim ke email Anda',
        })
        
        // Setelah sukses, navigasi ke halaman verifikasi OTP
        navigate({ to: '/ForgotPassword/VerifikasiOtp'})
      },
      onError: (error) => {
        toast.error('Gagal Mengirim Email', {
          description: error.message || 'Terjadi kesalahan saat mengirim OTP',
        })
      }
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ data: values })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <CardTitle className="mt-4 text-2xl font-bold text-gray-800">
            Lupa Password?
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600">
          Kok bisa lupa? Astagaaaa, jangan khawatir!
          Masukkan email kamu di bawah ini, dan kami akan mengirimkan kode OTP untuk mengatur ulang password kamu.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nama@email.com"
                        type="email"
                        {...field}
                        className="py-5 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              
            
              <Button 
                type="submit" 
                disabled={isPending || isSuccess}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : isSuccess ? (
                  'OTP Terkirim!'
                ) : (
                  'Kirim OTP'
                )}
              </Button>
              
              {isSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                  <p className="font-medium">✓ Cek email Anda</p>
                  <p className="text-sm mt-1">
                    Kami telah mengirim kode OTP ke email Anda. 
                    Periksa folder spam jika tidak ditemukan.
                  </p>
                </div>
              )}
            </form>
          </Form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Ingat password Anda?{' '}
              <a 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Masuk disini
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
