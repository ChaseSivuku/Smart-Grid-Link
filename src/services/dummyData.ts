import type { EnergyTrade, SystemMetrics, User, ProducerStats, ConsumerStats, EnergyProducer } from "@/types"

// Generate dummy users
export const dummyUsers: User[] = [
  { id: "1", email: "admin@smartgridlink.com", name: "Admin User", role: "admin", createdAt: "2024-01-15T10:00:00Z" },
  {
    id: "2",
    email: "producer@smartgridlink.com",
    name: "Solar Farm Producer",
    role: "producer",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "3",
    email: "consumer@smartgridlink.com",
    name: "Home Consumer",
    role: "consumer",
    createdAt: "2024-03-10T09:15:00Z",
  },
  { id: "4", email: "john.solar@example.com", name: "John Solar", role: "producer", createdAt: "2024-01-25T11:20:00Z" },
  { id: "5", email: "jane.wind@example.com", name: "Jane Wind", role: "producer", createdAt: "2024-02-05T16:45:00Z" },
  {
    id: "6",
    email: "bob.consumer@example.com",
    name: "Bob Smith",
    role: "consumer",
    createdAt: "2024-03-01T08:30:00Z",
  },
  {
    id: "7",
    email: "alice.home@example.com",
    name: "Alice Johnson",
    role: "consumer",
    createdAt: "2024-03-15T13:00:00Z",
  },
]

// Generate dummy trades
export const dummyTrades: EnergyTrade[] = [
  {
    id: "T001",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 150,
    price: 2.50,
    totalPrice: 375.0,
    timestamp: "2025-01-14T14:30:00Z",
    status: "completed",
  },
  {
    id: "T002",
    producerId: "4",
    producerName: "John Solar",
    consumerId: "6",
    consumerName: "Bob Smith",
    amount: 200,
    price: 2.30,
    totalPrice: 460.0,
    timestamp: "2025-01-14T15:45:00Z",
    status: "completed",
  },
  {
    id: "T003",
    producerId: "5",
    producerName: "Jane Wind",
    consumerId: "7",
    consumerName: "Alice Johnson",
    amount: 180,
    price: 2.70,
    totalPrice: 468.0,
    timestamp: "2025-01-14T16:20:00Z",
    status: "completed",
  },
  {
    id: "T004",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "6",
    consumerName: "Bob Smith",
    amount: 120,
    price: 2.50,
    totalPrice: 288.0,
    timestamp: "2025-01-15T09:15:00Z",
    status: "pending",
  },
  {
    id: "T005",
    producerId: "4",
    producerName: "John Solar",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 250,
    price: 2.30,
    totalPrice: 550.0,
    timestamp: "2025-01-15T10:30:00Z",
    status: "completed",
  },
]

// System metrics
export const systemMetrics: SystemMetrics = {
  totalUsers: 1247,
  totalProducers: 423,
  totalConsumers: 824,
  totalTrades: 8934,
  totalEnergyTraded: 1567890, // kWh
  totalRevenue: 187456.8,
  activeConnections: 342,
}

// Chart data for energy trends
export const energyTrendsData = [
  { month: "Jul", energy: 120000, trades: 650, revenue: 14400 },
  { month: "Aug", energy: 135000, trades: 720, revenue: 16200 },
  { month: "Sep", energy: 142000, trades: 780, revenue: 17040 },
  { month: "Oct", energy: 158000, trades: 850, revenue: 18960 },
  { month: "Nov", energy: 165000, trades: 920, revenue: 19800 },
  { month: "Dec", energy: 178000, trades: 1050, revenue: 21360 },
  { month: "Jan", energy: 195000, trades: 1180, revenue: 23400 },
]

