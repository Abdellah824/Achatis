package ma.backendachatis.DTO;

import ma.backendachatis.entity.PurchaseOrder;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

public class OrderDTO {
    private String id;
    private String supplier;
    private String items;
    private String status;
    private BigDecimal total;
    private String orderDate;

    // Constructors
    public OrderDTO() {}

    public OrderDTO(PurchaseOrder order) {
        this.id = order.getId().toString();
        this.supplier = order.getSupplier().getName();
        this.items = order.getItems();
        this.status = order.getStatus().getValue();
        this.total = order.getTotal();
        this.orderDate = order.getOrderDate() != null ?
                order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : "";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    public String getItems() { return items; }
    public void setItems(String items) { this.items = items; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }
}