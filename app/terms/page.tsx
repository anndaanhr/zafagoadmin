import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: April 23, 2023</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to Zafago ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of
            the Zafago website, services, and applications (collectively, the "Services").
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
            Terms, you may not access or use the Services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Account Registration</h2>
          <p>
            To access certain features of the Services, you may be required to register for an account. You agree to
            provide accurate, current, and complete information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Digital Products</h2>
          <p>
            Zafago is a platform that allows users to purchase digital products, including but not limited to games,
            software, and digital vouchers. These products are subject to the terms and conditions of the respective
            publishers or developers.
          </p>
          <p>
            Once a digital product is delivered, it is considered final and non-refundable, except as required by
            applicable law or as specified in our Refund Policy.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Services in any way that violates any applicable law or regulation.</li>
            <li>
              Attempt to gain unauthorized access to any portion of the Services or any other systems or networks
              connected to the Services.
            </li>
            <li>Use the Services to distribute malware, viruses, or any other malicious code.</li>
            <li>Engage in any activity that interferes with or disrupts the Services.</li>
            <li>
              Impersonate or attempt to impersonate Zafago, a Zafago employee, another user, or any other person or
              entity.
            </li>
            <li>Collect or track the personal information of others.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
          <p>
            The Services and their entire contents, features, and functionality (including but not limited to all
            information, software, text, displays, images, video, and audio, and the design, selection, and arrangement
            thereof) are owned by Zafago, its licensors, or other providers of such material and are protected by
            copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Services immediately, without prior notice or
            liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
            limited to a breach of the Terms.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
          <p>
            In no event shall Zafago, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to
            or use of or inability to access or use the Services.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            <strong>Email:</strong> legal@zafago.com
            <br />
            <strong>Address:</strong> 123 Digital Street, Tech City, TC 12345
          </p>
        </div>
      </div>
    </div>
  )
}
