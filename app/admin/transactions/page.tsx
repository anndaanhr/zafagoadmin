"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/admin/pagination"
import { Search, Download, Filter } from "lucide-react"

// Mock transaction data
const transactions = [
  {
    id: "TX-1234",
    date: "2023-04-23T12:00:00",
    customer: "John Doe",
    product: "Elden Ring",
    amount: 59.99,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX-1235",
    date: "2023-04-23T11:30:00",
    customer: "Jane Smith",
    product: "Cyberpunk 2077",
    amount: 49.99,
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: "TX-1236",
    date: "2023-04-23T10:45:00",
    customer: "Robert Johnson",
    product: "Microsoft Office",
    amount: 149.99,
    status: "pending",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX-1237",
    date: "2023-04-22T15:20:00",
    customer: "Emily Davis",
    product: "Adobe Creative Cloud",
    amount: 52.99,
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: "TX-1238",
    date: "2023-04-22T14:10:00",
    customer: "Michael Wilson",
    product: "Minecraft",
    amount: 29.99,
    status: "failed",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX-1239",
    date: "2023-04-22T09:30:00",
    customer: "Sarah Brown",
    product: "Call of Duty: Modern Warfare",
    amount: 69.99,
    status: "completed",
    paymentMethod: "Crypto",
  },
  {
    id: "TX-1240",
    date: "2023-04-21T16:45:00",
    customer: "David Miller",
    product: "FIFA 23",
    amount: 59.99,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX-1241",
    date: "2023-04-21T13:15:00",
    customer: "Jennifer Taylor",
    product: "The Sims 4",
    amount: 39.99,
    status: "pending",
    paymentMethod: "PayPal",
  },
  {
    id: "TX-1242",
    date: "2023-04-21T11:00:00",
    customer: "James Anderson",
    product: "Grand Theft Auto V",
    amount: 29.99,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX-1243",
    date: "2023-04-20T17:30:00",
    customer: "Lisa Thomas",
    product: "Red Dead Redemption 2",
    amount: 59.99,
    status: "completed",
    paymentMethod: "PayPal",
  },
]

export default function TransactionsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    // If not logged in or not an admin, redirect to login
    if (!user) {
      router.push("/admin/login")
    } else if (!user.isAdmin) {
      router.push("/admin/login")
    }
  }, [user, router])

  if (!user || !user.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Checking authentication...</h1>
          <p className="mt-2">Please wait while we verify your credentials.</p>
        </div>
      </div>
    )
  }

  // Filter transactions based on search term and status
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate transactions
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Management</CardTitle>
            <CardDescription>View and manage all transactions in your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{transaction.product}</TableCell>
                        <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)} variant="outline">
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
