import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <Github className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-3xl font-bold">GitHub Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize your GitHub activity and get insights into your contributions
          </p>
        </div>
        <div className="space-y-4">
          <Link href="/api/auth/signin">
            <Button className="w-full" size="lg">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </Link>
          <p className="text-sm text-center text-muted-foreground">
            By signing in, you agree to allow this application to read your GitHub public data
          </p>
        </div>
      </Card>
    </main>
  )
}