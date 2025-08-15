package ma.backendachatis.service;

import ma.backendachatis.DTO.InvoiceDTO;
import ma.backendachatis.entity.Invoice;
import ma.backendachatis.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository repository;

    public List<InvoiceDTO> getAllInvoices() {
        return repository.findAll().stream()
                .map(InvoiceDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<InvoiceDTO> getInvoiceById(Long id) {
        return repository.findById(id).map(InvoiceDTO::new);
    }

    public InvoiceDTO createInvoice(Invoice invoice) {
        invoice.setInvoiceNumber(generateInvoiceNumber());
        Invoice saved = repository.save(invoice);
        return new InvoiceDTO(saved);
    }

    public Optional<InvoiceDTO> updateInvoiceStatus(Long id, String status) {
        return repository.findById(id).map(invoice -> {
            invoice.setStatus(Invoice.InvoiceStatus.valueOf(status.toUpperCase()));
            return new InvoiceDTO(repository.save(invoice));
        });
    }

    public void deleteInvoice(Long id) {
        repository.deleteById(id);
    }

    public long getInvoiceCountByStatus(String status) {
        return repository.countByStatus(Invoice.InvoiceStatus.valueOf(status.toUpperCase()));
    }

    public BigDecimal getTotalOutstanding() {
        return repository.getTotalOutstanding();
    }

    public BigDecimal getTotalPaid() {
        return repository.getTotalPaid();
    }

    private String generateInvoiceNumber() {
        return "INV-" + System.currentTimeMillis();
    }

    public List<InvoiceDTO> getInvoicesByStatus(String status) {
        return repository.findByStatus(Invoice.InvoiceStatus.valueOf(status.toUpperCase()))
                .stream()
                .map(InvoiceDTO::new)
                .collect(Collectors.toList());
    }

    public List<InvoiceDTO> getInvoicesByOrder(Long orderId) {
        return repository.findByPurchaseOrderId(orderId)
                .stream()
                .map(InvoiceDTO::new)
                .collect(Collectors.toList());
    }

    public List<InvoiceDTO> getOverdueInvoices() {
        return repository.findByStatus(Invoice.InvoiceStatus.OVERDUE)
                .stream()
                .map(InvoiceDTO::new)
                .collect(Collectors.toList());
    }

    public List<InvoiceDTO> getPendingInvoices() {
        return repository.findByStatus(Invoice.InvoiceStatus.PENDING)
                .stream()
                .map(InvoiceDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<InvoiceDTO> updateInvoice(Long id, Invoice invoiceDetails) {
        return repository.findById(id).map(invoice -> {
            invoice.setSupplier(invoiceDetails.getSupplier());
            invoice.setDueDate(invoiceDetails.getDueDate());
            invoice.setAmount(invoiceDetails.getAmount());
            return new InvoiceDTO(repository.save(invoice));
        });
    }

    public Optional<InvoiceDTO> schedulePayment(Long id, String scheduledDate) {
        return repository.findById(id).map(invoice -> {
            invoice.setStatus(Invoice.InvoiceStatus.PROCESSING);
            // You might want to add a scheduledPaymentDate field
            return new InvoiceDTO(repository.save(invoice));
        });
    }

    public boolean sendPaymentReminder(Long id) {
        // Simulate sending reminder email/notification
        return repository.findById(id).isPresent();
    }

    public BigDecimal getOverdueAmount() {
        return repository.findByStatus(Invoice.InvoiceStatus.OVERDUE)
                .stream()
                .map(Invoice::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public String generateInvoicePDF(Long id) {
        // Simulate PDF generation
        return "/api/invoices/" + id + "/download.pdf";
    }

    public String generateReceipt(Long id) {
        // Simulate receipt generation
        return "/api/invoices/" + id + "/receipt.pdf";
    }
}