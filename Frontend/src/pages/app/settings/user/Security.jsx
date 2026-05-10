import { useState } from "react";
import {
  Lock,
  EyeOff,
  Eye,
  ShieldCheck,
  MonitorSmartphone,
  Laptop,
  Smartphone,
} from "lucide-react";

import { ToggleRow } from "../../../../components";

const Security = () => {
  // UI States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-surface-container-lowest rounded-3xl p-4 md:p-8 xl:p-12 shadow-sm overflow-hidden border border-outline-variant/10 min-h-100">
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8 mt-6 md:mt-0">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center mb-10 text-center">
          <h2 className="font-headline text-3xl font-extrabold text-on-background mb-2">
            Security Settings
          </h2>
          <p className="text-on-surface-variant font-medium">
            Manage your password, two-factor authentication, and active sessions
            to keep your account safe.
          </p>
        </header>

        {/* Password Change Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/15 relative overflow-hidden group">
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-1 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Password
              </h3>
              <p className="font-body text-sm text-on-surface-variant font-medium">
                Update your password regularly to enhance account security.
              </p>
            </div>
          </div>

          <form className="space-y-6 relative z-10 max-w-md">
            <div>
              <label className="block font-headline text-sm font-bold text-on-surface-variant mb-1.5 ml-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl px-4 py-3.5 font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  {showCurrentPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-headline text-sm font-bold text-on-surface-variant mb-1.5 ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl px-4 py-3.5 font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  {showNewPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="font-body text-xs font-medium text-on-surface-variant mt-2 ml-1">
                Must be at least 8 characters long and include a number or
                symbol.
              </p>
            </div>

            <button
              type="button"
              className="mt-6 bg-linear-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Two-Factor Auth Card */}
        <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/15 shadow-sm">
          <ToggleRow
            icon={ShieldCheck}
            title="Two-Factor Authentication (2FA)"
            description="Add an extra layer of security to your account. When enabled,
                you'll be required to enter a code from your authenticator app
                in addition to your password during sign-in."
            stateKey="2FA"
            isChecked={is2FAEnabled}
            onToggle={() => setIs2FAEnabled(!is2FAEnabled)}
          />
        </div>

        {/* Active Sessions Card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/15 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-outline-variant/10 bg-surface-container-lowest/50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
                  <MonitorSmartphone className="w-5 h-5 text-primary" />
                  Active Sessions
                </h3>
                <p className="font-body text-sm font-medium text-on-surface-variant mt-1">
                  Review the devices currently logged into your account.
                </p>
              </div>
              <button className="text-primary hover:text-primary-container hover:underline font-headline font-bold text-sm transition-colors hidden sm:block cursor-pointer">
                Sign out of all other sessions
              </button>
            </div>
          </div>

          <div className="divide-y divide-outline-variant/10">
            {/* Current Session */}
            <div className="p-6 md:p-8 flex items-start gap-4 bg-primary/5">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-primary/20 flex items-center justify-center shrink-0 text-primary shadow-sm">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="grow">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-headline font-bold text-on-surface">
                    MacBook Pro - Chrome
                  </h4>
                  <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Current Session
                  </span>
                </div>
                <p className="font-body text-sm font-medium text-on-surface-variant">
                  San Francisco, CA, USA • IP: 192.168.1.1
                </p>
                <p className="font-body text-xs font-bold text-primary mt-1.5">
                  Active right now
                </p>
              </div>
            </div>

            {/* Other Session */}
            <div className="p-6 md:p-8 flex items-start gap-4 hover:bg-surface-container-lowest/80 transition-colors">
              <div className="w-12 h-12 rounded-full bg-surface-container-low border border-outline-variant/10 flex items-center justify-center shrink-0 text-on-surface-variant shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-headline font-bold text-on-surface mb-1">
                    iPhone 13 - Safari
                  </h4>
                  <p className="font-body text-sm font-medium text-on-surface-variant">
                    San Francisco, CA, USA • IP: 10.0.0.5
                  </p>
                  <p className="font-body text-xs font-medium text-on-surface-variant mt-1.5">
                    Last active: 2 hours ago
                  </p>
                </div>
                <button className="text-red-600 hover:text-white font-headline font-bold text-sm transition-all self-start sm:self-center bg-red-50 hover:bg-red-600 active:scale-95 px-6 py-2.5 rounded-xl cursor-pointer border border-red-100 hover:border-red-600">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
