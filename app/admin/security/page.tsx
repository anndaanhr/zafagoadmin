"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/admin/pagination"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, AlertTriangle, Lock } from "lucide-react"

// Mock security logs
const securityLogs = [
  {
    id: "log-1",
    timestamp: "2023-04-23T14:30:00",
    action: "login",
    status: "success",
    user: "admin@zafago.com",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-2",
    timestamp: "2023-04-23T13:15:00",
    action: "login",
    status: "failed",
    user: "unknown@example.com",
    ipAddress: "203.0.113.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-3",
    timestamp: "2023-04-23T12:45:00",
    action: "password_reset",
    status: "success",
    user: "jane.smith@example.com",
    ipAddress: "198.51.100.1",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
  },
  {
    id: "log-4",
    timestamp: "2023-04-23T11:30:00",
    action: "settings_change",
    status: "success",
    user: "admin@zafago.com",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-5",
    timestamp: "2023-04-22T16:20:00",
    action: "login",
    status: "failed",
    user: "admin@zafago.com",
    ipAddress: "45.33.100.2",
    userAgent: "Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36",
  },
  {
    id: "log-6",
    timestamp: "2023-04-22T15:10:00",
    action: "account_locked",
    status: "warning",
    user: "robert.johnson@example.com",
    ipAddress: "172.16.254.1",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
  },
  {
    id: "log-7",
    timestamp: "2023-04-22T14:05:00",
    action: "login",
    status: "success",
    user: "david.miller@example.com",
    ipAddress: "192.0.2.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-8",
    timestamp: "2023-04-22T10:30:00",
    action: "suspicious_activity",
    status: "warning",
    user: "emily.davis@example.com",
    ipAddress: "203.0.113.5",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-9",
    timestamp: "2023-04-21T18:45:00",
    action: "login",
    status: "success",
    user: "admin@zafago.com",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-10",
    timestamp: "2023-04-21T16:30:00",
    action: "api_key_generated",
    status: "success",
    user: "admin@zafago.com",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
]

export default function SecurityPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [loginAttempts, setLoginAttempts] = useState("5")
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [passwordExpiry, setPasswordExpiry] = useState("90")
  const [passwordMinLength, setPasswordMinLength] = useState("8")
  const [requireSpecialChar, setRequireSpecialChar] = useState(true)
  const [requireNumber, setRequireNumber] = useState(true)
  const [requireUppercase, setRequireUppercase] = useState(true)
  const [ipWhitelisting, setIpWhitelisting] = useState(false)
  const [whitelistedIps, setWhitelistedIps] = useState("192.168.1.1, 192.168.1.2")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Security logs
  const [currentPage, setCurrentPage] = useState(1)
  const [actionFilter, setActionFilter] = useState("all")
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

  // Filter logs based on action
  const filteredLogs = securityLogs.filter((log) => {
    return actionFilter === "all" || log.action === actionFilter
  })

  // Paginate logs
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const handleSaveSettings = () => {
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully.",
    })
  }

  const handleChangePassword = (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      })
      return
    }

    if (currentPassword === "") {
      toast({
        title: "Current password required",
        description: "Please enter your current password.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would validate the current password and update the password
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    })

    // Clear the form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Security</h2>
        </div>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
          </TabsList>

          {/* Security Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security settings for your store.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for admin accounts.
                    </p>
                  </div>
                  <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Maximum Login Attempts</Label>
                  <Input
                    id="login-attempts"
                    type="number"
                    value={loginAttempts}
                    onChange={(e) => setLoginAttempts(e.target.value)}
                    min="1"
                    max="10"
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of failed login attempts before account is locked.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    min="5"
                  />
                  <p className="text-sm text-muted-foreground">
                    Time in minutes before an inactive session is automatically logged out.
                  </p>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Password Policy</h3>

                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={passwordExpiry}
                    onChange={(e) => setPasswordExpiry(e.target.value)}
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of days before passwords expire. Set to 0 to disable.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-min-length">Minimum Password Length</Label>
                  <Input
                    id="password-min-length"
                    type="number"
                    value={passwordMinLength}
                    onChange={(e) => setPasswordMinLength(e.target.value)}
                    min="6"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-special">Require Special Character</Label>
                  </div>
                  <Switch id="require-special" checked={requireSpecialChar} onCheckedChange={setRequireSpecialChar} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-number">Require Number</Label>
                  </div>
                  <Switch id="require-number" checked={requireNumber} onCheckedChange={setRequireNumber} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-uppercase">Require Uppercase Letter</Label>
                  </div>
                  <Switch id="require-uppercase" checked={requireUppercase} onCheckedChange={setRequireUppercase} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-whitelist">IP Whitelisting</Label>
                    <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses.</p>
                  </div>
                  <Switch id="ip-whitelist" checked={ipWhitelisting} onCheckedChange={setIpWhitelisting} />
                </div>

                {ipWhitelisting && (
                  <div className="space-y-2">
                    <Label htmlFor="whitelisted-ips">Whitelisted IP Addresses</Label>
                    <Textarea
                      id="whitelisted-ips"
                      value={whitelistedIps}
                      onChange={(e) => setWhitelistedIps(e.target.value)}
                      placeholder="Enter comma-separated IP addresses"
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter comma-separated IP addresses that are allowed to access the admin area.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Change Password */}
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your admin account password.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-muted rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <p className="text-sm">
                      Make sure your password is at least 8 characters long and includes a mix of uppercase letters,
                      numbers, and special characters.
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Logs */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Security Logs</CardTitle>
                <CardDescription>View security-related activities and events.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="w-full md:w-[250px]">
                    <Select value={actionFilter} onValueChange={setActionFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Actions</SelectItem>
                        <SelectItem value="login">Login Attempts</SelectItem>
                        <SelectItem value="password_reset">Password Resets</SelectItem>
                        <SelectItem value="settings_change">Settings Changes</SelectItem>
                        <SelectItem value="account_locked">Account Locks</SelectItem>
                        <SelectItem value="suspicious_activity">Suspicious Activity</SelectItem>
                        <SelectItem value="api_key_generated">API Key Generation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>IP Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentLogs.length > 0 ? (
                        currentLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{formatDate(log.timestamp)}</TableCell>
                            <TableCell className="capitalize">{log.action.replace(/_/g, " ")}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(log.status)} variant="outline">
                                {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.ipAddress}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No security logs found.
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
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
