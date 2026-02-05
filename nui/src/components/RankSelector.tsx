import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface RankSelectorProps {
  value: string;
  ranks: string[];
  onChange: (rank: string) => void;
}

export function RankSelector({ value, ranks, onChange }: RankSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (rank: string) => {
    onChange(rank);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Current selection */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[rgba(0,0,0,0.54)] text-white text-sm rounded-lg px-3 py-1.5 pr-8 border border-[rgba(161,18,18,0.4)] cursor-pointer hover:bg-[rgba(0,0,0,0.7)] transition-colors text-left flex items-center justify-between"
      >
        <span>{value}</span>
        <ChevronDown className={`w-4 h-4 text-[#99a1af] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu - appears below */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[rgba(10,5,5,0.98)] border border-[rgba(161,18,18,0.4)] rounded-lg shadow-xl z-50 max-h-[300px] overflow-y-auto">
          {ranks.map((rank, index) => (
            <button
              key={rank}
              onClick={() => handleSelect(rank)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                rank === value
                  ? "bg-[#a11212] text-white"
                  : "text-white hover:bg-[rgba(161,18,18,0.3)]"
              } ${index === 0 ? "rounded-t-lg" : ""} ${
                index === ranks.length - 1 ? "rounded-b-lg" : ""
              }`}
            >
              {rank}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
