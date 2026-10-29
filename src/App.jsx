import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { useGitHubBento } from "./hooks/useGitHubBento";
import { BentoContainer } from "./components/BentoContainer";
import { SkeletonBento } from "./components/SkeletonBento";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const bentoRef = useRef(null);
  const { data, loading, error, searchUser } = useGitHubBento("mrBM2049");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchUser(searchInput.trim());
      setSearchInput("");
    }
  };

  const handleDownloadPng = async () => {
    if (!bentoRef.current || !data?.profile?.login) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(bentoRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#F2F5F3",
      });
      const link = document.createElement("a");
      link.download = `${data.profile.login}-bento-card.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // Ignore export failures
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-prussian py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <main className="w-full max-w-[1240px] mx-auto flex flex-col gap-6">
        {/* Centered Search Field */}
        <header className="flex flex-col items-center justify-center gap-2 w-full">
          <form onSubmit={handleSubmit} className="w-full max-w-md relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search GitHub username..."
              className="w-full bg-white text-prussian placeholder-gh-gray-4 text-sm font-sans pl-11 pr-20 py-2.5 rounded-full border border-prussian/10 focus:outline-none focus:ring-2 focus:ring-teal shadow-sm transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gh-gray-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-prussian text-teal hover:bg-indigo text-xs font-mono font-semibold transition-colors"
            >
              Search
            </button>
          </form>

          {loading && (
            <span className="text-xs font-mono text-gh-gray-4 animate-pulse">
              Syncing GitHub metrics...
            </span>
          )}
        </header>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-sans text-center">
            {error}
          </div>
        )}

        {loading && !data ? (
          <SkeletonBento />
        ) : (
          data && (
            <BentoContainer
              ref={bentoRef}
              data={data}
              onExport={handleDownloadPng}
              isExporting={isExporting}
            />
          )
        )}
      </main>
    </div>
  );
}
