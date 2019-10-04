package com.revamp.email.exception;
/**
 * 
 * @author Puthyir Dev Team
 *
 */
public class SendMailException extends RuntimeException{
	/**
	 * 
	 * @param message
	 */
	public SendMailException(String message) {
		super(message);
	}
 /**
  * 
  * @param message
  * @param cause
  */
	public SendMailException(String message,Throwable cause) {
		super(message,cause);
	}
}
