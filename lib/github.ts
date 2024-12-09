import { Octokit } from "octokit";

export type CommitActivity = {
  total: number;
  week: number;
  days: number[];
};

export type Repository = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  commits: number;
  url: string;
};

export async function getGitHubClient(accessToken: string) {
  return new Octokit({ auth: accessToken });
}

export async function fetchCommitActivity(octokit: Octokit, username: string) {
  const repos = await octokit.rest.repos.listForUser({ username });
  const activities: CommitActivity[] = [];

  for (const repo of repos.data) {
    try {
      const stats = await octokit.rest.repos.getCommitActivityStats({
        owner: repo.owner.login,
        repo: repo.name,
      });
      if (stats.data) {
        activities.push(...stats.data);
      }
    } catch (error) {
      console.error(`Error fetching commit activity for ${repo.name}:`, error);
    }
  }

  return activities;
}

export async function fetchTopRepositories(octokit: Octokit, username: string): Promise<Repository[]> {
  const { data: repos } = await octokit.rest.repos.listForUser({
    username,
    sort: "updated",
    per_page: 10,
  });

  return Promise.all(
    repos.map(async (repo) => {
      const { data: commits } = await octokit.rest.repos.getCommitActivityStats({
        owner: repo.owner.login,
        repo: repo.name,
      });

      return {
        name: repo.name,
        description: repo.description || "",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        commits: commits ? commits.reduce((acc, week) => acc + week.total, 0) : 0,
        url: repo.html_url,
      };
    })
  );
}