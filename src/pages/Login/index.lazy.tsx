import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { usePostApiAuthLogin } from "@/kubb";
import { LoginLayout } from "@/components/templates/LoginLayout";
import { LoginForm } from "@/components/organisms/LoginForm";
import { GoogleLoginButton } from "@/components/molecules/Auth0LoginButton";
import Logo from "../../assets/Logo.svg";
import Swal from "sweetalert2"; // Import SweetAlert2

// Membuat route /Login yang mengarah ke LoginPage
export const Route = createLazyFileRoute("/Login/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  // Post handler untuk meng-handle login
  const postHandler = usePostApiAuthLogin({
    client: {
      baseURL: BaseUrl,
    },
  });

  // Fungsi untuk mengirim data login ke API
  const handleSubmit = async (email: string, password: string) => {
    // Tampilkan loading indicator
    Swal.fire({
      title: "Sedang memproses...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Kirim permintaan login ke API
      const response = await postHandler.mutateAsync({
        data: {
          identifier: email,
          password: password,
        },
      });

      // Simpan token ke sessionStorage setelah login berhasil
      if (response.data && response.data.token) {
        sessionStorage.setItem('token', response.data.token);
      }

      // Tutup loading dan tampilkan sukses
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: "Anda akan diarahkan ke dashboard",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        didClose: () => {
          // Arahkan ke halaman DashboardSaldo setelah login berhasil
          navigate({
            to: "/DashboardSaldo",
          });
        }
      });
    } catch (err) {
      // Tutup loading dan tampilkan error
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau password salah. Silakan coba lagi.",
        confirmButtonColor: "#4f46e5",
        confirmButtonText: "Coba Lagi"
      });
      console.error("❌ Error saat login:", err);
    }
  };

  // Mobile header layout
  const MobileHeader = () => (
    <div className="md:hidden bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 text-center relative">
      <div className="pt-2">
        <h2 className="text-2xl font-bold">Kantong Pintar</h2>
        <p className="text-indigo-200 mt-1 mb-12">
          Manajemen Keuangan Terintegrasi
        </p>
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full p-2 shadow-lg border-4 border-white">
          <img src={Logo} alt="Kantong Pintar Logo" className="w-16 h-16 object-contain" />
        </div>
      </div>
    </div>
  );

  // Desktop logo layout
  const DesktopLogo = () => (
    <div className="hidden md:flex justify-center mb-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-full p-1.5 shadow-md">
        <div className="bg-white rounded-full p-2">
          <img src={Logo} alt="Kantong Pintar Logo" className="w-16 h-16 object-contain" />
        </div>
      </div>
    </div>
  );

  // Sidebar content
  const SidebarContent = () => (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg">
          <div className="bg-white rounded-full p-2">
            <img src={Logo} alt="Kantong Pintar Logo" className="w-16 h-16 object-contain" />
          </div>
        </div>
      </div>
      <h2 className="text-4xl font-bold mb-4 text-center">Kelola Keuangan dengan Lebih Efisien</h2>
      <p className="text-indigo-200 mb-8 text-center">
        Solusi lengkap untuk manajemen keuangan bisnis, pelacakan pengeluaran, dan analisis keuangan.
      </p>
    </div>
  );

  // Form content (login form)
  const FormContent = () => (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
      <MobileHeader />
      <div className="p-6 md:p-8 pt-16 md:pt-8">
        <DesktopLogo />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Masuk ke Akun Anda</h2>
          <p className="text-gray-600 mt-2">Kelola keuangan bisnis Anda dengan lebih efisien</p>
        </div>
        <LoginForm onSubmit={handleSubmit} />
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Belum punya akun?{" "}
            <a href="/Register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              Daftar sekarang
            </a>
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-4">Atau masuk dengan</p>
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  );

  // Render LoginPage
  return <LoginLayout sidebar={<SidebarContent />} form={<FormContent />} />;
}