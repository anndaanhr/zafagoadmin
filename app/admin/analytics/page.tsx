"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminChart } from "@/components/admin/admin-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"
import { DatePickerWithRange } from "@/components/admin/date-range-picker"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("30days")

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

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <div className="flex items-center gap-2">
            <DatePickerWithRange className="hidden md:flex" />
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from previous period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">+15.2% from previous period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+3.1% from previous period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.24%</div>
                    <p className="text-xs text-muted-foreground">+1.2% from previous period</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Revenue Over Time</CardTitle>
                    <CardDescription>Monthly revenue for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <AdminChart type="revenue" />
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Sales Over Time</CardTitle>
                    <CardDescription>Monthly sales for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <AdminChart type="sales" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Best selling products by revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Elden Ring</p>
                          <p className="text-sm text-muted-foreground">Steam</p>
                        </div>
                        <p className="font-medium">$59,994</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Cyberpunk 2077</p>
                          <p className="text-sm text-muted-foreground">GOG</p>
                        </div>
                        <p className="font-medium">$39,992</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Microsoft Office 2023</p>
                          <p className="text-sm text-muted-foreground">Windows</p>
                        </div>
                        <p className="font-medium">$25,998</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Red Dead Redemption 2</p>
                          <p className="text-sm text-muted-foreground">Epic Games</p>
                        </div>
                        <p className="font-medium">$23,996</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">FIFA 23</p>
                          <p className="text-sm text-muted-foreground">Origin</p>
                        </div>
                        <p className="font-medium">$20,997</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                    <CardDescription>Best performing product categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Games</p>
                        <p className="font-medium">$152,994</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Software</p>
                        <p className="font-medium">$89,992</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Digital Gift Cards</p>
                        <p className="font-medium">$45,998</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Subscriptions</p>
                        <p className="font-medium">$33,996</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">In-Game Items</p>
                        <p className="font-medium">$20,997</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Platforms</CardTitle>
                    <CardDescription>Best performing platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Steam</p>
                        <p className="font-medium">$102,994</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Epic Games</p>
                        <p className="font-medium">$79,992</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Windows</p>
                        <p className="font-medium">$55,998</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Origin</p>
                        <p className="font-medium">$43,996</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">GOG</p>
                        <p className="font-medium">$30,997</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                  <CardDescription>Detailed breakdown of sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Sales analytics content coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>User growth and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">User analytics content coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Analytics</CardTitle>
                  <CardDescription>Product performance and inventory metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Product analytics content coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
