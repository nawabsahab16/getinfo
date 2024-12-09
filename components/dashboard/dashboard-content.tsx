"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommitActivityGraph } from "@/components/dashboard/commit-activity-graph"
import { ContributionHeatmap } from "@/components/dashboard/contribution-heatmap"
import { TopRepositories } from "@/components/dashboard/top-repositories"
import { UserStats } from "@/components/dashboard/user-stats"

export function DashboardContent({
  username,
  initialData
}: {
  username: string
  initialData: any
}) {
  const [data, setData] = useState(initialData)

  return (
    <main className="container mx-auto p-4 space-y-6">
      <UserStats data={data} />
      <Tabs defaultValue="repositories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="repositories">
          <TopRepositories repos={data.repos} />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Repository Languages</h3>
              {/* Add language chart here */}
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Contribution Activity</h3>
              {/* Add contribution chart here */}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}