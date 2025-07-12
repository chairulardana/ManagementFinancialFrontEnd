import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Input } from "../atoms/Input";
import {
  getApiPemasukanTotalPemasukanPerTahunQueryKey,
  getApiPengeluaranTotalPengeluaranBulanQueryKey,
  usePostApiPengeluaran,
} from "@/kubb";
import { useGetApiKategoripengeluaran } from "@/kubb";
import { usePostApiKategoripengeluaran } from "@/kubb";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteApiKategoripengeluaranId } from "@/kubb";
import { TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

interface FormPengeluaranProps {
  onClose?: () => void;
}

interface Kategori {
  id: number;
  namaKategori: string;
  idUser: number | null;
}

export function FormPengeluaran({ onClose }: FormPengeluaranProps) {
  const queryClient = useQueryClient();
  const [nominal, setNominal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [newKategori, setNewKategori] = useState("");
  const [kategoriData, setKategoriData] = useState<Kategori[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newKategoriError, setNewKategoriError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const nominalInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus pada input nominal
  useEffect(() => {
    if (nominalInputRef.current) {
      nominalInputRef.current.focus();
    }
  }, []);

  const { data: response, isSuccess, refetch } = useGetApiKategoripengeluaran();

  useEffect(() => {
    if (isSuccess && response?.data) {
      setKategoriData(response.data as Kategori[]);
    }
  }, [isSuccess, response]);

  const lowerCaseKategoriNames = useMemo(() => {
    return kategoriData.map(k => k.namaKategori.toLowerCase());
  }, [kategoriData]);

  useEffect(() => {
    if (showNewCategoryInput && newKategori.trim()) {
      const inputLower = newKategori.trim().toLowerCase();
      const isDuplicate = lowerCaseKategoriNames.includes(inputLower);
      
      if (isDuplicate) {
        setNewKategoriError("Nama kategori sudah tersedia");
      } else {
        setNewKategoriError("");
      }
    } else {
      setNewKategoriError("");
    }
  }, [newKategori, showNewCategoryInput, lowerCaseKategoriNames]);

  const formatNominal = (value: string): string => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue === '') return '';
    
    const numericValue = parseInt(cleanValue, 10);
    return isNaN(numericValue) ? '' : numericValue.toLocaleString('id-ID');
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNominal(formatNominal(inputValue));
  };

  const { mutate: createPengeluaran } = usePostApiPengeluaran({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [ 
            getApiPengeluaranTotalPengeluaranBulanQueryKey(),
            getApiPemasukanTotalPemasukanPerTahunQueryKey(),
          ]
        });

        Swal.fire({
          title: 'Berhasil!',
          text: 'Pengeluaran berhasil dicatat',
          icon: 'success',
          confirmButtonColor: '#10B981',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
        });

        setNominal("");
        setDeskripsi("");
        setSelectedKategori("");
        setNewKategori("");
        setShowNewCategoryInput(false);
        setNewKategoriError("");
        setIsSubmitting(false);
        
        if (onClose) {
          setTimeout(onClose, 2000);
        }
      },
      onError: (error) => {
        setIsSubmitting(false);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Gagal mencatat pengeluaran',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          confirmButtonText: 'Coba Lagi',
        });
      },
    },
  });

  const { mutate: createKategori } = usePostApiKategoripengeluaran({
    mutation: {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        setIsSubmitting(false);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Gagal membuat kategori baru',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          confirmButtonText: 'Coba Lagi',
        });
      },
    },
  });

  const { mutate: deleteKategori } = useDeleteApiKategoripengeluaranId({
    mutation: {
      onSuccess: () => {
        refetch();
        setIsDeleting(null);
        Swal.fire({
          title: 'Dihapus!',
          text: 'Kategori berhasil dihapus',
          icon: 'success',
          confirmButtonColor: '#10B981',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      onError: (error) => {
        setIsDeleting(null);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Gagal menghapus kategori',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          confirmButtonText: 'Mengerti',
        });
      },
    },
  });

  const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedKategori(value);

    if (value === "new_category") {
      setShowNewCategoryInput(true);
    } else {
      setShowNewCategoryInput(false);
      setNewKategori("");
      setNewKategoriError("");
    }
  };

  const handleDeleteCategory = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    
    const kategori = kategoriData.find(k => k.id === id);
    if (!kategori) return;
    
    if (kategori.idUser === null) {
      Swal.fire({
        title: 'Tidak Dapat Dihapus',
        text: 'Kategori default tidak bisa dihapus',
        icon: 'warning',
        confirmButtonColor: '#3B82F6',
        confirmButtonText: 'Mengerti',
      });
      return;
    }
    
    const result = await Swal.fire({
      title: `Hapus Kategori?`,
      text: `Anda yakin ingin menghapus kategori "${kategori.namaKategori}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    });
    
    if (result.isConfirmed) {
      setIsDeleting(id);
      deleteKategori({ id });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert formatted nominal back to number
    const nominalValue = nominal ? parseInt(nominal.replace(/\./g, ''), 10) : 0;

    // Validasi input
    if (!nominal || !deskripsi.trim()) {
      Swal.fire({
        title: 'Data Tidak Lengkap',
        text: 'Harap isi nominal dan deskripsi pengeluaran',
        icon: 'warning',
        confirmButtonColor: '#3B82F6',
        confirmButtonText: 'Mengerti',
      });
      setIsSubmitting(false);
      return;
    }

    if (isNaN(nominalValue) || nominalValue <= 0) {
      Swal.fire({
        title: 'Nominal Tidak Valid',
        text: 'Nominal harus berupa angka positif',
        icon: 'error',
        confirmButtonColor: '#EF4444',
        confirmButtonText: 'Perbaiki',
      });
      setIsSubmitting(false);
      return;
    }

    // Tentukan kategori yang akan digunakan
    const kategoriToUse = showNewCategoryInput ? newKategori : selectedKategori;

    if (!kategoriToUse) {
      Swal.fire({
        title: 'Kategori Belum Dipilih',
        text: 'Silakan pilih atau buat kategori baru',
        icon: 'warning',
        confirmButtonColor: '#3B82F6',
        confirmButtonText: 'Mengerti',
      });
      setIsSubmitting(false);
      return;
    }

    // Jika membuat kategori baru
    if (showNewCategoryInput) {
      if (!newKategori.trim()) {
        Swal.fire({
          title: 'Kategori Kosong',
          text: 'Harap isi nama kategori baru',
          icon: 'warning',
          confirmButtonColor: '#3B82F6',
          confirmButtonText: 'Mengerti',
        });
        setIsSubmitting(false);
        return;
      }
      
      // Check for duplicate
      const inputLower = newKategori.trim().toLowerCase();
      const isDuplicate = lowerCaseKategoriNames.includes(inputLower);
      
      if (isDuplicate) {
        Swal.fire({
          title: 'Kategori Sudah Ada',
          text: 'Nama kategori sudah tersedia. Silahkan pilih dari daftar.',
          icon: 'error',
          confirmButtonColor: '#EF4444',
          confirmButtonText: 'Perbaiki',
        });
        setIsSubmitting(false);
        return;
      }
      
      // Buat kategori baru terlebih dahulu
      createKategori({ 
        data: { namaKategori: newKategori } 
      }, {
        onSuccess: () => {
          // Setelah kategori berhasil dibuat, buat pengeluaran
          createPengeluaran({
            data: {
              nominal: nominalValue,
              deskripsi: deskripsi.trim(),
              namaKategori: newKategori,
            },
          });
        }
      });
    } else {
      // Jika menggunakan kategori yang sudah ada
      createPengeluaran({
        data: {
          nominal: nominalValue,
          deskripsi: deskripsi.trim(),
          namaKategori: selectedKategori,
        },
      });
    }
  };

  return (
    <div className="w-full p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold text-center mb-3 md:mb-4 text-gray-800">
        Tambah Pengeluaran
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nominal (Rp)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              Rp
            </span>
            <Input
              ref={nominalInputRef}
              type="text"
              name="nominal"
              value={nominal}
              onChange={handleNominalChange}
              placeholder="Contoh: 100.000"
              className="pl-10 w-full text-base py-2 md:py-2.5"
              disabled={isSubmitting}
              inputMode="numeric"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <Input
            type="text"
            name="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi pengeluaran"
            className="w-full py-2 md:py-2.5"
            disabled={isSubmitting}
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {deskripsi.length}/100 karakter
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          {showNewCategoryInput ? (
            <div className="space-y-2">
              <div>
                <Input
                  type="text"
                  value={newKategori}
                  onChange={(e) => setNewKategori(e.target.value)}
                  placeholder="Masukkan kategori baru"
                  className="w-full py-2 md:py-2.5"
                  autoFocus
                  disabled={isSubmitting}
                  maxLength={50}
                />
                {newKategoriError && (
                  <p className="text-red-500 text-sm mt-1">{newKategoriError}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowNewCategoryInput(false);
                  setSelectedKategori("");
                  setNewKategori("");
                  setNewKategoriError("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                disabled={isSubmitting}
              >
                ← Kembali ke pilihan kategori
              </button>
            </div>
          ) : (
            <div className="relative">
              <select
                value={selectedKategori}
                onChange={handleKategoriChange}
                className="w-full p-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white disabled:bg-gray-100"
                disabled={isSubmitting}
              >
                <option value="">Pilih Kategori</option>
                {kategoriData && kategoriData.length > 0 ? (
                  kategoriData.map((kategori: Kategori) => (
                    <option 
                      key={kategori.id} 
                      value={kategori.namaKategori}
                      className="flex justify-between items-center"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="truncate">{kategori.namaKategori}</span>
                        {kategori.idUser !== null && (
                          <button 
                            type="button"
                            onClick={(e) => handleDeleteCategory(e, kategori.id)}
                            className="ml-2 text-red-500 hover:text-red-700 flex items-center"
                            disabled={isDeleting === kategori.id}
                          >
                            {isDeleting === kategori.id ? (
                              <svg 
                                className="animate-spin h-4 w-4 text-red-500" 
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
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </option>
                  ))
                ) : (
                  <option value="">Tidak ada kategori tersedia</option>
                )}

                <option value="new_category">+ Tambah Kategori Baru</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 md:gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors disabled:opacity-70"
              disabled={isSubmitting}
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
              "Simpan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}