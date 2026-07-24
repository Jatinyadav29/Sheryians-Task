import { ArrowUpRight, Play, ArrowRight, Sparkles, Star } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen text-white pt-6 pb-24 max-w-6xl mx-auto px-4 space-y-24">
      <section className="flex flex-col items-center text-center space-y-4 pt-8">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
          About <span className="text-gray-400">201Mart</span>
        </h1>

        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-light leading-relaxed">
          We are committed to delivering exceptional quality, seamless shopping
          experiences, and curated modern essentials for everyday lifestyle.
        </p>
      </section>

      <section className="space-y-10 border-t border-zinc-800/80 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-white leading-snug">
              Your Goals, Our Commitment
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-lg leading-relaxed">
            Our platform bridges innovation with reliability. We focus on
            delivering curated products that elevate your everyday routine
            through quality craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-800/80 rounded-3xl p-5 bg-zinc-900/40 backdrop-blur-sm space-y-4 group hover:border-gray-800/60 transition">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-zinc-200">
                Industry Recognition
              </h3>
              <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-gray-900/40 transition">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Consistently rated as a top-choice e-commerce platform for curated
              modern living.
            </p>
            <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-zinc-800">
              <img
                src="https://i.pinimg.com/control1/1200x/d7/39/8a/d7398af1b5b67500c64a405ff04d4db8.jpg"
                alt="Industry Recognition"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-5 bg-zinc-900/40 backdrop-blur-sm space-y-4 group hover:border-gray-800/60 transition">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-zinc-200">
                Competitive Advantage
              </h3>
              <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-gray-900/40 transition">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Direct-to-consumer partnerships ensuring unbeatable value without
              sacrificing quality.
            </p>
            <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-zinc-800">
              <img
                src="https://i.pinimg.com/736x/bd/1f/d7/bd1fd740a59a3e66dfad69ecf95708b1.jpg"
                alt="Competitive Advantage"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-5 bg-zinc-900/40 backdrop-blur-sm space-y-4 group hover:border-gray-800/60 transition">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-zinc-200">
                Commit To Excellence
              </h3>
              <div className="w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-gray-900/40 transition">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Uncompromising standards in customer fulfillment, secure checkout,
              and rapid delivery.
            </p>
            <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-zinc-800">
              <img
                src="https://i.pinimg.com/control1/1200x/4b/f5/06/4bf506764e132005d1c05d0148c458e6.jpg"
                alt="Commitment"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10 border-t border-zinc-800/80 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-white leading-snug">
              Market Expertise You Can Count On
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition flex items-center gap-2 cursor-pointer shadow-lg">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-700 transition cursor-pointer">
              <Play className="w-4 h-4 fill-zinc-300 text-zinc-300 ml-0.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-900/30 h-44 lg:h-auto">
            <img
              src="https://i.pinimg.com/736x/4a/40/e8/4a40e8f2c864f4e4de316e3ee0c12d08.jpg"
              alt="Analytics"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-6 bg-zinc-900/40 backdrop-blur-sm flex flex-col justify-between h-44">
            <div>
              <span className="text-3xl font-bold text-white block">10+</span>
              <span className="text-xs text-zinc-400 font-light mt-1 block">
                Years Experience
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-light">
              Pioneering modern e-commerce storefront solutions.
            </p>
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-6 bg-zinc-900/40 backdrop-blur-sm flex flex-col justify-between h-44">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-white">
                <Sparkles className="w-4 h-4" />
                <ArrowUpRight className="w-4 h-4 text-zinc-600" />
              </div>
              <span className="text-3xl font-bold text-white block">
                50,000+
              </span>
              <span className="text-xs text-zinc-400 font-light block">
                Happy Clients
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-light">
              Across 20+ countries worldwide.
            </p>
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-6 bg-zinc-900/40 backdrop-blur-sm flex flex-col justify-between h-44">
            <div>
              <span className="text-3xl font-bold text-white block">25+</span>
              <span className="text-xs text-zinc-400 font-light mt-1 block">
                Dedicated Team
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-light">
              Engineers, designers, and curators.
            </p>
          </div>

          <div className="border border-white/40 rounded-3xl p-6 bg-white/10 backdrop-blur-sm flex flex-col justify-between h-44">
            <div className="flex -space-x-2">
              <img
                className="w-7 h-7 rounded-full border border-white"
                src="https://i.pinimg.com/control1/1200x/1b/37/6e/1b376efd334574683266abf4b8951234.jpg"
                alt="Avatar"
              />
              <img
                className="w-7 h-7 rounded-full border border-white"
                src="https://i.pinimg.com/736x/b8/bb/d2/b8bbd2b611764798ddb4bf729ffc37cd.jpg"
                alt="Avatar"
              />
              <img
                className="w-7 h-7 rounded-full border border-white"
                src="https://i.pinimg.com/736x/c4/41/2f/c4412f3151e7f7d15924d74a2648b6f4.jpg"
                alt="Avatar"
              />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white">
                Get Started With Us
              </h4>
              <p className="text-[11px] text-gray-300 font-light mt-0.5">
                Explore our newest product catalog today.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10 border-t border-zinc-800/80 pt-16">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Dedicated Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-zinc-800/80 rounded-3xl p-4 bg-zinc-900/30 backdrop-blur-sm space-y-3 group hover:border-zinc-700 transition">
            <div className="w-full aspect-3/4 rounded-2xl overflow-hidden bg-zinc-800">
              <img
                src="https://i.pinimg.com/736x/5d/77/2b/5d772b922d063b3ae9289d9e39f13f5c.jpg"
                alt="Team Member"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="px-1">
              <h3 className="text-sm font-semibold text-white">
                Arthur Morgan
              </h3>
              <p className="text-xs text-zinc-400 font-light">Founder & CEO</p>
            </div>
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-4 bg-zinc-900/30 backdrop-blur-sm space-y-3 group hover:border-zinc-700 transition">
            <div className="w-full aspect-3/4 rounded-2xl overflow-hidden bg-zinc-800">
              <img
                src="https://i.pinimg.com/736x/5b/6c/6e/5b6c6ed86bdef914d38322f10ba6e423.jpg"
                alt="Team Member"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="px-1">
              <h3 className="text-sm font-semibold text-white">Ada Wong</h3>
              <p className="text-xs text-zinc-400 font-light">
                Head of Product
              </p>
            </div>
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-4 bg-zinc-900/30 backdrop-blur-sm space-y-3 group hover:border-zinc-700 transition">
            <div className="w-full aspect-3/4 rounded-2xl overflow-hidden bg-zinc-800">
              <img
                src="https://i.pinimg.com/736x/42/31/0c/42310cf70779cb84bd3520e0a82927ca.jpg"
                alt="Team Member"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="px-1">
              <h3 className="text-sm font-semibold text-white">Grace Kelly</h3>
              <p className="text-xs text-zinc-400 font-light">Lead Designer</p>
            </div>
          </div>

          <div className="border border-zinc-800/80 rounded-3xl p-4 bg-zinc-900/30 backdrop-blur-sm space-y-3 group hover:border-zinc-700 transition">
            <div className="w-full aspect-3/4 rounded-2xl overflow-hidden bg-zinc-800">
              <img
                src="https://i.pinimg.com/736x/7d/b5/46/7db546e3b0fe583d06f978189d805809.jpg"
                alt="Team Member"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="px-1">
              <h3 className="text-sm font-semibold text-white">Leon Kennedy</h3>
              <p className="text-xs text-zinc-400 font-light">
                Operations Lead
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
