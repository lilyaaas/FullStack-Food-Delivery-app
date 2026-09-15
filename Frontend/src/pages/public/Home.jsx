import { Link } from "react-router-dom";
import {
  Zap,
  MapPin,
  Search,
  Star,
  ArrowRight,
  ChefHat,
  Bike,
  PackageCheck,
} from "lucide-react";

const ORDER_STEPS = ["Placed", "Cooking", "On the way", "Delivered"];
const STEP_ICONS = [PackageCheck, ChefHat, Bike, MapPin];
const ACTIVE_STEP = 2;

const Home = () => {
  return (
    <div className="bg-background text-on-background antialiased font-body">
      {/* HERO SECTION */}
      <section className="relative min-h-230.25 flex items-center overflow-hidden pt-12">
        <div className="mx-auto px-6 2xl:px-40 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 items-center">
          {/* Left Column: Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-headline text-on-background tracking-tight leading-[0.95] mb-6">
              Order now,
              <br />
              eat in 30 minutes.
            </h1>

            <p className="text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
              The best restaurants near you, delivered before your cravings
              change their mind.
            </p>

            {/* Search Input Group */}
            <div className="relative max-w-xl group">
              <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-110 group-focus-within:bg-primary/10 transition-colors"></div>
              <div className="relative flex p-2 rounded-full bg-surface-container-lowest shadow-2xl shadow-on-surface/5 border border-outline-variant/15">
                <div className="flex items-center pl-4 pr-2">
                  <MapPin className="w-6 h-6 text-outline" />
                </div>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 outline-none text-on-surface font-medium placeholder:text-on-surface-variant/50 py-4"
                  placeholder="Enter your delivery address"
                  type="text"
                />
                <button className="hover:cursor-pointer flex items-center justify-center aspect-square h-14 w-14 rounded-full bg-linear-to-br from-primary to-primary-container text-on-primary hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/30">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                <img
                  className="w-12 h-12 rounded-full border-4 border-surface shadow-sm object-cover"
                  alt="user 1"
                  src="https://i.pravatar.cc/100?img=1"
                />
                <img
                  className="w-12 h-12 rounded-full border-4 border-surface shadow-sm object-cover"
                  alt="user 2"
                  src="https://i.pravatar.cc/100?img=2"
                />
                <img
                  className="w-12 h-12 rounded-full border-4 border-surface shadow-sm object-cover"
                  alt="user 3"
                  src="https://i.pravatar.cc/100?img=3"
                />
              </div>
              <div>
                <div className="font-headline font-bold text-on-background">
                  15,000+ happy foodies
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-tertiary-fixed fill-current"
                    />
                  ))}
                  <span className="text-sm font-semibold text-on-surface-variant ml-1">
                    4.9 average rating
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live order ticket */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-surface-container-high rounded-full opacity-40 blur-3xl"></div>

            <div className="relative w-full max-w-sm rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-surface-container-lowest rounded-3xl shadow-[0_30px_60px_-15px_rgba(75,36,9,0.25)] overflow-hidden">
                {/* Header */}
                <div className="px-6 pt-6 pb-5 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">
                      Order #4821
                    </div>
                    <div className="text-lg font-black font-headline text-on-background mt-1">
                      Kinetic Burger Co.
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary-container/15 text-primary px-3 py-1.5 rounded-full text-xs font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Live
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 space-y-2 pb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface font-medium">
                      1× Smoky Cheeseburger
                    </span>
                    <span className="text-on-surface-variant">$45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface font-medium">
                      1× Loaded Fries
                    </span>
                    <span className="text-on-surface-variant">$20</span>
                  </div>
                </div>

                {/* Perforated divider */}
                <div className="relative h-0">
                  <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-background"></div>
                  <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-background"></div>
                  <div className="border-t-2 border-dashed border-outline-variant mx-6"></div>
                </div>

                {/* ETA + steps */}
                <div className="px-6 pt-6 pb-6 bg-surface-container-low">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary fill-current" />
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black font-headline text-primary leading-none">
                        18
                      </span>
                      <span className="text-on-surface-variant font-semibold mb-1">
                        min away
                      </span>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between px-1">
                    <div className="absolute left-3 right-3 top-3 h-0.5 bg-outline-variant"></div>
                    <div
                      className="absolute left-3 top-3 h-0.5 bg-primary transition-all duration-500"
                      style={{
                        width: `calc(${(ACTIVE_STEP / (ORDER_STEPS.length - 1)) * 100}% - 24px)`,
                      }}
                    ></div>

                    {ORDER_STEPS.map((label, i) => {
                      const Icon = STEP_ICONS[i];
                      const isDone = i < ACTIVE_STEP;
                      const isActive = i === ACTIVE_STEP;
                      return (
                        <div
                          key={label}
                          className="relative z-10 flex flex-col items-center gap-2 w-1/4"
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isDone
                                ? "bg-primary text-on-primary"
                                : isActive
                                ? "bg-primary-container text-on-primary ring-4 ring-primary-container/30"
                                : "bg-surface-container-high text-on-surface-variant"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-semibold text-on-surface-variant text-center">
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BENTO GRID */}
      <section className="mx-auto px-6 2xl:px-24 w-full py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black font-headline text-on-background tracking-tight mb-2">
              Top rated by neighbors
            </h2>
            <p className="text-on-surface-variant">
              Restaurants people order from again and again
            </p>
          </div>
          <Link
            to="/restaurants"
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
          >
            View all restaurants
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-125">
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Gourmet dinner plates"
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/10 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-on-primary/80 font-bold text-xs">
                12 restaurants nearby
              </span>
              <h3 className="text-3xl font-black font-headline text-on-primary mt-1">
                Gourmet Dinner
              </h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Sweet treats"
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-black font-headline text-on-primary">
                Sweet Treats
              </h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Healthy eats"
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-black font-headline text-on-primary">
                Healthy Eats
              </h3>
            </div>
          </div>

          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Chilled drinks"
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent"></div>
            <div className="absolute bottom-4 left-6">
              <h3 className="text-2xl font-black font-headline text-on-primary">
                Chilled Drinks
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;