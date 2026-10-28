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
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${cleanUser}`),
          fetch(`https://api.github.com/users/${cleanUser}/repos?per_page=100&sort=pushed`),
        ]);

        if (userRes.status === 404) throw new Error("GitHub user not found.");
        if (userRes.status === 403) throw new Error("API rate limit exceeded. Try again later.");
        if (!userRes.ok) throw new Error("Failed to fetch GitHub profile.");

        const profile = await userRes.json();
        const repos = await reposRes.json();

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
          .slice(0, 5)
          .map(([lang, count], index) => ({
            name: lang,
            count,
            percentage: totalLangRepos ? Math.round((count / totalLangRepos) * 100) : 0,
            ...SWATCH_PALETTE[index],
          }));

        while (topLanguages.length < 5) {
          const idx = topLanguages.length;
          topLanguages.push({
            name: idx === 4 ? "Other" : "N/A",
            count: 0,
            percentage: 0,
            ...SWATCH_PALETTE[idx],
          });
        }

        const rawScore = Math.min(5.0, 3.5 + Math.log10(totalStars + profile.followers + 10) * 0.35);
        const impactRating = rawScore.toFixed(1);

        const aggregated = {
          profile,
          totalStars,
          totalForks,
          topRepo,
          topLanguages,
          impactRating,
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

