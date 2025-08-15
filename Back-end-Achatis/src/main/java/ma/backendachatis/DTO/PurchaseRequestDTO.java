package ma.backendachatis.DTO;

import ma.backendachatis.entity.PurchaseRequest;
import java.time.format.DateTimeFormatter;

public class PurchaseRequestDTO {
    private String id;
    private String item;
    private Integer quantity;
    private String requestedBy;
    private String status;
    private String date;

    // Constructors
    public PurchaseRequestDTO() {}

    public PurchaseRequestDTO(PurchaseRequest request) {
        this.id = request.getId().toString();
        this.item = request.getItem();
        this.quantity = request.getQuantity();
        this.requestedBy = request.getRequestedBy();
        this.status = request.getStatus().getValue();
        this.date = request.getRequestDate() != null ?
                request.getRequestDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : "";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getRequestedBy() { return requestedBy; }
    public void setRequestedBy(String requestedBy) { this.requestedBy = requestedBy; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
