import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../atoms/Input';
import { 
  usePostApiPemasukan,
  getApiPemasukanTotalPemasukanBulanQueryKey,
  getApiPemasukanTotalPemasukanPerTahunQueryKey
} from '@/kubb';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

interface FormPemasukanProps {
  onSuccess?: () => void;
}

const FormPemasukan: React.FC<FormPemasukanProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const [jumlah, setJumlah] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jumlahInputRef = useRef<HTMLInputElement>(null);

  const { mutate: postPemasukan } = usePostApiPemasukan({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ 
          queryKey: getApiPemasukanTotalPemasukanPerTahunQueryKey() 
        });
        queryClient.invalidateQueries({ 
          queryKey: getApiPemasukanTotalPemasukanBulanQueryKey() 
        });
        
        setJumlah('');
        setDeskripsi('');
        setIsSubmitting(false);
        
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pemasukan berhasil ditambahkan',
          icon: 'success',
          confirmButtonColor: '#10B981',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
        });

        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error) => {
        setIsSubmitting(false);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Terjadi kesalahan saat mengirimkan data',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          confirmButtonText: 'Coba Lagi',
        });
      },
    },
  });

  // Auto-focus pada input jumlah saat komponen dimount
  useEffect(() => {
    if (jumlahInputRef.current) {
      jumlahInputRef.current.focus();
    }
  }, []);

  const formatNominal = (value: string): string => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue === '') return '';
    
    const numericValue = parseInt(cleanValue, 10);
    return isNaN(numericValue) ? '' : numericValue.toLocaleString('id-ID');
  };

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setJumlah(formatNominal(inputValue));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi input
    if (!jumlah || !deskripsi.trim()) {
      setIsSubmitting(false);
      Swal.fire({
        title: 'Data Tidak Lengkap',
        text: 'Harap isi jumlah dan deskripsi pemasukan',
        icon: 'warning',
        confirmButtonColor: '#3B82F6',
        confirmButtonText: 'Mengerti',
      });
      return;
    }

    const jumlahValue = parseInt(jumlah.replace(/\./g, ''), 10);
    
    if (isNaN(jumlahValue) || jumlahValue <= 0) {
      setIsSubmitting(false);
      Swal.fire({
        title: 'Jumlah Tidak Valid',
        text: 'Jumlah harus berupa angka positif',
        icon: 'error',
        confirmButtonColor: '#EF4444',
        confirmButtonText: 'Perbaiki',
      });
      return;
    }

    const payload = {
      tanggal: new Date().toISOString(),
      deskripsi: deskripsi.trim(),
      jumlah: jumlahValue,
    };

    postPemasukan({ data: payload });
  };

  return (
    <div className="w-full p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold text-center mb-3 md:mb-4 text-gray-800">
        Form Pemasukan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah (Rp)
          </label>
          <div className="relative">
            <Input
              ref={jumlahInputRef}
              type="text"
              name="jumlah"
              value={jumlah}
              onChange={handleJumlahChange}
              placeholder="Contoh: 100.000"
              className="pl-3 pr-10 w-full text-base py-2 md:py-2.5"
              disabled={isSubmitting}
              inputMode="numeric"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
              IDR
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi Pemasukan
          </label>
          <Input
            type="text"
            name="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Contoh: Gaji bulan Januari"
            className="w-full py-2 md:py-2.5"
            disabled={isSubmitting}
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {deskripsi.length}/100 karakter
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg 
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Menyimpan...
            </div>
          ) : (
            "Simpan Pemasukan"
          )}
        </button>
      </form>
    </div>
  );
};

export default FormPemasukan;