import { useQueryClient } from "@tanstack/react-query";
import { useGetApiRencanabanding, useDeleteApiRencanabandingId, getApiRencanabandingInfiniteQueryKey } from "@/kubb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal, Trash2, CalendarDays, CircleDollarSign, Folder, AlertCircle, Check, Square } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Swal from "sweetalert2";
import { useState } from "react";

const RencanaBandingList = () => {
  const queryClient = useQueryClient();
  
  const { 
    data: responseData,
    isLoading, 
    isError,
    refetch
  } = useGetApiRencanabanding();
  
  const { mutate: deleteRencana, isPending: isDeleting } = useDeleteApiRencanabandingId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getApiRencanabandingInfiniteQueryKey() });
        Swal.fire({
          title: "Berhasil!",
          text: "Rencana banding berhasil dihapus",
          icon: "success",
          confirmButtonColor: "#4f46e5",
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "Error!",
          text: error.message || "Gagal menghapus rencana banding",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  });

  const handleDelete = (id: number, name: string) => {
    Swal.fire({
      title: "Hapus Rencana?",
      html: `Apakah Anda yakin ingin menghapus rencana <strong>${name}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRencana({ id });
      }
    });
  };

  if (isLoading) return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full max-w-md">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-full overflow-hidden transition-all">
            <CardHeader className="border-b">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <div className="space-y-2 mt-4">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="p-3 rounded-lg bg-muted">
                      <Skeleton className="h-4 w-36 mb-2" />
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-3 w-24 mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  if (isError) return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Daftar Rencana Banding
          </h1>
        </div>
        <Button onClick={() => refetch()} className="gap-2">
          <span>Coba Lagi</span>
        </Button>
      </div>
      
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Gagal Memuat Data</AlertTitle>
        <AlertDescription>
          Terjadi kesalahan saat mengambil data rencana banding. Silakan coba beberapa saat lagi.
        </AlertDescription>
      </Alert>
    </div>
  );

  const rencanaList = responseData?.data?.data || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Daftar Rencana Banding
          </h1>
        </div>
      </div>

      {/* Content */}
      {rencanaList.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="py-12 text-center">
            <Folder className="h-16 w-16 mx-auto text-gray-400" strokeWidth={1} />
            <h3 className="text-xl font-semibold mt-4">Tidak Ada Rencana Banding</h3>
            <p className="text-muted-foreground mt-2">
              Belum ada rencana banding yang dibuat. Mulai buat rencana baru!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rencanaList.map((rencana) => (
            <Card 
              key={rencana.idRencanaBanding} 
              className="h-full flex flex-col overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="pb-3 border-b relative">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 text-ellipsis">
                    {rencana.namaRencana}
                  </CardTitle>
                  <Button 
                    variant="destructive"
                    size="icon"
                    disabled={isDeleting}
                    onClick={() => handleDelete(rencana.idRencanaBanding, rencana.namaRencana)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {format(new Date(rencana.tanggalRencana), "EEEE, d MMMM yyyy", { locale: id })}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="py-4 flex-grow">
                {/* Tanggal */}
                <div className="flex items-start gap-2 mb-3">
                  <Square className="h-4 w-4 mt-1 flex-shrink-0 text-gray-500" strokeWidth={1.5} />
                  <div className="text-sm">
                    {format(new Date(rencana.tanggalRencana), "EEEE, d MMMM yyyy", { locale: id })}
                  </div>
                </div>
                
                {/* Rekomendasi Checkbox */}
                <div className="flex items-start gap-2 mb-4">
                  <Check className="h-4 w-4 mt-1 flex-shrink-0 text-green-500" strokeWidth={2} />
                  <span className="text-sm font-medium">Rekomendasi</span>
                </div>
                
                {/* Perhatian */}
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    Perhatian
                  </h3>
                  <p className="text-xs text-yellow-800">
                    {rencana.rekomendasi.replace('Perhatian:', '').trim()}
                  </p>
                </div>
                
                {/* Opsi Banding */}
                <div>
                  <h3 className="font-medium flex items-center gap-2 mb-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Square className="h-3 w-3 text-gray-500" strokeWidth={1.5} />
                      Opsi Banding
                    </span>
                  </h3>
                  <ul className="space-y-3">
                    {rencana.opsiBanding.map((opsi) => (
                      <li 
                        key={opsi.idOpsiBanding}
                        className="text-sm border rounded-lg p-3 hover:bg-accent transition-colors"
                      >
                        <div className="font-medium flex items-center justify-between">
                          <span className="line-clamp-1">{opsi.namaOpsi}</span>
                          <Badge variant="secondary" className="flex-shrink-0 ml-2">
                            {opsi.namaKategori}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                          <CircleDollarSign className="h-4 w-4 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0
                            }).format(opsi.estimasiBiaya)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 border-t">
                <div className="flex justify-between w-full text-xs text-muted-foreground">
                  <span>{rencana.opsiBanding.length} opsi</span>
                  <span className="line-clamp-1">ID: {rencana.idRencanaBanding}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RencanaBandingList;