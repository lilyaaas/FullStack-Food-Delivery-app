import { Home, Edit2, Trash2, Phone, Plus } from "lucide-react";

const SavedAddresses = () => {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-4 md:p-8 xl:p-12 shadow-sm overflow-hidden border border-outline-variant/10 min-h-100">
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 mt-6 md:mt-0">
        <header className="flex flex-col items-center justify-center mb-10 text-center">
          <h2 className="font-headline text-3xl font-extrabold text-on-background mb-2">
            Saved Addresses
          </h2>
          <p className="text-on-surface-variant font-medium">
            Manage your delivery locations to expedite checkout.
          </p>
        </header>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-low rounded-2xl p-6 relative group overflow-hidden border border-outline-variant/15 hover:border-primary/30 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-inner">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl text-on-surface flex items-center gap-2">
                    Home
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Default
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  aria-label="Edit"
                  className="p-2.5 rounded-full hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  aria-label="Delete"
                  className="p-2.5 rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
                1234 Culinary Lane
                <br />
                Apt 4B
                <br />
                Gastronomy City, CA 90210
              </p>
              <p className="text-on-surface-variant font-bold text-sm mt-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                (555) 123-4567
              </p>
            </div>

            <div className="border-t border-outline-variant/15 pt-5 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-not-allowed opacity-70">
                {/* Simulated Checked Toggle */}
                <div className="relative">
                  <div className="block bg-primary w-11 h-6 rounded-full"></div>
                  <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-on-surface-variant">
                  Set as Default
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Add New Adress Button */}
        <div className="flex justify-end">
          <button className="w-full sm:w-auto bg-linear-to-br from-primary to-primary-container text-on-primary px-10 py-3.5 mt-10 mb-3 rounded-xl font-bold font-headline flex items-center justify-center gap-2 text-end hover:opacity-90 active:scale-98 transition-all shadow-lg shadow-primary/20 whitespace-nowrap cursor-pointer">
            <Plus className="w-5 h-5" />
            Add New Address
          </button>
        </div>
      </div>
    </section>
  );
};

export default SavedAddresses;
