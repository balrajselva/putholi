package org.putholi.email.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

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
