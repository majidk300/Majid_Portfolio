import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, BookOpen, ExternalLink, Search, RefreshCw, Users } from "lucide-react";
import { useGitHubUser, useGitHubRepos } from "../../hooks/useGitHub";
import { PROFILE } from "../../data/portfolio";
import type { GitHubRepo } from "../../types/github";

const LANG_COLORS: Record<string, string> = {
  Java: "#b07219", JavaScript: "#f1e05a", TypeScript: "#2b7489",
  "C#": "#178600", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c",
};

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const lc = LANG_COLORS[repo.language || ""] || "#94a3b8";

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
      style={{
        display: "flex", flexDirection: "column", gap: 10,
        padding: "18px 20px",
        background: "#fff",
        border: "1px solid rgba(99,120,180,0.15)",
        borderRadius: 14,
        textDecoration: "none",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        minWidth: 0,
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(37,99,235,0.3)";
        el.style.boxShadow = "0 6px 24px rgba(37,99,235,0.1)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(99,120,180,0.15)";
        el.style.boxShadow = "none";
        el.style.transform = "none";
      }}
    >
      {/* Repo name row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <BookOpen size={13} style={{ color: "var(--col-blue)", flexShrink: 0 }} />
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13.5,
            color: "var(--col-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {repo.name}
          </span>
        </div>
        <ExternalLink size={12} style={{ color: "#94a3b8", flexShrink: 0, marginTop: 2 }} />
      </div>

      {/* Description */}
      {repo.description && (
        <p style={{
          fontSize: 12.5, lineHeight: 1.6, color: "var(--col-text2)",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
          overflow: "hidden", margin: 0,
        }}>
          {repo.description}
        </p>
      )}

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} style={{
              padding: "2px 7px", borderRadius: 4, fontSize: 10.5,
              background: "rgba(37,99,235,0.07)", color: "var(--col-blue)",
              fontFamily: "var(--font-mono)", fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#94a3b8", marginTop: "auto" }}>
        {repo.language && (
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: lc, flexShrink: 0 }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Star size={11} />{repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <GitFork size={11} />{repo.forks_count}
          </span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 11 }}>
          {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
      </div>
    </motion.a>
  );
}

export default function GitHubSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [search, setSearch] = useState("");
  const [lang, setLang]     = useState("All");

  const { data: user } = useGitHubUser(PROFILE.githubUsername);
  const { data: repos, isLoading, isError, refetch } = useGitHubRepos(PROFILE.githubUsername);

  const languages = useMemo(() => {
    if (!repos) return ["All"];
    const ls = [...new Set(repos.map(r => r.language).filter(Boolean) as string[])];
    return ["All", ...ls.slice(0, 7)];
  }, [repos]);

  const filtered = useMemo(() => {
    if (!repos) return [];
    return repos.filter(r =>
      (r.name.toLowerCase().includes(search.toLowerCase()) ||
       (r.description || "").toLowerCase().includes(search.toLowerCase())) &&
      (lang === "All" || r.language === lang)
    );
  }, [repos, search, lang]);

  return (
    <section id="github" className="section" ref={ref} style={{ background: "#f8fafc" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

      {/* ── EVERYTHING inside pg-wrap ── */}
      <div className="pg-wrap" style={{ position: "relative" }}>

        {/* Header */}
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label">05 / Open Source</span>
          <h2 className="section-title">GitHub <span className="text-gradient-green">Activity</span></h2>
          <div className="divider" />
        </motion.div>

        {/* Stats row */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 14,
              marginBottom: 32,
              width: "100%",
            }}
          className="stats-gh"
          >
            {[
              { l: "Public Repos",  v: user.public_repos,   icon: BookOpen, c: "var(--col-blue)"   },
              { l: "Followers",     v: user.followers,       icon: Users,    c: "var(--col-purple)" },
              { l: "Following",     v: user.following,       icon: Users,    c: "var(--col-green)"  },
              { l: "Total Repos",   v: repos?.length || "—", icon: GitFork,  c: "var(--col-blue)"   },
            ].map(s => (
              <div key={s.l} style={{
                textAlign: "center", padding: "20px 16px",
                background: "#fff",
                border: "1px solid rgba(99,120,180,0.15)",
                borderRadius: 14,
              }}>
                <s.icon size={18} style={{ color: s.c, margin: "0 auto 8px" }} />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24, alignItems: "center", width: "100%", minWidth: 0 }}>

          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 0, maxWidth: "100%" }}>
            <Search size={13} style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "#94a3b8", pointerEvents: "none",
            }} />
            <input
              placeholder="Search repositories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 34, width: "100%", background: "#fff" }}
            />
          </div>

          {/* Language filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", minWidth: 0 }}>
            {languages.map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
                background: lang === l ? "rgba(37,99,235,0.1)" : "#fff",
                border: `1.5px solid ${lang === l ? "rgba(37,99,235,0.4)" : "rgba(99,120,180,0.2)"}`,
                color: lang === l ? "var(--col-blue)" : "#64748b",
                transition: "all 0.15s",
              }}>
                {l}
              </button>
            ))}
            <button onClick={() => refetch()} style={{
              width: 34, height: 34, borderRadius: 8, background: "#fff",
              border: "1.5px solid rgba(99,120,180,0.2)",
              cursor: "pointer", color: "#94a3b8",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>
              <RefreshCw size={13} />
            </button>
          </div>
        </motion.div>

        {/* Repo grid */}
        {isLoading ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
            width: "100%",
          }} className="repos-grid-gh">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{
                height: 130, borderRadius: 14,
                background: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-light 1.4s ease infinite",
              }} />
            ))}
          </div>
        ) : isError ? (
          <div style={{
            textAlign: "center", padding: "48px 24px",
            background: "#fff", border: "1px solid rgba(99,120,180,0.15)", borderRadius: 16,
          }}>
            <p style={{ fontSize: 14, color: "#64748b" }}>GitHub API rate limit reached. Try again shortly.</p>
            <button onClick={() => refetch()} className="btn btn-outline" style={{ marginTop: 16 }}>Retry</button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 14,
            width: "100%",
          }} className="repos-grid-gh">
            {filtered.slice(0, 12).map((r, i) => <RepoCard key={r.id} repo={r} index={i} />)}
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 14, marginTop: 24 }}>
            No repos match your search.
          </p>
        )}
      </div>

      <style>{`
        @keyframes shimmer-light {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .repos-grid-gh { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        @media (max-width: 900px)  { .repos-grid-gh { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
        @media (max-width: 560px)  { .repos-grid-gh { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; } }
        @media (max-width: 600px)  {
          #github .stats-gh { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </section>
  );
}
