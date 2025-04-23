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
import { Search, Filter, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Mock withdrawal data
const withdrawals = [
  {
    id: "WD-1234",
    seller: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    amount: 1250.0,
    currency: "USD",
    method: "Bank Transfer",
    accountDetails: "XXXX-XXXX-XXXX-1234",
    requestDate: "2023-04-20T14:30:00",
    status: "pending",
    notes: "",
  },
  {
    id: "WD-1235",
    seller: {
      id: "user-4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
    },
    amount: 750.5,
    currency: "USD",
    method: "PayPal",
    accountDetails: "emily.davis@example.com",
    requestDate: "2023-04-21T10:15:00",
    status: "pending",
    notes: "",
  },
  {
    id: "WD-1236",
    seller: {
      id: "user-7",
      name: "David Miller",
      email: "david.miller@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=DM",
    },
    amount: 2100.75,
    currency: "USD",
    method: "Bank Transfer",
    accountDetails: "XXXX-XXXX-XXXX-5678",
    requestDate: "2023-04-19T16:45:00",
    status: "approved",
    notes: "Approved on April 22, 2023",
  },
  {
    id: "WD-1237",
    seller: {
      id: "user-9",
      name: "James Anderson",
      email: "james.anderson@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JA",
    },
    amount: 500.0,
    currency: "USD",
    method: "PayPal",
    accountDetails: "james.anderson@example.com",
    requestDate: "2023-04-18T09:30:00",
    status: "rejected",
    notes: "Insufficient account verification",
  },
  {
    id: "WD-1238",
    seller: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    amount: 800.25,
    currency: "USD",
    method: "Bank Transfer",
    accountDetails: "XXXX-XXXX-XXXX-1234",
    requestDate: "2023-04-15T13:20:00",
    status: "approved",
    notes: "Approved on April 17, 2023",
  },
  {
    id: "WD-1239",
    seller: {
      id: "user-4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
    },
    amount: 1500.0,
    currency: "USD",
    method: "PayPal",
    accountDetails: "emily.davis@example.com",
    requestDate: "2023-04-14T11:10:00",
    status: "approved",
    notes: "Approved on April 16, 2023",
  },
  {
    id: "WD-1240",
    seller: {
      id: "user-7",
      name: "David Miller",
      email: "david.miller@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=DM",
    },
    amount: 950.5,
    currency: "USD",
    method: "Bank Transfer",
    accountDetails: "XXXX-XXXX-XXXX-5678",
    requestDate: "2023-04-13T15:40:00",
    status: "rejected",
    notes: "Suspicious activity detected",
  },
  {
    id: "WD-1241",
    seller: {
      id: "user-9",
      name: "James Anderson",
      email: "james.anderson@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JA",
    },
    amount: 1200.0,
    currency: "USD",
    method: "PayPal",
    accountDetails: "james.anderson@example.com",
    requestDate: "2023-04-12T10:25:00",
    status: "approved",
    notes: "Approved on April 14, 2023",
  },
]

export default function WithdrawalsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [localWithdrawals, setLocalWithdrawals] = useState(withdrawals)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
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

  // Filter withdrawals based on search term and status
  const filteredWithdrawals = localWithdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.seller.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || withdrawal.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Paginate withdrawals
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentWithdrawals = filteredWithdrawals.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage)

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
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  // Handle withdrawal approval
  const handleApproveWithdrawal = () => {
    if (!selectedWithdrawal) return

    setLocalWithdrawals((prev) =>
      prev.map((w) =>
        w.id === selectedWithdrawal.id
          ? {
              ...w,
              status: "approved",
              notes: `Approved on ${new Date().toLocaleDateString()}`,
            }
          : w,
      ),
    )

    toast({
      title: "Withdrawal approved",
      description: `Withdrawal ${selectedWithdrawal.id} has been approved successfully.`,
    })

    setIsApproveDialogOpen(false)
    setSelectedWithdrawal(null)
  }

  // Handle withdrawal rejection
  const handleRejectWithdrawal = () => {
    if (!selectedWithdrawal) return

    setLocalWithdrawals((prev) =>
      prev.map((w) =>
        w.id === selectedWithdrawal.id
          ? {
              ...w,
              status: "rejected",
              notes: rejectionReason || "Rejected by admin",
            }
          : w,
      ),
    )

    toast({
      title: "Withdrawal rejected",
      description: `Withdrawal ${selectedWithdrawal.id} has been rejected.`,
      variant: "destructive",
    })

    setIsRejectDialogOpen(false)
    setSelectedWithdrawal(null)
    setRejectionReason("")
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Withdrawal Requests</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Seller Withdrawals</CardTitle>
            <CardDescription>Approve or reject withdrawal requests from sellers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search withdrawals..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentWithdrawals.length > 0 ? (
                    currentWithdrawals.map((withdrawal) => (
                      <TableRow key={withdrawal.id}>
                        <TableCell className="font-medium">{withdrawal.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={withdrawal.seller.avatar || "/placeholder.svg"}
                                alt={withdrawal.seller.name}
                              />
                              <AvatarFallback>{withdrawal.seller.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{withdrawal.seller.name}</div>
                              <div className="text-sm text-muted-foreground">{withdrawal.seller.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                        <TableCell>{withdrawal.method}</TableCell>
                        <TableCell>{formatDate(withdrawal.requestDate)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(withdrawal.status)} variant="outline">
                            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {withdrawal.status === "pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                  onClick={() => {
                                    setSelectedWithdrawal(withdrawal)
                                    setIsApproveDialogOpen(true)
                                  }}
                                >
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                  onClick={() => {
                                    setSelectedWithdrawal(withdrawal)
                                    setIsRejectDialogOpen(true)
                                  }}
                                >
                                  <XCircle className="mr-1 h-4 w-4" />
                                  Reject
                                </Button>
                              </>
                            )}
                            {withdrawal.status !== "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  toast({
                                    title: "Withdrawal details",
                                    description: withdrawal.notes || "No additional notes available.",
                                  })
                                }}
                              >
                                <AlertCircle className="mr-1 h-4 w-4" />
                                Details
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No withdrawal requests found.
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

      {/* Approve Withdrawal Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Withdrawal</DialogTitle>
            <DialogDescription>Are you sure you want to approve this withdrawal request?</DialogDescription>
          </DialogHeader>
          {selectedWithdrawal && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Withdrawal ID</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Seller</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.seller.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Amount</p>
                  <p className="text-sm text-muted-foreground">
                    ${selectedWithdrawal.amount.toFixed(2)} {selectedWithdrawal.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Method</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.method}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveWithdrawal}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Withdrawal Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Withdrawal</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this withdrawal request.</DialogDescription>
          </DialogHeader>
          {selectedWithdrawal && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Withdrawal ID</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Seller</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.seller.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Amount</p>
                  <p className="text-sm text-muted-foreground">
                    ${selectedWithdrawal.amount.toFixed(2)} {selectedWithdrawal.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Method</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.method}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Rejection Reason
                </label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for rejection"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectWithdrawal}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
