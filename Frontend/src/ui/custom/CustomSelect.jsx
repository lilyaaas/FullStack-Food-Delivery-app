import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className="relative w-full sm:w-auto min-w-50" ref={dropdownRef}>
      {/* The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-surface-container-lowest text-on-surface font-bold py-3 pl-6 pr-4 rounded-full border border-outline-variant/10 focus:ring-2 focus:ring-primary transition-all shadow-sm outline-none cursor-pointer"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown
          className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* The Floating Menu */}
      <div
        className={`absolute z-50 w-full mt-2 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-xl overflow-hidden origin-top transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between w-full px-6 py-3 text-sm font-bold transition-colors cursor-pointer hover:bg-surface-container-low ${
                value === option.id
                  ? "text-primary bg-primary/5"
                  : "text-on-surface"
              }`}
            >
              {option.label}
              {value === option.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
