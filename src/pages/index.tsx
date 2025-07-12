import { createFileRoute, Link } from '@tanstack/react-router'
import { LeaderboardSupportButton } from '@/components/molecules/LeaderboardSaweria'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-4 relative overflow-hidden">

      {/* Konten utama */}
      <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-full p-1.5 shadow-xl mb-8 animate-bounce-slow">
          <div className="bg-white rounded-full p-4">
            <div className="w-24 h-24 flex items-center justify-center">
             <img src="/Logo.svg" alt="Kantong Pintar Logo" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
          Healing boleh, tapi <span className="text-cyan-600">saving</span> jangan ketinggalan.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Kelola keuangan dengan bijak untuk kebebasan finansial. Nikmati hidup tanpa khawatir tentang besok.
        </p>
        
        {/* Container untuk kedua tombol */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/Login">
            <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 px-12 rounded-full hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg font-bold flex items-center gap-2 group">
              Mulai Sekarang
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
          
          {/* Tombol Leaderboard Support */}
          <LeaderboardSupportButton />
        </div>
      </div>
      
      {/* Dekorasi tambahan di bagian bawah */}
      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-3">
        <div className="flex justify-center gap-4 opacity-70">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
        
        {/* Powered by section */}
        <div className="text-gray-500 text-sm font-medium">
          Powered by <span className="text-indigo-600 font-bold">Chairul Ardana</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s infinite;
        }
      `}</style>
    </div>
  )
}