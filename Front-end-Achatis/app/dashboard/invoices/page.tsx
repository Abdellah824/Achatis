"use client"

import { MoreHorizontal, Download, DollarSign, Clock, CheckCircle, Eye, CreditCard, Send, Receipt } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface Invoice {
  id: string
  supplier: string
  orderId: string
  status: "overdue" | "pending" | "paid" | "processing"
  amount: number
  dueDate: string
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const handleDownloadPDF = (invoice: Invoice) => {
    toast({
      title: "Download PDF",
      description: `Downloading invoice ${invoice.id}`,
    })
    console.log("Downloading PDF for invoice:", invoice)
  }

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: "paid" as const } : invoice)),
    )
    toast({
      title: "Invoice Paid",
      description: `Invoice ${invoiceId} has been marked as paid`,
    })
  }

  const handleSendReminder = (invoice: Invoice) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent for invoice ${invoice.id}`,
    })
    console.log("Sending reminder for invoice:", invoice)
  }

  const handleSchedulePayment = (invoice: Invoice) => {
    toast({
      title: "Schedule Payment",
      description: `Opening payment scheduler for invoice ${invoice.id}`,
    })
    console.log("Scheduling payment for invoice:", invoice)
  }

  const handleViewPayment = (invoice: Invoice) => {
    toast({
      title: "View Payment",
      description: `Opening payment details for invoice ${invoice.id}`,
    })
    console.log("Viewing payment for invoice:", invoice)
  }

  const handleGenerateReceipt = (invoice: Invoice) => {
    toast({
      title: "Generate Receipt",
      description: `Generating receipt for invoice ${invoice.id}`,
    })
    console.log("Generating receipt for invoice:", invoice)
  }

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "paid":
        return <Badge>Paid</Badge>
      case "processing":
        return <Badge variant="outline">Processing</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionItems = (invoice: Invoice) => {
    const baseActions = [
      {
        label: "Download PDF",
        icon: Download,
        onClick: () => handleDownloadPDF(invoice),
      },
    ]

    switch (invoice.status) {
      case "overdue":
        return [
          ...baseActions,
          {
            label: "Mark as Paid",
            icon: CheckCircle,
            onClick: () => handleMarkAsPaid(invoice.id),
          },
          {
            label: "Send Reminder",
            icon: Send,
            onClick: () => handleSendReminder(invoice),
          },
        ]
      case "pending":
        return [
          ...baseActions,
          {
            label: "Mark as Paid",
            icon: CheckCircle,
            onClick: () => handleMarkAsPaid(invoice.id),
          },
          {
            label: "Schedule Payment",
            icon: CreditCard,
            onClick: () => handleSchedulePayment(invoice),
          },
        ]
      case "paid":
        return [
          ...baseActions,
          {
            label: "View Payment",
            icon: Eye,
            onClick: () => handleViewPayment(invoice),
          },
          {
            label: "Generate Receipt",
            icon: Download,
            onClick: () => handleGenerateReceipt(invoice),
          },
        ]
      case "processing":
        return [
          ...baseActions,
          {
            label: "Mark as Paid",
            icon: CheckCircle,
            onClick: () => handleMarkAsPaid(invoice.id),
          },
        ]
      default:
        return baseActions
    }
  }

  const totalOutstanding = invoices.filter((i) => i.status !== "paid").reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueAmount = invoices.filter((i) => i.status === "overdue").reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidThisMonth = invoices.filter((i) => i.status === "paid").reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueCount = invoices.filter((i) => i.status === "overdue").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">Manage and track invoice payments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              across {invoices.filter((i) => i.status !== "paid").length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{overdueCount} invoices overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidThisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((i) => i.status === "paid").length} invoices paid
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">all invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="search"
            placeholder="Search invoices..."
            className="bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
          <CardDescription>
            {invoices.length === 0
              ? "No invoices to manage"
              : `${filteredInvoices.length} of ${invoices.length} invoices`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Receipt className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
              <p className="text-gray-500 mb-4">Invoices will appear here once orders are completed.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead className="hidden md:table-cell">Supplier</TableHead>
                  <TableHead className="hidden md:table-cell">Order ID</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell className="hidden md:table-cell">{invoice.supplier}</TableCell>
                    <TableCell className="hidden md:table-cell">{invoice.orderId}</TableCell>
                    <TableCell className="hidden sm:table-cell">{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{invoice.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {getActionItems(invoice).map((action, index) => (
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
