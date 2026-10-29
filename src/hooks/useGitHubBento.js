import { useState, useEffect, useCallback } from "react";
import { SWATCH_PALETTE } from "../constants/palette";

async function fetchPinnedRepositories(cleanUser) {
  try {
    const res = await fetch(`https://pinned.berrysauce.dev/get/${cleanUser}?_t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Continue to fallback endpoint
  }

  try {
    const fallbackRes = await fetch(`https://gh-pinned-repos-api.ysnirix.xyz/api/get/?username=${cleanUser}`);
    if (fallbackRes.ok) {
      const fallbackData = await fallbackRes.json();
      if (Array.isArray(fallbackData?.response) && fallbackData.response.length > 0) {
        return fallbackData.response;
      }
    }
  } catch {
    // Return empty on failure
  }

  return [];
}

export function useGitHubBento(initialUsername = "mrBM2049") {
  const [username, setUsername] = useState(initialUsername);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchIndex, setFetchIndex] = useState(0);

  const refresh = useCallback(() => {
    setLoading(true);
    setFetchIndex((prev) => prev + 1);
  }, []);

  const searchUser = useCallback((newUser) => {
    setUsername(newUser);
    setLoading(true);
    setError(null);
  }, []);

  useEffect(() => {
    let active = true;

    async function load() {
      const cleanUser = username.trim().replace(/^@/, "");
      if (!cleanUser) return;

      try {
        const [userRes, reposRes, contribRes, pinnedData] = await Promise.all([
          fetch(`https://api.github.com/users/${cleanUser}`),
          fetch(`https://api.github.com/users/${cleanUser}/repos?per_page=100&sort=pushed`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${cleanUser}?y=last`).catch(() => null),
          fetchPinnedRepositories(cleanUser),
        ]);

        if (!userRes.ok) {
          if (userRes.status === 404) throw new Error("GitHub user not found.");
          if (userRes.status === 403) throw new Error("API rate limit exceeded. Try again later.");
          throw new Error("Failed to fetch GitHub profile.");
        }

        const profile = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];

        let contributions = null;
        if (contribRes?.ok) {
          try {
            const contribData = await contribRes.json();
            if (contribData?.total?.lastYear != null) {
              contributions = contribData.total.lastYear;
            }
          } catch {
            contributions = null;
          }
        }

        const ownRepos = Array.isArray(repos) ? repos.filter((r) => !r.fork) : [];
        const totalStars = ownRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        const totalForks = ownRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

        const list = Array.isArray(pinnedData)
          ? pinnedData
          : Array.isArray(pinnedData?.response)
          ? pinnedData.response
          : [];

        let pinnedRepos = [];
        if (list.length > 0) {
          pinnedRepos = list.slice(0, 6).map((r, i) => {
            const matched = ownRepos.find((repo) => repo.name.toLowerCase() === r.name?.toLowerCase());
            return {
              id: `pinned-${i}-${r.name}`,
              name: r.name,
              html_url: matched?.html_url || r.repo || `https://github.com/${r.author || cleanUser}/${r.name}`,
              description: matched?.description || r.description || "Public repository on GitHub.",
              stargazers_count: matched?.stargazers_count ?? (r.stars || 0),
              forks_count: matched?.forks_count ?? (r.forks || 0),
              language: matched?.language || r.language?.name || (typeof r.language === "string" ? r.language : "Source"),
              isPinned: true,
            };
          });
        }

        const sortedByStars = [...ownRepos].sort((a, b) => b.stargazers_count - a.stargazers_count);
        const topRepos = pinnedRepos.length > 0
          ? pinnedRepos
          : sortedByStars.slice(0, 6).map((r) => ({
              id: r.id,
              name: r.name,
              html_url: r.html_url,
              description: r.description,
              stargazers_count: r.stargazers_count,
              forks_count: r.forks_count,
              language: r.language || "Source",
              isPinned: false,
            }));

        const topRepo = topRepos[0] || null;

        const langCounts = {};
        let totalLangRepos = 0;
        ownRepos.forEach((repo) => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            totalLangRepos++;
          }
        });

        const topLanguages = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([lang, count], index) => {
            const swatch = SWATCH_PALETTE[index % SWATCH_PALETTE.length];
            return {
              name: lang,
              count,
              percentage: totalLangRepos ? Math.round((count / totalLangRepos) * 100) : 0,
              ...swatch,
            };
          });

        const rawScore = Math.min(5.0, 3.5 + Math.log10(totalStars + profile.followers + 10) * 0.35);
        const impactRating = rawScore.toFixed(1);

        const aggregated = {
          profile,
          totalStars,
          totalForks,
          topRepo,
          topRepos,
          isPinned: pinnedRepos.length > 0,
          topLanguages,
          impactRating,
          contributions,
        };

        if (active) {
          setData(aggregated);
          setError(null);
        }
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [username, fetchIndex]);

  return { data, loading, error, searchUser, refresh };
}
