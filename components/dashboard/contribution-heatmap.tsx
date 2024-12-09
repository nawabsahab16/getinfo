"use client"

import { useGitHubData } from "@/hooks/use-github-data"
import { Card } from "@/components/ui/card"

export function ContributionHeatmap() {
  const { commitActivity, loading, error } = useGitHubData()

  if (loading) return <div>Loading heatmap...</div>
  if (error) return <div>Error: {error}</div>

  const maxCommits = Math.max(...commitActivity.flatMap(week => week.days))
  const getIntensity = (commits: number) => {
    if (commits === 0) return "bg-muted"
    const intensity = Math.ceil((commits / maxCommits) * 4)
    return `bg-primary opacity-${intensity * 25}`
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {commitActivity.slice(-12).flatMap((week, weekIndex) =>
        week.days.map((commits, dayIndex) => (
          <div
            key={`${weekIndex}-${dayIndex}`}
            className={`w-4 h-4 rounded-sm ${getIntensity(commits)}`}
            title={`${commits} commits`}
          />
        ))
      )}
    </div>
  )
}