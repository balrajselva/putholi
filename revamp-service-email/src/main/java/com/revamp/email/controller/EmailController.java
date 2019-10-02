package com.revamp.email.controller;

import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	@PostMapping("/send-mail")
	public String send(@RequestBody(required = false) EmailUser puser) throws SendMailException, MessagingException {
		logger.info("EmailController:Send Email Method entry");
		List<String> emailList = new ArrayList<String>();

		/*
		 * Creating a User with the help of User class that we have declared and setting
		 * Email address of the sender.
		 */
		// TODO - Need to modify after frontcode is done
		user = new EmailUser();

		if (user.getTo() != null && user.getTo().size() > 1) {

			emailList.add(user.getToEmailAddress());
			user.setTo(emailList);
			user.setFrom("puthyirAdminTeam@puthyir.com");

		} else {
			user.setFrom("puthyirAdminTeam@puthyir.com");
			user.setToEmailAddress("dkamalkanth@gmail.com");
			user.setSubject("Donation school Details");
			user.setMessage("Welcome to Puthyir Application");

		}
		/*
		 * Here we will call sendEmail() for Sending mail to the sender.
		 */
		try {
			logger.info("Hitting EmailService to send mail with User information " +user.toString());
			notificationService.sendEmail(user);
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
	 */
	@PostMapping("/send-mail-attachment")
	public String sendWithAttachment(@RequestBody EmailUser user) throws MessagingException {
		logger.info("EmailController:sendWithAttachment Method entry");
		/*
		 * Creating a User with the help of User class that we have declared and setting
		 * Email address of the sender.
		 */
		// TODO Changes the below values and reading from requestBody values to set
		user.setFromEmailAddress("dkamalkanth@gmail.com");

		/*
		 * Here we will call sendEmailWithAttachment() for Sending mail to the sender
		 * that contains a attachment.
		 */
		try {
			notificationService.sendEmailWithAttachment(user);
		} catch (MailException mailException) {
			throw new SendMailAttachmentException(mailException.getMessage());
		}
		logger.info("EmailController:sendWithAttachment Method exit");
		return EmailConstants.EMAIL_SUCCESS;
		}
}
