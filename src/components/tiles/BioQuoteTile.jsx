import { motion } from "framer-motion";
import { formatYear } from "../../utils/formatters";
import { tileVariants } from "../../constants/motion";

export function BioQuoteTile({ profile }) {
  const memberSince = formatYear(profile?.created_at);
  const headline = profile?.company
    ? `SHAPING SYSTEMS AT ${profile.company.replace(/^@/, "").toUpperCase()}!`
    : `BUILDING SINCE ${memberSince}!`;

  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-2 lg:col-span-3 min-h-[220px] rounded-bento bg-indigo text-white p-6 relative flex flex-col justify-between shadow-md"
    >
      <div className="absolute left-6 top-6 bottom-6 w-px bg-white/20 hidden sm:block" />
      <div className="absolute left-[15px] top-8 w-5 h-5 rounded-full bg-prussian border border-teal text-teal text-xs font-serif font-bold items-center justify-center hidden sm:flex">
        “
      </div>

      <div className="sm:pl-6 flex flex-col gap-2 my-auto">
        <h3 className="font-display text-xl sm:text-2xl uppercase leading-tight tracking-tight text-white line-clamp-2">
          {headline}
        </h3>
        <p className="text-xs font-sans text-white/80 line-clamp-3 leading-relaxed mt-1">
          {profile?.bio || `Active open-source contributor managing ${profile?.public_repos || 0} public repositories on GitHub.`}
        </p>
      </div>

      <div className="sm:pl-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5 truncate text-teal">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="truncate uppercase">{profile?.location || "GLOBAL / REMOTE"}</span>
        </div>
      </div>
    </motion.div>
  );
}
