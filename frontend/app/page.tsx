import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { ChatInterface } from "@/components/chat-interface"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="h-screen bg-background">
      <SignedOut>
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">3D Model Generator</h1>
            <p className="text-muted-foreground">Generate 3D models from images and prompts</p>
            <SignInButton>
              <Button size="lg">Sign In to Continue</Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <ChatInterface />
      </SignedIn>
    </main>
  )
}
