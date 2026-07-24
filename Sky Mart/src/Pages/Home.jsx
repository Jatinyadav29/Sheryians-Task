import { useContext } from "react";
import { MyStore } from "../Context/MyContext";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

const Home = () => {
  let { productsData } = useContext(MyStore);

  return (
    <div className="min-h-screen text-white pt-6 pb-24 max-w-6xl mx-auto flex flex-col gap-20 px-4">
      <section className="relative w-full rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 p-8 sm:p-14 text-center flex flex-col items-center justify-center space-y-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950 to-black pointer-events-none" />

        <span className="relative px-4 py-1.5 rounded-full text-xs font-medium border border-zinc-700/60 bg-zinc-900/80 text-zinc-300 backdrop-blur-md flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          The 2026 Modern Essentials Collection
        </span>

        <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] text-white">
          Redefining Modern Living with <br />
          <span className="text-zinc-400 italic font-serif font-normal">
            Curated Quality
          </span>
        </h1>

        <p className="relative text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl font-light leading-relaxed">
          Discover a thoughtful selection of premium electronics, everyday
          apparel, and refined accessories crafted for longevity and quiet
          sophistication.
        </p>

        <div className="relative flex items-center gap-4 pt-2">
          <Link
            to="/products"
            className="px-7 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition active:scale-[0.98] flex items-center gap-2 cursor-pointer shadow-lg"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="px-7 py-3.5 rounded-full text-xs font-semibold border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700 transition active:scale-[0.98] backdrop-blur-md"
          >
            Our Story
          </Link>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl pt-6">
          <div className="border border-zinc-800/80 rounded-2xl p-4 bg-zinc-900/50 backdrop-blur-md text-left flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700/60 overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop"
                alt="Curated Tech"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">
                Curated Tech & Gear
              </h4>
              <p className="text-[11px] text-zinc-400 font-light mt-0.5">
                Minimalist designs engineered for daily performance.
              </p>
            </div>
          </div>

          <div className="border border-zinc-800/80 rounded-2xl p-4 bg-zinc-900/50 backdrop-blur-md text-left flex items-center gap-4">
            <div className="flex -space-x-2 shrink-0">
              <img
                className="w-8 h-8 rounded-full border border-zinc-800"
                src="https://i.pinimg.com/control1/736x/39/2e/0f/392e0f462c42eff5c04a836ef86fa3ca.jpg"
                alt="Client"
              />
              <img
                className="w-8 h-8 rounded-full border border-zinc-800"
                src="https://i.pinimg.com/736x/62/c5/1f/62c51f4246ff8f5050c1d926f41b099c.jpg"
                alt="Client"
              />
              <img
                className="w-8 h-8 rounded-full border border-zinc-800"
                src="https://i.pinimg.com/control1/736x/da/e7/d6/dae7d6ab8e2abd3e74d776a5fd49a6cb.jpg"
                alt="Client"
              />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">
                10k+ Happy Shoppers
              </h4>
              <p className="text-[11px] text-zinc-400 font-light mt-0.5">
                Trusted worldwide with 4.9/5 satisfaction rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-zinc-800/80 pt-16">
        <div className="lg:col-span-6 space-y-6">
          <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold border border-zinc-800 bg-zinc-900/60 text-zinc-400">
            About 201Mart
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
            Uncompromising Standards for Every Product We Ship
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
            At 201Mart, we believe that everyday essentials should be both
            functional and beautiful. We collaborate directly with trusted
            manufacturers to bring you durable goods without middleman markups.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-medium text-white">4.9 / 5.0</span>
            <span className="text-xs text-zinc-500">
              | 2,400+ Verified Reviews
            </span>
          </div>

          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium border border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:text-white hover:border-zinc-700 transition"
            >
              Learn More About Us <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="w-full aspect-4/3 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
              alt="Brand Showcase"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -top-4 -left-4 sm:left-4 border border-zinc-800 p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-md shadow-2xl space-y-1">
            <span className="text-2xl font-bold text-white block">99.4%</span>
            <span className="text-[10px] text-zinc-400 font-light block">
              On-Time Delivery
            </span>
          </div>

          <div className="absolute -bottom-4 -right-4 sm:right-4 border border-zinc-800 p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-md shadow-2xl space-y-1">
            <span className="text-2xl font-bold text-white block">100%</span>
            <span className="text-[10px] text-zinc-400 font-light block">
              Authentic Quality
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-800/80 pt-16">
        <div className="border border-zinc-800/80 p-6 rounded-3xl bg-zinc-900/30 backdrop-blur-sm space-y-3 group hover:border-zinc-700 transition">
          <div className="w-10 h-10 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-white border border-zinc-700/50">
            <ShieldCheck className="w-5 h-5 text-zinc-300" />
          </div>
          <h3 className="text-sm font-semibold text-white">Curated Quality</h3>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Every item in our catalog undergoes rigorous inspection for material
            integrity and long-term durability.
          </p>
        </div>

        <div className="border border-zinc-800/80 p-6 rounded-3xl bg-zinc-900/30 backdrop-blur-sm space-y-3 group hover:border-zinc-700 transition">
          <div className="w-10 h-10 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-white border border-zinc-700/50">
            <Truck className="w-5 h-5 text-zinc-300" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Worldwide Shipping
          </h3>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            Express global delivery with end-to-end tracking on every order,
            direct to your doorstep.
          </p>
        </div>

        <div className="border border-zinc-800/80 p-6 rounded-3xl bg-zinc-900/30 backdrop-blur-sm space-y-3 group hover:border-zinc-700 transition">
          <div className="w-10 h-10 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-white border border-zinc-700/50">
            <RotateCcw className="w-5 h-5 text-zinc-300" />
          </div>
          <h3 className="text-sm font-semibold text-white">
            Hassle-Free Returns
          </h3>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            30-day transparent return policy backed by 24/7 dedicated customer
            service support.
          </p>
        </div>
      </section>

      <section className="space-y-8 border-t border-zinc-800/80 pt-16">
        <div className="flex justify-between items-end border-b border-zinc-800/60 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Trending Collections
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Explore our highest-rated product picks of the week.
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-medium text-zinc-400 hover:text-white transition flex items-center gap-1"
          >
            View all products <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {productsData && productsData.length > 0 ? (
            productsData
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          ) : (
            <p className="text-zinc-500 text-sm col-span-full">
              Loading featured products...
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
