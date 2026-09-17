import { ArrowLeft, ArrowRight, Home, MapPin, Utensils } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-background px-6 py-8 text-on-background antialiased font-body sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">
        <section className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-10">
          <div className="order-2 lg:max-w-xl lg:order-1 grid items-center justify-center">
            <h1 className="font-headline text-[clamp(5rem,15vw,10rem)] font-black leading-[0.8] tracking-[-0.07em] text-on-background">
              404
            </h1>

            <h2 className="mt-10 max-w-md font-headline text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              This page took a wrong turn.
            </h2>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-on-surface-variant">
              Looks like this address is off the menu. Let&apos;s get you back
              to the good stuff.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-bold text-on-primary shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-primary-container"
              >
                <Home className="h-5 w-5" />
                Go home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-outline-variant/40 px-6 py-4 font-bold text-on-surface transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-5 w-5" />
                Go back
              </button>
            </div>
          </div>

          <div className="hidden order-1 lg:flex min-h-80 items-center justify-center lg:order-2 lg:min-h-128">
            <div className="relative aspect-square w-full max-w-124">
              <div className="absolute inset-[12%] rounded-full bg-surface-container-high/80 blur-3xl" />
              <div className="absolute inset-[10%] rotate-[-8deg] rounded-[30%] border border-primary/10 bg-surface-container-low" />
              <div className="absolute inset-[17%] rotate-[7deg] rounded-[28%] bg-surface-container-lowest shadow-[0_30px_70px_-25px_rgba(75,36,9,0.3)]" />

              <div className="absolute left-[14%] top-[17%] flex h-16 w-16 -rotate-12 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-xl shadow-primary/25 sm:h-20 sm:w-20">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>

              <div className="absolute right-[12%] top-[27%] flex h-12 w-12 rotate-12 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed shadow-lg sm:h-16 sm:w-16">
                <Utensils className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>

              <div className="absolute inset-x-[27%] top-[38%] flex items-center gap-2 sm:gap-3">
                <span className="h-3 w-3 rounded-full bg-primary-container ring-8 ring-primary-container/10 sm:h-4 sm:w-4" />
                <span className="h-0.5 flex-1 border-t-2 border-dashed border-outline-variant" />
                <span className="h-3 w-3 rounded-full border-2 border-primary bg-surface-container-lowest sm:h-4 sm:w-4" />
              </div>

              <div className="absolute inset-x-[25%] bottom-[22%] rounded-3xl bg-on-background p-5 text-on-primary shadow-2xl shadow-on-surface/20 sm:p-7">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-on-primary/60">
                  <span>Your order</span>
                  <span>#404</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-3xl">🍟</span>
                  <div>
                    <p className="font-headline font-bold">Missing menu item</p>
                    <p className="mt-1 text-sm text-on-primary/60">
                      Searching for a route...
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-on-primary/15">
                  <div className="h-full w-2/5 rounded-full bg-primary-container" />
                </div>
              </div>

              <span className="absolute bottom-[13%] left-[12%] h-3 w-3 rounded-full bg-primary-container sm:h-4 sm:w-4" />
              <span className="absolute bottom-[10%] right-[20%] h-2 w-2 rounded-full bg-tertiary-fixed sm:h-3 sm:w-3" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
