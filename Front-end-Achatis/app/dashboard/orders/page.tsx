"use client"

import { MoreHorizontal, Plus, Eye, Truck, X, CheckCircle, Filter, DollarSign, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { OrderForm } from "@/components/forms/order-form"
import { toast } from "@/hooks/use-toast"

interface Order {
  id: string
  supplier: string
  items: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  orderDate: string
}

export default function OrdersPage() {
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [orders, setOrders] = useState<Order[]>([])

  const handleViewOrder = (order: Order) => {
    toast({
      title: "View Order",
      description: `Opening details for order ${order.id}`,
    })
    console.log("Viewing order:", order)
  }

  const handleTrackDelivery = (order: Order) => {
    toast({
      title: "Track Delivery",
      description: `Tracking delivery for order ${order.id}`,
    })
    console.log("Tracking delivery for order:", order)
  }

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "cancelled" as const } : order)),
    )
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been cancelled`,
    })
  }

  const handleConfirmReceipt = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "delivered" as const } : order)),
    )
    toast({
      title: "Receipt Confirmed",
      description: `Order ${orderId} has been marked as delivered`,
    })
  }

  const handleViewInvoice = (order: Order) => {
    toast({
      title: "View Invoice",
      description: `Opening invoice for order ${order.id}`,
    })
    console.log("Viewing invoice for order:", order)
  }

  const handleRateSupplier = (order: Order) => {
    toast({
      title: "Rate Supplier",
      description: `Opening rating form for ${order.supplier}`,
    })
    console.log("Rating supplier for order:", order)
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "shipped":
        return <Badge>Shipped</Badge>
      case "delivered":
        return <Badge variant="outline">Delivered</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionItems = (order: Order) => {
    const baseActions = [
      {
        label: "View Order",
        icon: Eye,
        onClick: () => handleViewOrder(order),
      },
    ]

    switch (order.status) {
      case "processing":
        return [
          ...baseActions,
          {
            label: "Track Delivery",
            icon: Truck,
            onClick: () => handleTrackDelivery(order),
          },
          {
            label: "Cancel Order",
            icon: X,
            onClick: () => handleCancelOrder(order.id),
          },
        ]
      case "shipped":
        return [
          ...baseActions,
          {
            label: "Track Delivery",
            icon: Truck,
            onClick: () => handleTrackDelivery(order),
          },
          {
            label: "Confirm Receipt",
            icon: CheckCircle,
            onClick: () => handleConfirmReceipt(order.id),
          },
        ]
      case "delivered":
        return [
          ...baseActions,
          {
            label: "View Invoice",
            icon: DollarSign,
            onClick: () => handleViewInvoice(order),
          },
          {
            label: "Rate Supplier",
            icon: CheckCircle,
            onClick: () => handleRateSupplier(order),
          },
        ]
      default:
        return baseActions
    }
  }

  const totalValue = orders.reduce((sum, order) => sum + order.total, 0)
  const processingCount = orders.filter((o) => o.status === "processing").length
  const shippedCount = orders.filter((o) => o.status === "shipped").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">Track and manage all purchase orders</p>
        </div>
        <Button onClick={() => setShowOrderForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingCount}</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippedCount}</div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Order value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="search"
            placeholder="Search orders..."
            className="bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>
            {orders.length === 0 ? "No orders created" : `${filteredOrders.length} of ${orders.length} orders`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-4">Create your first purchase order to get started.</p>
              <Button onClick={() => setShowOrderForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Order
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead className="hidden md:table-cell">Supplier</TableHead>
                  <TableHead className="hidden md:table-cell">Items</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Order Date</TableHead>
                  <TableHead className="text-right">Quick Actions</TableHead>
                  <TableHead className="text-right">More</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.supplier}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                    <TableCell className="hidden sm:table-cell">{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{order.orderDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        {order.status === "processing" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setOrders((prev) =>
                                  prev.map((o) => (o.id === order.id ? { ...o, status: "shipped" } : o)),
                                )
                                toast({ title: "Order Shipped", description: `Order ${order.id} marked as shipped` })
                              }}
                            >
                              Ship
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleCancelOrder(order.id)}>
                              Cancel
                            </Button>
                          </>
                        )}
                        {order.status === "shipped" && (
                          <Button size="sm" variant="outline" onClick={() => handleConfirmReceipt(order.id)}>
                            Mark Delivered
                          </Button>
                        )}
                        {order.status === "cancelled" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setOrders((prev) =>
                                prev.map((o) => (o.id === order.id ? { ...o, status: "processing" } : o)),
                              )
                              toast({ title: "Order Reactivated", description: `Order ${order.id} reactivated` })
                            }}
                          >
                            Reactivate
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {getActionItems(order).map((action, index) => (
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

      <OrderForm open={showOrderForm} onClose={() => setShowOrderForm(false)} />
    </div>
  )
}
