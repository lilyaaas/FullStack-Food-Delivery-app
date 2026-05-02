import { X, AlertTriangle } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-headline text-2xl font-bold text-on-background mb-2">
          {title}
        </h3>

        <p className="text-on-surface-variant font-medium mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md cursor-pointer active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
