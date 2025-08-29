package org.example.interactivemapbackend.repos;

import org.example.interactivemapbackend.model.App_User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadData {
    private static final Logger log = LoggerFactory.getLogger(LoadData.class);

    @Bean
    CommandLineRunner initData(UserRepository userRepository) {
        return args -> {
            log.info("Loading {}", userRepository.save(new App_User("This", "123", "e@email.com", true)));
            log.info("Loading {}", userRepository.save(new App_User("This", "123", "e@email.com", true)));
        };
    }
}
