"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CommitActivity, Repository, fetchCommitActivity, fetchTopRepositories, getGitHubClient } from "@/lib/github";

export function useGitHubData() {
  const { data: session } = useSession();
  const [commitActivity, setCommitActivity] = useState<CommitActivity[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (session?.accessToken && session?.user?.name) {
        try {
          const octokit = await getGitHubClient(session.accessToken as string);
          const [activityData, reposData] = await Promise.all([
            fetchCommitActivity(octokit, session.user.name),
            fetchTopRepositories(octokit, session.user.name),
          ]);

          setCommitActivity(activityData);
          setRepositories(reposData);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to fetch GitHub data");
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [session]);

  return { commitActivity, repositories, loading, error };
}