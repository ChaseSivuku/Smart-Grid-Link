import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`bg-card border border-border rounded-lg shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }: CardProps) {
  return <h3 className={`text-lg font-semibold text-card-foreground ${className}`}>{children}</h3>
}

export function CardDescription({ children, className = "" }: CardProps) {
  return <p className={`text-sm text-muted-foreground mt-1 ${className}`}>{children}</p>
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}
