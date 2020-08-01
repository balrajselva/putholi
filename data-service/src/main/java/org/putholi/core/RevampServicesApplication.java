package org.putholi.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
@EnableSwagger2
public class RevampServicesApplication {


	public static void main(String[] args) {
		SpringApplication.run(RevampServicesApplication.class, args);
	}
}

