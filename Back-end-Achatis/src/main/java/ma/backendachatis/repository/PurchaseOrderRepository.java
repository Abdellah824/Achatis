package ma.backendachatis.repository;

import ma.backendachatis.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    List<PurchaseOrder> findByStatus(PurchaseOrder.OrderStatus status);
    List<PurchaseOrder> findBySupplierId(Long supplierId);

    @Query("SELECT COUNT(o) FROM PurchaseOrder o WHERE o.status = ?1")
    long countByStatus(PurchaseOrder.OrderStatus status);

    @Query("SELECT SUM(o.total) FROM PurchaseOrder o")
    BigDecimal getTotalOrderValue();
}