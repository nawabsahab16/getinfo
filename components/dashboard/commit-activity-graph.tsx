"use client"

import { Card } from "@/components/ui/card"
import { useGitHubData } from "@/hooks/use-github-data"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from "date-fns"

export function CommitActivityGraph() {
  const { commitActivity, loading, error } = useGitHubData()

  if (loading) return <div>Loading commit activity...</div>
  if (error) return <div>Error: {error}</div>

  const data = commitActivity.map((week) => ({
    date: format(new Date(week.week * 1000), "MMM d"),
    commits: week.total,
  }))

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2">
                    <p className="text-sm font-medium">{payload[0].payload.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {payload[0].value} commits
                    </p>
                  </Card>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="commits"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#commitGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}