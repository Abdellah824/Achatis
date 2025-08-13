package ma.backendachatis.controller;

import ma.backendachatis.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportsController {

    @Autowired
    private ReportsService service;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(service.getDashboardStats());
    }

    @GetMapping("/spending")
    public ResponseEntity<Map<String, Object>> getSpendingReport() {
        return ResponseEntity.ok(service.getSpendingReport());
    }

    @GetMapping("/supplier-performance")
    public ResponseEntity<Map<String, Object>> getSupplierPerformanceReport() {
        return ResponseEntity.ok(service.getSupplierPerformanceReport());
    }

    @GetMapping("/processing-times")
    public ResponseEntity<Map<String, Object>> getProcessingTimesReport() {
        return ResponseEntity.ok(service.getProcessingTimesReport());
    }

    @GetMapping("/monthly-trends")
    public ResponseEntity<Map<String, Object>> getMonthlyTrendsReport(@RequestParam(defaultValue = "12") int months) {
        return ResponseEntity.ok(service.getMonthlyTrendsReport(months));
    }

    @GetMapping("/top-suppliers")
    public ResponseEntity<Map<String, Object>> getTopSuppliersReport(@RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(service.getTopSuppliersReport(limit));
    }

    @GetMapping("/export")
    public ResponseEntity<Map<String, String>> exportReports(@RequestParam String reportType) {
        String exportUrl = service.exportReport(reportType);
        Map<String, String> response = Map.of(
                "exportUrl", exportUrl,
                "status", "success",
                "message", "Report exported successfully"
        );
        return ResponseEntity.ok(response);
    }
}
