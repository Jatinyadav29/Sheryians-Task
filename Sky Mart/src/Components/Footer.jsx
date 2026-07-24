export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-zinc-400 border-t border-zinc-900/80 overflow-hidden pt-16 pb-8 px-6 md:px-12 relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 mb-16 md:mb-24">
        <div className="max-w-xs space-y-4">
          <div className="w-5 h-5 grid grid-cols-2 gap-1 opacity-80">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-100 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          </div>

          <p className="text-zinc-200 text-lg md:text-xl font-light leading-snug tracking-tight">
            A task of Sheryians COHORT3.
          </p>
        </div>

        <div className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>React</span>
        </div>
      </div>

      <div className="w-full flex items-baseline justify-center relative pt-8 border-t border-zinc-900/60">
        <h1 className="text-[18vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-zinc-200 via-zinc-400 to-zinc-700/30 uppercase pointer-events-none">
          COHORT3
        </h1>
        <span className="text-[3vw] font-light text-zinc-400 translate-y-[-8vw] ml-1">
          ©
        </span>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-600 font-mono gap-2">
        <p>© {new Date().getFullYear()} SHERYIANS INC. ALL RIGHTS RESERVED.</p>
        <p className="tracking-wider">Made ny Jatin</p>
      </div>
    </footer>
  );
}
