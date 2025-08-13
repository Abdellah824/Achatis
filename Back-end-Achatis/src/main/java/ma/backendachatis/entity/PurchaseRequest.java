package ma.backendachatis.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_requests")
public class PurchaseRequest extends BaseEntity {

    @Column(nullable = false)
    private String item;

    private String description;

    @Column(nullable = false)
    private Integer quantity;

    private BigDecimal estimatedCost;

    @Column(nullable = false)
    private String requestedBy;

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.PENDING;

    private LocalDate requestDate;

    private String urgency;
    private String justification;
    private String preferredSupplier;

    // Constructors
    public PurchaseRequest() {}

    // Getters and Setters
    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(BigDecimal estimatedCost) { this.estimatedCost = estimatedCost; }

    public String getRequestedBy() { return requestedBy; }
    public void setRequestedBy(String requestedBy) { this.requestedBy = requestedBy; }

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }

    public LocalDate getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDate requestDate) { this.requestDate = requestDate; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getJustification() { return justification; }
    public void setJustification(String justification) { this.justification = justification; }

    public String getPreferredSupplier() { return preferredSupplier; }
    public void setPreferredSupplier(String preferredSupplier) { this.preferredSupplier = preferredSupplier; }

    public enum RequestStatus {
        PENDING("pending"),
        APPROVED("approved"),
        REJECTED("rejected"),
        COMPLETED("completed");

        private final String value;
        RequestStatus(String value) { this.value = value; }
        public String getValue() { return value; }
    }
}
