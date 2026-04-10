import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Filter } from "lucide-react";

const CustomFilter = ({ label = "Filter", options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle adding/removing a filter
  const handleToggle = (id) => {
    if (selectedValues.includes(id)) {
      // Remove it if it's already selected
      onChange(selectedValues.filter((val) => val !== id));
    } else {
      // Add it if it's not selected
      onChange([...selectedValues, id]);
    }
  };

  // Determine what text to show on the button
  const getButtonText = () => {
    if (selectedValues.length === 0) return label;
    if (selectedValues.length === 1) {
      return options.find((opt) => opt.id === selectedValues[0])?.label;
    }
    return `${label} (${selectedValues.length})`;
  };

  return (
    <div className="relative w-full sm:w-auto min-w-45" ref={containerRef}>
      {/* The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`w-full flex items-center justify-between font-bold py-3 pl-5 pr-4 rounded-full border focus:ring-2 focus:ring-primary transition-all shadow-sm outline-none cursor-pointer ${
          selectedValues.length > 0
            ? "bg-primary/10 border-primary/20 text-primary"
            : "bg-surface-container-lowest border-outline-variant/10 text-on-surface"
        }`}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span>{getButtonText()}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
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
        <div className="flex flex-col py-2 max-h-64 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleToggle(option.id)}
                type="button"
                className={`flex items-center justify-between w-full px-5 py-3 text-sm font-bold transition-colors cursor-pointer hover:bg-surface-container-low ${
                  isSelected ? "text-primary" : "text-on-surface"
                }`}
              >
                {option.label}
                {/* Custom Checkbox UI */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-outline-variant/50"
                  }`}
                >
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-on-primary" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomFilter;
