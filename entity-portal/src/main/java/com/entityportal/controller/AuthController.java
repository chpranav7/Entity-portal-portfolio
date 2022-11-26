package com.entityportal.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entityportal.entity.Users;
import com.entityportal.exception.EntityportalException;
import com.entityportal.payload.request.LoginPayload;
import com.entityportal.payload.request.RegistrationPayload;
import com.entityportal.payload.response.MessageResponse;
import com.entityportal.payload.response.UserInfoResponse;
import com.entityportal.repository.UserRepository;
import com.entityportal.security.jwt.JwtUtils;
import com.entityportal.security.services.UserDetailsImpl;
import com.entityportal.security.services.UserDetailsServiceImpl;
import com.entityportal.service.UserService;




@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;
  
  @Autowired
  UserService userService;

  @Autowired
  JwtUtils jwtUtils;
  
  @Autowired
  UserDetailsServiceImpl userDetailsServiceImpl;
  
  @Autowired
  PasswordEncoder encoder;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginPayload loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    String jwtToken = jwtUtils.generateJwtCookie(userDetails);
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtToken.toString())
        .body(new UserInfoResponse(userDetails.getId(),
                                   userDetails.getFirstName(),userDetails.getLastName(),
                                   userDetails.getEmail(), jwtToken));
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationPayload signUpRequest) {
    if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
      throw new EntityportalException("Email already taken!!");
    }
    // Create new user's account
    Users user = new Users(signUpRequest.getFirstName(), signUpRequest.getLastName(), 
                         signUpRequest.getEmail(),
                         encoder.encode(signUpRequest.getPassword()));

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
  
  @PostMapping("/reset-password")
  public ResponseEntity<?> registerUser(@Valid @RequestBody LoginPayload forgotPasswordRequest) {
	  Optional<Users> findByEmail = userRepository.findByEmail(forgotPasswordRequest.getEmail());
    if (!findByEmail.isPresent()) {
      throw new EntityportalException("Email not found!!");
    }
    
   // Create new user's account
    Users user = findByEmail.get();
    user.setPassword(encoder.encode(forgotPasswordRequest.getPassword()));
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("Password reset successfully!"));
  }
  
  @GetMapping("/exists/{userId}")
  public ResponseEntity<?> isUserExist(@PathVariable("userId") long userId) {
      boolean isExist = userService.getUserExists(userId);
      return ResponseEntity.status(HttpStatus.OK).body(isExist);
  }
}
