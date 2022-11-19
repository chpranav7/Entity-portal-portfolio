package com.entityportal.exception;

public class EntityportalException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public EntityportalException(String errorMessage) {  
    	super(errorMessage);  
    } 
	
}
