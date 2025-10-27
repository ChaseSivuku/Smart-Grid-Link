import { Zap, DollarSign, TrendingUp, Users, Battery, Sun } from "lucide-react"
import { ProfileDropdown } from "@/components/ProfileDropdown"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { StatCard } from "@/components/StatCard"
import { producerStats, productionData, producerRevenueData, producerSales, topBuyers } from "@/services/dummyData"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

export function ProducerDashboard() {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(num)
  }

  const efficiency = ((producerStats.totalSold / producerStats.totalProduced) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Producer Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor your energy production and sales</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-energy-green/10 border border-energy-green/20 rounded-lg">
              <div className="w-2 h-2 bg-energy-green rounded-full animate-pulse" />
              <span className="text-sm font-medium text-energy-green">System Online</span>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Produced"
            value={`${formatNumber(producerStats.totalProduced)} kWh`}
            change={8.2}
            icon={<Sun className="w-6 h-6 text-energy-green" />}
            iconColor="bg-energy-green/10"
          />
          <StatCard
            title="Total Sold"
            value={`${formatNumber(producerStats.totalSold)} kWh`}
            change={7.5}
            icon={<Zap className="w-6 h-6 text-energy-blue" />}
            iconColor="bg-energy-blue/10"
          />
          <StatCard
            title="Revenue"
            value={formatCurrency(producerStats.revenue)}
            change={12.3}
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            iconColor="bg-primary/10"
          />
          <StatCard
            title="Token Balance"
            value={`${producerStats.tokenBalance} SGT`}
            change={5.8}
            icon={<TrendingUp className="w-6 h-6 text-energy-green" />}
            iconColor="bg-energy-green/10"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Efficiency Rate</h3>
              <Battery className="w-5 h-5 text-energy-green" />
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">{efficiency}%</p>
            <p className="text-sm text-muted-foreground">Energy sold vs produced</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Active Buyers</h3>
              <Users className="w-5 h-5 text-energy-blue" />
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">{producerStats.activeConnections}</p>
            <p className="text-sm text-muted-foreground">Connected consumers</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Avg Price</h3>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-card-foreground mb-2">R0.12</p>
            <p className="text-sm text-muted-foreground">Per kWh</p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Production Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Production</CardTitle>
              <CardDescription>Energy produced vs sold over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={productionData}>
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
                  <Area
                    type="monotone"
                    dataKey="produced"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Produced (kWh)"
                  />
                  <Area
                    type="monotone"
                    dataKey="sold"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Sold (kWh)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over the last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={producerRevenueData}>
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
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Revenue (R)"
                    dot={{ fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Buyers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Buyers</CardTitle>
            <CardDescription>Your most active customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBuyers.map((buyer, index) => (
                <div key={buyer.name} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-energy-green to-energy-blue rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">{buyer.name}</p>
                      <p className="text-sm text-muted-foreground">{buyer.purchases} purchases</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">{formatNumber(buyer.totalEnergy)} kWh</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(buyer.totalSpent)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Your latest energy transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Sale ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Buyer</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {producerSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-card-foreground">{sale.id}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{sale.consumerName}</td>
                      <td className="py-3 px-4 text-sm text-right text-card-foreground">{sale.amount} kWh</td>
                      <td className="py-3 px-4 text-sm text-right text-muted-foreground">R{sale.price}/kWh</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-card-foreground">
                        {formatCurrency(sale.totalPrice)}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(sale.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            sale.status === "completed"
                              ? "bg-energy-green/10 text-energy-green"
                              : sale.status === "pending"
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {sale.status}
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
