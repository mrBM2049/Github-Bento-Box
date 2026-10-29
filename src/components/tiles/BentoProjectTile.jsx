import { motion } from "framer-motion";
import { tileVariants } from "../../constants/motion";

export function BentoProjectTile() {
  const repoUrl = "https://github.com/mrBM2049/Github-Bento-Box";

  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-3 lg:col-span-4 min-h-[220px] rounded-bento bg-indigo text-white p-6 sm:p-7 flex flex-col justify-between shadow-md relative group border border-white/5"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-teal uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          PROJECT SOURCE
        </span>
        <svg className="w-5 h-5 text-white/80 group-hover:text-teal transition-colors" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </div>

      {/* Title & Description */}
      <div className="my-auto py-2">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-teal transition-colors block leading-tight"
        >
          mrBM2049 / Github-Bento-Box
        </a>
        <p className="mt-1.5 text-xs font-sans text-white/70 line-clamp-2 leading-relaxed">
          Open-source editorial GitHub profile dashboard built with React 19, Tailwind CSS &amp; Bento Grid architecture.
        </p>
      </div>

      {/* Direct Star Link Button */}
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-2xl bg-teal text-prussian font-mono text-xs font-bold hover:bg-gh-green-3 transition-all shadow-md active:scale-98"
      >
        <span className="flex items-center gap-1.5">
          <span>★</span>
          <span>STAR REPOSITORY</span>
        </span>
        <span>VIEW ON GITHUB ↗</span>
      </a>
    </motion.div>
  );
}
