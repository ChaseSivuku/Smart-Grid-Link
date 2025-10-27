import { Users, Zap, DollarSign, Activity, TrendingUp } from "lucide-react"
import { ProfileDropdown } from "@/components/ProfileDropdown"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { StatCard } from "@/components/StatCard"
import { systemMetrics, energyTrendsData, userGrowthData, dummyTrades } from "@/services/dummyData"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function AdminDashboard() {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(num)
  }

  const formatEnergy = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M kWh`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K kWh`
    }
    return `${num} kWh`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor system performance and user activity</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">System Active</span>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={formatNumber(systemMetrics.totalUsers)}
            change={12.5}
            icon={<Users className="w-6 h-6 text-primary" />}
            iconColor="bg-primary/10"
          />
          <StatCard
            title="Total Trades"
            value={formatNumber(systemMetrics.totalTrades)}
            change={8.3}
            icon={<Activity className="w-6 h-6 text-energy-blue" />}
            iconColor="bg-energy-blue/10"
          />
          <StatCard
            title="Energy Traded"
            value={formatEnergy(systemMetrics.totalEnergyTraded)}
            change={15.7}
            icon={<Zap className="w-6 h-6 text-energy-green" />}
            iconColor="bg-energy-green/10"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(systemMetrics.totalRevenue)}
            change={10.2}
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            iconColor="bg-primary/10"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Energy Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Energy Trading Trends</CardTitle>
              <CardDescription>Monthly energy traded over the last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energyTrendsData}>
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
                    dataKey="energy"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Energy (kWh)"
                    dot={{ fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Producers vs Consumers over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
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
                  <Bar dataKey="producers" fill="#10b981" name="Producers" />
                  <Bar dataKey="consumers" fill="#3b82f6" name="Consumers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Producers</h3>
              <div className="w-10 h-10 bg-energy-green/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-energy-green" />
              </div>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">{formatNumber(systemMetrics.totalProducers)}</p>
            <p className="text-sm text-muted-foreground">
              {((systemMetrics.totalProducers / systemMetrics.totalUsers) * 100).toFixed(1)}% of total users
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Consumers</h3>
              <div className="w-10 h-10 bg-energy-blue/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-energy-blue" />
              </div>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">{formatNumber(systemMetrics.totalConsumers)}</p>
            <p className="text-sm text-muted-foreground">
              {((systemMetrics.totalConsumers / systemMetrics.totalUsers) * 100).toFixed(1)}% of total users
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Active Now</h3>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">
              {formatNumber(systemMetrics.activeConnections)}
            </p>
            <p className="text-sm text-muted-foreground">
              {((systemMetrics.activeConnections / systemMetrics.totalUsers) * 100).toFixed(1)}% of total users
            </p>
          </Card>
        </div>

        {/* Recent Trades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
            <CardDescription>Latest energy transactions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Trade ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Producer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Consumer</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyTrades.map((trade) => (
                    <tr key={trade.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-card-foreground">{trade.id}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{trade.producerName}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{trade.consumerName}</td>
                      <td className="py-3 px-4 text-sm text-right text-card-foreground">{trade.amount} kWh</td>
                      <td className="py-3 px-4 text-sm text-right text-muted-foreground">R{trade.price}/kWh</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-card-foreground">
                        {formatCurrency(trade.totalPrice)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            trade.status === "completed"
                              ? "bg-energy-green/10 text-energy-green"
                              : trade.status === "pending"
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {trade.status}
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
