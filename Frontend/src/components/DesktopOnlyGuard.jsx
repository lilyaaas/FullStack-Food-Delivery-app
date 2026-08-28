import { MonitorSmartphone } from "lucide-react";

const DesktopOnlyGuard = ({ children }) => {
  return (
    <>
      {/* Allowed on Large Screens (Tablets / Desktops) */}
      <div className="hidden xl:block">
        {children}
      </div>

      {/* Blocked on Small Screens (Phones) */}
      <div className="xl:hidden flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background selection:bg-primary/20">
        <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center text-error mb-6 shadow-inner border border-error/20">
          <MonitorSmartphone className="w-12 h-12" />
        </div>

        <h1 className="font-headline text-3xl font-black text-on-background mb-3 tracking-tight">
          Larger Screen Required
        </h1>

        <p className="text-on-surface-variant font-medium text-lg max-w-sm mx-auto leading-relaxed">
          To provide the best experience while managing your entire restaurant business—from live kitchen operations to menu updates and financial settings—the Partner Dashboard requires a Tablet or Desktop computer.
        </p>

        <div className="mt-10 p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20">
          <p className="text-on-surface-variant text-sm font-bold uppercase tracking-wider mb-2">
            Action Required
          </p>
          <p className="text-on-surface text-sm">
            Please log in from a device with a wider screen to access your complete restaurant management suite.
          </p>
        </div>
      </div>
    </>
  );
};

export default DesktopOnlyGuard;