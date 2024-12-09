import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Home } from "lucide-react"
import Link from "next/link"

export function DashboardHeader({ 
  username,
  userData
}: { 
  username: string
  userData: any
}) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={userData.avatar_url} />
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{userData.name || username}</h1>
              <p className="text-sm text-muted-foreground">{userData.bio || "No bio available"}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`https://github.com/${username}`} target="_blank">
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}