package com.revamp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvoiceFileNotFoundException extends RuntimeException {
	/**
	 * 
	 * @param message
	 */
	
	public InvoiceFileNotFoundException(String message) {
		super(message);
		
	}
	/**
	 * 
	 * @param message
	 * @param cause
	 */
	public InvoiceFileNotFoundException(String message,Throwable cause) {
		super(message,cause);
		
	}

}
