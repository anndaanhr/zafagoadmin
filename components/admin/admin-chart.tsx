"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for the charts
const revenueData = [
  { name: "Jan", total: 18500 },
  { name: "Feb", total: 22000 },
  { name: "Mar", total: 19500 },
  { name: "Apr", total: 25000 },
  { name: "May", total: 32000 },
  { name: "Jun", total: 28000 },
  { name: "Jul", total: 34000 },
  { name: "Aug", total: 36000 },
  { name: "Sep", total: 32000 },
  { name: "Oct", total: 38000 },
  { name: "Nov", total: 42000 },
  { name: "Dec", total: 45000 },
]

const salesData = [
  { name: "Jan", total: 320 },
  { name: "Feb", total: 380 },
  { name: "Mar", total: 350 },
  { name: "Apr", total: 420 },
  { name: "May", total: 580 },
  { name: "Jun", total: 520 },
  { name: "Jul", total: 620 },
  { name: "Aug", total: 680 },
  { name: "Sep", total: 580 },
  { name: "Oct", total: 710 },
  { name: "Nov", total: 800 },
  { name: "Dec", total: 850 },
]

export function AdminChart({ type = "revenue" }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  if (type === "revenue") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <Tooltip
            formatter={(value) => [`$${value}`, "Revenue"]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={salesData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Tooltip
          formatter={(value) => [`${value}`, "Sales"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
