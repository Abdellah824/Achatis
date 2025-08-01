"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderFormProps {
  open: boolean
  onClose: () => void
}

interface OrderItem {
  id: string
  description: string
  quantity: string
  unitPrice: string
  total: number
}

export function OrderForm({ open, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    supplier: "",
    orderDate: "",
    expectedDelivery: "",
    shippingAddress: "",
    notes: "",
  })
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: "1", description: "", quantity: "", unitPrice: "", total: 0 },
  ])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (id: string, field: keyof OrderItem, value: string) => {
    setOrderItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "unitPrice") {
            const qty = Number.parseFloat(updatedItem.quantity) || 0
            const price = Number.parseFloat(updatedItem.unitPrice) || 0
            updatedItem.total = qty * price
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const addItem = () => {
    const newId = (orderItems.length + 1).toString()
    setOrderItems((prev) => [...prev, { id: newId, description: "", quantity: "", unitPrice: "", total: 0 }])
  }

  const removeItem = (id: string) => {
    if (orderItems.length > 1) {
      setOrderItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    const pdfFiles = Array.from(files).filter((file) => file.type === "application/pdf")
    setUploadedFiles((prev) => [...prev, ...pdfFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order data:", formData)
    console.log("Order items:", orderItems)
    console.log("Uploaded files:", uploadedFiles)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Select value={formData.supplier} onValueChange={(value) => handleInputChange("supplier", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                  <SelectItem value="office">Office Supplies Inc</SelectItem>
                  <SelectItem value="industrial">Industrial Equipment Co</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date *</Label>
              <Input
                id="orderDate"
                type="date"
                value={formData.orderDate}
                onChange={(e) => handleInputChange("orderDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expectedDelivery">Expected Delivery</Label>
              <Input
                id="expectedDelivery"
                type="date"
                value={formData.expectedDelivery}
                onChange={(e) => handleInputChange("expectedDelivery", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingAddress">Shipping Address</Label>
              <Input
                id="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                placeholder="Enter shipping address"
              />
            </div>
          </div>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Items</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                      placeholder="Qty"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, "unitPrice", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Total</Label>
                    <Input value={item.total.toFixed(2)} readOnly className="bg-muted" />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      disabled={orderItems.length === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4 border-t">
                <div className="text-right">
                  <Label>Total Amount</Label>
                  <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Special instructions or notes"
              rows={3}
            />
          </div>

          {/* File Upload Section */}
          <div className="space-y-2">
            <Label>Supporting Documents (PDF only)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center border-muted-foreground/25">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Upload quotes, specifications, or other documents</p>
              <Input
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="order-file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("order-file-upload")?.click()}
              >
                Browse Files
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files:</Label>
                {uploadedFiles.map((file, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
