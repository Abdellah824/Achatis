"use client"

import { MoreHorizontal, Plus, Eye, Edit, ShoppingCart, Star, Phone, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { SupplierForm } from "@/components/forms/supplier-form"
import { toast } from "@/hooks/use-toast"

interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  status: "active" | "inactive"
  rating: number
}

export default function SuppliersPage() {
  const [showSupplierForm, setShowSupplierForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const handleViewDetails = (supplier: Supplier) => {
    toast({
      title: "Supplier Details",
      description: `Opening details for ${supplier.name}`,
    })
    console.log("Viewing supplier:", supplier)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    toast({
      title: "Edit Supplier",
      description: `Opening edit form for ${supplier.name}`,
    })
    console.log("Editing supplier:", supplier)
  }

  const handleViewOrders = (supplier: Supplier) => {
    toast({
      title: "Supplier Orders",
      description: `Viewing orders from ${supplier.name}`,
    })
    console.log("Viewing orders for supplier:", supplier)
  }

  const handleReactivate = (supplierId: string) => {
    setSuppliers((prev) =>
      prev.map((supplier) => (supplier.id === supplierId ? { ...supplier, status: "active" as const } : supplier)),
    )
    toast({
      title: "Supplier Reactivated",
      description: "Supplier has been reactivated successfully",
    })
  }

  const handleContactSupplier = (supplier: Supplier) => {
    toast({
      title: "Contact Supplier",
      description: `Opening contact options for ${supplier.name}`,
    })
    console.log("Contacting supplier:", supplier)
  }

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getActionItems = (supplier: Supplier) => {
    const baseActions = [
      {
        label: "View Details",
        icon: Eye,
        onClick: () => handleViewDetails(supplier),
      },
      {
        label: "Edit Supplier",
        icon: Edit,
        onClick: () => handleEditSupplier(supplier),
      },
      {
        label: "View Orders",
        icon: ShoppingCart,
        onClick: () => handleViewOrders(supplier),
      },
    ]

    if (supplier.status === "inactive") {
      return [
        ...baseActions,
        {
          label: "Reactivate",
          icon: Star,
          onClick: () => handleReactivate(supplier.id),
        },
      ]
    }

    return [
      ...baseActions,
      {
        label: "Contact",
        icon: Phone,
        onClick: () => handleContactSupplier(supplier),
      },
    ]
  }

  const activeSuppliers = suppliers.filter((s) => s.status === "active").length
  const averageRating = suppliers.length > 0 ? suppliers.reduce((acc, s) => acc + s.rating, 0) / suppliers.length : 0
  const topRating = suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.rating)) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">Manage your supplier relationships and contacts</p>
        </div>
        <Button onClick={() => setShowSupplierForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">Registered suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating > 0 ? averageRating.toFixed(1) : "0.0"}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Rated</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topRating > 0 ? topRating.toFixed(1) : "0.0"}</div>
            <p className="text-xs text-muted-foreground">Highest rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="search"
            placeholder="Search suppliers..."
            className="bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory</CardTitle>
          <CardDescription>
            {suppliers.length === 0
              ? "No suppliers registered"
              : `${filteredSuppliers.length} of ${suppliers.length} suppliers`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {suppliers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers yet</h3>
              <p className="text-gray-500 mb-4">Start building your supplier network by adding your first supplier.</p>
              <Button onClick={() => setShowSupplierForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Supplier
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead className="hidden md:table-cell">Contact Person</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{supplier.contactPerson}</TableCell>
                    <TableCell className="hidden md:table-cell">{supplier.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={supplier.status === "active" ? "default" : "secondary"}>
                        {supplier.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{supplier.rating}/5</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {getActionItems(supplier).map((action, index) => (
                            <DropdownMenuItem key={index} onClick={action.onClick}>
                              <action.icon className="mr-2 h-4 w-4" />
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <SupplierForm open={showSupplierForm} onClose={() => setShowSupplierForm(false)} />
    </div>
  )
}
