import { formatNumber } from "../../utils/formatters";

export function FeaturedRepoTile({ topRepo, onExport }) {
  return (
    <div className="col-span-12 lg:col-span-5 min-h-[220px] rounded-bento overflow-hidden bg-teal flex shadow-md relative">
      {/* Main Prussian Dark Panel */}
      <div className="w-[76%] bg-prussian rounded-r-[26px] p-5 sm:p-6 text-white flex flex-col justify-between shadow-2xl z-10">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-teal uppercase tracking-wider font-semibold">FEATURED REPO</span>
          {topRepo && (
            <span className="text-teal font-bold">★ {formatNumber(topRepo.stargazers_count)}</span>
          )}
        </div>

        {topRepo ? (
          <div className="my-auto">
            <a
              href={topRepo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl uppercase tracking-tight text-white hover:text-teal transition-colors block truncate"
            >
              {topRepo.name}
            </a>
            <p className="text-xs font-sans text-white/70 line-clamp-2 mt-1 leading-relaxed">
              {topRepo.description || "Open source contribution hosted on GitHub."}
            </p>
          </div>
        ) : (
          <div className="text-xs text-white/60 my-auto">No public repositories found.</div>
        )}

        <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/10">
          <span>{topRepo?.language || "Source"}</span>
          <span>{formatNumber(topRepo?.forks_count)} forks</span>
        </div>
      </div>

      {/* Exposed Teal Accent Side */}
      <div className="w-[24%] flex flex-col items-center justify-center p-3 text-prussian">
        <button
          onClick={onExport}
          title="Export / Share Bento"
          className="w-12 h-12 rounded-full bg-prussian text-teal flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 duration-150"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase mt-2 text-prussian text-center">
          EXPORT
        </span>
      </div>
    </div>
  );
}

