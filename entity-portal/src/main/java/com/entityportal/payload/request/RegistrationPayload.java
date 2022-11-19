package com.entityportal.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class RegistrationPayload {
  @NotBlank
  @Size(min = 3, max = 20, message = "Your first name size must be between 3 and 40" )
  private String firstName;
  
  @NotBlank
  private String lastName;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(min = 3, max = 40, message = "Your password size must be between 3 and 40")
  private String password;
}