// User growth data
export const userGrowthData = [
  { month: "Jul", producers: 280, consumers: 520 },
  { month: "Aug", producers: 310, consumers: 580 },
  { month: "Sep", producers: 340, consumers: 640 },
  { month: "Oct", producers: 370, consumers: 700 },
  { month: "Nov", producers: 395, consumers: 760 },
  { month: "Dec", producers: 410, consumers: 800 },
  { month: "Jan", producers: 423, consumers: 824 },
]

// Producer stats
export const producerStats: ProducerStats = {
  totalProduced: 45680, // kWh
  totalSold: 42150, // kWh
  revenue: 5058.0,
  tokenBalance: 1250.5,
  activeConnections: 12,
}

// Producer production data (last 7 days)
export const productionData = [
  { day: "Mon", produced: 6200, sold: 5800, available: 400 },
  { day: "Tue", produced: 6500, sold: 6100, available: 400 },
  { day: "Wed", produced: 6800, sold: 6400, available: 400 },
  { day: "Thu", produced: 6400, sold: 6000, available: 400 },
  { day: "Fri", produced: 6900, sold: 6500, available: 400 },
  { day: "Sat", produced: 6300, sold: 5900, available: 400 },
  { day: "Sun", produced: 6580, sold: 6150, available: 430 },
]

// Producer revenue data (last 7 months)
export const producerRevenueData = [
  { month: "Jul", revenue: 4200, energy: 35000 },
  { month: "Aug", revenue: 4500, energy: 37500 },
  { month: "Sep", revenue: 4800, energy: 40000 },
  { month: "Oct", revenue: 4650, energy: 38750 },
  { month: "Nov", revenue: 5100, energy: 42500 },
  { month: "Dec", revenue: 4900, energy: 40833 },
  { month: "Jan", revenue: 5058, energy: 42150 },
]

// Producer's recent sales
export const producerSales: EnergyTrade[] = [
  {
    id: "T001",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 150,
    price: 2.50,
    totalPrice: 375.0,
    timestamp: "2025-01-15T14:30:00Z",
    status: "completed",
  },
  {
    id: "T004",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "6",
    consumerName: "Bob Smith",
    amount: 120,
    price: 2.50,
    totalPrice: 288.0,
    timestamp: "2025-01-15T09:15:00Z",
    status: "pending",
  },
  {
    id: "T006",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "7",
    consumerName: "Alice Johnson",
    amount: 200,
    price: 2.50,
    totalPrice: 480.0,
    timestamp: "2025-01-14T16:45:00Z",
    status: "completed",
  },
  {
    id: "T007",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 180,
    price: 2.50,
    totalPrice: 432.0,
    timestamp: "2025-01-14T11:20:00Z",
    status: "completed",
  },
  {
    id: "T008",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "6",
    consumerName: "Bob Smith",
    amount: 160,
    price: 2.50,
    totalPrice: 384.0,
    timestamp: "2025-01-13T15:30:00Z",
    status: "completed",
  },
]

// Top buyers for producer
export const topBuyers = [
  { name: "Home Consumer", purchases: 24, totalEnergy: 3600, totalSpent: 432.0 },
  { name: "Bob Smith", purchases: 18, totalEnergy: 2880, totalSpent: 345.6 },
  { name: "Alice Johnson", purchases: 15, totalEnergy: 2400, totalSpent: 288.0 },
  { name: "Tech Corp", purchases: 12, totalEnergy: 3000, totalSpent: 360.0 },
  { name: "Green Cafe", purchases: 10, totalEnergy: 1800, totalSpent: 216.0 },
]

// Consumer stats
export const consumerStats: ConsumerStats = {
  totalConsumed: 3850, // kWh
  totalSpent: 462.0,
  tokenBalance: 450.25,
  activeConnections: 5,
}

