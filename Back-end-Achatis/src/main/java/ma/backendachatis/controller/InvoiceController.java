package ma.backendachatis.controller;

import ma.backendachatis.DTO.InvoiceDTO;
import ma.backendachatis.entity.Invoice;
import ma.backendachatis.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    @Autowired
    private InvoiceService service;

    @GetMapping
    public ResponseEntity<List<InvoiceDTO>> getAllInvoices() {
        return ResponseEntity.ok(service.getAllInvoices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceDTO> getInvoiceById(@PathVariable Long id) {
        return service.getInvoiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-status/{status}")
    public ResponseEntity<List<InvoiceDTO>> getInvoicesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getInvoicesByStatus(status));
    }

    @GetMapping("/by-order/{orderId}")
    public ResponseEntity<List<InvoiceDTO>> getInvoicesByOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(service.getInvoicesByOrder(orderId));
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<InvoiceDTO>> getOverdueInvoices() {
        return ResponseEntity.ok(service.getOverdueInvoices());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<InvoiceDTO>> getPendingInvoices() {
        return ResponseEntity.ok(service.getPendingInvoices());
    }

    @PostMapping
    public ResponseEntity<InvoiceDTO> createInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(service.createInvoice(invoice));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvoiceDTO> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoice) {
        return service.updateInvoice(id, invoice)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<InvoiceDTO> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        return service.updateInvoiceStatus(id, statusUpdate.get("status"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<InvoiceDTO> markAsPaid(@PathVariable Long id) {
        return service.updateInvoiceStatus(id, "paid")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/process")
    public ResponseEntity<InvoiceDTO> markAsProcessing(@PathVariable Long id) {
        return service.updateInvoiceStatus(id, "processing")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/schedule-payment")
    public ResponseEntity<InvoiceDTO> schedulePayment(@PathVariable Long id, @RequestBody Map<String, String> paymentSchedule) {
        return service.schedulePayment(id, paymentSchedule.get("scheduledDate"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/send-reminder")
    public ResponseEntity<Map<String, String>> sendPaymentReminder(@PathVariable Long id) {
        boolean sent = service.sendPaymentReminder(id);
        Map<String, String> response = new HashMap<>();
        response.put("status", sent ? "success" : "failed");
        response.put("message", sent ? "Payment reminder sent" : "Failed to send reminder");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        service.deleteInvoice(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.getAllInvoices().size());
        stats.put("totalOutstanding", service.getTotalOutstanding());
        stats.put("totalPaid", service.getTotalPaid());
        stats.put("overdue", service.getInvoiceCountByStatus("overdue"));
        stats.put("pending", service.getInvoiceCountByStatus("pending"));
        stats.put("processing", service.getInvoiceCountByStatus("processing"));
        stats.put("paid", service.getInvoiceCountByStatus("paid"));
        stats.put("overdueAmount", service.getOverdueAmount());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Map<String, String>> downloadInvoicePDF(@PathVariable Long id) {
        String downloadUrl = service.generateInvoicePDF(id);
        Map<String, String> response = new HashMap<>();
        response.put("downloadUrl", downloadUrl);
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/receipt")
    public ResponseEntity<Map<String, String>> generateReceipt(@PathVariable Long id) {
        String receiptUrl = service.generateReceipt(id);
        Map<String, String> response = new HashMap<>();
        response.put("receiptUrl", receiptUrl);
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
}
