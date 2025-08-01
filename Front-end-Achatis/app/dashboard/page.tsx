"use client"

import { MoreHorizontal, Plus, Eye, Edit, Check, X, ShoppingCart, FileText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { PurchaseRequestForm } from "@/components/forms/purchase-request-form"
import { toast } from "@/hooks/use-toast"

interface PurchaseRequest {
  id: string
  item: string
  quantity: number
  requestedBy: string
  status: "pending" | "approved" | "rejected" | "completed"
  date: string
}

export default function DashboardPage() {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requests, setRequests] = useState<PurchaseRequest[]>([])

  const handleViewRequest = (id: string) => {
    toast({
      title: "View Request",
      description: `Opening details for request ${id}`,
    })
    console.log("Viewing request:", id)
  }

  const handleEditRequest = (id: string) => {
    toast({
      title: "Edit Request",
      description: `Opening edit form for request ${id}`,
    })
    console.log("Editing request:", id)
  }

  const handleApproveRequest = (id: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "approved" as const } : req)))
    toast({
      title: "Request Approved",
      description: `Purchase request ${id} has been approved`,
    })
  }

  const handleRejectRequest = (id: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "rejected" as const } : req)))
    toast({
      title: "Request Rejected",
      description: `Purchase request ${id} has been rejected`,
    })
  }

  const handleCreateOrder = (id: string) => {
    toast({
      title: "Create Order",
      description: `Creating purchase order for request ${id}`,
    })
    console.log("Creating order for request:", id)
  }

  const handleResubmit = (id: string) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "pending" as const } : req)))
    toast({
      title: "Request Resubmitted",
      description: `Purchase request ${id} has been resubmitted for approval`,
    })
  }

  const handleViewOrder = (id: string) => {
    toast({
      title: "View Order",
      description: `Opening order details for request ${id}`,
    })
    console.log("Viewing order for request:", id)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending Approval</Badge>
      case "approved":
        return <Badge variant="outline">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "completed":
        return <Badge>Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionItems = (request: PurchaseRequest) => {
    const baseActions = [
      {
        label: "View Request",
        icon: Eye,
        onClick: () => handleViewRequest(request.id),
      },
    ]

    switch (request.status) {
      case "pending":
        return [
          ...baseActions,
          {
            label: "Edit Request",
            icon: Edit,
            onClick: () => handleEditRequest(request.id),
          },
          {
            label: "Approve",
            icon: Check,
            onClick: () => handleApproveRequest(request.id),
          },
          {
            label: "Reject",
            icon: X,
            onClick: () => handleRejectRequest(request.id),
          },
        ]
      case "approved":
        return [
          ...baseActions,
          {
            label: "Create Order",
            icon: ShoppingCart,
            onClick: () => handleCreateOrder(request.id),
          },
        ]
      case "rejected":
        return [
          ...baseActions,
          {
            label: "Re-submit",
            icon: FileText,
            onClick: () => handleResubmit(request.id),
          },
        ]
      case "completed":
        return [
          ...baseActions,
          {
            label: "View Order",
            icon: Eye,
            onClick: () => handleViewOrder(request.id),
          },
        ]
      default:
        return baseActions
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">Manage and track all purchase requests</p>
        </div>
        <Button onClick={() => setShowRequestForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
            <p className="text-xs text-muted-foreground">All requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "approved").length}</div>
            <p className="text-xs text-muted-foreground">Ready for ordering</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Orders placed</p>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Requests</CardTitle>
          <CardDescription>Manage and track all purchase requests</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No purchase requests yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first purchase request.</p>
              <Button onClick={() => setShowRequestForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Request
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Request ID</TableHead>
                  <TableHead className="min-w-[150px]">Item</TableHead>
                  <TableHead className="hidden md:table-cell">Quantity</TableHead>
                  <TableHead className="hidden md:table-cell">Requested By</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.item}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.quantity}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.requestedBy}</TableCell>
                    <TableCell className="hidden sm:table-cell">{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">{request.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {getActionItems(request).map((action, index) => (
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

      <PurchaseRequestForm open={showRequestForm} onClose={() => setShowRequestForm(false)} />
    </div>
  )
}
