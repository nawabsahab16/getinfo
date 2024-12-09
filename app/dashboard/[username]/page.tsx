import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Octokit } from "octokit"

async function getGitHubData(username: string) {
  const octokit = new Octokit()
  
  try {
    const [user, repos] = await Promise.all([
      octokit.rest.users.getByUsername({ username }),
      octokit.rest.repos.listForUser({ username, sort: "updated", per_page: 10 })
    ])

    return {
      user: user.data,
      repos: repos.data
    }
  } catch (error) {
    return null
  }
}

export default async function DashboardPage({
  params
}: {
  params: { username: string }
}) {
  const data = await getGitHubData(params.username)

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">User not found</h1>
          <p className="text-muted-foreground">
            The GitHub username you entered does not exist.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={params.username} userData={data.user} />
      <DashboardContent username={params.username} initialData={data} />
    </div>
  )
}