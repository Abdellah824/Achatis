package ma.backendachatis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BackEndAchatisApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackEndAchatisApplication.class, args);
    }
}