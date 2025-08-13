package ma.backendachatis.controller;

import ma.backendachatis.DTO.OrderDTO;
import ma.backendachatis.entity.PurchaseOrder;
import ma.backendachatis.service.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private PurchaseOrderService service;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(service.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        return service.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-status/{status}")
    public ResponseEntity<List<OrderDTO>> getOrdersByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getOrdersByStatus(status));
    }

    @GetMapping("/by-supplier/{supplierId}")
    public ResponseEntity<List<OrderDTO>> getOrdersBySupplier(@PathVariable Long supplierId) {
        return ResponseEntity.ok(service.getOrdersBySupplier(supplierId));
    }

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody PurchaseOrder order) {
        return ResponseEntity.ok(service.createOrder(order));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody PurchaseOrder order) {
        return service.updateOrder(id, order)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        return service.updateOrderStatus(id, statusUpdate.get("status"))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/ship")
    public ResponseEntity<OrderDTO> shipOrder(@PathVariable Long id) {
        return service.updateOrderStatus(id, "shipped")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/deliver")
    public ResponseEntity<OrderDTO> deliverOrder(@PathVariable Long id) {
        return service.updateOrderStatus(id, "delivered")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderDTO> cancelOrder(@PathVariable Long id) {
        return service.updateOrderStatus(id, "cancelled")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reactivate")
    public ResponseEntity<OrderDTO> reactivateOrder(@PathVariable Long id) {
        return service.updateOrderStatus(id, "processing")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        service.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.getAllOrders().size());
        stats.put("processing", service.getOrderCountByStatus("processing"));
        stats.put("shipped", service.getOrderCountByStatus("shipped"));
        stats.put("delivered", service.getOrderCountByStatus("delivered"));
        stats.put("cancelled", service.getOrderCountByStatus("cancelled"));
        stats.put("totalValue", service.getTotalOrderValue());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}/track")
    public ResponseEntity<Map<String, Object>> trackOrder(@PathVariable Long id) {
        return ResponseEntity.ok(service.getOrderTrackingInfo(id));
    }

    @GetMapping("/{id}/invoice")
    public ResponseEntity<Map<String, Object>> getOrderInvoice(@PathVariable Long id) {
        return ResponseEntity.ok(service.getOrderInvoiceInfo(id));
    }
}