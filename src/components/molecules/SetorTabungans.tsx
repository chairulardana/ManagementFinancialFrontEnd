import { useState, useEffect } from "react";
import { usePostApiSetoranSetor } from "@/kubb";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getApiTargettabunganQueryKey } from "@/kubb";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

interface SetorTabunganFormProps {
  onClose: () => void;
  initialNamaTarget?: string;
}

export function SetorTabunganForm({ onClose, initialNamaTarget }: SetorTabunganFormProps) {
  const [namaTarget, setNamaTarget] = useState(initialNamaTarget || "");
  const [nominalSetor, setNominalSetor] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutateAsync } = usePostApiSetoranSetor();
  const queryClient = useQueryClient(); // Initialize useQueryClient

  useEffect(() => {
    if (initialNamaTarget) {
      setNamaTarget(initialNamaTarget);
    }
  }, [initialNamaTarget]);

  const formatCurrency = (value: string) => {
    const num = value.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/\./g, "");
    setNominalSetor(formatCurrency(numericValue));
  };

  const getNumericValue = () => {
    return parseInt(nominalSetor.replace(/\./g, "") || "", 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericNominal = getNumericValue();

    if (!namaTarget.trim()) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Nama Target Kosong', 
        text: 'Nama target tabungan harus diisi',
        confirmButtonColor: '#4f46e5',
        background: '#f9fafb',
        color: '#1f2937'
      });
      return;
    }
    if (numericNominal <= 0) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Nominal Tidak Valid', 
        text: 'Nominal setoran harus lebih dari 0',
        confirmButtonColor: '#4f46e5',
        background: '#f9fafb',
        color: '#1f2937'
      });
      return;
    }

    Swal.fire({
      title: 'Konfirmasi Setoran',
      html: `<div class="text-left">
        <p class="mb-2">Anda akan menyetor sebesar:</p>
        <p class="text-2xl font-bold text-indigo-600 mb-3">Rp${numericNominal.toLocaleString('id-ID')}</p>
        <p>untuk target tabungan <b class="text-gray-800">${namaTarget}</b></p>
      </div>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Setor Sekarang',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      background: '#f9fafb',
      color: '#1f2937',
      customClass: {
        popup: 'rounded-lg shadow-xl',
        title: 'text-left text-gray-800 font-semibold',
        htmlContainer: 'text-left'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          Swal.fire({ 
            title: 'Sedang memproses...', 
            text: 'Mohon tunggu sebentar', 
            allowOutsideClick: false, 
            didOpen: () => { Swal.showLoading(); },
            background: '#f9fafb'
          });

          await mutateAsync({ 
            params: { namaTarget }, 
            data: { nominalSetor: numericNominal } 
          });

          // Invalidate the cache after mutation to update the data
          queryClient.invalidateQueries({
            queryKey: getApiTargettabunganQueryKey() // Call invalidateQueries with the key returned by getApiTargettabunganQueryKey
          });

          Swal.close();
          await Swal.fire({
            icon: 'success',
            title: 'Setoran Berhasil!',
            html: `<div class="text-center">
              <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p class="mb-1">Setoran untuk <b>${namaTarget}</b> berhasil!</p>
              <p class="text-xl font-bold text-green-600">Rp${numericNominal.toLocaleString('id-ID')}</p>
            </div>`,
            confirmButtonColor: '#4f46e5',
            background: '#f9fafb',
            customClass: {
              popup: 'rounded-lg shadow-xl'
            }
          });

          setNominalSetor("");
          onClose();

        } catch (error: any) {
          let errorMessage = "Terjadi kesalahan saat menyetor";
          
          if (error?.response?.data) {
            errorMessage = error.response.data.Message || 
                            error.response.data.message || 
                            JSON.stringify(error.response.data);
          } else if (error?.message) {
            errorMessage = error.message;
          }

          Swal.fire({ 
            icon: 'error', 
            title: 'Setoran Gagal', 
            html: `<div class="text-left">
              <p class="mb-2">${errorMessage}</p>
              <p class="text-sm text-gray-500 mt-2">Silakan coba lagi atau hubungi administrator</p>
            </div>`,
            confirmButtonColor: '#4f46e5',
            background: '#f9fafb',
            color: '#1f2937',
            customClass: {
              popup: 'rounded-lg shadow-xl'
            }
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg max-w-md w-full mx-4 sm:mx-auto relative border border-gray-100">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200 text-xl font-bold hover:scale-105"
        aria-label="Tutup Form"
      >
        &times;
      </button>

      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Setoran Tabungan</h2>
        <div className="w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="namaTarget" className="text-gray-700 font-medium">
              Target Tabungan
            </Label>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              Wajib
            </span>
          </div>
          <Input
            id="namaTarget"
            type="text"
            value={namaTarget}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-gray-800"
            disabled
          />
          {initialNamaTarget && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Menyetor untuk target yang dipilih
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="nominalSetor" className="text-gray-700 font-medium">
              Jumlah Setoran
            </Label>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              Wajib
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">Rp</span>
            <Input
              id="nominalSetor"
              type="text"
              value={nominalSetor}
              onChange={handleNominalChange}
              placeholder="0"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 text-lg"
              disabled={loading}
              inputMode="numeric"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            Masukkan nominal tanpa titik atau koma
          </p>
        </div>

        <Button
          type="submit"
          className={`w-full py-3 px-4 rounded-xl font-medium text-lg transition-all duration-200 shadow-md ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Setor Sekarang
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
