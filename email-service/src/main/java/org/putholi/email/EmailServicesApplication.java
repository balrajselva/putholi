package org.putholi.email;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@ComponentScan
public class EmailServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmailServicesApplication.class, args);
	}

}
