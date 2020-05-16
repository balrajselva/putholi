package com.revamp.email.exception;
/**
 * 
 * @author Puthyir Dev Team
 *
 */
public class SendMailAttachmentException extends RuntimeException{
	/**
	 * 
	 * @param message
	 */
	public SendMailAttachmentException(String message) {
		super(message);
	}
	/**
	 * 
	 * @param message
	 * @param cause
	 */
	public SendMailAttachmentException(String message , Throwable cause) {
		super(message,cause);
	}
   
}
