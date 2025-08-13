package ma.backendachatis.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "deliveries")
public class Delivery extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String trackingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_order_id", nullable = false)
    private PurchaseOrder purchaseOrder;

    private String supplier;
    private LocalDate expectedDate;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status = DeliveryStatus.PENDING_RECEIPT;

    // Constructors
    public Delivery() {}

    // Getters and Setters
    public String getTrackingId() { return trackingId; }
    public void setTrackingId(String trackingId) { this.trackingId = trackingId; }

    public PurchaseOrder getPurchaseOrder() { return purchaseOrder; }
    public void setPurchaseOrder(PurchaseOrder purchaseOrder) { this.purchaseOrder = purchaseOrder; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    public LocalDate getExpectedDate() { return expectedDate; }
    public void setExpectedDate(LocalDate expectedDate) { this.expectedDate = expectedDate; }

    public DeliveryStatus getStatus() { return status; }
    public void setStatus(DeliveryStatus status) { this.status = status; }

    public enum DeliveryStatus {
        IN_TRANSIT("in-transit"),
        DELIVERED("delivered"),
        PENDING_RECEIPT("pending-receipt"),
        DELAYED("delayed");

        private final String value;
        DeliveryStatus(String value) { this.value = value; }
        public String getValue() { return value; }
    }
}
