import { useState } from "react";
import { motion } from "framer-motion";
import { tileVariants } from "../../constants/motion";
import { formatYear } from "../../utils/formatters";

export function ProfileIdentityTile({ profile }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = profile?.html_url || `https://github.com/${profile?.login}`;

  const handleCopy = () => {
    if (!profile?.login) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-4 lg:col-span-5 min-h-[220px] rounded-bento bg-white text-prussian p-6 sm:p-7 flex flex-col justify-between border border-prussian/5 shadow-sm"
    >
      {/* Top Header with Copy Link Action */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-gh-gray-4 uppercase tracking-widest font-semibold">
          DEVELOPER IDENTITY
        </span>
        <button
          onClick={handleCopy}
          title="Copy GitHub profile URL"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas hover:bg-gh-gray-2 text-prussian text-xs font-mono font-medium border border-prussian/10 transition-colors"
        >
          <svg className="w-3.5 h-3.5 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          <span>{copied ? "COPIED ✓" : "COPY LINK"}</span>
        </button>
      </div>

      {/* Unified Avatar + Clickable Handle Layout */}
      <div className="flex items-center gap-4 my-auto">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open @${profile?.login} on GitHub`}
          className="relative flex-shrink-0 group"
        >
          <img
            src={profile?.avatar_url}
            alt={profile?.login}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-teal text-prussian flex items-center justify-center font-mono font-bold text-[11px] shadow">
            ★
          </div>
        </a>

        <div className="min-w-0 flex-1">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open @${profile?.login} on GitHub`}
            className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-prussian leading-none truncate block hover:text-teal transition-colors"
          >
            @{profile?.login}
          </a>
          <p className="mt-1 text-sm sm:text-base font-sans font-bold text-gh-gray-5 truncate">
            {profile?.name || profile?.login}
          </p>
          {profile?.company && (
            <p className="text-xs font-sans text-gh-gray-4 truncate mt-0.5">
              {profile.company}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Identity Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-gh-gray-4 pt-2 border-t border-prussian/5">
        <span>MEMBER SINCE {formatYear(profile?.created_at)}</span>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal font-semibold flex items-center gap-1.5 hover:underline"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal" />
          PUBLIC PROFILE ↗
        </a>
      </div>
    </motion.div>
  );
}
