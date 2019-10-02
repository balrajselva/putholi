package com.revamp.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class RevampServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RevampServicesApplication.class, args);
	}
}
