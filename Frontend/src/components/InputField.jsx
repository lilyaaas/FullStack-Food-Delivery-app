const InputField = ({ icon: Icon, label, required, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="block text-sm font-bold text-on-surface-variant ml-1 font-headline">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <input
        required={required}
        {...props}
        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/50 shadow-sm hover:border-outline-variant/40 font-body"
      />
    </div>
  </div>
);

export default InputField;