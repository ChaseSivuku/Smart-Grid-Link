import { Link } from "react-router-dom"
import { ShieldAlert } from "lucide-react"

export function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You don't have permission to access this page.</p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
