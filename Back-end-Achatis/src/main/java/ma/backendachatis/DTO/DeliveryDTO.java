package ma.backendachatis.DTO;

import ma.backendachatis.entity.Delivery;
import java.time.format.DateTimeFormatter;

public class DeliveryDTO {
    private String id;
    private String trackingId;
    private String orderId;
    private String supplier;
    private String status;
    private String expectedDate;

    // Constructors
    public DeliveryDTO() {}

    public DeliveryDTO(Delivery delivery) {
        this.id = delivery.getId().toString();
        this.trackingId = delivery.getTrackingId();
        this.orderId = delivery.getPurchaseOrder().getId().toString();
        this.supplier = delivery.getSupplier();
        this.status = delivery.getStatus().getValue();
        this.expectedDate = delivery.getExpectedDate() != null ?
                delivery.getExpectedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : "";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTrackingId() { return trackingId; }
    public void setTrackingId(String trackingId) { this.trackingId = trackingId; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getExpectedDate() { return expectedDate; }
    public void setExpectedDate(String expectedDate) { this.expectedDate = expectedDate; }
}