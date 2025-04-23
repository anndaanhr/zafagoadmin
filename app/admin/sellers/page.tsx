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
import { Search, Filter, MoreHorizontal, Ban, CheckCircle, AlertCircle, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock seller data
const sellers = [
  {
    id: "seller-1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    status: "active",
    verificationStatus: "verified",
    productsCount: 15,
    totalSales: 12500,
    joinDate: "2023-01-15T10:30:00",
    lastActive: "2023-04-22T14:45:00",
  },
  {
    id: "seller-2",
    name: "David Miller",
    email: "david.miller@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=DM",
    status: "active",
    verificationStatus: "verified",
    productsCount: 8,
    totalSales: 8750,
    joinDate: "2023-02-10T09:15:00",
    lastActive: "2023-04-23T11:20:00",
  },
  {
    id: "seller-3",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    status: "active",
    verificationStatus: "pending",
    productsCount: 5,
    totalSales: 3200,
    joinDate: "2023-03-05T13:10:00",
    lastActive: "2023-04-21T17:40:00",
  },
  {
    id: "seller-4",
    name: "James Anderson",
    email: "james.anderson@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=JA",
    status: "inactive",
    verificationStatus: "verified",
    productsCount: 12,
    totalSales: 9800,
    joinDate: "2023-01-25T14:20:00",
    lastActive: "2023-04-15T13:40:00",
  },
  {
    id: "seller-5",
    name: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=SW",
    status: "suspended",
    verificationStatus: "rejected",
    productsCount: 3,
    totalSales: 1500,
    joinDate: "2023-02-18T11:25:00",
    lastActive: "2023-04-10T09:15:00",
  },
  {
    id: "seller-6",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
    status: "active",
    verificationStatus: "verified",
    productsCount: 20,
    totalSales: 15000,
    joinDate: "2023-01-05T16:15:00",
    lastActive: "2023-04-23T10:10:00",
  },
  {
    id: "seller-7",
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=OT",
    status: "active",
    verificationStatus: "verified",
    productsCount: 7,
    totalSales: 6200,
    joinDate: "2023-02-28T09:45:00",
    lastActive: "2023-04-20T15:25:00",
  },
  {
    id: "seller-8",
    name: "Daniel Johnson",
    email: "daniel.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=DJ",
    status: "active",
    verificationStatus: "pending",
    productsCount: 4,
    totalSales: 2800,
    joinDate: "2023-03-18T11:30:00",
    lastActive: "2023-04-22T16:30:00",
  },
]

export default function SellersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [localSellers, setLocalSellers] = useState(sellers)
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

  // Filter sellers based on search term, status, and verification status
  const filteredSellers = localSellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || seller.status === statusFilter
    const matchesVerification = verificationFilter === "all" || seller.verificationStatus === verificationFilter

    return matchesSearch && matchesStatus && matchesVerification
  })

  // Paginate sellers
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSellers = filteredSellers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  // Verification status badge color
  const getVerificationColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  // Handle seller status change
  const handleStatusChange = (sellerId, newStatus) => {
    setLocalSellers((prevSellers) => prevSellers.map((s) => (s.id === sellerId ? { ...s, status: newStatus } : s)))

    const actionText = newStatus === "suspended" ? "suspended" : newStatus === "active" ? "activated" : "deactivated"

    toast({
      title: `Seller ${actionText}`,
      description: `The seller has been ${actionText} successfully.`,
      variant: newStatus === "suspended" ? "destructive" : "default",
    })
  }

  // Handle verification status change
  const handleVerificationChange = (sellerId, newStatus) => {
    setLocalSellers((prevSellers) =>
      prevSellers.map((s) => (s.id === sellerId ? { ...s, verificationStatus: newStatus } : s)),
    )

    const actionText =
      newStatus === "verified" ? "verified" : newStatus === "rejected" ? "rejected" : "marked as pending"

    toast({
      title: `Seller ${actionText}`,
      description: `The seller has been ${actionText} successfully.`,
      variant: newStatus === "rejected" ? "destructive" : "default",
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Sellers</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Seller Management</CardTitle>
            <CardDescription>Manage seller accounts and verification status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search sellers..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by verification" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Verifications</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seller</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSellers.length > 0 ? (
                    currentSellers.map((seller) => (
                      <TableRow key={seller.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                              <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{seller.name}</div>
                              <div className="text-sm text-muted-foreground">{seller.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(seller.status)} variant="outline">
                            {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getVerificationColor(seller.verificationStatus)} variant="outline">
                            {seller.verificationStatus.charAt(0).toUpperCase() + seller.verificationStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{seller.productsCount}</TableCell>
                        <TableCell>${seller.totalSales.toLocaleString()}</TableCell>
                        <TableCell>{formatDate(seller.joinDate)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => router.push(`/admin/sellers/${seller.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Status</DropdownMenuLabel>
                              {seller.status !== "active" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(seller.id, "active")}
                                  className="text-green-600 dark:text-green-400"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {seller.status !== "inactive" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(seller.id, "inactive")}
                                  className="text-yellow-600 dark:text-yellow-400"
                                >
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              )}
                              {seller.status !== "suspended" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(seller.id, "suspended")}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Verification</DropdownMenuLabel>
                              {seller.verificationStatus !== "verified" && (
                                <DropdownMenuItem
                                  onClick={() => handleVerificationChange(seller.id, "verified")}
                                  className="text-green-600 dark:text-green-400"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Verify
                                </DropdownMenuItem>
                              )}
                              {seller.verificationStatus !== "pending" && (
                                <DropdownMenuItem
                                  onClick={() => handleVerificationChange(seller.id, "pending")}
                                  className="text-yellow-600 dark:text-yellow-400"
                                >
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Mark as Pending
                                </DropdownMenuItem>
                              )}
                              {seller.verificationStatus !== "rejected" && (
                                <DropdownMenuItem
                                  onClick={() => handleVerificationChange(seller.id, "rejected")}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No sellers found.
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
