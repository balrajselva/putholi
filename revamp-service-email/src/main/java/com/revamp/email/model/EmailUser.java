package com.revamp.email.model;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Component
@Data
public class EmailUser {
	
	 private String from;
	 
	 private List<String> to;
	 
	 private List<String> cc;
	 
	 private String toAddress;
	 
	 private String subject;
	 
	 private String message;
	 
	 private String trackId;
	 
	 private String schoolName;
	 
	 private String schoolRegNo;
	 
	 private String schoolType;
	 
	 private String yourContirbutionAmount;
	 
	 private String name;
	 
	 private String priority;
	 
	 private List<Requirement> requirements;
	 
	 private String fromEmailAddress;
	 
	 private String toEmailAddress;

	 private Map<String, Object> model;

}
