import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonthPickerProps {
  className?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

function MonthPicker({ className, value, onChange }: MonthPickerProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const [displayedYear, setDisplayedYear] = React.useState(value ? value.getFullYear() : currentYear);
  const [isOpen, setIsOpen] = React.useState(false);
  
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value) {
      setDisplayedYear(value.getFullYear());
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

  const monthAbbreviations = React.useMemo(() => [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ], []);

  const handleMonthClick = (monthIndex: number) => {
    if (displayedYear === currentYear && monthIndex > currentMonth) return;
    
    const newDate = new Date(displayedYear, monthIndex, 1);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (offset: number) => {
    const newYear = displayedYear + offset;
    if (newYear > currentYear) return;
    setDisplayedYear(newYear);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-1.5 rounded-md bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Pilih bulan"
      >
        <CalendarIcon className="text-blue-600" size={18} />
      </button>

      {isOpen && (
        <div 
          ref={pickerRef}
          className="absolute top-full right-0 mt-1.5 z-50 border rounded-lg bg-white p-2 w-[180px] shadow-lg"
        >
          <div className="border-t border-gray-200 mb-2"></div>

          <div className="flex justify-between items-center mb-2 px-1">
            <button
              onClick={() => handleYearChange(-1)}
              className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Tahun sebelumnya"
            >
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            </button>
            
            <div className="font-bold text-sm px-2 py-1 rounded bg-gray-50 border border-gray-200">
              {displayedYear}
            </div>
            
            <button
              onClick={() => handleYearChange(1)}
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

          <div className="h-[108px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {monthAbbreviations.map((month, index) => {
              const isCurrentMonth = displayedYear === currentYear && index === currentMonth;
              const isSelected = value && 
                value.getFullYear() === displayedYear && 
                value.getMonth() === index;
              const isFuture = displayedYear === currentYear && index > currentMonth;
              
              return (
                <button
                  key={index}
                  disabled={isFuture}
                  onClick={() => handleMonthClick(index)}
                  className={cn(
                    "w-full py-1.5 px-2 rounded border transition-all duration-200 mb-1",
                    "flex items-center justify-between",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                    isSelected 
                      ? "bg-blue-500 text-white border-blue-500" 
                      : "border-gray-200 hover:bg-gray-50",
                    isCurrentMonth && !isSelected && "border-blue-300 bg-blue-50",
                    isFuture 
                      ? "opacity-50 cursor-not-allowed" 
                      : "cursor-pointer"
                  )}
                >
                  <span className={cn(
                    "text-xs font-medium",
                    isCurrentMonth && !isSelected && "text-blue-600",
                    isSelected && "text-white"
                  )}>
                    {month}
                  </span>
                  <span className={cn(
                    "text-[9px] text-gray-500",
                    isSelected && "text-blue-100"
                  )}>
                    {displayedYear}
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

export { MonthPicker };