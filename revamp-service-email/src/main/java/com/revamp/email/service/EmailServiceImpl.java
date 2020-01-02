package com.revamp.email.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.revamp.email.dao.EmailRepository;
import com.revamp.email.exception.SendMailAttachmentException;
import com.revamp.email.exception.SendMailException;
import com.revamp.email.model.EmailUser;
import com.revamp.email.model.School;
import com.revamp.email.util.EmailConstants;

import freemarker.template.Configuration;
import freemarker.template.Template;


/**
 * 
 * @author Puthuyir Dev Team
 *
 */
@Service
@Component
public class EmailServiceImpl implements EmailService {
	private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
	
	@Autowired
	private EmailRepository emailRepo;

	/*
	 * The Spring Framework provides an easy abstraction for sending email by using
	 * the JavaMailSender interface, and Spring Boot provides auto-configuration for
	 * it as well as a starter module.
	 */
	@Autowired
	private JavaMailSender javaMailSender;
	
	
	  @Autowired
	  private Configuration freemarkerConfig;

	/**
	 * sendMail
	 * 
	 * @param user object to send the email and message details
	 * @throws MessagingException
	 */
	@Override
	public String sendEmail(EmailUser user) throws SendMailException, MessagingException {
		logger.info("EmailServiceImpl:Send Email Method entry");

		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper mail = new MimeMessageHelper(message);
		
		Map model = new HashMap();
		model.put("schoolName",user.getSchoolName());
		model.put("name", user.getName());
        model.put("trackId", user.getTrackId());
        model.put("DonatedAmount", user.getYourContirbutionAmount());
        user.setModel(model);
		
	    
		/*
		 * This send() contains an Object of MIME Message as an Parameter
		 */
		try {
			 Template t = freemarkerConfig.getTemplate("donar-email.ftl");
			 
			// TODO
			
				mail.setTo(user.getToEmailAddress());
			
			mail.setFrom(user.getFrom());
			mail.setSubject(user.getSubject());
			   String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, user.getModel());

			   
//			School schoolInfo = this.get(1);
//			if(schoolInfo !=null) {
//			mail.setText(schoolInfo.getSchoolInfo().getSchoolName());
//			}
			
			   mail.setText(html,true);
			if (user.getCc() != null && user.getCc().size() > 0) {
				mail.setCc(user.getCc().toArray(new String[user.getCc().size()]));
			}
			logger.info("Hitting JavaMailSender to send mail to user Mailbox ");

			javaMailSender.send(message);
			logger.info("Sent JavaMailSender to send mail to user Mailbox ");

		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new SendMailException("Exception in sending email to customer " + e.getMessage());
		}
		logger.info("EmailServiceImpl:Send Email Method Exit");
		return EmailConstants.EMAIL_SUCCESS;
	}

	/**
	 * sendEmailWithAttachment
	 * 
	 * @param User details to send the attachement and email infos.
	 */
	public String sendEmailWithAttachment(EmailUser user, MultipartFile[] files) throws MessagingException {
		logger.info("EmailServiceImpl:sendEmailWithAttachment Method entry");

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		
		Map model = new HashMap();
		
		model.put("requirements",user.getRequirements());
		model.put("schoolName", user.getSchoolName());
		
        user.setModel(model);
		
	    
        try {
		
		

		
      
       

        
           
	
       
		
		
		//helper.addAttachment();
		
			
			logger.info("Hitting JavaMailSender to send attachment to user Mailbox ");
			Template t = freemarkerConfig.getTemplate("emailInitiateDEO.ftl");
			   String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, user.getModel());
			    helper.setTo(user.getToEmailAddress());
				helper.setFrom(user.getFromEmailAddress());
				helper.setSubject(user.getSubject());
				  helper.setText(html,true);
				  for (MultipartFile multipartFile : files) {
		            	 String fileName = multipartFile.getOriginalFilename();
		            		helper.addAttachment(fileName,multipartFile);
		            	
		            }
		        

			javaMailSender.send(mimeMessage);
			logger.info("Successfully JavaMailSender send the attachment to user Mailbox ");

		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new SendMailAttachmentException("Exception in sending Attachment" + e.getMessage());
		}
		logger.info("EmailServiceImpl:sendEmailWithAttachment Method entry");
		return EmailConstants.EMAIL_SUCCESS;
	}

	@Override
	public School get(long id) {
		return emailRepo.findById(id).orElse(null);
	}


	
	
	

}
