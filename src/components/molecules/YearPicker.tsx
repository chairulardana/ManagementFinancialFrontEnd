import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface YearPickerProps {
  className?: string;
  value?: number | null;
  onChange?: (year: number | null) => void;
}

function YearPicker({ className, value, onChange }: YearPickerProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  const [displayedYear, setDisplayedYear] = React.useState<number>(value || currentYear);
  const [isOpen, setIsOpen] = React.useState(false);
  
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value) {
      setDisplayedYear(value);
    }
  }, [value]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleYearClick = (year: number) => {
    if (year > currentYear) return;
    
    onChange?.(year);
    setIsOpen(false);
  };

  const handleYearChange = (offset: number) => {
    const newYear = displayedYear + offset;
    if (newYear > currentYear) return;
    setDisplayedYear(newYear);
  };

  // Generate 12 years (3 rows x 4 columns)
  const years = Array.from({ length: 12 }, (_, i) => displayedYear - 6 + i);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-1.5 rounded-md bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Pilih tahun"
      >
        {value ? (
          <span className="text-sm font-medium">{value}</span>
        ) : (
          <CalendarIcon className="text-blue-600" size={18} />
        )}
      </button>

      {isOpen && (
        <div 
          ref={pickerRef}
          className="absolute top-full right-0 mt-1.5 z-50 border rounded-lg bg-white p-2 w-[180px] shadow-lg"
        >
          <div className="border-t border-gray-200 mb-2"></div>

          <div className="flex justify-between items-center mb-2 px-1">
            <button
              onClick={() => handleYearChange(-12)}
              className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Tahun sebelumnya"
            >
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            </button>
            
            <div className="font-bold text-sm px-2 py-1 rounded bg-gray-50 border border-gray-200">
              {displayedYear}
            </div>
            
            <button
              onClick={() => handleYearChange(12)}
              disabled={displayedYear >= currentYear}
              className={cn(
                "p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                displayedYear >= currentYear 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-gray-100"
              )}
              aria-label="Tahun berikutnya"
            >
              <ChevronRight className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1 max-h-[150px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {years.map(year => {
              const isCurrent = year === currentYear;
              const isSelected = value === year;
              const isFuture = year > currentYear;
              
              return (
                <button
                  key={year}
                  disabled={isFuture}
                  onClick={() => handleYearClick(year)}
                  className={cn(
                    "py-1.5 px-1 rounded border transition-all duration-200",
                    "flex items-center justify-center",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                    isSelected 
                      ? "bg-blue-500 text-white border-blue-500" 
                      : "border-gray-200 hover:bg-gray-50",
                    isCurrent && !isSelected && "border-blue-300 bg-blue-50",
                    isFuture 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer"
                  )}
                >
                  <span className={cn(
                    "text-xs font-medium",
                    isCurrent && !isSelected && "text-blue-600",
                    isSelected && "text-white"
                  )}>
                    {year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { YearPicker };