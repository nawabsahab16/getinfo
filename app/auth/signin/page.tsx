import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github } from "lucide-react"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"

export default async function SignIn() {
  const providers = await getProviders()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <Github className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-3xl font-bold">Sign in to GitHub Analytics</h1>
          <p className="text-muted-foreground">
            Connect your GitHub account to view your analytics
          </p>
        </div>
        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <Button
                key={provider.id}
                className="w-full"
                size="lg"
                onClick={() => signIn(provider.id)}
              >
                <Github className="mr-2 h-4 w-4" />
                Sign in with {provider.name}
              </Button>
            ))}
        </div>
      </Card>
    </main>
  )
}