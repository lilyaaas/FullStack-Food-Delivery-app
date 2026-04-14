const PaymentCard = ({ icon: Icon, title, desc, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex-1 ${
      selected
        ? "border-primary bg-primary/5 shadow-[0_8px_16px_-6px_rgba(255,121,62,0.2)]"
        : "border-outline-variant/20 bg-surface-container-lowest hover:border-outline-variant/50 hover:shadow-md"
    }`}
  >
    <div className="flex gap-4 items-center">
      <div
        className={`p-3 rounded-xl transition-colors ${
          selected
            ? "bg-primary text-on-primary shadow-sm"
            : "bg-surface-container-low text-on-surface-variant"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h4
          className={`font-bold font-headline ${
            selected ? "text-primary" : "text-on-background"
          }`}
        >
          {title}
        </h4>
        <p className="text-xs text-on-surface-variant mt-0.5 font-body">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

export default PaymentCard;
