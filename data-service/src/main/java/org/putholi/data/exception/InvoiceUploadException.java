package org.putholi.data.exception;

public class InvoiceUploadException extends RuntimeException {

	public InvoiceUploadException(String message) {
		super(message);
	}
	
	public InvoiceUploadException(String message,Throwable cause) {
		super(message,cause);
	}
	
	
}
