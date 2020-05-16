package com.revamp.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@ComponentScan
public class RevampPaymentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RevampPaymentServiceApplication.class, args);
	}

}
