package ma.backendachatis.controller;

import ma.backendachatis.DTO.PurchaseRequestDTO;
import ma.backendachatis.entity.PurchaseRequest;
import ma.backendachatis.service.PurchaseRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/purchase-requests")
@CrossOrigin(origins = "*")
public class PurchaseRequestController {

    @Autowired
    private PurchaseRequestService service;

    @GetMapping
    public ResponseEntity<List<PurchaseRequestDTO>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseRequestDTO> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PurchaseRequestDTO> createRequest(@RequestBody PurchaseRequest request) {
        return ResponseEntity.ok(service.createRequest(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseRequestDTO> updateRequest(@PathVariable Long id, @RequestBody PurchaseRequest request) {
        return service.updateRequest(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PurchaseRequestDTO> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        return service.updateRequestStatus(id, statusUpdate.get("status"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<PurchaseRequestDTO> approveRequest(@PathVariable Long id) {
        return service.updateRequestStatus(id, "approved")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<PurchaseRequestDTO> rejectRequest(@PathVariable Long id) {
        return service.updateRequestStatus(id, "rejected")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/resubmit")
    public ResponseEntity<PurchaseRequestDTO> resubmitRequest(@PathVariable Long id) {
        return service.updateRequestStatus(id, "pending")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        service.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.getAllRequests().size());
        stats.put("pending", service.getRequestCountByStatus("pending"));
        stats.put("approved", service.getRequestCountByStatus("approved"));
        stats.put("completed", service.getRequestCountByStatus("completed"));
        stats.put("rejected", service.getRequestCountByStatus("rejected"));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/by-status/{status}")
    public ResponseEntity<List<PurchaseRequestDTO>> getRequestsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getRequestsByStatus(status));
    }
}
