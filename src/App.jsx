import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { useGitHubBento } from "./hooks/useGitHubBento";
import { BentoContainer } from "./components/BentoContainer";
import { SkeletonBento } from "./components/SkeletonBento";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const bentoRef = useRef(null);
  const { data, loading, error, searchUser } = useGitHubBento("torvalds");

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
        backgroundColor: "#eef5f6",
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
        <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <form onSubmit={handleSubmit} className="flex-1 max-w-sm">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search GitHub username..."
              className="w-full bg-white text-prussian placeholder-dusk/60 text-sm font-sans px-4 py-2.5 rounded-full border border-prussian/10 focus:outline-none focus:ring-2 focus:ring-teal shadow-sm"
            />
          </form>

          {loading && (
            <span className="text-xs font-mono text-dusk self-center animate-pulse">
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
              onSearch={searchUser}
              onExport={handleDownloadPng}
              isExporting={isExporting}
            />
          )
        )}
      </main>
    </div>
  );
}
