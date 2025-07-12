import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from '@tanstack/react-router';
import { usePostApiAuthGoogleLogin } from '@/kubb';
import { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface GoogleLoginResponse {
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface GoogleLoginButtonProps {
  className?: string;
}

export const GoogleLoginButton = ({ className = '' }: GoogleLoginButtonProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { mutateAsync } = usePostApiAuthGoogleLogin<GoogleLoginResponse>();

  const handleLogin = async (response: any) => {
    const { credential } = response;

    if (!credential) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: 'Tidak ada credential dari Google',
        confirmButtonColor: '#4f46e5',
      });
      return;
    }

    try {
      setLoading(true);
      
      // Show loading indicator
      Swal.fire({
        title: 'Sedang memproses...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Send credential to backend
      const responseBackend = await mutateAsync({
        data: { credential }
      });

      const token = responseBackend?.data?.token;

      if (token) {
        sessionStorage.setItem('Access_Google', token);
        
        // Close loading and show success
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil!',
          text: 'Anda akan diarahkan ke dashboard',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          didClose: () => {
            navigate({ to: '/DashboardSaldo' });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: 'Token tidak ditemukan pada respons backend',
          confirmButtonColor: '#4f46e5',
        });
        console.error('Login gagal: Token tidak ditemukan');
      }
    } catch (error: any) {
      // Handle different types of errors
      let errorMessage = "Gagal login dengan Google";
      
      if (error.response) {
        // Backend returned an error response
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      "Terjadi kesalahan pada server";
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "Tidak ada respons dari server";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || "Terjadi kesalahan";
      }
      
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: errorMessage,
        confirmButtonColor: '#4f46e5',
        confirmButtonText: 'Coba Lagi'
      });
      
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLogin}
      onError={() => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Login',
          text: 'Login dengan Google gagal. Silakan coba lagi.',
          confirmButtonColor: '#4f46e5',
        });
        setLoading(false);
      }}
      useOneTap={true}
      theme="outline"
      shape="rectangular"
      size="large"
      text="signin_with"
     
    />
  );
};