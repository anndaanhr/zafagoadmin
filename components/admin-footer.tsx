import Link from "next/link"
import { Shield } from "lucide-react"

export function AdminFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Zafago Admin. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/faq" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            FAQ
          </Link>
          <Link href="/help" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Help
          </Link>
        </nav>
      </div>
    </footer>
  )
}
