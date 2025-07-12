import React, { useState } from "react";
import { usePostApiRencanabanding } from "@/kubb";
import { Button } from "../atoms/Button";
import CreateOpsiBandingForm from "./OpsiBanding";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, ArrowLeft } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Swal from "sweetalert2";
import { getApiRencanabandingQueryKey } from "@/kubb";
import { queryClient } from "@/Router";

const CreateRencanaBanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [namaRencana, setNamaRencana] = useState("");
  const [tanggalRencana, setTanggalRencana] = useState("");
  const [opsiBandingList, setOpsiBandingList] = useState([
    { namaOpsi: "", estimasiBiaya: 0, namaKategori: "" },
    { namaOpsi: "", estimasiBiaya: 0, namaKategori: "" }
  ]);
  const [error, setError] = useState("");
  
  const { mutateAsync, isPending } = usePostApiRencanabanding();

  const handleAddOpsi = () => {
    if (opsiBandingList.length < 10) {
      setOpsiBandingList([
        ...opsiBandingList,
        { namaOpsi: "", estimasiBiaya: 0, namaKategori: "" }
      ]);
    }
  };

  const handleRemoveOpsi = (index: number) => {
    if (opsiBandingList.length > 2) {
      const newList = [...opsiBandingList];
      newList.splice(index, 1);
      setOpsiBandingList(newList);
    }
  };

  const handleOpsiChange = (
    index: number,
    field: keyof typeof opsiBandingList[0],
    value: string | number
  ) => {
    const newList = [...opsiBandingList];
    newList[index] = { ...newList[index], [field]: value };
    setOpsiBandingList(newList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error sebelum validasi

    // Validasi form
    if (!namaRencana) {
      setError("Nama rencana harus diisi");
      return;
    }

    if (!tanggalRencana) {
      setError("Tanggal rencana harus diisi");
      return;
    }

    const invalidOpsi = opsiBandingList.find(
      opsi => !opsi.namaOpsi || opsi.estimasiBiaya <= 0 || !opsi.namaKategori
    );

    if (invalidOpsi) {
      setError("Semua opsi banding harus diisi dengan lengkap");
      return;
    }

    try {
      const requestData = {
        namaRencana: namaRencana,
        tanggalRencana: new Date(tanggalRencana).toISOString(),
        opsiBanding: opsiBandingList.map(opsi => ({
          namaOpsi: opsi.namaOpsi,
          estimasiBiaya: Number(opsi.estimasiBiaya),
          namaKategori: opsi.namaKategori
        }))
      };

      const response = await mutateAsync({ data: requestData });

 if (response.status >= 200 && response.status < 300)
  
  {
        // INVALIDASI QUERY SETELAH BERHASIL - DITAMBAHKAN
        queryClient.invalidateQueries({
          queryKey: getApiRencanabandingQueryKey()
        });
      Swal.fire({
        title: "Berhasil!",
        text: "Rencana banding berhasil dibuat",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4f46e5",
      });
      resetForm();
    } else {
      // Ambil pesan error dari response data jika ada
      const errorMsg = response.data?.message || "Terjadi kesalahan saat membuat rencana";
      setError(errorMsg);
    }
  } catch (err) {
    // Perbaikan penanganan error
    const error = err as any;
    const errorMessage = error.response?.data?.message 
                      || error.message 
                      || "Terjadi kesalahan internal";
    setError(errorMessage);
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#ef4444",
    });
  }
};

  const resetForm = () => {
    setNamaRencana("");
    setTanggalRencana("");
    setOpsiBandingList([
      { namaOpsi: "", estimasiBiaya: 0, namaKategori: "" },
      { namaOpsi: "", estimasiBiaya: 0, namaKategori: "" }
    ]);
    setIsModalOpen(false);
    setError("");
  };

  // Function to confirm cancel
  const confirmCancel = () => {
    Swal.fire({
      title: "Batal membuat rencana?",
      text: "Semua data yang telah dimasukkan akan hilang",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Ya, batalkan",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm();
      }
    });
  };

  return (
    <>
      {/* Desktop: Button in top right */}
      <div className="hidden md:block fixed top-20 right-4 z-10">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
        >
          Buat Rencana Banding Baru
        </Button>
      </div>

      {/* Mobile: Floating button at bottom */}
      <div className="md:hidden fixed top-35 right-6 z-5">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="rounded-full w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center justify-center"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Mobile header */}
            <div className="md:hidden flex items-center p-4 border-b">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={confirmCancel}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold text-gray-800">
                Buat Rencana Banding
              </h2>
            </div>

            <Card className="border-0 shadow-none">
              <CardHeader className="hidden md:block">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Form Rencana Banding
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={confirmCancel}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5 p-4 md:p-6">
                  {/* Nama Rencana */}
                  <div className="space-y-2">
                    <Label htmlFor="namaRencana" className="font-medium">
                      Nama Rencana
                    </Label>
                    <Input
                      id="namaRencana"
                      type="text"
                      value={namaRencana}
                      onChange={(e) => setNamaRencana(e.target.value)}
                      placeholder="Masukkan nama rencana banding"
                    />
                  </div>

                  {/* Tanggal Rencana */}
                  <div className="space-y-2">
                    <Label htmlFor="tanggalRencana" className="font-medium">
                      Tanggal Rencana
                    </Label>
                    <Input
                      id="tanggalRencana"
                      type="date"
                      value={tanggalRencana}
                      onChange={(e) => setTanggalRencana(e.target.value)}
                    />
                    {tanggalRencana && (
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(tanggalRencana), "EEEE, d MMMM yyyy", { locale: id })}
                      </p>
                    )}
                  </div>

                  {/* Opsi Banding */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Opsi Banding</h3>
                      <Button
                        type="button"
                        onClick={handleAddOpsi}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                        disabled={opsiBandingList.length >= 10}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Tambah Opsi</span>
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {opsiBandingList.map((opsi, index) => (
                        <div key={index} className="relative border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-3">
                            <span className="font-medium text-gray-700">
                              Opsi {index + 1}
                            </span>
                            {opsiBandingList.length > 2 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveOpsi(index)}
                                className="text-red-500 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          <CreateOpsiBandingForm
                            data={opsi}
                            onChange={(field, value) => 
                              handleOpsiChange(index, field, value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end p-4 md:p-6 pt-0">
                  <Button
                    type="button"
                    onClick={confirmCancel}
                    variant="outline"
                    className="w-full sm:w-auto border-gray-300"
                  >
                    Batal
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isPending ? "Menyimpan..." : "Simpan Rencana"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRencanaBanding;
