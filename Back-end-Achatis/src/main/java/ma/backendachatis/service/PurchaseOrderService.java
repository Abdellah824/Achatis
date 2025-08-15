package ma.backendachatis.service;

import ma.backendachatis.DTO.OrderDTO;
import ma.backendachatis.entity.PurchaseOrder;
import ma.backendachatis.repository.PurchaseOrderRepository;
import ma.backendachatis.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository repository;

    @Autowired
    private SupplierRepository supplierRepository;

    public List<OrderDTO> getAllOrders() {
        return repository.findAll().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<OrderDTO> getOrderById(Long id) {
        return repository.findById(id).map(OrderDTO::new);
    }

    public OrderDTO createOrder(PurchaseOrder order) {
        order.setOrderNumber(generateOrderNumber());
        order.setOrderDate(LocalDate.now());
        PurchaseOrder saved = repository.save(order);
        return new OrderDTO(saved);
    }

    public Optional<OrderDTO> updateOrderStatus(Long id, String status) {
        return repository.findById(id).map(order -> {
            order.setStatus(PurchaseOrder.OrderStatus.valueOf(status.toUpperCase()));
            return new OrderDTO(repository.save(order));
        });
    }

    public void deleteOrder(Long id) {
        repository.deleteById(id);
    }

    public long getOrderCountByStatus(String status) {
        return repository.countByStatus(PurchaseOrder.OrderStatus.valueOf(status.toUpperCase()));
    }

    public BigDecimal getTotalOrderValue() {
        return repository.getTotalOrderValue();
    }

    private String generateOrderNumber() {
        return "PO-" + System.currentTimeMillis();
    }

    public List<OrderDTO> getOrdersByStatus(String status) {
        return repository.findByStatus(PurchaseOrder.OrderStatus.valueOf(status.toUpperCase()))
                .stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    public List<OrderDTO> getOrdersBySupplier(Long supplierId) {
        return repository.findBySupplierId(supplierId)
                .stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<OrderDTO> updateOrder(Long id, PurchaseOrder orderDetails) {
        return repository.findById(id).map(order -> {
            order.setItems(orderDetails.getItems());
            order.setExpectedDeliveryDate(orderDetails.getExpectedDeliveryDate());
            order.setTotal(orderDetails.getTotal());
            order.setNotes(orderDetails.getNotes());
            return new OrderDTO(repository.save(order));
        });
    }

    public Map<String, Object> getOrderTrackingInfo(Long orderId) {
        Map<String, Object> tracking = new HashMap<>();
        tracking.put("orderId", orderId);
        tracking.put("status", "processing"); // Get actual status from DB
        tracking.put("trackingNumber", "TRK-" + orderId);
        tracking.put("estimatedDelivery", "2024-01-15");
        return tracking;
    }

    public Map<String, Object> getOrderInvoiceInfo(Long orderId) {
        Map<String, Object> invoice = new HashMap<>();
        invoice.put("orderId", orderId);
        invoice.put("invoiceGenerated", false);
        invoice.put("invoiceUrl", null);
        return invoice;
    }
}
