import React, { useState, useEffect } from "react";
import { useGetApiKategoripengeluaran } from "@/kubb";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Folder, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type OpsiBandingData = {
  namaOpsi: string;
  estimasiBiaya: number;
  namaKategori: string;
};

type CreateOpsiBandingFormProps = {
  data: OpsiBandingData;
  onChange: (field: keyof OpsiBandingData, value: string | number) => void;
};

// Fungsi untuk memformat angka menjadi format mata uang Indonesia
const formatCurrency = (value: number | string): string => {
  if (value === "" || value === null || value === undefined) return "";
  
  // Jika sudah dalam format, kembalikan langsung
  if (typeof value === "string" && value.includes(".")) return value;
  
  const numericValue = typeof value === "string" 
    ? value.replace(/\D/g, "") 
    : value.toString().replace(/\D/g, "");
  
  if (numericValue === "") return "";
  
  return new Intl.NumberFormat("id-ID").format(Number(numericValue));
};

const CreateOpsiBandingForm: React.FC<CreateOpsiBandingFormProps> = ({ data, onChange }) => {
  const [kategoriError, setKategoriError] = useState("");
  const { data: kategoriData, isLoading, error } = useGetApiKategoripengeluaran();
  const [kategoriOptions, setKategoriOptions] = useState<{ idKategoriPengeluaran: number; namaKategori: string }[]>([]);
  
  // State untuk nilai yang diformat
  const [formattedBiaya, setFormattedBiaya] = useState<string>(data.estimasiBiaya ? formatCurrency(data.estimasiBiaya) : "");

  useEffect(() => {
    if (kategoriData) {
      if (Array.isArray(kategoriData)) {
        setKategoriOptions(kategoriData);
      } else if (kategoriData.data) {
        setKategoriOptions(
          kategoriData.data.map((kategori: any) => ({
            idKategoriPengeluaran: kategori.idKategoriPengeluaran,
            namaKategori: kategori.namaKategori
          }))
        );
      }
    }
    if (error) {
      setKategoriError("Gagal memuat data kategori");
    }
  }, [kategoriData, error]);

  // Efek untuk sinkronisasi saat data berubah dari luar
  useEffect(() => {
    setFormattedBiaya(formatCurrency(data.estimasiBiaya));
  }, [data.estimasiBiaya]);

  // Handler untuk perubahan input biaya
  const handleBiayaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Format nilai input
    const formatted = formatCurrency(inputValue);
    setFormattedBiaya(formatted);
    
    // Konversi ke angka untuk disimpan di state
    const numericValue = inputValue === "" 
      ? 0 
      : Number(inputValue.replace(/\./g, ""));
    
    onChange("estimasiBiaya", numericValue);
  };

  return (
    <Card className="border rounded-lg shadow-sm">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center space-x-3">
          <Folder className="h-6 w-6 text-indigo-600" />
          <CardTitle className="text-lg font-semibold">Form Opsi Banding</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pt-5 space-y-5">
        {/* Nama Opsi */}
        <div className="space-y-2">
          <Label htmlFor="namaOpsi" className="font-medium text-gray-700">
            Nama Opsi
          </Label>
          <Input
            id="namaOpsi"
            placeholder="Masukkan nama opsi banding"
            value={data.namaOpsi}
            onChange={(e) => onChange("namaOpsi", e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Estimasi Biaya */}
        <div className="space-y-2">
          <Label htmlFor="estimasiBiaya" className="font-medium text-gray-700">
            Estimasi Biaya
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <h2>Rp</h2>
            </span>
            <Input
              id="estimasiBiaya"
              type="text" // Ubah menjadi text untuk menerima format
              inputMode="numeric" // Untuk keyboard numerik di mobile
              placeholder="Masukkan estimasi biaya"
              value={formattedBiaya}
              onChange={handleBiayaChange}
              className="pl-9 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Contoh: 10000 akan otomatis menjadi 10.000
          </p>
        </div>

        {/* Kategori Pengeluaran */}
        <div className="space-y-2">
          <Label htmlFor="namaKategori" className="font-medium text-gray-700">
            Kategori Pengeluaran
          </Label>
          
          {isLoading ? (
            <Skeleton className="h-10 rounded-md" />
          ) : kategoriError ? (
            <Alert variant="destructive" className="py-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{kategoriError}</AlertDescription>
            </Alert>
          ) : (
            <Select
              value={data.namaKategori}
              onValueChange={(value) => onChange("namaKategori", value)}
            >
              <SelectTrigger className="w-full focus:ring-indigo-500 focus:border-indigo-500">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {kategoriOptions.length > 0 ? (
                  kategoriOptions.map((kategori) => (
                    <SelectItem 
                      key={kategori.idKategoriPengeluaran}  // Using the unique key for each item
                      value={kategori.namaKategori}
                    >
                      {kategori.namaKategori}
                    </SelectItem>
                  ))
                ) : (
                  <div className="py-3 text-center text-sm text-gray-500">
                    Tidak ada kategori tersedia
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateOpsiBandingForm;
