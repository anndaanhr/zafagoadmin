"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentTransactions() {
  // Mock transaction data
  const recentTransactions = [
    {
      id: "TRX-12345",
      date: "2023-04-15T14:30:00Z",
      user: {
        id: "USR-789",
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
      },
      product: "Elden Ring",
      platform: "Steam",
      amount: 59.99,
      status: "completed",
    },
    {
      id: "TRX-12344",
      date: "2023-04-15T12:15:00Z",
      user: {
        id: "USR-456",
        name: "Emma Johnson",
        email: "emma.j@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=EJ",
      },
      product: "Microsoft Office 2023",
      platform: "Windows",
      amount: 149.99,
      status: "completed",
    },
    {
      id: "TRX-12343",
      date: "2023-04-14T18:45:00Z",
      user: {
        id: "USR-123",
        name: "Alex Williams",
        email: "alex.w@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=AW",
      },
      product: "Cyberpunk 2077",
      platform: "Epic Games",
      amount: 49.99,
      status: "completed",
    },
    {
      id: "TRX-12338",
      date: "2023-04-12T14:30:00Z",
      user: {
        id: "USR-456",
        name: "Emma Johnson",
        email: "emma.j@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=EJ",
      },
      product: "Windows 11 Pro",
      platform: "Windows",
      amount: 199.99,
      status: "pending",
    },
    {
      id: "TRX-12336",
      date: "2023-04-11T08:15:00Z",
      user: {
        id: "USR-789",
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
      },
      product: "Spotify Premium (1 Year)",
      platform: "Spotify",
      amount: 99.99,
      status: "failed",
    },
  ]

  // Status badge renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={transaction.user.avatar || "/placeholder.svg"} alt={transaction.user.name} />
              <AvatarFallback>
                {transaction.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{transaction.user.name}</span>
                <span className="text-xs text-muted-foreground">#{transaction.id}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {transaction.product} ({transaction.platform})
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">${transaction.amount.toFixed(2)}</div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</span>
              {renderStatusBadge(transaction.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
