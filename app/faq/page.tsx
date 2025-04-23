import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about Zafago, our digital products, and how our platform works.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">General Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Zafago?</AccordionTrigger>
                <AccordionContent>
                  Zafago is a digital marketplace where you can purchase games, software, digital products, and game
                  vouchers. We provide instant delivery of digital keys that can be redeemed on platforms like Steam,
                  Epic Games, and more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I create an account?</AccordionTrigger>
                <AccordionContent>
                  To create an account, click on the "Sign Up" button in the top right corner of the website. Fill in
                  your details, including your name, email address, and password. Verify your email address by clicking
                  on the link sent to your inbox, and you're ready to go!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security very seriously. We use industry-standard encryption to protect your
                  personal and payment information. You can read more about our security practices in our Privacy
                  Policy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Which countries do you serve?</AccordionTrigger>
                <AccordionContent>
                  Zafago is available worldwide. However, some products may have regional restrictions imposed by
                  publishers. These restrictions will be clearly indicated on the product page.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Purchases & Payments</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-5">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express),
                  PayPal, and in some regions, cryptocurrency. The available payment methods will be displayed during
                  checkout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Are there any hidden fees?</AccordionTrigger>
                <AccordionContent>
                  No, there are no hidden fees. The price you see on the product page is the final price you'll pay. We
                  don't add any additional fees during checkout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>How do I get my product after purchase?</AccordionTrigger>
                <AccordionContent>
                  After completing your purchase, you'll receive an email with your product key or download
                  instructions. You can also find your purchases in the "My Orders" section of your account dashboard.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>Is my payment information stored?</AccordionTrigger>
                <AccordionContent>
                  We do not store your complete payment information. When you choose to save your payment method for
                  future purchases, we store only the necessary information in a secure, encrypted format in compliance
                  with PCI DSS standards.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Products & Redemption</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-9">
                <AccordionTrigger>How do I redeem my game key?</AccordionTrigger>
                <AccordionContent>
                  Redemption instructions are provided with your purchase. Generally, for Steam games, you'll need to
                  open the Steam client, click on "Games" in the top menu, select "Activate a Product on Steam," and
                  follow the prompts to enter your key.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10">
                <AccordionTrigger>What if my key doesn't work?</AccordionTrigger>
                <AccordionContent>
                  If you encounter any issues with your key, please contact our customer support immediately. We'll help
                  resolve the issue as quickly as possible, either by providing a new key or issuing a refund if
                  necessary.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-11">
                <AccordionTrigger>Do products have regional restrictions?</AccordionTrigger>
                <AccordionContent>
                  Yes, some products may have regional restrictions imposed by publishers. These restrictions will be
                  clearly indicated on the product page. Please ensure you check these restrictions before making a
                  purchase.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12">
                <AccordionTrigger>Can I gift a game to someone else?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can purchase a game as a gift. During checkout, select the "This is a gift" option and
                  provide the recipient's email address. They will receive the key directly, or you can choose to
                  receive it yourself to share with them later.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Returns & Refunds</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-13">
                <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                <AccordionContent>
                  Due to the digital nature of our products, we generally do not offer refunds once a product key has
                  been revealed or used. However, if you encounter technical issues or receive a faulty key, please
                  contact our support team within 48 hours of purchase.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-14">
                <AccordionTrigger>Can I cancel my order?</AccordionTrigger>
                <AccordionContent>
                  You can cancel your order if it has not yet been processed and the key has not been revealed. Please
                  contact our customer support immediately if you wish to cancel an order.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-15">
                <AccordionTrigger>What if the game doesn't work on my system?</AccordionTrigger>
                <AccordionContent>
                  We recommend checking the system requirements before purchasing any game. If you've purchased a game
                  and discovered it doesn't meet the minimum requirements for your system, contact our support team, and
                  we'll try to help resolve the issue.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-16">
                <AccordionTrigger>How long do refunds take to process?</AccordionTrigger>
                <AccordionContent>
                  If a refund is approved, it typically takes 3-5 business days for the amount to be credited back to
                  your original payment method. The exact timing may depend on your payment provider.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-4">
            If you couldn't find the answer to your question, please contact our customer support team. We're here to
            help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/help">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="mailto:support@zafago.com">Email Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
