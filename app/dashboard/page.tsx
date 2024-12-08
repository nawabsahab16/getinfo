"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
      <DashboardHeader />
      <main className="container mx-auto p-4 space-y-6">
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Commit Activity</h3>
               
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Contribution Heatmap</h3>
               
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="repositories">
          
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}