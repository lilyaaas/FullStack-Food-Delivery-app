import { Link } from "react-router-dom";
import { Zap, MapPin, Search, Star, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container font-body">
      {/* HERO SECTION */}
      <section className="relative min-h-230.25 flex items-center overflow-hidden pt-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 items-center">
          {/* Left Column: Content */}
          <div className="z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-primary font-bold text-sm mb-6">
              <Zap className="w-5 h-5 fill-current" />
              EXPRESS DELIVERY IN 30 MIN
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-headline text-on-background tracking-tight leading-[0.95] mb-6">
              Fastest <br />
              <span className="text-primary italic">Delivery</span> <br />
              in Town
            </h1>

            <p className="text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed">
              Craving something delicious? Order from the best restaurants and
              get it delivered in under 30 minutes. Your next meal is just a tap
              away.
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
                  15,000+ Happy Foodies
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-tertiary-fixed fill-current"
                    />
                  ))}
                  <span className="text-sm font-semibold text-on-surface-variant ml-1">
                    4.9/5 Rating
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Composition */}
          <div className="relative h-150 lg:h-175 order-1 lg:order-2 hidden md:block">
            {/* Background Organic Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-surface-container-high rounded-full opacity-30 blur-3xl"></div>

            {/* Main Burger Plate */}
            <div className="absolute top-[10%] left-[10%] z-30 group hover:scale-110 transition-transform duration-500 cursor-pointer">
              <div className="relative p-4">
                <img
                  className="w-80 h-80 object-cover rounded-full shadow-[0_30px_60px_-15px_rgba(75,36,9,0.25)] border-12 border-surface-container-lowest"
                  alt="Gourmet Burger"
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop"
                />
                <div className="absolute -bottom-2 -right-2 bg-surface-container-lowest p-3 rounded-2xl shadow-xl border border-outline-variant/10">
                  <div className="text-xs font-bold text-primary tracking-widest uppercase">
                    Popular
                  </div>
                  <div className="text-sm font-black text-on-background">
                    Kinetic Burger
                  </div>
                </div>
              </div>
            </div>

            {/* Pizza Plate */}
            <div className="absolute top-[40%] right-[0%] z-20 group hover:scale-110 transition-transform duration-500 cursor-pointer">
              <div className="relative p-4">
                <img
                  className="w-72 h-72 object-cover rounded-full shadow-[0_30px_60px_-15px_rgba(75,36,9,0.2)] border-10 border-surface-container-lowest"
                  alt="Fresh Pizza"
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
                />
                <div className="absolute -top-4 -right-4 bg-tertiary-fixed text-on-tertiary-fixed px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  Fresh Out
                </div>
              </div>
            </div>

            {/* Salad Plate */}
            <div className="absolute bottom-[5%] left-[0%] z-10 group hover:scale-110 transition-transform duration-500 cursor-pointer">
              <div className="relative p-4">
                <img
                  className="w-64 h-64 object-cover rounded-full shadow-[0_30px_60px_-15px_rgba(75,36,9,0.15)] border-8 border-surface-container-lowest"
                  alt="Healthy Salad"
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BENTO GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black font-headline text-on-background tracking-tight mb-2">
              Explore by Restaurant
            </h2>
            <p className="text-on-surface-variant">
              Hand-picked curated Restaurants for your appetite
            </p>
          </div>
          <Link
            to="/restaurants"
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
          >
            View all Restaurants{" "}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-125">
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Gourmet Dinner"
              src="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/50e8eeb609f340f788ddddf8bc7faaa3/BFV28280EasySalmonDinnervsGourmetSalmonDinnerFBV4.jpg?resize=1200:*"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-primary-container font-bold tracking-widest uppercase text-xs">
                Featured
              </span>
              <h3 className="text-3xl font-black font-headline text-white mt-1">
                Gourmet Dinner
              </h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Sweet Treats"
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-black font-headline text-white">
                Sweet Treats
              </h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Healthy Eats"
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-black font-headline text-white">
                Healthy Eats
              </h3>
            </div>
          </div>

          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl bg-surface-container-low shadow-sm cursor-pointer">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Chilled Drinks"
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-6">
              <h3 className="text-2xl font-black font-headline text-white">
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