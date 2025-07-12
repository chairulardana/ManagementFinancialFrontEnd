import { useState } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { usePostApiAuthRegister } from "@/kubb";
import { LoginLayout } from "@/components/templates/LoginLayout";
import Logo from "../../assets/Logo.svg";
import Swal from "sweetalert2"; // Import SweetAlert2

export const Route = createLazyFileRoute("/Register/")({
  component: RegisterPage,
});

function RegisterPage() {
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const postHandler = usePostApiAuthRegister({
    mutation: {
      onSuccess(data) {
        console.log("✅ Registrasi berhasil:", data);
        Swal.fire({
          title: "Registrasi Berhasil!",
          text: "Akun Anda berhasil dibuat. Silakan masuk.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#4f46e5",
        }).then(() => {
          navigate({ to: "/Login" });
        });
      },
      onError(error) {
        console.error("❌ Registrasi gagal:", error);
        const errorMessage = error?.response?.data?.message || "Terjadi kesalahan saat registrasi. Silakan coba lagi.";
        Swal.fire({
          title: "Registrasi Gagal",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#4f46e5",
        });
      },
    },
    client: {
      baseURL: BaseUrl,
    },
  });

  const handleSubmit = async (
    namaLengkap: string,
    email: string,
    password: string
  ) => {
    try {
      await postHandler.mutateAsync({
        data: {
          namaLengkap,
          email,
          password,
        },
      });
    } catch (err) {
      console.error("❌ Error saat registrasi:", err);
      // Error sudah ditangani oleh onError mutation handler
    }
  };

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

  const DesktopLogo = () => (
    <div className="hidden md:flex justify-center mb-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-full p-1.5 shadow-md">
        <div className="bg-white rounded-full p-2">
          <img src={Logo} alt="Kantong Pintar Logo" className="w-16 h-16 object-contain" />
        </div>
      </div>
    </div>
  );

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

  const FormContent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState<"lemah" | "sedang" | "kuat" | null>(null);
    
    const calculatePasswordStrength = (password: string) => {
      if (!password) return null;
      
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const length = password.length;
      
      let strength = 0;
      if (hasUpperCase) strength++;
      if (hasLowerCase) strength++;
      if (hasNumbers) strength++;
      if (hasSpecialChars) strength++;
      if (length >= 8) strength++;
      
      if (strength <= 2) return "lemah";
      if (strength === 3) return "sedang";
      return "kuat";
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setPasswordStrength(calculatePasswordStrength(password));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        setError("Konfirmasi password tidak cocok");
        return;
      }

      setError("");
      try {
        await handleSubmit(
          formData.get("namaLengkap") as string,
          formData.get("email") as string,
          password
        );
      } catch (err) {
        // Error handling sudah dilakukan oleh mutation onError
      }
    };

    const getPasswordStrengthColor = () => {
      switch (passwordStrength) {
        case "lemah": return "bg-red-500";
        case "sedang": return "bg-yellow-500";
        case "kuat": return "bg-green-500";
        default: return "bg-gray-300";
      }
    };

    const getPasswordStrengthLabel = () => {
      switch (passwordStrength) {
        case "lemah": return "Lemah";
        case "sedang": return "Sedang";
        case "kuat": return "Kuat";
        default: return "";
      }
    };

    return (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
        <MobileHeader />
        <div className="p-6 md:p-8 pt-16 md:pt-8">
          <DesktopLogo />
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h2>
            <p className="text-gray-600 mt-2">Mulai kelola keuangan bisnis Anda</p>
          </div>
          
          <form 
            onSubmit={handleFormSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="namaLengkap" className="block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                id="namaLengkap"
                name="namaLengkap"
                type="text"
                required
                placeholder="Contoh: ChairulArdana"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Contoh: nama@email.com"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Contoh: Password123!"
                  className="block w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
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
              
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      Kekuatan password: 
                      <span className={`ml-1 font-bold ${
                        passwordStrength === 'lemah' ? 'text-red-500' :
                        passwordStrength === 'sedang' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {getPasswordStrengthLabel()}
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                      style={{ 
                        width: passwordStrength === 'lemah' ? '33%' : 
                                passwordStrength === 'sedang' ? '66%' : '100%' 
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              <p className="mt-1 text-xs text-gray-500">
                Minimal 8 karakter dengan abjad, angka, dan kode unik
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Konfirmasi Password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Ketik ulang password"
                  className="block w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
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
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
              >
                Daftar
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{" "}
              <a 
                href="/login" 
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Masuk disini
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return <LoginLayout sidebar={<SidebarContent />} form={<FormContent />} />;
} 