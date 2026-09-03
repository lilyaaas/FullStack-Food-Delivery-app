const QuickFoodLogo = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="QuickFood logo"
      role="img"
    >
      {/* Background */}
      <rect width="100" height="100" rx="26" fill="#ff793e" />

      {/* Speed lines */}
      <path d="M12 38H32" stroke="#ffefea" strokeWidth="6" strokeLinecap="round" />
      <path d="M8 50H24" stroke="#ffefea" strokeWidth="6" strokeLinecap="round" />
      <path d="M14 62H28" stroke="#ffefea" strokeWidth="6" strokeLinecap="round" />

      {/* Bowl */}
      <path
        d="M32 50C32 66 41 77 57 77C73 77 82 66 82 50H32Z"
        fill="#ffefea"
      />

      {/* Bowl rim */}
      <rect x="29" y="45" width="56" height="8" rx="4" fill="#ffefea" />

      {/* Steam */}
      <path d="M48 36C45 32 45 28 48 25" stroke="#ffefea" strokeWidth="5" strokeLinecap="round" />
      <path d="M60 36C57 32 57 28 60 25" stroke="#ffefea" strokeWidth="5" strokeLinecap="round" />

      {/* Energy dot */}
      <circle cx="74" cy="26" r="5" fill="#ffefea" />
    </svg>
  );
};

export default QuickFoodLogo;