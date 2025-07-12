import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useGetApiPengeluaranChartPerTahun } from "@/kubb"; // Update hook name as needed
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPengeluaranPerTahun = () => {
  const { data: response, isLoading, isError } = useGetApiPengeluaranChartPerTahun();
  
  const [chartData, setChartData] = useState<any>(null);
  const [yearList, setYearList] = useState<any[]>([]);
  const [totalOverallExpense, setTotalOverallExpense] = useState<number>(0);

  const categoryColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
    '#6A4C93', '#F15BB5', '#00BBF9', '#00F5D4',
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C'
  ];

  useEffect(() => {
    if (response && response.data && Array.isArray(response.data)) {
      // Calculate total overall expense
      const total = response.data.reduce((sum, item) => sum + item.totalPengeluaran, 0);
      setTotalOverallExpense(total);
      
      // Sort years ascending
      const sortedYears = [...response.data].sort((a, b) => a.tahun - b.tahun);
      
      // Prepare chart data
      setChartData({
        labels: sortedYears.map(item => item.tahun.toString()),
        datasets: [{
          data: sortedYears.map(item => item.totalPengeluaran),
          backgroundColor: sortedYears.map((_, index) => categoryColors[index % categoryColors.length]),
          borderWidth: 1,
        }],
      });
      
      // Prepare year list data
      setYearList(sortedYears.map((yearData, index) => ({
        ...yearData,
        color: categoryColors[index % categoryColors.length]
      })));
    }
  }, [response]);

  if (isError) {
    return (
      <div className="w-full p-4 mx-auto bg-red-100 rounded-lg shadow-lg text-center">
        <p className="text-red-500">Terjadi kesalahan saat memuat data grafik.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4 sm:p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-center mb-3 sm:mb-4">
        Distribusi Pengeluaran Per Tahun
      </h2>
      
      {/* Chart Section */}
      {isLoading ? (
        <div className="h-48 sm:h-64 flex items-center justify-center">
          <p className="text-gray-500">Memuat data pengeluaran...</p>
        </div>
      ) : chartData ? (
        <div className="relative mb-4 sm:mb-6">
          <div className="h-48 sm:h-64">
            <Doughnut 
              data={chartData} 
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const year = context.label || '';
                        const value = context.raw as number;
                        const percentage = Math.round((value / totalOverallExpense) * 100);
                        const yearData = yearList.find(y => y.tahun.toString() === year);
                        const topCategory = yearData?.kategoriTerbesar;
                        
                        return [
                          `Tahun: ${year}`,
                          `Total: Rp${value.toLocaleString('id-ID')}`,
                          `Persentase: ${percentage}%`,
                          topCategory ? `Kategori Terbesar: ${topCategory.namaKategori} (${topCategory.persentaseKategori.toFixed(1)}%)` : ''
                        ];
                      }
                    }
                  }
                },
                maintainAspectRatio: false
              }}
            />
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xs sm:text-sm font-semibold">Total Keseluruhan</p>
            <p className="text-base sm:text-lg font-bold">
              Rp{totalOverallExpense.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-48 sm:h-64 flex items-center justify-center mb-4 sm:mb-6">
          <p className="text-gray-500">Tidak ada data pengeluaran</p>
        </div>
      )}
      
      {/* Year List Section */}
      <div className="mt-3 sm:mt-4">
        <h3 className="text-md font-semibold mb-2 sm:mb-3">Detail Tahun</h3>
        
        {isLoading ? (
          <div className="space-y-2 sm:space-y-3">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-200 mr-2 sm:mr-3"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-24"></div>
                </div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
              </div>
            ))}
          </div>
        ) : yearList.length > 0 ? (
          <div className="space-y-3 sm:space-y-4 max-h-60 overflow-y-auto pr-2 py-1">
            {yearList.map((yearData, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start justify-between p-3 border rounded-lg">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 flex-shrink-0" 
                    style={{ backgroundColor: yearData.color }}
                  ></div>
                  <div>
                    <span className="font-medium text-sm sm:text-base">
                      Tahun {yearData.tahun}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {yearData.kategoriTerbesar && (
                        <span>Kategori Terbesar: {yearData.kategoriTerbesar.namaKategori}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-gray-700 text-sm sm:text-base">
                    Rp{yearData.totalPengeluaran.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {yearData.persentasePengeluaran.toFixed(1)}% dari total
                  </div>
                  {yearData.kategoriTerbesar && (
                    <div className="text-xs text-gray-500">
                      {yearData.kategoriTerbesar.persentaseKategori.toFixed(1)}% dari tahun
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-3 sm:py-4 text-sm sm:text-base">
            Tidak ada data pengeluaran
          </p>
        )}
      </div>
    </div>
  );
};

export default ChartPengeluaranPerTahun;