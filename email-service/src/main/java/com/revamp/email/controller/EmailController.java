package com.revamp.email.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;

import com.revamp.email.model.Volunteer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revamp.email.exception.SendMailAttachmentException;
import com.revamp.email.exception.SendMailException;
import com.revamp.email.model.EmailUser;
import com.revamp.email.service.EmailServiceImpl;
import com.revamp.email.util.EmailConstants;

/**
 * 
 * @author Puthyir Dev Team
 *
 */

@RestController
public class EmailController {
	private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

	@Autowired
	private EmailServiceImpl notificationService;

	@Autowired
	private EmailUser user;

	/**
	 * 
	 * @return
	 * @throws MessagingException
	 * @throws SendMailException
	 */
	
	@PostMapping("/sendmail/school")
	public String sendForSchool(@RequestBody EmailUser puser) throws SendMailException, MessagingException {
		logger.info("EmailController:Send Email Method entry");

		/*
		 * Here we will call sendEmail() for Sending mail to the sender.
		 */
		try {
			logger.info("Hitting EmailService to send mail with User information " +user.toString());
			notificationService.sendEmailForSchool(puser);
			logger.info("Succesfully exited EmailService - sendMail ");
		} catch (MailException mailException) {
			logger.error("Error in Send mail "+mailException.getMessage());
           throw new SendMailException(mailException.getMessage());
		}
		logger.info("EmailController:Send Email Method exit");
		return EmailConstants.EMAIL_SUCCESS_MESSAGE;

	}

    @PostMapping("/sendmail/trust")
    public String sendForTrust(@RequestBody EmailUser puser) throws SendMailException, MessagingException {
        logger.info("EmailController:Send Email Method entry");
        /*
         * Here we will call sendEmail() for Sending mail to the sender.
         */
        try {
            logger.info("Hitting EmailService to send mail with User information " +user.toString());
            notificationService.sendEmailForTrust(puser);
            logger.info("Succesfully exited EmailService - sendMail ");
        } catch (MailException mailException) {
            logger.error("Error in Send mail "+mailException.getMessage());
            throw new SendMailException(mailException.getMessage());
        }
        logger.info("EmailController:Send Email Method exit");
        return EmailConstants.EMAIL_SUCCESS_MESSAGE;

    }

	@PostMapping("/sendmailForVolunteer")
	public String sendForVolunteer(@RequestBody Volunteer volunteers) throws SendMailException, MessagingException {
		logger.info("EmailController:Send Email Method entry");
		List<String> emailList = new ArrayList<String>();

		/*
		 * Creating a User with the help of User class that we have declared and setting
		 * Email address of the sender.
		 */

		/*
		 * Here we will call sendEmail() for Sending mail to the sender.
		 */
		try {
			logger.info("Hitting EmailService to send mail with User information " +user.toString());
			notificationService.sendEmailForVolunteer(volunteers);
			logger.info("Succesfully exited EmailService - sendMail ");
		} catch (MailException mailException) {
			logger.error("Error in Send mail "+mailException.getMessage());
			throw new SendMailException(mailException.getMessage());
		}
		logger.info("EmailController:Send Email Method exit");
		return EmailConstants.EMAIL_SUCCESS_MESSAGE;

	}

	/**
	 * 
	 * @return
	 * @throws MessagingException
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@PostMapping("/sendattachment")
	public String sendWithAttachment(@RequestParam("user") String json,@RequestParam("attachmentFile") MultipartFile[] files) throws MessagingException, JsonParseException, JsonMappingException, IOException {
		logger.info("EmailController:sendWithAttachment Method entry");
		
		System.out.println("Enter user drails"+ json.toString());
		
		EmailUser user = new ObjectMapper().readValue(json,EmailUser.class);
		
		/*
		 * Creating a User with the help of User class that we have declared and setting
		 * Email address of the sender.
		 */
		// TODO Changes the below values and reading from requestBody values to set
		
		
		user.setFromEmailAddress("dkamalkanth@gmail.com");
		
		System.out.println("display the prequirement"+user.getRequirements().size());
		
		

		/*
		 * Here we will call sendEmailWithAttachment() for Sending mail to the sender
		 * that contains a attachment.
		 */
		try {
			notificationService.sendEmailWithAttachment(user,files);
		} catch (MailException mailException) {
			throw new SendMailAttachmentException(mailException.getMessage());
		}
		logger.info("EmailController:sendWithAttachment Method exit");
		return EmailConstants.EMAIL_SUCCESS;
		}
}
