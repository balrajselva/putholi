package com.revamp.batch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.revamp.batch.*")
public class RevampBatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(RevampBatchApplication.class, args);
	}

}
