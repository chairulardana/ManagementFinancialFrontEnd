import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert2

// Fungsi untuk decode token JWT
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = window.atob(base64);
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export function UserAvatar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({ 
    name: "User", 
    email: "user@example.com",
    initials: "U"
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ambil dan proses token saat komponen dimount
  useEffect(() => {
    const token = sessionStorage.getItem('token') || 
                 sessionStorage.getItem('Access_Google');
    
    if (token) {
      const decoded = parseJwt(token);
      
      if (decoded) {
        // Ambil data dari berbagai format klaim
        const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
                    decoded.name ||
                    decoded.sub ||
                    "User";
        
        const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
                     decoded.email ||
                     "user@example.com";
        
        // Generate inisial dari nama
        const getInitials = (name: string) => {
          const names = name.split(' ');
          let initials = names[0].substring(0, 1).toUpperCase();
          if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
          }
          return initials;
        };
        
        setUserData({
          name,
          email,
          initials: getInitials(name)
        });
      }
    }
  }, []);

  // Handle klik di luar dropdown untuk menutup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Tampilkan konfirmasi logout
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus semua data dari sessionStorage
        sessionStorage.clear();
        
        // Tampilkan notifikasi logout berhasil
        Swal.fire({
          title: 'Logout Berhasil!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Redirect ke halaman login setelah notifikasi
          navigate({ to: "/Login" });
        });
      }
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Avatar 
        className="cursor-pointer bg-gray-200 border-2 border-white shadow-md h-10 w-10 flex items-center justify-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-gray-700 font-medium">
          {userData.initials}
        </span>
      </Avatar>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userData.name}
            </p>
            <p className="text-xs text-gray-500 truncate mt-1">
              {userData.email}
            </p>
          </div>
          
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar</span>
          </Button>
        </div>
      )}
    </div>
  );
}