// Consumer consumption data (last 7 days)
export const consumptionData = [
  { day: "Mon", consumed: 520, cost: 62.4, saved: 8.5 },
  { day: "Tue", consumed: 580, cost: 69.6, saved: 9.2 },
  { day: "Wed", consumed: 550, cost: 66.0, saved: 8.8 },
  { day: "Thu", consumed: 600, cost: 72.0, saved: 9.6 },
  { day: "Fri", consumed: 530, cost: 63.6, saved: 8.5 },
  { day: "Sat", consumed: 480, cost: 57.6, saved: 7.7 },
  { day: "Sun", consumed: 590, cost: 70.8, saved: 9.4 },
]

// Consumer spending data (last 7 months)
export const consumerSpendingData = [
  { month: "Jul", spent: 380, traditional: 495, saved: 115 },
  { month: "Aug", spent: 395, traditional: 515, saved: 120 },
  { month: "Sep", spent: 410, traditional: 535, saved: 125 },
  { month: "Oct", spent: 425, traditional: 555, saved: 130 },
  { month: "Nov", spent: 440, traditional: 575, saved: 135 },
  { month: "Dec", spent: 455, traditional: 595, saved: 140 },
  { month: "Jan", spent: 462, traditional: 605, saved: 143 },
]

// Available energy producers nearby
export const availableProducers: EnergyProducer[] = [
  {
    id: "P001",
    name: "Solar Farm Producer",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "123 Solar St, San Francisco, CA",
    },
    capacity: 500,
    currentOutput: 420,
    energyType: "solar",
    pricePerKwh: 2.50,
    available: true,
  },
  {
    id: "P002",
    name: "Wind Energy Co",
    location: {
      lat: 37.7849,
      lng: -122.4094,
      address: "456 Wind Ave, San Francisco, CA",
    },
    capacity: 800,
    currentOutput: 650,
    energyType: "wind",
    pricePerKwh: 2.30,
    available: true,
  },
  {
    id: "P003",
    name: "Hydro Power Station",
    location: {
      lat: 37.7649,
      lng: -122.4294,
      address: "789 River Rd, San Francisco, CA",
    },
    capacity: 1200,
    currentOutput: 980,
    energyType: "hydro",
    pricePerKwh: 2.10,
    available: true,
  },
  {
    id: "P004",
    name: "Community Solar",
    location: {
      lat: 37.7949,
      lng: -122.3994,
      address: "321 Green Blvd, San Francisco, CA",
    },
    capacity: 300,
    currentOutput: 280,
    energyType: "solar",
    pricePerKwh: 2.70,
    available: true,
  },
  {
    id: "P005",
    name: "Eco Wind Farm",
    location: {
      lat: 37.7549,
      lng: -122.4394,
      address: "654 Breeze Ln, San Francisco, CA",
    },
    capacity: 600,
    currentOutput: 0,
    energyType: "wind",
    pricePerKwh: 2.30,
    available: false,
  },
]

// Consumer's recent purchases
export const consumerPurchases: EnergyTrade[] = [
  {
    id: "T001",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 150,
    price: 2.50,
    totalPrice: 375.0,
    timestamp: "2025-01-15T14:30:00Z",
    status: "completed",
  },
  {
    id: "T005",
    producerId: "4",
    producerName: "John Solar",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 250,
    price: 2.30,
    totalPrice: 550.0,
    timestamp: "2025-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "T009",
    producerId: "2",
    producerName: "Solar Farm Producer",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 180,
    price: 2.50,
    totalPrice: 432.0,
    timestamp: "2025-01-14T16:20:00Z",
    status: "completed",
  },
  {
    id: "T010",
    producerId: "5",
    producerName: "Jane Wind",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 200,
    price: 2.70,
    totalPrice: 520.0,
    timestamp: "2025-01-14T09:45:00Z",
    status: "completed",
  },
  {
    id: "T011",
    producerId: "4",
    producerName: "John Solar",
    consumerId: "3",
    consumerName: "Home Consumer",
    amount: 160,
    price: 2.30,
    totalPrice: 352.0,
    timestamp: "2025-01-13T13:15:00Z",
    status: "completed",
  },
]
