import { motion } from "framer-motion";
import { formatNumber } from "../../utils/formatters";
import { tileVariants } from "../../constants/motion";

export function PinnedReposTile({ topRepos = [], isPinned = false, onExport, isExporting }) {
  const hasRepos = topRepos.length > 0;
  const showScrollHint = topRepos.length > 3;

  return (
    <motion.div
      variants={tileVariants}
      className="col-span-12 md:col-span-6 lg:col-span-8 min-h-[220px] rounded-bento overflow-hidden bg-teal flex shadow-md relative"
    >
      {/* Dark Main Panel */}
      <div className="flex-1 bg-prussian rounded-r-[26px] p-5 sm:p-6 text-white flex flex-col justify-between shadow-2xl z-10 min-w-0">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-teal uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12V4H17V2H7V4H8V12L5 15V17H11V22H13V17H19V15L16 12Z" />
            </svg>
            {isPinned ? "TOP PINNED REPOSITORIES" : "TOP REPOSITORIES"}
          </span>
          <span className="text-white/60">
            {showScrollHint
              ? `${topRepos.length} REPOS (SCROLL →)`
              : `${topRepos.length} ${isPinned ? "PINNED" : "FEATURED"}`}
          </span>
        </div>

        {hasRepos ? (
          <div className="flex gap-2.5 overflow-x-auto my-auto py-2.5 scroll-smooth select-none">
            {topRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex flex-col justify-between min-h-[115px] group flex-shrink-0 ${
                  topRepos.length === 1
                    ? "flex-1 min-w-[240px]"
                    : topRepos.length === 2
                    ? "w-[calc(50%-5px)] min-w-[220px]"
                    : "w-[calc(33.333%-7px)] min-w-[200px] sm:min-w-[215px]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-sans font-bold text-sm text-white group-hover:text-teal transition-colors truncate">
                      {repo.name}
                    </span>
                    <span className="text-xs font-mono text-teal font-semibold flex-shrink-0">
                      ★ {formatNumber(repo.stargazers_count)}
                    </span>
                  </div>
                  <p className="text-[11px] font-sans text-white/70 line-clamp-2 mt-1 leading-relaxed">
                    {repo.description || "Public repository on GitHub."}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-2 border-t border-white/5 mt-2">
                  <span className="truncate">{repo.language || "Source"}</span>
                  <span className="flex-shrink-0">{formatNumber(repo.forks_count)} forks</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-xs text-white/60 my-auto">No pinned or public repositories found.</div>
        )}

        <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/10">
          <span>{isPinned ? "CURATED PINNED REPOS" : "TOP REPOSITORIES"}</span>
          <span className="text-teal font-medium">PUBLIC REPOSITORIES</span>
        </div>
      </div>

      {/* Exposed Export Accent Side */}
      <div className="w-[90px] sm:w-[110px] flex flex-col items-center justify-center p-3 text-prussian flex-shrink-0">
        <button
          onClick={onExport}
          disabled={isExporting}
          title="Export / Share Bento"
          className="w-12 h-12 rounded-full bg-prussian text-teal flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-60 duration-150"
        >
          {isExporting ? (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          )}
        </button>
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase mt-2 text-prussian text-center">
          {isExporting ? "SAVING..." : "EXPORT"}
        </span>
      </div>
    </motion.div>
  );
}
