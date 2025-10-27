import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import type { ConnectionType, PaymentOption } from "@/types"
import { Zap, Mail, Lock, User, MapPin, Battery, Phone, Wallet } from "lucide-react"

export function ConsumerSignup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    connectionType: "" as ConnectionType | "",
    averageMonthlyUsage: "",
    batteryBrand: "",
    batteryCapacity: "",
    preferredPaymentOption: "" as PaymentOption | "",
    phoneNumber: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const { signup, isLoading, error, clearError, updateProfile } = useAuthStore()
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const validateStep = (stepNum: number) => {
    const newErrors: Record<string, string> = {}

    if (stepNum === 1) {
      if (!formData.name) newErrors.name = "Full name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!validateEmail(formData.email)) newErrors.email = "Invalid email address"
      if (!formData.password) newErrors.password = "Password is required"
      else if (!validatePassword(formData.password)) newErrors.password = "Password must be at least 8 characters"
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    } else if (stepNum === 2) {
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.connectionType) newErrors.connectionType = "Please select a connection type"
      if (!formData.averageMonthlyUsage) newErrors.averageMonthlyUsage = "Average monthly usage is required"
      else if (isNaN(Number(formData.averageMonthlyUsage)) || Number(formData.averageMonthlyUsage) <= 0) {
        newErrors.averageMonthlyUsage = "Please enter a valid usage amount"
      }
    } else if (stepNum === 3) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (!validateStep(3)) {
      setStep(3)
      return
    }

    try {
      await signup(formData.email, formData.password, formData.name, "consumer")
      // Update profile with address after signup
      if (formData.address) {
        await updateProfile({ address: formData.address })
      }
      navigate("/consumer/dashboard")
    } catch (err) {
      console.error("Signup failed:", err)
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-energy-green to-energy-blue rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">SmartGridLink</span>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setStep(1)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              Account Info
            </button>
            <button
              onClick={() => step >= 2 && setStep(2)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              Energy Setup
            </button>
            <button
              onClick={() => step >= 3 && setStep(3)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              Preferences & Terms
            </button>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">Register as Energy Consumer</h1>
          <p className="text-muted-foreground mb-6">Complete your registration to start buying renewable energy</p>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <span className="text-sm text-destructive">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Account Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Account Information</h3>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    placeholder="Minimum 8 characters"
                  />
                  {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Next: Energy Setup
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Energy Requirements */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Energy Requirements</h3>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address/Location
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground min-h-[80px]"
                    placeholder="Enter your full address"
                  />
                  {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Connection Type
                  </label>
                  <select
                    value={formData.connectionType}
                    onChange={(e) => setFormData({ ...formData, connectionType: e.target.value as ConnectionType })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                  >
                    <option value="">Select connection type...</option>
                    <option value="residential">Residential</option>
                    <option value="business">Business</option>
                    <option value="community">Community</option>
                  </select>
                  {errors.connectionType && <p className="text-sm text-destructive mt-1">{errors.connectionType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Average Monthly Usage (kWh)
                  </label>
                  <input
                    type="number"
                    value={formData.averageMonthlyUsage}
                    onChange={(e) => setFormData({ ...formData, averageMonthlyUsage: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    placeholder="e.g., 500"
                    min="0"
                  />
                  {errors.averageMonthlyUsage && <p className="text-sm text-destructive mt-1">{errors.averageMonthlyUsage}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Battery className="w-4 h-4" />
                    Battery/Inverter Brand (Optional)
                  </label>
                  <select
                    value={formData.batteryBrand}
                    onChange={(e) => setFormData({ ...formData, batteryBrand: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                  >
                    <option value="">Select brand...</option>
                    <option value="sunsynk">Sunsynk</option>
                    <option value="victron">Victron</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Battery Capacity (kWh) - Optional
                  </label>
                  <input
                    type="number"
                    value={formData.batteryCapacity}
                    onChange={(e) => setFormData({ ...formData, batteryCapacity: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    placeholder="e.g., 10"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                    placeholder="+27 12 345 6789"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Next: Preferences & Terms
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preferences & Terms */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Preferences & Terms</h3>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Preferred Payment Option
                  </label>
                  <select
                    value={formData.preferredPaymentOption}
                    onChange={(e) => setFormData({ ...formData, preferredPaymentOption: e.target.value as PaymentOption })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                  >
                    <option value="">Select payment option...</option>
                    <option value="token">Token Wallet</option>
                    <option value="credit">Credit</option>
                    <option value="eft">Direct EFT</option>
                  </select>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="mt-1"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                    I agree to the SmartGridLink Terms and Conditions and Privacy Policy
                  </label>
                </div>
                {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms}</p>}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Creating Account..." : "Complete Registration"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
              {" "}or{" "}
              <Link to="/signup/producer" className="text-primary hover:underline font-medium">
                Register as Producer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
