import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useGetApiPengeluaranChartPerBulan } from "@/kubb";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPengeluaranPerBulan = () => {
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  
  const { data: response, isLoading, isError } = useGetApiPengeluaranChartPerBulan({ 
    tahun: currentYear 
  });
  
  const [chartData, setChartData] = useState<any>(null);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const categoryColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
    '#6A4C93', '#F15BB5', '#00BBF9', '#00F5D4',
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C'
  ];

  useEffect(() => {
    if (response && response.data && Array.isArray(response.data)) {
      const monthData = response.data.find(item => item.bulan === selectedMonth);
      
      if (!monthData || !monthData.kategoriPengeluaran || monthData.kategoriPengeluaran.length === 0) {
        setChartData({
          labels: ['Tidak ada data'],
          datasets: [{
            data: [100],
            backgroundColor: ['#e0e0e0'],
            borderWidth: 1,
          }],
        });
        setCategoryList([]);
        return;
      }
      
      const categories = monthData.kategoriPengeluaran;
      const total = monthData.totalPengeluaran;
      
      setChartData({
        labels: categories.map((k: any) => k.namaKategori),
        datasets: [{
          data: categories.map((k: any) => k.totalPengeluaranKategori),
          backgroundColor: categoryColors,
          borderWidth: 1,
        }],
      });
      
      // Sort categories by highest spending first (descending order)
      const sortedCategories = [...categories]
        .sort((a, b) => b.totalPengeluaranKategori - a.totalPengeluaranKategori)
        .map((k: any, index: number) => ({
          ...k,
          color: categoryColors[index % categoryColors.length],
          persentasePengeluaran: total > 0 
            ? (k.totalPengeluaranKategori / total) * 100 
            : 0
        }));
      
      setCategoryList(sortedCategories);
    }
  }, [response, selectedMonth, currentYear]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value));
  };

  const getTotalForMonth = () => {
    if (!response || !response.data || !Array.isArray(response.data)) return 0;
    
    const monthData = response.data.find(item  => item.bulan === selectedMonth);
    return monthData ? monthData.totalPengeluaran : 0;
  };

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
        Distribusi Pengeluaran Per Kategori
      </h2>
      
      {/* Responsive dropdowns */}
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-500 mb-1 sm:hidden">Bulan:</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="w-full p-2 border rounded-md"
            disabled={isLoading}
          >
            {monthNames.map((name, index) => (
              <option key={index} value={index + 1}>
                {name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm text-gray-500 mb-1 sm:hidden">Tahun:</label>
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="w-full p-2 border rounded-md"
            disabled={isLoading}
          >
            {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Chart Section - Responsive height */}
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
                        const label = context.label || '';
                        const value = context.raw as number;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: Rp${value.toLocaleString('id-ID')} (${percentage}%)`;
                      }
                    }
                  }
                },
                maintainAspectRatio: false
              }}
            />
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xs sm:text-sm font-semibold">Total</p>
            <p className="text-base sm:text-lg font-bold">
              Rp{getTotalForMonth().toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-48 sm:h-64 flex items-center justify-center mb-4 sm:mb-6">
          <p className="text-gray-500">Tidak ada data pengeluaran</p>
        </div>
      )}
      
      {/* Category List Section - Sorted by highest spending first */}
      <div className="mt-3 sm:mt-4">
        <h3 className="text-md font-semibold mb-2 sm:mb-3">Detail Kategori</h3>
        
        {isLoading ? (
          <div className="space-y-2 sm:space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-200 mr-2 sm:mr-3"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-24"></div>
                </div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
              </div>
            ))}
          </div>
        ) : categoryList.length > 0 ? (
          <div className="space-y-3 sm:space-y-4 max-h-60 overflow-y-auto pr-2 py-1">
            {categoryList.map((kategori, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 flex-shrink-0" 
                    style={{ backgroundColor: kategori.color }}
                  ></div>
                  <span className="font-medium text-sm sm:text-base truncate">
                    {kategori.namaKategori}
                  </span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="font-semibold text-gray-700 text-sm sm:text-base">
                    {kategori.persentasePengeluaran.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">
                    Rp{kategori.totalPengeluaranKategori.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-3 sm:py-4 text-sm sm:text-base">
            Tidak ada data pengeluaran untuk bulan {monthNames[selectedMonth - 1]}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChartPengeluaranPerBulan;