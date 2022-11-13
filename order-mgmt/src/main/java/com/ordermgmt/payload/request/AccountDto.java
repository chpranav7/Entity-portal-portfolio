package com.ordermgmt.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountDto {

	@JsonProperty("Id")
	private long id;
	@JsonProperty("AccountNumber")
	private String accountNumber;
	@JsonProperty("Amount")
	private long amount;
	@JsonProperty("Currency")
	private String currency;
	@JsonProperty("Description")
	private String description;
	@JsonProperty("Passcode")
	private String passcode;
	@JsonProperty("City")
	private String city;
	@JsonProperty("Date")
	private String date;
	@JsonProperty("Country")
	private String country;

}