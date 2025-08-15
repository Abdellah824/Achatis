package ma.backendachatis.repository;

import ma.backendachatis.entity.PurchaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {
    List<PurchaseRequest> findByStatus(PurchaseRequest.RequestStatus status);
    List<PurchaseRequest> findByRequestedBy(String requestedBy);

    @Query("SELECT COUNT(r) FROM PurchaseRequest r WHERE r.status = ?1")
    long countByStatus(PurchaseRequest.RequestStatus status);
}