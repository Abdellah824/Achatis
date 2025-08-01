"use client"

import type React from "react"
import { useState } from "react"

import {
  Package2,
  Search,
  ShoppingCart,
  Users,
  FileText,
  Truck,
  Receipt,
  BarChart3,
  Menu,
  Bell,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Purchase Requests", href: "/dashboard", icon: FileText },
  { name: "Suppliers", href: "/dashboard/suppliers", icon: Users },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Deliveries", href: "/dashboard/deliveries", icon: Truck },
  { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardLayoutInner children={children} />
    </Suspense>
  )
}

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    console.log("Logging out...")
    // Add logout logic here
  }

  const handleSettings = () => {
    console.log("Opening settings...")
    // Add settings navigation here
  }

  const handleProfile = () => {
    console.log("Opening profile...")
    // Add profile navigation here
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden bg-transparent">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex h-16 items-center px-6 border-b">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6 text-blue-600" />
                <span className="text-lg">Purchasing Hub</span>
              </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-700",
                      isActive ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
            <div className="flex h-16 items-center px-6 border-b border-gray-200">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6 text-blue-600" />
                <span className="text-lg text-gray-900">Purchasing Hub</span>
              </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-blue-50 hover:text-blue-700",
                      isActive ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* User section at bottom */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">Purchasing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    0
                  </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        width="32"
                        height="32"
                        className="rounded-full"
                        alt="Avatar"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">john.doe@company.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleProfile}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSettings}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
