"use client"

import { MoreHorizontal, Package, Truck, Eye, RefreshCw, Phone, CheckCircle, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface Delivery {
  id: string
  trackingId: string
  orderId: string
  supplier: string
  status: "in-transit" | "delivered" | "pending-receipt" | "delayed"
  expectedDate: string
}

export default function DeliveriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [deliveries, setDeliveries] = useState<Delivery[]>([])

  const handleTrackPackage = (delivery: Delivery) => {
    toast({
      title: "Track Package",
      description: `Opening tracking details for ${delivery.trackingId}`,
    })
    console.log("Tracking package:", delivery)
  }

  const handleUpdateStatus = (delivery: Delivery) => {
    toast({
      title: "Update Status",
      description: `Opening status update for delivery ${delivery.id}`,
    })
    console.log("Updating status for delivery:", delivery)
  }

  const handleContactSupplier = (delivery: Delivery) => {
    toast({
      title: "Contact Supplier",
      description: `Opening contact options for ${delivery.supplier}`,
    })
    console.log("Contacting supplier for delivery:", delivery)
  }

  const handleConfirmReceipt = (deliveryId: string) => {
    setDeliveries((prev) =>
      prev.map((delivery) => (delivery.id === deliveryId ? { ...delivery, status: "delivered" as const } : delivery)),
    )
    toast({
      title: "Receipt Confirmed",
      description: `Delivery ${deliveryId} has been marked as received`,
    })
  }

  const handleReportIssue = (delivery: Delivery) => {
    toast({
      title: "Report Issue",
      description: `Opening issue report form for delivery ${delivery.id}`,
    })
    console.log("Reporting issue for delivery:", delivery)
  }

  const handleViewDetails = (delivery: Delivery) => {
    toast({
      title: "View Details",
      description: `Opening detailed view for delivery ${delivery.id}`,
    })
    console.log("Viewing details for delivery:", delivery)
  }

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-transit":
        return <Badge>In Transit</Badge>
      case "delivered":
        return <Badge variant="outline">Delivered</Badge>
      case "pending-receipt":
        return <Badge variant="secondary">Pending Receipt</Badge>
      case "delayed":
        return <Badge variant="destructive">Delayed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionItems = (delivery: Delivery) => {
    const baseActions = [
      {
        label: "Track Package",
        icon: Eye,
        onClick: () => handleTrackPackage(delivery),
      },
      {
        label: "Update Status",
        icon: RefreshCw,
        onClick: () => handleUpdateStatus(delivery),
      },
      {
        label: "Contact Supplier",
        icon: Phone,
        onClick: () => handleContactSupplier(delivery),
      },
    ]

    switch (delivery.status) {
      case "delivered":
      case "pending-receipt":
        return [
          ...baseActions,
          {
            label: "Confirm Receipt",
            icon: CheckCircle,
            onClick: () => handleConfirmReceipt(delivery.id),
          },
          {
            label: "Report Issue",
            icon: AlertTriangle,
            onClick: () => handleReportIssue(delivery),
          },
          {
            label: "View Details",
            icon: Eye,
            onClick: () => handleViewDetails(delivery),
          },
        ]
      default:
        return baseActions
    }
  }

  const inTransitCount = deliveries.filter((d) => d.status === "in-transit").length
  const deliveredTodayCount = deliveries.filter((d) => d.status === "delivered").length
  const pendingReceiptCount = deliveries.filter((d) => d.status === "pending-receipt").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">Track incoming deliveries and shipments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inTransitCount}</div>
            <p className="text-xs text-muted-foreground">deliveries on the way</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredTodayCount}</div>
            <p className="text-xs text-muted-foreground">items received today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Receipt</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReceiptCount}</div>
            <p className="text-xs text-muted-foreground">awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveries.length}</div>
            <p className="text-xs text-muted-foreground">all deliveries</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="search"
            placeholder="Search deliveries..."
            className="bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Deliveries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Tracking</CardTitle>
          <CardDescription>
            {deliveries.length === 0
              ? "No deliveries to track"
              : `${filteredDeliveries.length} of ${deliveries.length} deliveries`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {deliveries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Truck className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deliveries yet</h3>
              <p className="text-gray-500 mb-4">Deliveries will appear here once orders are shipped.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead className="hidden md:table-cell">Order ID</TableHead>
                  <TableHead className="hidden md:table-cell">Supplier</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Expected Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.trackingId}</TableCell>
                    <TableCell className="hidden md:table-cell">{delivery.orderId}</TableCell>
                    <TableCell className="hidden md:table-cell">{delivery.supplier}</TableCell>
                    <TableCell className="hidden sm:table-cell">{getStatusBadge(delivery.status)}</TableCell>
                    <TableCell className="text-right">{delivery.expectedDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {getActionItems(delivery).map((action, index) => (
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
    </div>
  )
}
