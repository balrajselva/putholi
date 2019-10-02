package com.revamp.email.model;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class EmailUser {
	
	 private String from;
	 
	 private List<String> to;
	 
	 private List<String> cc;
	 
	 private String subject;
	 
	 private String message;
	 
	 private String fromEmailAddress;
	 
	 private String toEmailAddress;
	 private Map<String, Object> model;

	
}
