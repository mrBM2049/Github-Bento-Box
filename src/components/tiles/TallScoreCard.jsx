import { motion } from "framer-motion";
import { formatNumber } from "../../utils/formatters";
import { tileVariants } from "../../constants/motion";

export function TallScoreCard({ profile, totalStars, impactRating, contributions }) {
  const hasContrib = contributions != null;

  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-3 lg:col-span-4 lg:row-span-2 md:order-4 lg:order-none min-h-[460px] rounded-bento bg-indigo text-white flex flex-col justify-between overflow-hidden shadow-md"
    >
      {/* Top Header */}
      <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-white/80 truncate">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span className="truncate">github.com/{profile?.login}</span>
        </div>
      </div>

      {/* Headline & Tier Description */}
      <div className="p-6 flex flex-col gap-3 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-prussian self-start border border-white/10 text-xs font-mono">
          <span className="text-teal font-bold">★ {impactRating}</span>
          <span className="text-white/60">• Impact Rating</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight leading-tight text-white mt-1">
          THE OPEN SOURCE DIFFERENCE
        </h2>

        <p className="text-xs font-sans text-white/70 leading-relaxed max-w-xs">
          Comprehensive footprint derived from public repository cadence, community stars, and network reach.
        </p>
      </div>

      {/* Metrics Dock */}
      <div
        className={`bg-prussian p-4 sm:p-5 border-t border-white/10 grid ${
          hasContrib ? "grid-cols-2 gap-2.5" : "grid-cols-3 gap-2"
        } text-center`}
      >
        <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
          <div className="font-mono text-xl sm:text-2xl font-bold text-white">
            {formatNumber(profile?.public_repos)}
          </div>
          <div className="text-[11px] font-sans text-white/60 uppercase tracking-wider mt-0.5">
            Repos
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
          <div className="font-mono text-xl sm:text-2xl font-bold text-teal">
            {formatNumber(totalStars)}
          </div>
          <div className="text-[11px] font-sans text-white/60 uppercase tracking-wider mt-0.5">
            Stars
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
          <div className="font-mono text-xl sm:text-2xl font-bold text-white">
            {formatNumber(profile?.followers)}
          </div>
          <div className="text-[11px] font-sans text-white/60 uppercase tracking-wider mt-0.5">
            Followers
          </div>
        </div>

        {hasContrib && (
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="font-mono text-xl sm:text-2xl font-bold text-gh-green-3">
              {formatNumber(contributions)}
            </div>
            <div className="text-[11px] font-sans text-white/60 uppercase tracking-wider mt-0.5">
              Contributions
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
