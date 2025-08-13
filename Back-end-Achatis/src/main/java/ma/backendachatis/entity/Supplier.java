package ma.backendachatis.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "suppliers")
public class Supplier extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    private String phone;
    private String address;
    private String contactPerson;

    @Enumerated(EnumType.STRING)
    private SupplierStatus status = SupplierStatus.ACTIVE;

    private Double rating = 0.0;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PurchaseOrder> purchaseOrders;

    // Constructors
    public Supplier() {}

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public SupplierStatus getStatus() { return status; }
    public void setStatus(SupplierStatus status) { this.status = status; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public List<PurchaseOrder> getPurchaseOrders() { return purchaseOrders; }
    public void setPurchaseOrders(List<PurchaseOrder> purchaseOrders) { this.purchaseOrders = purchaseOrders; }

    public enum SupplierStatus {
        ACTIVE("active"),
        INACTIVE("inactive");

        private final String value;
        SupplierStatus(String value) { this.value = value; }
        public String getValue() { return value; }
    }
}
