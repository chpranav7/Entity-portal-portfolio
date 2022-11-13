package com.ordermgmt.payload.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class OrdersResponse {
	private String account;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = JsonFormat.DEFAULT_TIMEZONE)
	private LocalDate dueDate;
	private long productId;
  	private String category;
	private String name;
	private int quantity;
}
