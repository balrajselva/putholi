package com.revamp.email.service;

import javax.mail.MessagingException;

import com.revamp.email.model.School;
import com.revamp.email.exception.SendMailException;
import com.revamp.email.model.EmailUser;
import com.revamp.email.model.Volunteer;
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
	String sendEmailForSchool(EmailUser user) throws SendMailException, MessagingException;

	String sendEmailForVolunteer(Volunteer volunteer) throws SendMailException, MessagingException;

	/**
	 * 
	 * @param user
	 * @return
	 * @throws MessagingException
	 */
	String sendEmailWithAttachment(EmailUser user,MultipartFile[] files) throws MessagingException;
	
	
	School get(long id);


    String sendEmailForTrust(EmailUser puser);
}
