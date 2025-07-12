import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useGetApiPengeluaran } from '@/kubb'
import { Calendar } from '@/components/ui/calendar'
import { useEffect, useState } from 'react'
import { format, isAfter, isSameDay, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, TrendingDown, Receipt, BarChart3, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export const Route = createLazyFileRoute('/_protected/DataPengeluaran/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { data, isLoading, isError, error } = useGetApiPengeluaran()
  const navigate = useNavigate()
  
  // Handle different data structures
  const pengeluaranData = data?.data || data || []
  
  // Filter expenses based on selected date
  const filteredPengeluaran = pengeluaranData.filter(p => {
    try {
      const pengeluaranDate = parseISO(p.tanggal)
      return isSameDay(pengeluaranDate, selectedDate)
    } catch {
      return false
    }
  })

  // Calculate total expenses for selected date
  const totalPengeluaran = filteredPengeluaran.reduce((total, p) => total + p.nominal, 0)
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Calculate average expense
  const averageExpense = filteredPengeluaran.length > 0 
    ? totalPengeluaran / filteredPengeluaran.length 
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate({ to: '/DashboardSaldo' })}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Data Pengeluaran
                </h1>
                <p className="text-gray-600">
                  Pantau dan kelola pengeluaran Anda dengan mudah
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg">
                <div className="text-sm font-medium">Hari ini</div>
                <div className="text-lg font-bold">
                  {format(new Date(), 'dd MMM yyyy', { locale: id })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Pengeluaran</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalPengeluaran)}</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Jumlah Transaksi</p>
                <p className="text-2xl font-bold text-blue-600">{filteredPengeluaran.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Rata-rata</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(averageExpense)}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar and Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-800">Pilih Tanggal</h2>
            </div>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                disabled={(date) => isAfter(date, new Date())}
                className="rounded-md border shadow-sm"
                locale={id}
                initialFocus
              />
            </div>
          </div>
          
          {/* Date Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Tanggal</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100">
                <div className="text-sm text-gray-600 mb-1">Tanggal Dipilih</div>
                <div className="text-lg font-semibold text-orange-800">
                  {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: id })}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="text-sm text-gray-600 mb-1">Total</div>
                  <div className="text-lg font-bold text-red-600">
                    {formatCurrency(totalPengeluaran)}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Transaksi</div>
                  <div className="text-lg font-bold text-gray-800">
                    {filteredPengeluaran.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Daftar Transaksi
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {format(selectedDate, 'dd MMM yyyy', { locale: id })}
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {filteredPengeluaran.length} Transaksi
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Gagal Memuat Data</AlertTitle>
                <AlertDescription>
                  {error?.message || 'Terjadi kesalahan saat memuat data pengeluaran'}
                </AlertDescription>
              </Alert>
            ) : filteredPengeluaran.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto bg-gray-100 text-gray-500 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Receipt className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak Ada Transaksi</h3>
                <p className="text-gray-600">
                  Tidak ada pengeluaran untuk tanggal {format(selectedDate, 'd MMMM yyyy', { locale: id })}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPengeluaran.map((pengeluaran, index) => (
                  <div 
                    key={pengeluaran.idPengeluaran} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <h3 className="font-medium text-gray-800">{pengeluaran.deskripsi}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                            {pengeluaran.namaKategori}
                          </Badge>
                          {pengeluaran.namaTarget && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              {pengeluaran.namaTarget}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">
                          {formatCurrency(pengeluaran.nominal)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(parseISO(pengeluaran.tanggal), 'dd MMM yyyy', { locale: id })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}