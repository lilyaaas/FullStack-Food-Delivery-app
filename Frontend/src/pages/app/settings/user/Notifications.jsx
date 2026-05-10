import { useState } from "react";
import {
  Smartphone,
  Mail,
  Tag,
  ShieldAlert,
  Utensils,
  Save,
  MessageSquare,
} from "lucide-react";

import { ToggleRow } from "../../../../components";

const Notifications = () => {
  const [preferences, setPreferences] = useState({
    orderPush: true,
    orderSms: false,
    orderEmail: true,
    promoPush: false,
    promoEmail: true,
    securityPush: true,
    securityEmail: true,
  });

  const togglePref = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-4 md:p-8 xl:p-12 shadow-sm overflow-hidden border border-outline-variant/10 min-h-100">
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 mt-6 md:mt-0">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center mb-10 text-center">
          <div>
            <h2 className="font-headline text-3xl font-extrabold text-on-background mb-2">
              Notification Preferences
            </h2>
            <p className="text-on-surface-variant font-medium">
              Control how and when QuickFood communicates with you.
            </p>
          </div>
        </header>

        <div className="space-y-8">
          {/* Category 1 */}
          <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/15 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Utensils className="w-6 h-6 text-primary" />
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Live Order Updates
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 font-medium">
              Real-time tracking alerts when your food is being prepared, picked
              up, and delivered.
            </p>

            <div className="flex flex-col">
              <ToggleRow
                icon={Smartphone}
                title="Push Notifications"
                description="Receive instant alerts on your device."
                stateKey="orderPush"
                isChecked={preferences.orderPush}
                onToggle={togglePref}
              />
              <ToggleRow
                icon={MessageSquare}
                title="SMS Text Messages"
                description="Get text updates for deliveries."
                stateKey="orderSms"
                isChecked={preferences.orderSms}
                onToggle={togglePref}
              />
              <ToggleRow
                icon={Mail}
                title="Email Receipts"
                description="Receive an email confirmation after every order."
                stateKey="orderEmail"
                isChecked={preferences.orderEmail}
                onToggle={togglePref}
              />
            </div>
          </div>

          {/* Category 2 */}
          <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/15 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-6 h-6 text-primary" />
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Offers & Promotions
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 font-medium">
              Exclusive discounts, free delivery codes, and personalized
              restaurant recommendations.
            </p>

            <div className="flex flex-col">
              <ToggleRow
                icon={Smartphone}
                title="App Notifications"
                description="Occasional pop-ups for limited-time offers."
                stateKey="promoPush"
                isChecked={preferences.promoPush}
                onToggle={togglePref}
              />
              <ToggleRow
                icon={Mail}
                title="Weekly Newsletter"
                description="Curated lists of top-rated local restaurants and deals."
                stateKey="promoEmail"
                isChecked={preferences.promoEmail}
                onToggle={togglePref}
              />
            </div>
          </div>

          {/* Category 3 */}
          <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/15 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="w-6 h-6 text-error" />
              <h3 className="font-headline text-xl font-bold text-on-surface">
                Account Security
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 font-medium">
              Important alerts regarding unauthorized logins or changes to your
              payment methods.
            </p>

            <div className="flex flex-col">
              <ToggleRow
                icon={Smartphone}
                title="Security Push Alerts"
                description="Instant notification if we detect a new device login."
                stateKey="securityPush"
                isChecked={preferences.securityPush}
                onToggle={togglePref}
              />
              <ToggleRow
                icon={Mail}
                title="Security Emails"
                description="Mandatory email alerts for password resets."
                stateKey="securityEmail"
                isChecked={preferences.securityEmail}
                onToggle={togglePref}
              />
            </div>
          </div>

          {/* Save Action */}
          <div className="pt-6 flex justify-end">
            <button className="bg-linear-to-br from-primary to-primary-container text-on-primary px-8 py-3.5 rounded-full font-bold font-headline flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all w-full sm:w-auto cursor-pointer">
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
