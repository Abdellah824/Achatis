package ma.backendachatis.DTO;

import ma.backendachatis.entity.Supplier;

public class SupplierDTO {
    private String id;
    private String name;
    private String contactPerson;
    private String email;
    private String status;
    private Double rating;

    // Constructors
    public SupplierDTO() {}

    public SupplierDTO(Supplier supplier) {
        this.id = supplier.getId().toString();
        this.name = supplier.getName();
        this.contactPerson = supplier.getContactPerson();
        this.email = supplier.getEmail();
        this.status = supplier.getStatus().getValue();
        this.rating = supplier.getRating();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}