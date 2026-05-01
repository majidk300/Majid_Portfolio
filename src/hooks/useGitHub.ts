import { useQuery } from "@tanstack/react-query";
import type { GitHubRepo, GitHubUser } from "../types/github";

const BASE = "https://api.github.com";

const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const res = await fetch(`${BASE}/users/${username}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
};

const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  const res = await fetch(
    `${BASE}/users/${username}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  const data: GitHubRepo[] = await res.json();
  return data.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
};

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ["github-user", username],
    queryFn: () => fetchGitHubUser(username),
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
}

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ["github-repos", username],
    queryFn: () => fetchGitHubRepos(username),
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
}
