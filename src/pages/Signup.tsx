import { Link } from "react-router-dom"
import { Zap, Sun, Users } from "lucide-react"

export function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-energy-green to-energy-blue rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">SmartGridLink</span>
        </div>

        {/* Role Selection Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-card-foreground mb-2 text-center">Create your account</h1>
          <p className="text-muted-foreground mb-8 text-center">Choose your role to get started</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Consumer Card */}
            <Link
              to="/signup/consumer"
              className="group bg-card border-2 border-border rounded-lg p-8 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-energy-blue/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-energy-blue/20 transition-colors">
                  <Users className="w-8 h-8 text-energy-blue" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">Energy Consumer</h3>
                <p className="text-muted-foreground mb-6">
                  Buy renewable energy from nearby producers
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left w-full">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Buy green energy at competitive rates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Choose from nearby solar/wind farms
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Reduce your carbon footprint
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Track energy usage and savings
                  </li>
                </ul>
              </div>
            </Link>

            {/* Producer Card */}
            <Link
              to="/signup/producer"
              className="group bg-card border-2 border-border rounded-lg p-8 hover:border-energy-green hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-energy-green/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-energy-green/20 transition-colors">
                  <Sun className="w-8 h-8 text-energy-green" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">Energy Producer</h3>
                <p className="text-muted-foreground mb-6">
                  Sell renewable energy to nearby consumers
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left w-full">
                  <li className="flex items-center gap-2">
                    <span className="text-energy-green">✓</span>
                    Monetize your excess energy
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-energy-green">✓</span>
                    Set your own pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-energy-green">✓</span>
                    Real-time system monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-energy-green">✓</span>
                    Get paid in tokens or Rands
                  </li>
                </ul>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}