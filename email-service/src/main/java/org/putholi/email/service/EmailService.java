package org.putholi.email.service;

import javax.mail.MessagingException;

import org.putholi.email.model.School;
import org.putholi.email.exception.SendMailException;
import org.putholi.email.model.EmailUser;
import org.putholi.email.model.Volunteer;
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
