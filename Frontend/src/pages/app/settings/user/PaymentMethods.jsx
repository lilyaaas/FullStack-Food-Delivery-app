import { CreditCard, Plus, Trash2, Edit2 } from "lucide-react";

const PaymentMethods = () => {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-4 md:p-8 xl:p-12 shadow-sm overflow-hidden border border-outline-variant/10 min-h-100">
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 mt-6 md:mt-0">
        <header className="flex flex-col items-center justify-center mb-10 text-center">
          <h2 className="font-headline text-3xl font-extrabold text-on-background mb-2">
            Payment Methods
          </h2>
          <p className="text-on-surface-variant font-medium max-w-md">
            Manage your saved cards for a faster, seamless checkout experience.
          </p>
        </header>

        {/* Saved Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container rounded-bl-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="bg-surface-container-lowest p-2 rounded-lg shadow-sm border border-outline-variant/10 flex items-center justify-center h-10 w-14">
                  <span className="font-headline font-black text-primary italic tracking-wider text-sm">
                    VISA
                  </span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-surface text-lg">
                    Personal Card
                  </h3>
                  <p className="text-sm font-medium text-on-surface-variant">
                    Default Payment
                  </p>
                </div>
              </div>
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                Default
              </span>
            </div>

            <div className="relative z-10 mb-6">
              <p className="font-headline text-xl text-on-background tracking-[0.15em] font-bold">
                •••• •••• •••• 4242
              </p>
              <p className="text-sm font-medium text-on-surface-variant mt-1">
                Expires 12/25
              </p>
            </div>

            <div className="flex space-x-6 border-t border-outline-variant/15 pt-4 relative z-10">
              <button className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-container transition-colors cursor-pointer">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button className="flex items-center gap-1.5 text-sm font-bold text-error hover:text-red-600 transition-colors cursor-pointer">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Add New Method CTA */}
        <div className="bg-surface-container-low rounded-2xl p-8 border border-dashed border-outline-variant/40 flex flex-col items-center justify-center text-center hover:bg-surface-container-highest transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mb-4 shadow-sm text-primary group-hover:scale-110 transition-transform duration-300">
            <CreditCard className="w-8 h-8" />
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface mb-2">
            Add a New Card
          </h3>
          <p className="font-medium text-sm text-on-surface-variant max-w-md mx-auto mb-6">
            Securely link a new credit or debit card for faster checkout on your
            next culinary adventure.
          </p>
          <button className="bg-linear-to-br from-primary to-primary-container text-on-primary font-headline font-bold px-8 py-3.5 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Payment Method
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
