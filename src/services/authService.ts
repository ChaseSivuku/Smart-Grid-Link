import type { User, UserRole } from "@/types"

// Mock user database
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    email: "admin@smartgridlink.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    address: "123 Admin Street, Cape Town, South Africa",
    isSystemOffline: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "producer@smartgridlink.com",
    password: "producer123",
    name: "Solar Farm Producer",
    role: "producer",
    address: "456 Solar Avenue, Johannesburg, South Africa",
    isSystemOffline: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "consumer@smartgridlink.com",
    password: "consumer123",
    name: "Home Consumer",
    role: "consumer",
    address: "789 Home Road, Durban, South Africa",
    isSystemOffline: false,
    createdAt: new Date().toISOString(),
  },
]

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      throw new Error("Invalid email or password")
    }

    const { password: _, ...userWithoutPassword } = user

    // Store in localStorage for persistence
    localStorage.setItem("smartgridlink_user", JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  },

  signup: async (email: string, password: string, name: string, role: UserRole): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check if user already exists
    if (mockUsers.find((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    const newUser: User & { password: string } = {
      id: String(mockUsers.length + 1),
      email,
      password,
      name,
      role,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser

    // Store in localStorage for persistence
    localStorage.setItem("smartgridlink_user", JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    localStorage.removeItem("smartgridlink_user")
  },

  updateProfile: async (updates: Partial<Pick<User, 'address' | 'isSystemOffline'>>): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const currentUserStr = localStorage.getItem("smartgridlink_user")
    if (!currentUserStr) {
      throw new Error("No user logged in")
    }

    const currentUser = JSON.parse(currentUserStr)
    const updatedUser = { ...currentUser, ...updates }

    // Update in mock database
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id)
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
    }

    // Store updated user in localStorage
    localStorage.setItem("smartgridlink_user", JSON.stringify(updatedUser))

    return updatedUser
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("smartgridlink_user")
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },
}
