package com.revamp.email.service;

import java.util.HashMap;
import java.util.Map;

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
		model.put("schoolName", this.get(1).getSchoolInfo().getSchoolName());
		model.put("schoolType",this.get(1).getSchoolInfo().getSchoolType());
        model.put("name", "User");
        model.put("location", "Chennai");
        model.put("signature", "Puthuyir");
        user.setModel(model);
		
	    
		/*
		 * This send() contains an Object of MIME Message as an Parameter
		 */
		try {
			 Template t = freemarkerConfig.getTemplate("email-template.ftl");
			 
			// TODO
			if (user.getTo() != null && user.getTo().size() > 0) {
				mail.setTo(user.getTo().toArray(new String[user.getTo().size()]));
			} else {
				mail.setTo(user.getToEmailAddress());
			}
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
	@Override
	public String sendEmailWithAttachment(EmailUser user) throws MessagingException {
		logger.info("EmailServiceImpl:sendEmailWithAttachment Method entry");

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		
		if (user.getTo() != null && user.getTo().size() > 1) {

			helper.setTo(user.getTo().toArray(new String[user.getTo().size()]));
		} else {
			helper.setTo(user.getToEmailAddress());
		}
		helper.setFrom(user.getFrom());
		helper.setSubject(user.getSubject());
		helper.setText(user.getMessage());
		if (user.getCc() != null && user.getCc().size() > 0) {
			helper.setCc(user.getCc().toArray(new String[user.getCc().size()]));
		} else {
			helper.setCc("");
		}
  //TODO need to change the file url 
		FileSystemResource file = new FileSystemResource("/Users/aadaarshguhan/Documents/Kamalkanth-Durairaj.docx");
		helper.addAttachment(file.getFilename(), file);
		try {
			logger.info("Hitting JavaMailSender to send attachment to user Mailbox ");

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
