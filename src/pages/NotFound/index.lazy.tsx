import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createLazyFileRoute('/NotFound/')({
  component: NotFoundComponent,
})

export default function NotFoundComponent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add floating animation effect to elements
    const floatingElements = container.querySelectorAll('.floating-element')
    floatingElements.forEach(el => {
      el.classList.add('animate-float')
    })

    // Add fade-in animation to text
    const fadeElements = container.querySelectorAll('.fade-in-element')
    fadeElements.forEach((el, index) => {
      el.classList.add('animate-fadeIn')
      const delay = index * 0.2
      el.style.animationDelay = `${delay}s`
    })
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden
                bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]
                dark:bg-gradient-to-br dark:from-[#2c3e50] dark:to-[#1a1a2e]"
    >
      {/* Floating background elements */}
      <div className="absolute w-[300px] h-[300px] rounded-full
                     bg-gradient-to-br from-[rgba(195,207,226,0.3)] to-[rgba(255,255,255,0.4)]
                     dark:from-[rgba(42,58,80,0.3)] dark:to-[rgba(26,26,46,0.4)]
                     top-[-100px] right-[-100px] floating-element"></div>
      
      <div className="absolute w-[200px] h-[200px] rounded-full
                     bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(195,207,226,0.3)]
                     dark:from-[rgba(42,58,80,0.2)] dark:to-[rgba(26,26,46,0.3)]
                     bottom-[-80px] left-[-80px] floating-element"></div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
                     border border-gray-200 dark:border-gray-700 overflow-hidden
                     transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl
                     fade-in-element opacity-0">
        
        {/* Floating 404 text */}
        <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2
                       text-7xl sm:text-9xl font-black
                       text-black/10 dark:text-white/10
                       select-none pointer-events-none z-0 floating-element">
          404
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-12">
          {/* Image section */}
          <div className="flex justify-center items-center">
            <img 
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" 
              alt="404 Animation"
              className="w-full max-w-[350px] h-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg
                         transition-transform duration-300 hover:scale-105 floating-element"
            />
          </div>
          
          {/* Content section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 
                          bg-gradient-to-r from-[#6c63ff] via-[#8a85ff] to-[#6c63ff] 
                          dark:from-[#8a85ff] dark:via-[#a29bfe] dark:to-[#8a85ff]
                          bg-clip-text text-transparent bg-[length:200%_auto]
                          animate-gradient bg-scroll">
              Oops! Page Not Found
            </h1>
            
            <h2 className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-4 fade-in-element opacity-0">
              We can't seem to find the page you're looking for
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md fade-in-element opacity-0">
              The page may have been moved, deleted, or you may have entered an incorrect URL.
            </p>
            
            <div className="flex flex-wrap gap-4 fade-in-element opacity-0">
              <Link to="/" className="no-underline">
                <button
                  className="flex items-center px-6 py-3 rounded-full font-bold text-white
                            bg-gradient-to-r from-[#6c63ff] to-[#8a85ff]
                            shadow-lg shadow-indigo-500/30
                            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:from-[#5a52e0] hover:to-[#7871f0]"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  Go to Homepage
                </button>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="flex items-center px-6 py-3 rounded-full font-bold
                          border-2 border-indigo-500 text-indigo-500 dark:border-indigo-400 dark:text-indigo-400
                          transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-600 dark:text-gray-400 text-center max-w-md fade-in-element opacity-0">
        If you believe this is an error, please contact our support team
      </p>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  )
}