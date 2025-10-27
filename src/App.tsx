import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Landing } from "@/pages/Landing"
import { Login } from "@/pages/Login"
import { Signup } from "@/pages/Signup"
import { Unauthorized } from "@/pages/Unauthorized"
import { AdminDashboard } from "@/pages/AdminDashboard"
import { ProducerDashboard } from "@/pages/ProducerDashboard"
import { ConsumerDashboard } from "@/pages/ConsumerDashboard"
import { CommunityMap } from "@/pages/CommunityMap"

function App() {
  const { initialize, user } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  // Redirect to appropriate dashboard based on role
  const getDashboardRoute = () => {
    if (!user) return "/login"

    switch (user.role) {
      case "admin":
        return "/admin/dashboard"
      case "producer":
        return "/producer/dashboard"
      case "consumer":
        return "/consumer/dashboard"
      default:
        return "/login"
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Redirect /dashboard to role-specific dashboard */}
      <Route path="/dashboard" element={<Navigate to={getDashboardRoute()} replace />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Producer Routes */}
      <Route
        path="/producer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["producer"]}>
            <ProducerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Consumer Routes */}
      <Route
        path="/consumer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["consumer"]}>
            <ConsumerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Community Map - accessible to all authenticated users */}
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <CommunityMap />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
