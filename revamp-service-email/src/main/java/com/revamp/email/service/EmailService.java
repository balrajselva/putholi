package com.revamp.email.service;

import java.util.List;

import javax.mail.MessagingException;

import com.revamp.email.model.School;
import com.revamp.email.exception.SendMailException;
import com.revamp.email.model.EmailUser;
import org.springframework.web.multipart.MultipartFile;
/**
 * 
 * @author Puthyir Dev Team
 *
 */
public interface EmailService {
	/**
	 * 
	 * @param user
	 * @return
	 * @throws SendMailException
	 * @throws MessagingException
	 */
	String sendEmail(EmailUser user) throws SendMailException, MessagingException;

	String sendEmailForVolunteer(EmailUser user) throws SendMailException, MessagingException;

	/**
	 * 
	 * @param user
	 * @return
	 * @throws MessagingException
	 */
	String sendEmailWithAttachment(EmailUser user,MultipartFile[] files) throws MessagingException;
	
	
	School get(long id);
	
	

}
