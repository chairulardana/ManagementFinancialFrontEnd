import { useState } from "react";
import { usePostApiTargettabungan } from "@/kubb";
import { Button } from "../atoms/Button";
import { getApiTargettabunganQueryKey } from "@/kubb";
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

const CreateTargetTabungan = () => {
  const [showModal, setShowModal] = useState(false);
  const [namaTarget, setNamaTarget] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [nominalTarget, setNominalTarget] = useState("");
  const [tanggalTarget, setTanggalTarget] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutateAsync, isPending, isError, error } = usePostApiTargettabungan();
  const queryClient = useQueryClient(); // Dapatkan query client instance

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNominalTarget(formatRupiah(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nominalValue = Number(nominalTarget.replace(/\./g, "").replace(",", "."));

    const data = {
      NamaTarget: namaTarget,
      Deskripsi: deskripsi,
      NominalTarget: nominalValue.toString(),
      TanggalTarget: tanggalTarget,
      file: file
    };

    try {
      await mutateAsync(data);
      
      // INVALIDATE QUERY SETELAH MUTATION BERHASIL
      await queryClient.invalidateQueries({ 
        queryKey: getApiTargettabunganQueryKey() 
      });

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setNamaTarget("");
    setDeskripsi("");
    setNominalTarget("");
    setTanggalTarget("");
    setFile(null);
    setImagePreview(null);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed top-20 right-4 z-10 sm:absolute">
        <Button
          type="button"
          variant="primary"
          onClick={() => setShowModal(true)}
          className="px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3 text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 transition-all transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Create Target Tabungan</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Buat Target Tabungan Baru</h2>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Target</label>
                  <input
                    type="text"
                    value={namaTarget}
                    onChange={(e) => setNamaTarget(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                    placeholder="Contoh: Liburan ke Bali"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 min-h-[100px] transition-colors"
                    placeholder="Tulis deskripsi target tabungan..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nominal Target</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <span>Rp</span>
                    </div>
                    <input
                      type="text"
                      value={nominalTarget}
                      onChange={handleNominalChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-lg transition-colors"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Target</label>
                  <input
                    type="date"
                    value={tanggalTarget}
                    onChange={(e) => setTanggalTarget(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Gambar</label>
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-700 mb-2">Preview:</p>
                      <div className="border border-gray-200 rounded-xl p-2 flex justify-center">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="rounded-lg object-contain max-h-48"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending}
                    className="w-full py-3.5 font-medium rounded-xl text-base shadow-md hover:shadow-lg transition-all"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Menyimpan...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Buat Target Tabungan
                      </span>
                    )}
                  </Button>
                </div>

                {isError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                    {error?.response?.data?.message || error?.message || "Terjadi kesalahan saat membuat target"}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTargetTabungan;
