import { Link } from "react-router-dom"
import { Zap, Sun, Wind, Battery, TrendingUp, Shield, Users, ArrowRight, Check } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

export function Landing() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-energy-green to-energy-blue rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">SmartGridLink</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-energy-green/10 via-transparent to-energy-blue/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium mb-8">
              <Zap className="w-4 h-4" />
              Decentralized Energy Trading Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Join the Energy Revolution
            </h1>

            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Connect directly with local energy producers and consumers. Trade renewable energy peer-to-peer, reduce
              costs, and build a sustainable future together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3 bg-card border border-border text-card-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                View Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground mt-1">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50MW</div>
                <div className="text-sm text-muted-foreground mt-1">Energy Traded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">R30M+</div>
                <div className="text-sm text-muted-foreground mt-1">Saved Costs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose SmartGridLink?</h2>
            <p className="text-lg text-muted-foreground">
              Experience the future of energy trading with our decentralized platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-energy-green/10 rounded-lg flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-energy-green" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Renewable Energy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trade 100% renewable energy from solar, wind, and hydro sources. Support a sustainable future.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-energy-blue/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-energy-blue" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Lower Costs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cut out middlemen and reduce energy costs by up to 30% through direct peer-to-peer trading.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Secure & Transparent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Blockchain-ready infrastructure ensures every transaction is secure, transparent, and traceable.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-energy-green/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-energy-green" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Community Driven</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with local producers and consumers. Build a resilient energy community.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-energy-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-energy-blue" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Real-Time Trading</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor energy production and consumption in real-time. Trade instantly when you need it.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Wind className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Smart Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get insights into your energy usage patterns and optimize your consumption and production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Start trading energy in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-energy-green to-energy-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Sign Up</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create your account and choose your role as a producer or consumer
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-energy-green to-energy-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Link your energy source or consumption point to the platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-energy-green to-energy-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Trade</h3>
              <p className="text-muted-foreground leading-relaxed">
                Start buying or selling energy directly with your community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-muted-foreground">See what our community members have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-energy-green">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed">
                "SmartGridLink has reduced our energy costs by 35%. The platform is intuitive and the community support
                is amazing."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-energy-green to-energy-blue rounded-full" />
                <div>
                  <div className="font-semibold text-card-foreground">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Homeowner, California</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-energy-green">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed">
                "As a solar farm owner, this platform has opened up new revenue streams. The real-time trading is a game
                changer."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-energy-blue to-primary rounded-full" />
                <div>
                  <div className="font-semibold text-card-foreground">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">Solar Producer, Texas</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-energy-green">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed">
                "The transparency and security of blockchain technology combined with renewable energy is exactly what
                we need."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-energy-green rounded-full" />
                <div>
                  <div className="font-semibold text-card-foreground">Emma Williams</div>
                  <div className="text-sm text-muted-foreground">Business Owner, New York</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-energy-green/20 via-primary/20 to-energy-blue/20 border border-primary/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Energy Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users already trading renewable energy on SmartGridLink
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors group"
            >
              Start Trading Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-energy-green" />
                Free to join
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-energy-green" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-energy-green" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-energy-green to-energy-blue rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">SmartGridLink</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Decentralized energy trading for a sustainable future.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SmartGridLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
