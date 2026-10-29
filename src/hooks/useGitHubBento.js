import { useState, useEffect, useCallback } from "react";
import { SWATCH_PALETTE } from "../constants/palette";

export function useGitHubBento(initialUsername = "torvalds") {
  const [username, setUsername] = useState(initialUsername);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const cleanUser = username.trim().replace(/^@/, "");
      if (!cleanUser) return;

      const cacheKey = `gh_bento_${cleanUser.toLowerCase()}`;
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
        const [userRes, reposRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${cleanUser}`),
          fetch(`https://api.github.com/users/${cleanUser}/repos?per_page=100&sort=pushed`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${cleanUser}?y=last`),
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

        const sortedByStars = [...ownRepos].sort((a, b) => b.stargazers_count - a.stargazers_count);
        const topRepo = sortedByStars[0] || null;

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
