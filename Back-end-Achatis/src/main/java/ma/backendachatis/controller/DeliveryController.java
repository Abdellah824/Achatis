package ma.backendachatis.controller;

import ma.backendachatis.DTO.DeliveryDTO;
import ma.backendachatis.entity.Delivery;
import ma.backendachatis.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "*")
public class DeliveryController {

    @Autowired
    private DeliveryService service;

    @GetMapping
    public ResponseEntity<List<DeliveryDTO>> getAllDeliveries() {
        return ResponseEntity.ok(service.getAllDeliveries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryDTO> getDeliveryById(@PathVariable Long id) {
        return service.getDeliveryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<DeliveryDTO> getDeliveryByTrackingId(@PathVariable String trackingId) {
        return service.getDeliveryByTrackingId(trackingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-status/{status}")
    public ResponseEntity<List<DeliveryDTO>> getDeliveriesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getDeliveriesByStatus(status));
    }

    @GetMapping("/by-order/{orderId}")
    public ResponseEntity<List<DeliveryDTO>> getDeliveriesByOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(service.getDeliveriesByOrder(orderId));
    }

    @PostMapping
    public ResponseEntity<DeliveryDTO> createDelivery(@RequestBody Delivery delivery) {
        return ResponseEntity.ok(service.createDelivery(delivery));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryDTO> updateDelivery(@PathVariable Long id, @RequestBody Delivery delivery) {
        return service.updateDelivery(id, delivery)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<DeliveryDTO> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        return service.updateDeliveryStatus(id, statusUpdate.get("status"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/ship")
    public ResponseEntity<DeliveryDTO> shipDelivery(@PathVariable Long id) {
        return service.updateDeliveryStatus(id, "in-transit")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/deliver")
    public ResponseEntity<DeliveryDTO> markDelivered(@PathVariable Long id) {
        return service.updateDeliveryStatus(id, "delivered")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/confirm-receipt")
    public ResponseEntity<DeliveryDTO> confirmReceipt(@PathVariable Long id) {
        return service.updateDeliveryStatus(id, "delivered")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/report-issue")
    public ResponseEntity<DeliveryDTO> reportIssue(@PathVariable Long id, @RequestBody Map<String, String> issueReport) {
        return service.reportDeliveryIssue(id, issueReport.get("issue"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable Long id) {
        service.deleteDelivery(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.getAllDeliveries().size());
        stats.put("inTransit", service.getDeliveryCountByStatus("in-transit"));
        stats.put("delivered", service.getDeliveryCountByStatus("delivered"));
        stats.put("pendingReceipt", service.getDeliveryCountByStatus("pending-receipt"));
        stats.put("delayed", service.getDeliveryCountByStatus("delayed"));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/today")
    public ResponseEntity<List<DeliveryDTO>> getTodayDeliveries() {
        return ResponseEntity.ok(service.getTodayDeliveries());
    }

    @GetMapping("/overdue")
    public ResponseEntity<List<DeliveryDTO>> getOverdueDeliveries() {
        return ResponseEntity.ok(service.getOverdueDeliveries());
    }
}
