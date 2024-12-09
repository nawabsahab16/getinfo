import { Card } from "@/components/ui/card"
import { Star, GitFork, Eye } from "lucide-react"
import Link from "next/link"

export function TopRepositories({ repos }: { repos: any[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {repos.map((repo) => (
        <Card key={repo.name} className="p-4">
          <Link href={repo.html_url} target="_blank" className="hover:opacity-80">
            <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {repo.description || "No description available"}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {repo.stargazers_count}
              </div>
              <div className="flex items-center">
                <GitFork className="w-4 h-4 mr-1" />
                {repo.forks_count}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {repo.watchers_count}
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}