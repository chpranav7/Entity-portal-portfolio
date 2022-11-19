package com.entityportal.exception;

public class OrderManagmentException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public OrderManagmentException(String errorMessage) {  
    	super(errorMessage);  
    } 
	
}
