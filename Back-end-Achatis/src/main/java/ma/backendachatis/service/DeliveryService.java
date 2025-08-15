package ma.backendachatis.service;

import ma.backendachatis.DTO.DeliveryDTO;
import ma.backendachatis.entity.Delivery;
import ma.backendachatis.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository repository;

    public List<DeliveryDTO> getAllDeliveries() {
        return repository.findAll().stream()
                .map(DeliveryDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<DeliveryDTO> getDeliveryById(Long id) {
        return repository.findById(id).map(DeliveryDTO::new);
    }

    public Optional<DeliveryDTO> getDeliveryByTrackingId(String trackingId) {
        return repository.findByTrackingId(trackingId).map(DeliveryDTO::new);
    }

    public DeliveryDTO createDelivery(Delivery delivery) {
        delivery.setTrackingId(generateTrackingId());
        Delivery saved = repository.save(delivery);
        return new DeliveryDTO(saved);
    }

    public Optional<DeliveryDTO> updateDeliveryStatus(Long id, String status) {
        return repository.findById(id).map(delivery -> {
            delivery.setStatus(Delivery.DeliveryStatus.valueOf(status.toUpperCase().replace("-", "_")));
            return new DeliveryDTO(repository.save(delivery));
        });
    }

    public void deleteDelivery(Long id) {
        repository.deleteById(id);
    }

    public long getDeliveryCountByStatus(String status) {
        return repository.countByStatus(Delivery.DeliveryStatus.valueOf(status.toUpperCase().replace("-", "_")));
    }

    private String generateTrackingId() {
        return "TRK-" + System.currentTimeMillis();
    }

    public List<DeliveryDTO> getDeliveriesByStatus(String status) {
        String convertedStatus = status.toUpperCase().replace("-", "_");
        return repository.findByStatus(Delivery.DeliveryStatus.valueOf(convertedStatus))
                .stream()
                .map(DeliveryDTO::new)
                .collect(Collectors.toList());
    }

    public List<DeliveryDTO> getDeliveriesByOrder(Long orderId) {
        return repository.findByPurchaseOrderId(orderId)
                .stream()
                .map(DeliveryDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<DeliveryDTO> updateDelivery(Long id, Delivery deliveryDetails) {
        return repository.findById(id).map(delivery -> {
            delivery.setSupplier(deliveryDetails.getSupplier());
            delivery.setExpectedDate(deliveryDetails.getExpectedDate());
            delivery.setStatus(deliveryDetails.getStatus());
            return new DeliveryDTO(repository.save(delivery));
        });
    }

    public Optional<DeliveryDTO> reportDeliveryIssue(Long id, String issue) {
        return repository.findById(id).map(delivery -> {
            delivery.setStatus(Delivery.DeliveryStatus.DELAYED);
            // You might want to add an issues field to track this
            return new DeliveryDTO(repository.save(delivery));
        });
    }

    public List<DeliveryDTO> getTodayDeliveries() {
        LocalDate today = LocalDate.now();
        return repository.findAll().stream()
                .filter(d -> d.getExpectedDate() != null && d.getExpectedDate().equals(today))
                .map(DeliveryDTO::new)
                .collect(Collectors.toList());
    }

    public List<DeliveryDTO> getOverdueDeliveries() {
        LocalDate today = LocalDate.now();
        return repository.findAll().stream()
                .filter(d -> d.getExpectedDate() != null && d.getExpectedDate().isBefore(today)
                        && d.getStatus() != Delivery.DeliveryStatus.DELIVERED)
                .map(DeliveryDTO::new)
                .collect(Collectors.toList());
    }
}
