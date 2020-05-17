package org.putholi.batch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("org.putholi.batch")
public class BatchServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BatchServiceApplication.class, args);
	}

}
