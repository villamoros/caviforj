// pages/index.tsx
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="p-8">
      <SignedOut>
        <SignInButton>
          <Button>Iniciar sesión</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <h1 className="text-2xl font-bold">Bienvenido a tu dashboard</h1>
      </SignedIn>
    </div>
  )
}
