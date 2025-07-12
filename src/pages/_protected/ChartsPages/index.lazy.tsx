import { createLazyFileRoute } from '@tanstack/react-router';
import ChartPengeluaranPerBulan from '@/components/molecules/ChartPerbulan';
import ChartPengeluaranPerTahun from '@/components/molecules/ChartPertahun';
import { Link } from '@tanstack/react-router'; // Import Link from the router library

export const Route = createLazyFileRoute('/_protected/ChartsPages/')({
  component: ChartsPage,
});

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Analisis Pengeluaran
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualisasi data pengeluaran Anda dalam bentuk grafik interaktif untuk membantu analisis keuangan
          </p>
        </div>

        {/* Grid Layout for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Expense Chart Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all hover:shadow-xl">
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Pengeluaran Bulanan
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Distribusi pengeluaran berdasarkan kategori per bulan
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <ChartPengeluaranPerBulan />
            </div>
          </div>

          {/* Yearly Expense Chart Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all hover:shadow-xl relative">
            {/* Back Button */}
            <div className="absolute top-4 right-4">
              <Link to="/DashboardSaldo">
                <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-200">
                  Kembali
                </button>
              </Link>
            </div>

            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Pengeluaran Tahunan
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Tren pengeluaran tahunan dan distribusi per kategori
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <ChartPengeluaranPerTahun />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto border border-gray-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <div className="bg-blue-100 rounded-full p-4 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tips Membaca Grafik</h3>
              <p className="text-gray-600">
                Gunakan grafik ini untuk menganalisis pola pengeluaran Anda. Grafik bulanan membantu Anda melihat distribusi pengeluaran per kategori dalam satu bulan tertentu, sedangkan grafik tahunan menunjukkan tren pengeluaran Anda dari tahun ke tahun. 
                Identifikasi kategori dengan pengeluaran terbesar untuk mengoptimalkan anggaran Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
