import type { ReactNode } from "react"
import { Card } from "@/components/ui/Card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon: ReactNode
  iconColor?: string
}

export function StatCard({ title, value, change, icon, iconColor = "bg-primary/10" }: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive && <TrendingUp className="w-4 h-4 text-energy-green" />}
              {isNegative && <TrendingDown className="w-4 h-4 text-destructive" />}
              <span
                className={`text-sm font-medium ${isPositive ? "text-energy-green" : isNegative ? "text-destructive" : "text-muted-foreground"}`}
              >
                {isPositive && "+"}
                {change}%
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>{icon}</div>
      </div>
    </Card>
  )
}
