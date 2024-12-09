import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="container mx-auto px-4 py-6 flex justify-end">
        <ModeToggle />
      </header>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-8 pt-20">
        <div className="text-center space-y-4 max-w-2xl">
          <Github className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">
            Discover Your GitHub Story
          </h1>
          <p className="text-xl text-muted-foreground">
            Visualize your GitHub journey with beautiful analytics and insights. Enter any GitHub username to get started.
          </p>
        </div>
        <Card className="w-full max-w-md p-6">
          <form 
            className="flex flex-col space-y-4"
            action={(formData) => {
              const username = formData.get("username")
              window.location.href = `/dashboard/${username}`
            }}
          >
            <div className="flex space-x-2">
              <Input
                name="username"
                placeholder="Enter GitHub username"
                required
                className="flex-1"
              />
              <Button type="submit">
                Analyze
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              No authentication required. View public GitHub data instantly.
            </p>
          </form>
        </Card>
      </div>
    </main>
  )
}