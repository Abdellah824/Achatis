package ma.backendachatis.service;

import ma.backendachatis.DTO.PurchaseRequestDTO;
import ma.backendachatis.entity.PurchaseRequest;
import ma.backendachatis.repository.PurchaseRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PurchaseRequestService {

    @Autowired
    private PurchaseRequestRepository repository;

    public List<PurchaseRequestDTO> getAllRequests() {
        return repository.findAll().stream()
                .map(PurchaseRequestDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<PurchaseRequestDTO> getRequestById(Long id) {
        return repository.findById(id).map(PurchaseRequestDTO::new);
    }

    public PurchaseRequestDTO createRequest(PurchaseRequest request) {
        request.setRequestDate(LocalDate.now());
        PurchaseRequest saved = repository.save(request);
        return new PurchaseRequestDTO(saved);
    }

    public Optional<PurchaseRequestDTO> updateRequestStatus(Long id, String status) {
        return repository.findById(id).map(request -> {
            request.setStatus(PurchaseRequest.RequestStatus.valueOf(status.toUpperCase()));
            return new PurchaseRequestDTO(repository.save(request));
        });
    }

    public void deleteRequest(Long id) {
        repository.deleteById(id);
    }

    public long getRequestCountByStatus(String status) {
        return repository.countByStatus(PurchaseRequest.RequestStatus.valueOf(status.toUpperCase()));
    }

    public Optional<PurchaseRequestDTO> updateRequest(Long id, PurchaseRequest requestDetails) {
        return repository.findById(id).map(request -> {
            request.setItem(requestDetails.getItem());
            request.setDescription(requestDetails.getDescription());
            request.setQuantity(requestDetails.getQuantity());
            request.setEstimatedCost(requestDetails.getEstimatedCost());
            request.setUrgency(requestDetails.getUrgency());
            request.setJustification(requestDetails.getJustification());
            request.setPreferredSupplier(requestDetails.getPreferredSupplier());
            return new PurchaseRequestDTO(repository.save(request));
        });
    }

    public List<PurchaseRequestDTO> getRequestsByStatus(String status) {
        return repository.findByStatus(PurchaseRequest.RequestStatus.valueOf(status.toUpperCase()))
                .stream()
                .map(PurchaseRequestDTO::new)
                .collect(Collectors.toList());
    }
}
