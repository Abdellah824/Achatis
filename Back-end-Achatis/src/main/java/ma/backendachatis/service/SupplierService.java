package ma.backendachatis.service;

import ma.backendachatis.DTO.SupplierDTO;
import ma.backendachatis.entity.Supplier;
import ma.backendachatis.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository repository;

    public List<SupplierDTO> getAllSuppliers() {
        return repository.findAll().stream()
                .map(SupplierDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<SupplierDTO> getSupplierById(Long id) {
        return repository.findById(id).map(SupplierDTO::new);
    }

    public SupplierDTO createSupplier(Supplier supplier) {
        Supplier saved = repository.save(supplier);
        return new SupplierDTO(saved);
    }

    public Optional<SupplierDTO> updateSupplier(Long id, Supplier supplierDetails) {
        return repository.findById(id).map(supplier -> {
            supplier.setName(supplierDetails.getName());
            supplier.setEmail(supplierDetails.getEmail());
            supplier.setPhone(supplierDetails.getPhone());
            supplier.setAddress(supplierDetails.getAddress());
            supplier.setContactPerson(supplierDetails.getContactPerson());
            supplier.setStatus(supplierDetails.getStatus());
            return new SupplierDTO(repository.save(supplier));
        });
    }

    public void deleteSupplier(Long id) {
        repository.deleteById(id);
    }

    public long getActiveSupplierCount() {
        return repository.countByStatus(Supplier.SupplierStatus.ACTIVE);
    }

    public Double getAverageRating() {
        return repository.getAverageRating();
    }

    public List<SupplierDTO> getActiveSuppliers() {
        return repository.findByStatus(Supplier.SupplierStatus.ACTIVE)
                .stream()
                .map(SupplierDTO::new)
                .collect(Collectors.toList());
    }

    public List<SupplierDTO> searchSuppliers(String query) {
        return repository.findByNameContainingIgnoreCase(query)
                .stream()
                .map(SupplierDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<SupplierDTO> updateSupplierStatus(Long id, String status) {
        return repository.findById(id).map(supplier -> {
            supplier.setStatus(Supplier.SupplierStatus.valueOf(status.toUpperCase()));
            return new SupplierDTO(repository.save(supplier));
        });
    }

    public Optional<SupplierDTO> updateSupplierRating(Long id, Double rating) {
        return repository.findById(id).map(supplier -> {
            supplier.setRating(rating);
            return new SupplierDTO(repository.save(supplier));
        });
    }

    public long getInactiveSupplierCount() {
        return repository.countByStatus(Supplier.SupplierStatus.INACTIVE);
    }

    public SupplierDTO getTopRatedSupplier() {
        return repository.findAll().stream()
                .max((s1, s2) -> Double.compare(s1.getRating(), s2.getRating()))
                .map(SupplierDTO::new)
                .orElse(null);
    }

    public Map<String, Object> getSupplierOrderStats(Long supplierId) {
        // This would require OrderRepository injection
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", 0); // Implement based on your needs
        stats.put("completedOrders", 0);
        stats.put("totalValue", 0.0);
        return stats;
    }
}
