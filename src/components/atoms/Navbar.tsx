import { useNavigate } from "@tanstack/react-router";
import { UserAvatar } from "./Avatar";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-cyan-600 shadow-sm py-2 px-4 md:py-3 md:px-6 flex items-center justify-between">
      {/* Bagian kiri - Logo dan Teks */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate({ to: "/DashboardSaldo" })}
      >
        <img 
          src="/Logo.svg" 
          alt="Kantong Pintar Logo"
          className="h-8 w-8 md:h-10 md:w-10" // Lebih kecil di mobile
        />
        <span className="text-lg md:text-xl font-bold text-white">
          Kantong Pintar
        </span>
      </div>
      
      {/* Bagian kanan - Avatar User */}
      <div className="flex justify-end">
        <UserAvatar />
      </div>
    </nav>
  );
}