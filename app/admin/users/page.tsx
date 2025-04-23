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
import { Search, Download, Filter, MoreHorizontal, Ban, CheckCircle, AlertCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

// Mock user data
const users = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2023-01-15T10:30:00",
    lastLogin: "2023-04-22T14:45:00",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "seller",
    status: "active",
    joinDate: "2023-02-10T09:15:00",
    lastLogin: "2023-04-23T11:20:00",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "buyer",
    status: "inactive",
    joinDate: "2023-01-20T16:45:00",
    lastLogin: "2023-03-15T08:30:00",
    avatar: "/placeholder.svg?height=40&width=40&text=RJ",
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "seller",
    status: "active",
    joinDate: "2023-03-05T13:10:00",
    lastLogin: "2023-04-21T17:40:00",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
  },
  {
    id: "user-5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "buyer",
    status: "suspended",
    joinDate: "2023-02-18T11:25:00",
    lastLogin: "2023-04-10T09:15:00",
    avatar: "/placeholder.svg?height=40&width=40&text=MW",
  },
  {
    id: "user-6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2023-03-12T10:00:00",
    lastLogin: "2023-04-22T16:30:00",
    avatar: "/placeholder.svg?height=40&width=40&text=SB",
  },
  {
    id: "user-7",
    name: "David Miller",
    email: "david.miller@example.com",
    role: "seller",
    status: "active",
    joinDate: "2023-01-25T14:20:00",
    lastLogin: "2023-04-23T10:10:00",
    avatar: "/placeholder.svg?height=40&width=40&text=DM",
  },
  {
    id: "user-8",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2023-02-28T09:45:00",
    lastLogin: "2023-04-20T15:25:00",
    avatar: "/placeholder.svg?height=40&width=40&text=JT",
  },
  {
    id: "user-9",
    name: "James Anderson",
    email: "james.anderson@example.com",
    role: "seller",
    status: "inactive",
    joinDate: "2023-03-18T11:30:00",
    lastLogin: "2023-04-15T13:40:00",
    avatar: "/placeholder.svg?height=40&width=40&text=JA",
  },
  {
    id: "user-10",
    name: "Lisa Thomas",
    email: "lisa.thomas@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2023-02-05T16:15:00",
    lastLogin: "2023-04-21T09:50:00",
    avatar: "/placeholder.svg?height=40&width=40&text=LT",
  },
]

export default function UsersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [localUsers, setLocalUsers] = useState(users)
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

  // Filter users based on search term, role, and status
  const filteredUsers = localUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || u.role === roleFilter
    const matchesStatus = statusFilter === "all" || u.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Paginate users
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

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

  // Handle user status change
  const handleStatusChange = (userId, newStatus) => {
    setLocalUsers((prevUsers) => prevUsers.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)))

    const actionText = newStatus === "suspended" ? "suspended" : newStatus === "active" ? "activated" : "deactivated"

    toast({
      title: `User ${actionText}`,
      description: `The user has been ${actionText} successfully.`,
      variant: newStatus === "suspended" ? "destructive" : "default",
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage buyer and seller accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="buyer">Buyers</SelectItem>
                    <SelectItem value="seller">Sellers</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={u.avatar || "/placeholder.svg"} alt={u.name} />
                              <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{u.name}</div>
                              <div className="text-sm text-muted-foreground">{u.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(u.status)} variant="outline">
                            {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(u.joinDate)}</TableCell>
                        <TableCell>{formatDate(u.lastLogin)}</TableCell>
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
                              <DropdownMenuItem onClick={() => router.push(`/admin/users/${u.id}`)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {u.status !== "active" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(u.id, "active")}
                                  className="text-green-600 dark:text-green-400"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {u.status !== "inactive" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(u.id, "inactive")}
                                  className="text-yellow-600 dark:text-yellow-400"
                                >
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              )}
                              {u.status !== "suspended" && (
                                <DropdownMenuItem
                                  onClick={() => handleStatusChange(u.id, "suspended")}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
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
