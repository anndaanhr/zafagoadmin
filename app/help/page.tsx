import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, MessageSquare, Phone, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HelpPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Help & Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need assistance? We're here to help. Choose from the options below to get the support you need.
          </p>
        </div>

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="faq">Quick Help</TabsTrigger>
            <TabsTrigger value="ticket">Submit a Ticket</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Support
                  </CardTitle>
                  <CardDescription>Send us an email and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">support@zafago.com</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="mailto:support@zafago.com">Email Us</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>Chat with our support team in real-time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Available Monday to Friday, 9 AM - 6 PM EST</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="#">Start Chat</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Phone Support
                  </CardTitle>
                  <CardDescription>Call us directly for urgent matters.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Monday to Friday, 9 AM - 6 PM EST</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="tel:+15551234567">Call Us</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" rows={5} />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Help Topics</CardTitle>
                <CardDescription>Find quick answers to common questions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">How do I redeem a game key?</h3>
                  <p className="text-sm text-muted-foreground">
                    After purchasing a game, you'll receive a key that can be redeemed on the respective platform
                    (Steam, Epic Games, etc.). Go to the platform's website or application, find the "Redeem" or
                    "Activate a Product" option, and enter your key.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">My key isn't working. What should I do?</h3>
                  <p className="text-sm text-muted-foreground">
                    First, make sure you're entering the key correctly, including any hyphens. If it still doesn't work,
                    check if there are any regional restrictions. If problems persist, contact our support team with
                    your order number.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Can I get a refund?</h3>
                  <p className="text-sm text-muted-foreground">
                    Due to the digital nature of our products, we generally don't offer refunds once a key has been
                    revealed. However, if you encounter technical issues or receive a faulty key, contact us within 48
                    hours of purchase.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">How long does delivery take?</h3>
                  <p className="text-sm text-muted-foreground">
                    Most digital products are delivered instantly after payment confirmation. If you haven't received
                    your purchase within 15 minutes, please check your spam folder or contact our support team.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">How do I change my account details?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can update your account information by logging in and navigating to the "Account Settings" page.
                    From there, you can change your email, password, and other personal details.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="ticket" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Submit a Support Ticket
                </CardTitle>
                <CardDescription>Create a support ticket for detailed assistance with your issue.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-email">Email</Label>
                    <Input id="ticket-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-id">Order ID (if applicable)</Label>
                    <Input id="order-id" placeholder="Enter your order ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue-type">Issue Type</Label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option value="">Select an issue type</option>
                      <option value="order">Order Problem</option>
                      <option value="key">Key Activation Issue</option>
                      <option value="refund">Refund Request</option>
                      <option value="account">Account Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticket-subject">Subject</Label>
                    <Input id="ticket-subject" placeholder="Enter subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticket-description">Description</Label>
                    <Textarea id="ticket-description" placeholder="Please describe your issue in detail" rows={5} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments (optional)</Label>
                    <Input id="attachments" type="file" />
                    <p className="text-xs text-muted-foreground">
                      You can attach screenshots or other files to help us understand your issue better.
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Ticket</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
