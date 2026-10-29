import { motion } from "framer-motion";
import { tileVariants } from "../../constants/motion";

export function AvatarPortraitTile({ profile }) {
  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-3 lg:col-span-4 md:order-6 lg:order-none min-h-[220px] rounded-bento bg-dusk text-white p-6 relative overflow-hidden flex flex-col justify-between shadow-md"
    >
      <div className="flex items-center justify-between text-xs font-mono relative z-10">
        <span className="text-teal uppercase tracking-widest font-semibold">PORTRAIT ARCHIVE</span>
        <span className="text-white/60">ID // {profile?.id || "N/A"}</span>
      </div>

      <div className="flex items-center gap-4 my-auto relative z-10">
        <div className="relative">
          <img
            src={profile?.avatar_url}
            alt={profile?.login}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-teal shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-teal text-prussian flex items-center justify-center font-mono font-bold text-xs shadow-md">
            ★
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight truncate leading-none text-white">
            {profile?.name || profile?.login}
          </h3>
          <p className="text-xs font-sans text-white/80 truncate mt-1">
            {profile?.company || "Independent Creator"}
          </p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-prussian/60 text-[11px] font-mono text-teal border border-teal/20">
            {profile?.type || "User"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-white/70 relative z-10">
        <span>DEV AVATAR</span>
        <span className="text-teal font-medium">AUTHENTICATED</span>
      </div>
    </motion.div>
  );
}
