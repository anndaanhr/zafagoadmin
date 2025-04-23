"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentUsers() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36&text=JD" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">Joined 2 days ago</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
          Buyer
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36&text=JS" alt="Jane Smith" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Jane Smith</p>
            <p className="text-xs text-muted-foreground">Joined 3 days ago</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
          Seller
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36&text=RJ" alt="Robert Johnson" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Robert Johnson</p>
            <p className="text-xs text-muted-foreground">Joined 5 days ago</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
          Buyer
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36&text=ED" alt="Emily Davis" />
            <AvatarFallback>ED</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Emily Davis</p>
            <p className="text-xs text-muted-foreground">Joined 1 week ago</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
          Seller
        </Badge>
      </div>
    </div>
  )
}
