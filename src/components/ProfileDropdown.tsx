import { useState } from "react"
import { User, LogOut, MapPin } from "lucide-react"
import { useAuthStore } from "@/store/authStore"

interface ProfileDropdownProps {
  className?: string
}

export function ProfileDropdown({ className }: ProfileDropdownProps) {
  const { user, logout, updateProfile } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState(user?.address || "")

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleAddressUpdate = async () => {
    if (user && newAddress !== user.address) {
      try {
        await updateProfile({ address: newAddress })
        setIsEditingAddress(false)
      } catch (error) {
        console.error("Address update failed:", error)
      }
    }
  }

  const handleSystemToggle = async () => {
    if (user) {
      try {
        await updateProfile({ isSystemOffline: !user.isSystemOffline })
      } catch (error) {
        console.error("System status update failed:", error)
      }
    }
  }

  if (!user) return null

  return (
    <div className={`relative ${className}`}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-card-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${user.isSystemOffline ? 'bg-red-500' : 'bg-green-500'}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-4">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>

            {/* System Status */}
            <div className="mb-4 p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-card-foreground">System Status</span>
                <button
                  onClick={handleSystemToggle}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    user.isSystemOffline
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {user.isSystemOffline ? 'Offline' : 'Online'}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {user.isSystemOffline 
                  ? 'Your system is temporarily offline and not accepting connections'
                  : 'Your system is online and accepting connections'
                }
              </p>
            </div>

            {/* Address Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-card-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </span>
                {!isEditingAddress && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
              
              {isEditingAddress ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddressUpdate}
                      className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingAddress(false)
                        setNewAddress(user.address || "")
                      }}
                      className="px-3 py-1 border border-border rounded text-xs font-medium hover:bg-accent transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {user.address || "No address set"}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-border pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
