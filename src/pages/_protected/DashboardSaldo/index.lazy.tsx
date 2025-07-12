import SaldoComponent from '@/components/molecules/ComptSaldo';
import { createLazyFileRoute } from '@tanstack/react-router';
import { PengeluaranBulanIni } from '@/components/molecules/PengeluaransGrid';
import { PemasukanBulanIni } from '@/components/molecules/PemasukanGrid';
import { PemasukanPerTahun } from '@/components/molecules/PemasukanGridYear';
import { PengeluaranPerTahun } from '@/components/molecules/PengeluaranGridYear';
import SaranGenZAngry from '@/components/molecules/SmartSaran';
import PemasukanModal from '@/components/organisms/Pemasukan';
import { PengeluaranModal } from '@/components/organisms/Pengeluaran';
import ChartsModal from '@/components/molecules/ChartsIconsComponents';
import TargetTabungan from '@/components/molecules/TargetTabungans';
import FooterComponent from '@/components/molecules/Footer';

import DetailPengeluaran from '@/components/molecules/LogoDataPengeluaran';
import DetailPemasukan from '@/components/molecules/LogoDataPemasukan';
import BandingDetail from '@/components/molecules/Bandings';

export const Route = createLazyFileRoute('/_protected/DashboardSaldo/')({
  component: DashboardSaldo,
});

function DashboardSaldo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-4 md:mb-8 text-center">
          <h1 className="text-xl md:text-4xl font-bold text-blue-900 mb-1 md:mb-2">
            Halo Sahabat Boros
          </h1>
          <h4 className="text-blue-600 text-xs md:text-base max-w-2xl mx-auto px-2">
            Gaya hidup kekinian itu bukan cuma pamer barang, tapi juga punya cadangan keuangan.
          </h4>
        </div>

        {/* Bagian yang diperbaiki: Saldo dan Saran */}
        <div className="relative mb-4 md:mb-6">
          {/* Dekorasi latar belakang */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-lg">
              <div className="flex justify-between">
                <div className="w-16 h-16 rounded-full bg-blue-200 opacity-30 blur-xl"></div>
                <div className="w-20 h-20 rounded-full bg-indigo-200 opacity-30 blur-xl"></div>
              </div>
            </div>
          </div>
          
          {/* Grid untuk saldo dan saran */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {/* Saldo Component dengan aksen */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-blue-100 transform transition-transform hover:scale-[1.01]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-2xl"></div>
              <div className="relative">
                <div className="absolute -top-6 -right-4"></div>
                <SaldoComponent />
              </div>
            </div>
            
            {/* Saran Component dengan animasi */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-4 md:p-6 border border-indigo-100 transform transition-transform hover:scale-[1.01]">
              <div className="absolute top-0 right-0 w-6 h-6 bg-indigo-500 rounded-bl-full"></div>
              <SaranGenZAngry />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-blue-300 rounded-tr-full opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Responsive Grid untuk data keuangan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <PengeluaranBulanIni />
          <PemasukanBulanIni />
          <PengeluaranPerTahun />
          <PemasukanPerTahun />
        </div>

        {/* Grid untuk komponen Modal dan Chart */}
     <div className="bg-white rounded-lg shadow-lg p-6">
  <div className="flex justify-between items-center mb-6">
  </div>
  <div className="text-center mb-4">
  </div>
  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-4 md:grid-cols-2">
    <div className="bg-white p-4 rounded-lg shadow-lg text-center mb-4 md:mb-0">
      <PemasukanModal />
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center mb-4 md:mb-0">
      <PengeluaranModal />
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center mb-4 md:mb-0">
      <ChartsModal />
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <TargetTabungan />
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <DetailPengeluaran />
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <DetailPemasukan />
    </div>
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <BandingDetail />
    </div>
  </div>
</div>

<div><FooterComponent/></div>

      </div>
    </div>
  );
}

export default DashboardSaldo;
