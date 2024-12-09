import { Card } from "@/components/ui/card"
import { GitFork, Star, Users } from "lucide-react"

export function UserStats({ data }: { data: any }) {
  const stats = [
    {
      label: "Public Repos",
      value: data.user.public_repos,
      icon: GitFork
    },
    {
      label: "Followers",
      value: data.user.followers,
      icon: Users
    },
    {
      label: "Total Stars",
      value: data.repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
      icon: Star
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center space-x-2">
            <stat.icon className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-medium">{stat.label}</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{stat.value.toLocaleString()}</p>
        </Card>
      ))}
    </div>
  )
}