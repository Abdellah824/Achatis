package ma.backendachatis.repository;

import ma.backendachatis.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    List<Supplier> findByStatus(Supplier.SupplierStatus status);
    Optional<Supplier> findByEmail(String email);
    List<Supplier> findByNameContainingIgnoreCase(String name);

    @Query("SELECT COUNT(s) FROM Supplier s WHERE s.status = ?1")
    long countByStatus(Supplier.SupplierStatus status);

    @Query("SELECT AVG(s.rating) FROM Supplier s")
    Double getAverageRating();
}