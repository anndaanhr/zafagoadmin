"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  DollarSign,
  Settings,
  LogOut,
  ShieldAlert,
  BarChart,
  Store,
  Tag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    {
      title: "Dashboard",
      items: [
        {
          label: "Overview",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          label: "Analytics",
          href: "/admin/analytics",
          icon: BarChart,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          label: "Users",
          href: "/admin/users",
          icon: Users,
        },
        {
          label: "Transactions",
          href: "/admin/transactions",
          icon: ShoppingCart,
        },
        {
          label: "Withdrawals",
          href: "/admin/withdrawals",
          icon: DollarSign,
        },
        {
          label: "Products",
          href: "/admin/products",
          icon: Tag,
        },
        {
          label: "Sellers",
          href: "/admin/sellers",
          icon: Store,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          label: "Settings",
          href: "/admin/settings",
          icon: Settings,
        },
        {
          label: "Security",
          href: "/admin/security",
          icon: ShieldAlert,
        },
      ],
    },
  ]

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {menuItems.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{section.title}</h3>
            <nav className="flex flex-col space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}

        <div className="pt-4">
          <Button variant="destructive" className="w-full" size="sm" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </Card>
  )
}
