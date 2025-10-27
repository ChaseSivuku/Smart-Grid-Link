import { Zap, DollarSign, TrendingDown, Users, Battery, MapPin } from "lucide-react"
import { ProfileDropdown } from "@/components/ProfileDropdown"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { StatCard } from "@/components/StatCard"
import {
  consumerStats,
  consumptionData,
  consumerSpendingData,
  consumerPurchases,
  availableProducers,
} from "@/services/dummyData"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

export function ConsumerDashboard() {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(num)
  }

  const totalSavings = consumerSpendingData.reduce((acc, month) => acc + month.saved, 0)
  const avgPrice = consumerStats.totalSpent / consumerStats.totalConsumed

  const getEnergyIcon = (type: string) => {
    switch (type) {
      case "solar":
        return "☀️"
      case "wind":
        return "💨"
      case "hydro":
        return "💧"
      default:
        return "⚡"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Consumer Dashboard</h1>
              <p className="text-muted-foreground mt-1">Track your energy consumption and savings</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-energy-blue/10 border border-energy-blue/20 rounded-lg">
              <Battery className="w-4 h-4 text-energy-blue" />
              <span className="text-sm font-medium text-energy-blue">Connected to Grid</span>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Consumed"
            value={`${formatNumber(consumerStats.totalConsumed)} kWh`}
            change={-3.2}
            icon={<Zap className="w-6 h-6 text-energy-blue" />}
            iconColor="bg-energy-blue/10"
          />
          <StatCard
            title="Total Spent"
            value={formatCurrency(consumerStats.totalSpent)}
            change={-5.8}
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            iconColor="bg-primary/10"
          />
          <StatCard
            title="Token Balance"
            value={`${consumerStats.tokenBalance} SGT`}
            change={8.5}
            icon={<TrendingDown className="w-6 h-6 text-energy-green" />}
            iconColor="bg-energy-green/10"
          />
          <StatCard
            title="Active Connections"
            value={consumerStats.activeConnections}
            change={12.0}
            icon={<Users className="w-6 h-6 text-primary" />}
            iconColor="bg-primary/10"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Total Savings</h3>
              <TrendingDown className="w-5 h-5 text-energy-green" />
            </div>
            <p className="text-3xl font-bold text-energy-green mb-2">{formatCurrency(totalSavings)}</p>
            <p className="text-sm text-muted-foreground">vs traditional energy</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Avg Price</h3>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">R{avgPrice.toFixed(3)}</p>
            <p className="text-sm text-muted-foreground">Per kWh</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">This Week</h3>
              <Zap className="w-5 h-5 text-energy-blue" />
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">
              {consumptionData.reduce((acc, day) => acc + day.consumed, 0)} kWh
            </p>
            <p className="text-sm text-muted-foreground">Total consumption</p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Consumption Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Consumption</CardTitle>
              <CardDescription>Daily energy usage over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={consumptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="consumed" fill="#3b82f6" name="Consumed (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Savings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Comparison</CardTitle>
              <CardDescription>SmartGridLink vs traditional energy costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={consumerSpendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="spent"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="SmartGridLink (R)"
                    dot={{ fill: "#10b981" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="traditional"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Traditional (R)"
                    dot={{ fill: "#ef4444" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Available Producers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Energy Sources</CardTitle>
            <CardDescription>Nearby producers with available energy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableProducers.map((producer) => (
                <div
                  key={producer.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    producer.available
                      ? "bg-card border-border hover:border-primary/50"
                      : "bg-muted/30 border-border opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-energy-green to-energy-blue rounded-lg flex items-center justify-center text-2xl">
                      {getEnergyIcon(producer.energyType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-card-foreground">{producer.name}</p>
                        {producer.available ? (
                          <span className="px-2 py-0.5 bg-energy-green/10 text-energy-green text-xs font-medium rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                            Offline
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{producer.location.address}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">
                          Output: <span className="text-card-foreground font-medium">{producer.currentOutput} kW</span>
                        </span>
                        <span className="text-muted-foreground">
                          Capacity: <span className="text-card-foreground font-medium">{producer.capacity} kW</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-card-foreground">R{producer.pricePerKwh}</p>
                    <p className="text-sm text-muted-foreground">per kWh</p>
                    {producer.available && (
                      <button className="mt-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Purchases Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
            <CardDescription>Your latest energy transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Purchase ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Producer</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consumerPurchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-card-foreground">{purchase.id}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{purchase.producerName}</td>
                      <td className="py-3 px-4 text-sm text-right text-card-foreground">{purchase.amount} kWh</td>
                      <td className="py-3 px-4 text-sm text-right text-muted-foreground">R{purchase.price}/kWh</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-card-foreground">
                        {formatCurrency(purchase.totalPrice)}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(purchase.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            purchase.status === "completed"
                              ? "bg-energy-green/10 text-energy-green"
                              : purchase.status === "pending"
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {purchase.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
