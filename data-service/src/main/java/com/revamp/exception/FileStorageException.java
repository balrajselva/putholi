package com.revamp.exception;

import org.springframework.http.HttpStatus;

public class FileStorageException extends RuntimeException{
/**
 * 
 * @param message
 */
	
	public FileStorageException(String message) {
		super(message);
	}
	/**
	 * 
	 * @param message
	 * @param cause
	 */
	public FileStorageException(String message,Throwable cause) {
		super(message,cause);
	}
}
