import { useGetApiTargettabungan } from "@/kubb";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TrendingUp, Gift, PiggyBank, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useDeleteApiTargettabunganResettargetIdtargettabungan } from "@/kubb";
import { usePostApiTargettabunganAutodeletetarget } from "@/kubb";
import { SetorTabunganForm } from "./SetorTabungans";
import Swal from "sweetalert2";

export function TargetTabunganList() {
  const { 
    data: response,
    isLoading, 
    isError,
    error,
    refetch
  } = useGetApiTargettabungan();
  const targets = Array.isArray(response?.data) ? response.data : [];
  
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const [imageLoadError, setImageLoadError] = useState<Record<number, boolean>>({});
  const [selectedTarget, setSelectedTarget] = useState<{ namaTarget: string } | null>(null);

  // Hook untuk auto-delete target
  const autoDeleteMutation = usePostApiTargettabunganAutodeletetarget();
  
  // Hook untuk menghapus target tabungan manual
  const deleteMutation = useDeleteApiTargettabunganResettargetIdtargettabungan();

  // Jalankan auto-delete saat komponen pertama kali dimuat
  useEffect(() => {
    const autoDeleteCompletedTargets = async () => {
      try {
        await autoDeleteMutation.mutateAsync();
        // Refresh data setelah auto-delete berhasil
        refetch();
      } catch (error) {
        console.error("Gagal melakukan auto-delete:", error);
      }
    };

    autoDeleteCompletedTargets();
  }, []); // Empty dependency array untuk menjalankan hanya sekali saat mount

  const handleImageError = (id: number) => {
    setImageLoadError(prev => ({ ...prev, [id]: true }));
  };

  const handleDelete = async (idTargetTabungan: number) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin ingin menghapus target tabungan ini?",
      text: "Data yang dihapus tidak dapat dipulihkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
      preConfirm: async () => {
        Swal.showLoading();
        try {
          await deleteMutation.mutateAsync({ idTargetTabungan });
          return true;
        } catch (error) {
          console.error("Gagal menghapus target tabungan:", error);
          return false;
        }
      },
      willClose: () => {
        if (deleteMutation.isPending) {
          deleteMutation.reset();
        }
      }
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Target tabungan berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        icon: "info",
        title: "Penghapusan dibatalkan",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-0 shadow rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4 rounded-full" />
              <Skeleton className="h-3 w-full mt-1 rounded-full" />
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="h-28 w-full rounded-lg mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full rounded-full" />
                <Skeleton className="h-3 w-4/5 rounded-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-6 w-16 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center max-w-md mx-auto">
        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="font-bold text-red-800 text-md">Gagal memuat data 😢</h3>
        <p className="text-red-600 mt-1 text-xs">
          {error?.message || "Coba refresh halaman atau cek koneksi"}
        </p>
        <button 
          className="mt-3 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-xs font-medium transition-colors"
          onClick={() => window.location.reload()}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (targets.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center max-w-md mx-auto">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <PiggyBank className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="font-bold text-blue-800 text-lg">Belum ada target tabungan</h3>
        <p className="text-blue-600 mt-1 text-sm">
          Buat target tabungan baru untuk memulai perencanaan keuangan
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {targets.map((target) => {
          const nominalTerkumpul = target.nominalTerkumpul || 0;
          const nominalTarget = target.nominalTarget || 1;
          const hasError = imageLoadError[target.idTargetTabungan];
          
          const progress = Math.min(
            Math.round((nominalTerkumpul / nominalTarget) * 100),
            100
          );
          
          const isCompleted = progress >= 100;
          const statusText = isCompleted ? "Tercapai" : target.status || "Dalam Proses";

          // Hitung hari tersisa jika ada tanggal target
          let daysLeft = null;
          if (target.tanggalTarget) {
            const targetDate = new Date(target.tanggalTarget);
            const today = new Date();
            const diffTime = targetDate.getTime() - today.getTime();
            daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }

          return (
            <Card 
              key={target.idTargetTabungan} 
              className="flex flex-col h-full border-0 shadow rounded-xl overflow-hidden hover:shadow-md transition-all"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start space-x-2">
                  <div className={`p-1.5 rounded-md ${isCompleted ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {isCompleted 
                      ? <Gift className="h-4 w-4 text-green-600" /> 
                      : <TrendingUp className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold line-clamp-1">{target.namaTarget}</CardTitle>
                    {target.deskripsi && (
                      <CardDescription className="line-clamp-1 text-xs mt-0.5">{target.deskripsi}</CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow pb-2">
                {/* Gambar dengan ukuran asli */}
                {target.gambar && !hasError ? (
                  <div className="mb-3 flex justify-center">
                    <div className="rounded-lg overflow-hidden max-w-full border flex items-center justify-center">
                      <img 
                        src={`${BaseUrl}${target.gambar}`} 
                        alt={target.namaTarget} 
                        className="max-h-32 w-auto object-scale-down"
                        onError={() => handleImageError(target.idTargetTabungan)}
                        style={{ 
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-gray-200 rounded-lg w-full h-32 mb-3 flex items-center justify-center">
                    <div className="text-center p-2">
                      <PiggyBank className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-gray-500 text-xs">
                        {hasError ? "Gagal memuat" : "No image"}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  {/* Progress Section */}
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-medium text-gray-700">
                        {progress}%
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        {isCompleted ? 'Selesai' : daysLeft !== null ? `${daysLeft} hari` : '-'}
                      </span>
                    </div>
                    <Progress 
                      value={progress} 
                      className={`h-2 rounded-full ${isCompleted ? 'bg-green-200' : 'bg-blue-200'}`}
                      indicatorClassName={isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}
                    />
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="font-medium text-gray-900">
                        Rp{nominalTerkumpul.toLocaleString('id-ID')}
                      </span>
                      <span className="font-medium text-gray-900">
                        Rp{nominalTarget.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Timeline Section */}
                  <div className="bg-gray-50 rounded-lg p-1.5">
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      <div className="bg-white p-1 rounded">
                        <p className="text-[10px] text-gray-500">Mulai</p>
                        <p className="font-medium">
                          {target.tanggalMulai ? format(new Date(target.tanggalMulai), 'dd MMM yy', { locale: id }) : '-'}
                        </p>
                      </div>
                      <div className="bg-white p-1 rounded">
                        <p className="text-[10px] text-gray-500">Target</p>
                        <p className="font-medium">
                          {target.tanggalTarget ? format(new Date(target.tanggalTarget), 'dd MMM yy', { locale: id }) : '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 px-3 pb-2 flex justify-between items-center">
                <div className={`px-2 py-1 rounded-full text-[10px] font-medium text-center ${
                  isCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800'
                }`}>
                  {statusText}
                </div>
                
                <div className="flex space-x-1">
                  {/* Tampilkan tombol Setor hanya jika status belum Tercapai */}
                  {!isCompleted && (
                    <button
                      onClick={() => setSelectedTarget({ namaTarget: target.namaTarget })}
                      className="text-gray-500 hover:text-green-600 p-1"
                      title="Setor tabungan"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                  
                  {/* Tombol Hapus di footer */}
                  <button
                    onClick={() => handleDelete(target.idTargetTabungan)}
                    className="text-gray-500 hover:text-red-500 p-1"
                    disabled={deleteMutation.isPending}
                    title="Hapus target"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {/* Render SetorTabunganForm sebagai modal */}
      {selectedTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <SetorTabunganForm 
            onClose={() => setSelectedTarget(null)} 
            initialNamaTarget={selectedTarget.namaTarget}
          />
        </div>
      )}
    </div>
  );
}