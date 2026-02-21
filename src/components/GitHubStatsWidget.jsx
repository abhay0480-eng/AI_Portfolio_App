import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, BookOpen, AlertCircle, Code2, Users } from 'lucide-react';

const GITHUB_USERNAME = 'abhay0480-eng';

const GitHubStatsWidget = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                setLoading(true);
                // Fetch user profile
                const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                if (!userRes.ok) throw new Error('Failed to fetch GitHub profile');
                const userData = await userRes.json();

                // Fetch repositories to calculate total stars & languages
                const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
                if (!reposRes.ok) throw new Error('Failed to fetch repositories');
                const reposData = await reposRes.json();

                // Calculate metrics
                const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);

                // Calculate top languages
                const languageCounts = {};
                reposData.forEach(repo => {
                    if (repo.language) {
                        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                    }
                });

                const topLanguages = Object.entries(languageCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([lang]) => lang);

                setStats({
                    profile: userData,
                    totalStars,
                    totalForks,
                    topLanguages,
                    recentRepos: reposData.slice(0, 3) // Top 3 most recently updated
                });
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubStats();
    }, []);

    if (loading) {
        return (
            <div className="mt-4 p-4 border border-theme bg-theme-panel/50 rounded max-w-xl animate-pulse flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-800"></div>
                    <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-800 rounded w-1/4"></div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="h-16 bg-gray-800 rounded"></div>
                    <div className="h-16 bg-gray-800 rounded"></div>
                    <div className="h-16 bg-gray-800 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10 text-red-400 rounded max-w-xl text-sm flex-items-center gap-2">
                <AlertCircle size={16} />
                <span>Unable to load GitHub stats: {error}</span>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="mt-4 border border-theme bg-theme-panel/50 rounded-lg max-w-xl overflow-hidden shadow-theme animate-in fade-in zoom-in-95 duration-500 transition-colors">

            {/* Header / Profile section */}
            <div className="p-4 border-b border-theme/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <img
                        src={stats.profile.avatar_url}
                        alt={stats.profile.login}
                        className="w-12 h-12 rounded-full border border-theme shadow-sm"
                    />
                    <div>
                        <a
                            href={stats.profile.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-theme-main hover:text-theme-primary transition-colors flex items-center gap-1.5"
                        >
                            <Github size={16} />
                            {stats.profile.name || stats.profile.login}
                        </a>
                        <p className="text-xs text-theme-muted mt-0.5 max-w-[200px] truncate">
                            {stats.profile.bio || "Software Engineer"}
                        </p>
                    </div>
                </div>

                <a
                    href={stats.profile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-theme-base border border-theme text-xs text-theme-primary rounded hover:bg-theme-primary/10 transition-colors self-start sm:self-auto"
                >
                    View Profile
                </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-theme/50 bg-theme-base/50">
                <div className="p-3 text-center flex flex-col items-center gap-1 hover:bg-theme-primary/5 transition-colors">
                    <BookOpen size={16} className="text-theme-primary mb-1" />
                    <span className="text-xs text-theme-muted uppercase tracking-wider font-mono">Repos</span>
                    <span className="font-bold text-theme-main">{stats.profile.public_repos}</span>
                </div>
                <div className="p-3 text-center flex flex-col items-center gap-1 hover:bg-theme-primary/5 transition-colors">
                    <Star size={16} className="text-[var(--color-accent-1)] mb-1" />
                    <span className="text-xs text-theme-muted uppercase tracking-wider font-mono">Stars</span>
                    <span className="font-bold text-theme-main">{stats.totalStars}</span>
                </div>
                <div className="p-3 text-center flex flex-col items-center gap-1 hover:bg-theme-primary/5 transition-colors">
                    <GitFork size={16} className="text-[var(--color-accent-2)] mb-1" />
                    <span className="text-xs text-theme-muted uppercase tracking-wider font-mono">Forks</span>
                    <span className="font-bold text-theme-main">{stats.totalForks}</span>
                </div>
                <div className="p-3 text-center flex flex-col items-center gap-1 hover:bg-theme-primary/5 transition-colors">
                    <Users size={16} className="text-purple-400 mb-1" />
                    <span className="text-xs text-theme-muted uppercase tracking-wider font-mono">Followers</span>
                    <span className="font-bold text-theme-main">{stats.profile.followers}</span>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-4 border-t border-theme/50">
                {stats.topLanguages.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-theme-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Code2 size={12} /> Top Languages
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {stats.topLanguages.map(lang => (
                                <span key={lang} className="px-2 py-0.5 text-xs rounded-full bg-theme-primary/10 text-theme-primary border border-theme-primary/20">
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(GitHubStatsWidget);
