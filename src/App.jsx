import { useState } from "react";
import { useGitHubBento } from "./hooks/useGitHubBento";
import { formatNumber, formatYear } from "./utils/formatters";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const { data, loading, error, searchUser } = useGitHubBento("torvalds");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchUser(searchInput.trim());
      setSearchInput("");
    }
  };

  const profile = data?.profile;

  return (
    <div className="min-h-screen bg-canvas text-prussian py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <main className="w-full max-w-[1240px] mx-auto flex flex-col gap-5">
        <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <form onSubmit={handleSubmit} className="flex-1 max-w-md">
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
              Fetching GitHub data...
            </span>
          )}
        </header>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-sans text-center">
            {error}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-bento bg-indigo text-white flex flex-col justify-between min-h-[200px]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-teal font-semibold tracking-wider">OCTO // 01</span>
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
              </div>
              <div>
                <svg className="w-12 h-12 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <div className="mt-3 font-sans font-bold text-lg text-white">GitHub Bento</div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 lg:col-span-5 p-6 rounded-bento bg-white text-prussian border border-prussian/5 flex flex-col justify-between min-h-[200px]">
              <span className="text-xs font-mono text-dusk uppercase tracking-wider">Developer Identity</span>
              <div>
                <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-prussian leading-none break-all">
                  @{profile?.login}
                </h1>
                <p className="mt-1 text-sm font-sans text-dusk">
                  {profile?.name || profile?.login}
                </p>
              </div>
              <div className="text-xs font-mono text-teal">
                Member since {formatYear(profile?.created_at)}
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 lg:col-span-4 lg:row-span-2 p-6 rounded-bento bg-indigo text-white flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono text-white/70">github.com/{profile?.login}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-prussian text-teal text-xs font-mono font-bold">
                    ★ {data.impactRating}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-teal">Impact Tier</span>
                  <h2 className="mt-2 font-display text-4xl uppercase leading-tight tracking-tight">
                    THE OPEN SOURCE DIFFERENCE
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-prussian/70 border border-white/5 text-center">
                <div>
                  <div className="font-mono text-xl font-bold text-teal">{formatNumber(data.totalStars)}</div>
                  <div className="text-[11px] font-sans text-white/70 uppercase">Stars</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-white">{formatNumber(data.totalForks)}</div>
                  <div className="text-[11px] font-sans text-white/70 uppercase">Forks</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-white">{formatNumber(profile?.followers)}</div>
                  <div className="text-[11px] font-sans text-white/70 uppercase">Followers</div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 lg:col-span-8 p-4 rounded-bento bg-white border border-prussian/5 flex flex-col justify-between">
              <span className="px-2 text-xs font-mono text-dusk uppercase tracking-wider mb-2">
                Top Languages Distribution
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {data.topLanguages.map((lang, index) => (
                  <div
                    key={`${lang.name}-${index}`}
                    style={{ backgroundColor: lang.bg, color: lang.text }}
                    className="p-3.5 rounded-2xl flex flex-col justify-between min-h-[120px] transition-transform hover:-translate-y-1 duration-150"
                  >
                    <div className="text-xs font-sans font-bold truncate">{lang.name}</div>
                    <div>
                      <div className="font-mono text-xl font-bold">{lang.percentage}%</div>
                      <div className="text-[10px] opacity-75 font-mono">{lang.count} repos</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 lg:col-span-4 p-5 rounded-bento bg-dusk text-white flex items-center gap-4 min-h-[180px]">
              <img
                src={profile?.avatar_url}
                alt={profile?.login}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-teal shadow-md flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-mono text-teal">PROFILE AVATAR</div>
                <div className="font-sans font-bold text-lg text-white truncate mt-0.5">
                  {profile?.name || profile?.login}
                </div>
                <div className="text-xs text-white/75 truncate mt-1">
                  {profile?.company || "Independent Developer"}
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 lg:col-span-3 p-5 rounded-bento bg-indigo text-white flex flex-col justify-between min-h-[180px]">
              <span className="text-xs font-mono text-teal uppercase tracking-wider">Bio &amp; Region</span>
              <p className="text-xs font-sans text-white/90 line-clamp-3 leading-relaxed">
                {profile?.bio || `Active open-source contributor managing ${profile?.public_repos || 0} repositories.`}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-white/80 pt-2 border-t border-white/10">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="truncate">{profile?.location || "Global / Remote"}</span>
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 lg:col-span-5 p-5 rounded-bento bg-prussian text-white flex flex-col justify-between min-h-[180px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal uppercase tracking-wider">Top Starred Repository</span>
                {data.topRepo && (
                  <span className="text-xs font-mono text-teal">★ {formatNumber(data.topRepo.stargazers_count)}</span>
                )}
              </div>

              {data.topRepo ? (
                <div>
                  <a
                    href={data.topRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-bold text-lg text-white hover:text-teal transition-colors truncate block"
                  >
                    {data.topRepo.name}
                  </a>
                  <p className="text-xs text-white/70 line-clamp-2 mt-1 font-sans leading-relaxed">
                    {data.topRepo.description || "No description provided."}
                  </p>
                </div>
              ) : (
                <div className="text-xs text-white/60">No public repositories found.</div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-2 border-t border-white/10">
                <span>{data.topRepo?.language || "Various"}</span>
                <span>{formatNumber(data.topRepo?.forks_count)} forks</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
