export type UserRole = "admin" | "producer" | "consumer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  address?: string
  isSystemOffline?: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface EnergyTrade {
  id: string
  producerId: string
  producerName: string
  consumerId: string
  consumerName: string
  amount: number // kWh
  price: number // per kWh
  totalPrice: number
  timestamp: string
  status: "pending" | "completed" | "cancelled"
}

export interface EnergyProducer {
  id: string
  name: string
  location: {
    lat: number
    lng: number
    address: string
  }
  capacity: number // kW
  currentOutput: number // kW
  energyType: "solar" | "wind" | "hydro" | "other"
  pricePerKwh: number
  available: boolean
}

export interface ProducerStats {
  totalProduced: number // kWh
  totalSold: number // kWh
  revenue: number
  tokenBalance: number
  activeConnections: number
}

export interface ConsumerStats {
  totalConsumed: number // kWh
  totalSpent: number
  tokenBalance: number
  activeConnections: number
}

export interface SystemMetrics {
  totalUsers: number
  totalProducers: number
  totalConsumers: number
  totalTrades: number
  totalEnergyTraded: number // kWh
  totalRevenue: number
  activeConnections: number
}
