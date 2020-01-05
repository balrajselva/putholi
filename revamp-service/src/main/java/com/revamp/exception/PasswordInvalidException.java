package com.revamp.exception;

public class PasswordInvalidException extends  RuntimeException{

	  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PasswordInvalidException(String exception) {
	    super(exception);
	  }

}
