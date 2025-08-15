package ma.backendachatis.DTO;

import ma.backendachatis.entity.Invoice;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

public class InvoiceDTO {
    private String id;
    private String supplier;
    private String orderId;
    private String status;
    private BigDecimal amount;
    private String dueDate;

    // Constructors
    public InvoiceDTO() {}

    public InvoiceDTO(Invoice invoice) {
        this.id = invoice.getId().toString();
        this.supplier = invoice.getSupplier();
        this.orderId = invoice.getPurchaseOrder().getId().toString();
        this.status = invoice.getStatus().getValue();
        this.amount = invoice.getAmount();
        this.dueDate = invoice.getDueDate() != null ?
                invoice.getDueDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : "";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }
}