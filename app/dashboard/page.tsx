"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommitActivityGraph } from "@/components/dashboard/commit-activity-graph"
import { ContributionHeatmap } from "@/components/dashboard/contribution-heatmap"
import { TopRepositories } from "@/components/dashboard/top-repositories"
import { UserStats } from "@/components/dashboard/user-stats"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false)
    }
  }, [status])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={""} userData={undefined} />
      <main className="container mx-auto p-4 space-y-6">
        <UserStats data={undefined} />
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Commit Activity</h3>
                <CommitActivityGraph />
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Contribution Heatmap</h3>
                <ContributionHeatmap />
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="repositories">
            <TopRepositories repos={[]} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}