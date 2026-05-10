const ToggleRow = ({
  icon: Icon,
  title,
  description,
  stateKey,
  isChecked,
  onToggle,
}) => {
  return (
    <div
      className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0 group cursor-pointer"
      onClick={() => onToggle(stateKey)}
    >
      <div className="flex items-start gap-4 pr-4">
        <div
          className={`mt-1 p-2 rounded-lg transition-colors ${isChecked ? "bg-primary-container/50 text-primary" : "bg-surface-container-high text-on-surface-variant"}`}
        >
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="font-headline font-bold text-on-background">
            {title}
          </h4>
          <p className="text-sm font-medium text-on-surface-variant mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Animated Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isChecked ? "bg-primary" : "bg-surface-container-highest"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleRow;
