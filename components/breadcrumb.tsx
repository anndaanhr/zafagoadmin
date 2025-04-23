"use client"

import type React from "react"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

export function Breadcrumb({
  items,
  separator = <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />,
}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumbs">
      <ol className="flex items-center text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link href={item.href} className="text-muted-foreground hover:text-primary">
              {item.label}
            </Link>
            {index < items.length - 1 ? separator : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
