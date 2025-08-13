package ma.backendachatis.controller;

import ma.backendachatis.DTO.SupplierDTO;
import ma.backendachatis.entity.Supplier;
import ma.backendachatis.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "*")
public class SupplierController {

    @Autowired
    private SupplierService service;

    @GetMapping
    public ResponseEntity<List<SupplierDTO>> getAllSuppliers() {
        return ResponseEntity.ok(service.getAllSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO> getSupplierById(@PathVariable Long id) {
        return service.getSupplierById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active")
    public ResponseEntity<List<SupplierDTO>> getActiveSuppliers() {
        return ResponseEntity.ok(service.getActiveSuppliers());
    }

    @GetMapping("/search")
    public ResponseEntity<List<SupplierDTO>> searchSuppliers(@RequestParam String query) {
        return ResponseEntity.ok(service.searchSuppliers(query));
    }

    @PostMapping
    public ResponseEntity<SupplierDTO> createSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(service.createSupplier(supplier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierDTO> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        return service.updateSupplier(id, supplier)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<SupplierDTO> activateSupplier(@PathVariable Long id) {
        return service.updateSupplierStatus(id, "active")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<SupplierDTO> deactivateSupplier(@PathVariable Long id) {
        return service.updateSupplierStatus(id, "inactive")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/rating")
    public ResponseEntity<SupplierDTO> updateSupplierRating(@PathVariable Long id, @RequestBody Map<String, Double> ratingUpdate) {
        return service.updateSupplierRating(id, ratingUpdate.get("rating"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Long id) {
        service.deleteSupplier(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.getAllSuppliers().size());
        stats.put("active", service.getActiveSupplierCount());
        stats.put("inactive", service.getInactiveSupplierCount());
        stats.put("averageRating", service.getAverageRating());
        stats.put("topRated", service.getTopRatedSupplier());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<Map<String, Object>> getSupplierOrders(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSupplierOrderStats(id));
    }
}
