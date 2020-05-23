package org.putholi.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PutholiServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(PutholiServicesApplication.class, args);
	}
}
