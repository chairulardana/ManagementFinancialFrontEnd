import { useState } from "react";
import { useGetApiPemasukanTotalPemasukanBulan } from "@/kubb"; // Pastikan import path sudah benar
import { MonthPicker } from "./MonthPicker";

export function PemasukanBulanIni() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Ambil bulan/tahun dari selectedDate
  const month = selectedDate ? selectedDate.getMonth() + 1 : new Date().getMonth() + 1;
  const year = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();

  // Gunakan hooks untuk mengambil data pemasukan berdasarkan bulan dan tahun
  const { data: response, error, isLoading } = useGetApiPemasukanTotalPemasukanBulan({
    bulan: month,
    tahun: year
  });

  // Format tanggal helper
  const formatBulanTahun = (date: Date | null) => {
    if (!date) return "Periode saat ini";
    return date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Fungsi untuk handle perubahan bulan
  const handleMonthChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Gunakan bulanTahun dari response API atau format lokal
  const bulanTahun = response?.data.bulanTahun || formatBulanTahun(selectedDate);

  // Ambil total pemasukan dari response API
  const totalPemasukan = response?.data.totalPemasukan ?? 0;

  // Loading state
  if (isLoading) return (
    <div className="p-4 flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-red-600 text-center">
      ⚠️ Gagal memuat data: {error.message}
    </div>
  );

  return (
    <div className="w-full max-w-md p-3 md:p-4 mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100">
        <div className="px-4 pt-4 pb-2 border-b border-green-50 relative">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-green-800">Pemasukan Bulan</h2>
              <p className="text-lg text-gray-500 mt-1">
                {bulanTahun}
              </p>
            </div>

            <div className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 sm:ml-0">
              <MonthPicker 
                value={selectedDate}
                onChange={handleMonthChange}
              />
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="border-2 border-green-300 rounded-lg p-4 text-center bg-green-50">
            <h3 className="text-sm font-medium text-green-600 mb-2">Total Pemasukan</h3>
            <p className="text-2xl md:text-3xl font-bold text-green-800">
              {totalPemasukan > 0 
                ? `Rp ${totalPemasukan.toLocaleString('id-ID')}` 
                : "Rp 0"}
            </p>
          </div>

          <div className="mt-3 text-center text-xs text-green-700">
            <div className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Total pemasukan untuk periode di atas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
