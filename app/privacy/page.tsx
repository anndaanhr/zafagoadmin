import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 23, 2023</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            At Zafago, we respect your privacy and are committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit our website or use our
            services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
            do not access the site or use our services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our website, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Data:</strong> Personal identifiable information such as your name, email address, postal
              address, phone number, and payment information when you register for an account, make a purchase, or
              contact us.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our website and services, including your
              browsing history, search queries, and interaction with our features.
            </li>
            <li>
              <strong>Device Data:</strong> Information about your device, such as IP address, browser type, operating
              system, and device identifiers.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <p>We may use the information we collect about you for various purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To process and fulfill your orders</li>
            <li>To send you order confirmations and updates</li>
            <li>To provide customer support</li>
            <li>To personalize your experience</li>
            <li>To improve our website and services</li>
            <li>To send you marketing communications (with your consent)</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Disclosure of Your Information</h2>
          <p>We may disclose your personal information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as
              payment processing, data analysis, email delivery, and customer service.
            </li>
            <li>
              <strong>Business Partners:</strong> Game publishers and developers to fulfill your purchases and provide
              support.
            </li>
            <li>
              <strong>Legal Requirements:</strong> Comply with any court order, law, or legal process, including
              responding to any government or regulatory request.
            </li>
            <li>
              <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a
              portion of our assets.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational measures to secure your personal data from
            accidental loss and unauthorized access, use, alteration, and disclosure. All payment transactions are
            encrypted using SSL technology.
          </p>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive
            to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute
            security.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Your Data Protection Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access your personal data</li>
            <li>The right to rectify inaccurate personal data</li>
            <li>The right to erasure of your personal data</li>
            <li>The right to restrict processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal data</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided in the "Contact Us"
            section.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain
            information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Children's Privacy</h2>
          <p>
            Our services are not intended for children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and you are aware that your child has
            provided us with personal information, please contact us.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            <strong>Email:</strong> privacy@zafago.com
            <br />
            <strong>Address:</strong> 123 Digital Street, Tech City, TC 12345
          </p>
        </div>
      </div>
    </div>
  )
}
