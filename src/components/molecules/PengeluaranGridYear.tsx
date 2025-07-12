import { useState, useEffect } from "react";
import { useGetApiPengeluaranTotalPengeluaranPerTahun } from "@/kubb";
import { YearPicker } from "./YearPicker";

export function PengeluaranPerTahun() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0);

  const { data: response, error, isLoading } = useGetApiPengeluaranTotalPengeluaranPerTahun(
    { tahun: selectedYear } 
  );

  useEffect(() => {
    
    // Akses data melalui response.data
    if (response && response.data && response.data.totalPengeluaran !== undefined) {
      setTotalPengeluaran(response.data.totalPengeluaran);
    } else {
      setTotalPengeluaran(0);
    }
  }, [response]);

  // Handle year change in YearPicker
  const handleYearChange = (year: number | null) => {
    if (year) setSelectedYear(year);
  };

  if (isLoading) return (
    <div className="p-4 flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-red-600 text-center">
      ⚠️ Gagal memuat data: {error.message}
    </div>
  );

  return (
    <div className="w-full max-w-md p-3 md:p-4 mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
        {/* Header with YearPicker on top right */}
        <div className="px-4 pt-4 pb-2 border-b border-blue-50 relative">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-blue-800">Pengeluaran Per Tahun</h2>
              <p className="text-lg text-gray-500 mt-1">
                {selectedYear}
              </p>
            </div>

            {/* YearPicker on the right */}
            <div className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 sm:ml-0">
              <YearPicker 
                value={selectedYear}
                onChange={handleYearChange}
              />
            </div>
          </div>
        </div>

        {/* Border box for Total Pengeluaran */}
        <div className="p-4 md:p-5">
          <div className="border-2 border-blue-300 rounded-lg p-4 text-center bg-blue-50">
            <h3 className="text-sm font-medium text-blue-600 mb-2">Total Pengeluaran</h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-800">
              Rp {totalPengeluaran.toLocaleString('id-ID')}
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-3 text-center text-xs text-blue-700">
            <div className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Total pengeluaran untuk tahun di atas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}