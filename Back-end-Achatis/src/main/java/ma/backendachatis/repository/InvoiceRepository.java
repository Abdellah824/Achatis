package ma.backendachatis.repository;

import ma.backendachatis.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByStatus(Invoice.InvoiceStatus status);
    List<Invoice> findByPurchaseOrderId(Long orderId);

    @Query("SELECT COUNT(i) FROM Invoice i WHERE i.status = ?1")
    long countByStatus(Invoice.InvoiceStatus status);

    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.status <> 'PAID'")
    BigDecimal getTotalOutstanding();

    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.status = 'PAID'")
    BigDecimal getTotalPaid();
}