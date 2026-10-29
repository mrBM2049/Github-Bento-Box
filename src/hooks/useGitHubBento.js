import { useState, useEffect, useCallback } from "react";
import { SWATCH_PALETTE } from "../constants/palette";

export function useGitHubBento(initialUsername = "lds") {
  const [username, setUsername] = useState(initialUsername);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const cleanUser = username.trim().replace(/^@/, "");
      if (!cleanUser) return;

      const cacheKey = `gh_bento_v2_${cleanUser.toLowerCase()}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          if (active) {
            setData(JSON.parse(cached));
            setLoading(false);
          }
          return;
        } catch {
          sessionStorage.removeItem(cacheKey);
        }
      }

      try {
        const [userRes, reposRes, contribRes, pinnedRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${cleanUser}`),
          fetch(`https://api.github.com/users/${cleanUser}/repos?per_page=100&sort=pushed`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${cleanUser}?y=last`),
          fetch(`https://gh-pinned-repos-api.ysnirix.xyz/api/get/?username=${cleanUser}`),
        ]);

        if (userRes.status === "rejected" || !userRes.value.ok) {
          if (userRes.value?.status === 404) throw new Error("GitHub user not found.");
          if (userRes.value?.status === 403) throw new Error("API rate limit exceeded. Try again later.");
          throw new Error("Failed to fetch GitHub profile.");
        }

        const profile = await userRes.value.json();
        const repos = reposRes.status === "fulfilled" && reposRes.value.ok
          ? await reposRes.value.json()
          : [];

        let contributions = null;
        if (contribRes.status === "fulfilled" && contribRes.value.ok) {
          try {
            const contribData = await contribRes.value.json();
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

        let pinnedRepos = [];
        if (pinnedRes.status === "fulfilled" && pinnedRes.value.ok) {
          try {
            const pinnedData = await pinnedRes.value.json();
            if (Array.isArray(pinnedData?.response) && pinnedData.response.length > 0) {
              pinnedRepos = pinnedData.response.slice(0, 6).map((r, i) => ({
                id: `pinned-${i}-${r.name}`,
                name: r.name,
                html_url: r.repo,
                description: r.description,
                stargazers_count: r.stars || 0,
                forks_count: r.forks || 0,
                language: r.language?.name || (typeof r.language === "string" ? r.language : "Code"),
                isPinned: true,
              }));
            }
          } catch {
            pinnedRepos = [];
          }
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

        sessionStorage.setItem(cacheKey, JSON.stringify(aggregated));
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
  }, [username]);

  const searchUser = useCallback((newUser) => {
    setUsername(newUser);
    setLoading(true);
    setError(null);
  }, []);

  return { data, loading, error, searchUser };
}
