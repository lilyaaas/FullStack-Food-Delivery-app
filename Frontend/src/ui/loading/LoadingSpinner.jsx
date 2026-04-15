const LoadingSpinner = ({ LoadingText }) => {
  return (
    <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-background backdrop-blur-md">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-orange-500"></div>
        
        {/* Text */}
        {LoadingText && (
          <p className="mt-4 text-gray-700 font-medium animate-pulse">
            {LoadingText}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
