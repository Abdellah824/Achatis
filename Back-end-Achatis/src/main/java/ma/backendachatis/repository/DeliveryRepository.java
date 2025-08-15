package ma.backendachatis.repository;

import ma.backendachatis.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByTrackingId(String trackingId);
    List<Delivery> findByStatus(Delivery.DeliveryStatus status);
    List<Delivery> findByPurchaseOrderId(Long orderId);

    @Query("SELECT COUNT(d) FROM Delivery d WHERE d.status = ?1")
    long countByStatus(Delivery.DeliveryStatus status);
}