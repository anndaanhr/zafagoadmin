"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // General settings
  const [storeName, setStoreName] = useState("Zafago")
  const [storeDescription, setStoreDescription] = useState("Digital game store selling games, software, and vouchers.")
  const [supportEmail, setSupportEmail] = useState("support@zafago.com")
  const [currency, setCurrency] = useState("USD")
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  // Payment settings
  const [platformFee, setPlatformFee] = useState("5")
  const [minWithdrawal, setMinWithdrawal] = useState("50")
  const [paypalEnabled, setPaypalEnabled] = useState(true)
  const [stripeEnabled, setStripeEnabled] = useState(true)
  const [cryptoEnabled, setCryptoEnabled] = useState(false)
  const [bankTransferEnabled, setBankTransferEnabled] = useState(true)

  // Email settings
  const [emailProvider, setEmailProvider] = useState("smtp")
  const [smtpHost, setSmtpHost] = useState("smtp.example.com")
  const [smtpPort, setSmtpPort] = useState("587")
  const [smtpUsername, setSmtpUsername] = useState("notifications@zafago.com")
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••")
  const [emailFromName, setEmailFromName] = useState("Zafago Store")
  const [emailFromAddress, setEmailFromAddress] = useState("notifications@zafago.com")

  // Notification settings
  const [newOrderNotification, setNewOrderNotification] = useState(true)
  const [newUserNotification, setNewUserNotification] = useState(true)
  const [withdrawalRequestNotification, setWithdrawalRequestNotification] = useState(true)
  const [productReviewNotification, setProductReviewNotification] = useState(false)
  const [lowStockNotification, setLowStockNotification] = useState(true)

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

  const handleSaveSettings = (section) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your store's general settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Enter store name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-description">Store Description</Label>
                  <Textarea
                    id="store-description"
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    placeholder="Enter store description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="Enter support email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, the store will be inaccessible to regular users.
                    </p>
                  </div>
                  <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("General")}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and fees.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                  <Input
                    id="platform-fee"
                    type="number"
                    value={platformFee}
                    onChange={(e) => setPlatformFee(e.target.value)}
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-muted-foreground">Percentage fee charged on each transaction.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-withdrawal">Minimum Withdrawal Amount</Label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">$</span>
                    <Input
                      id="min-withdrawal"
                      type="number"
                      value={minWithdrawal}
                      onChange={(e) => setMinWithdrawal(e.target.value)}
                      min="0"
                      className="rounded-l-none"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minimum amount sellers can withdraw from their balance.
                  </p>
                </div>
                <Separator />
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="paypal">PayPal</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to pay with PayPal.</p>
                    </div>
                    <Switch id="paypal" checked={paypalEnabled} onCheckedChange={setPaypalEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="stripe">Credit Card (Stripe)</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to pay with credit cards via Stripe.
                      </p>
                    </div>
                    <Switch id="stripe" checked={stripeEnabled} onCheckedChange={setStripeEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="crypto">Cryptocurrency</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to pay with cryptocurrencies.</p>
                    </div>
                    <Switch id="crypto" checked={cryptoEnabled} onCheckedChange={setCryptoEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="bank-transfer">Bank Transfer</Label>
                      <p className="text-sm text-muted-foreground">Allow sellers to withdraw via bank transfer.</p>
                    </div>
                    <Switch id="bank-transfer" checked={bankTransferEnabled} onCheckedChange={setBankTransferEnabled} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("Payment")}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email delivery settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Email Provider</Label>
                  <Select value={emailProvider} onValueChange={setEmailProvider}>
                    <SelectTrigger id="email-provider">
                      <SelectValue placeholder="Select email provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP Server</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {emailProvider === "smtp" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input
                        id="smtp-host"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        placeholder="e.g., smtp.gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input
                        id="smtp-port"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(e.target.value)}
                        placeholder="e.g., 587"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-username">SMTP Username</Label>
                      <Input
                        id="smtp-username"
                        value={smtpUsername}
                        onChange={(e) => setSmtpUsername(e.target.value)}
                        placeholder="Enter SMTP username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <Input
                        id="smtp-password"
                        type="password"
                        value={smtpPassword}
                        onChange={(e) => setSmtpPassword(e.target.value)}
                        placeholder="Enter SMTP password"
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="email-from-name">From Name</Label>
                  <Input
                    id="email-from-name"
                    value={emailFromName}
                    onChange={(e) => setEmailFromName(e.target.value)}
                    placeholder="e.g., Zafago Store"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-from-address">From Email Address</Label>
                  <Input
                    id="email-from-address"
                    type="email"
                    value={emailFromAddress}
                    onChange={(e) => setEmailFromAddress(e.target.value)}
                    placeholder="e.g., notifications@zafago.com"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("Email")}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure admin notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-order">New Order Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when new orders are placed.</p>
                    </div>
                    <Switch id="new-order" checked={newOrderNotification} onCheckedChange={setNewOrderNotification} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-user">New User Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications when new users register.</p>
                    </div>
                    <Switch id="new-user" checked={newUserNotification} onCheckedChange={setNewUserNotification} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="withdrawal-request">Withdrawal Request Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when sellers request withdrawals.
                      </p>
                    </div>
                    <Switch
                      id="withdrawal-request"
                      checked={withdrawalRequestNotification}
                      onCheckedChange={setWithdrawalRequestNotification}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="product-review">Product Review Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when new product reviews are submitted.
                      </p>
                    </div>
                    <Switch
                      id="product-review"
                      checked={productReviewNotification}
                      onCheckedChange={setProductReviewNotification}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="low-stock">Low Stock Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when product stock is running low.
                      </p>
                    </div>
                    <Switch id="low-stock" checked={lowStockNotification} onCheckedChange={setLowStockNotification} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("Notification")}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
