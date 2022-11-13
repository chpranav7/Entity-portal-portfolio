package com.ordermgmt.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ordermgmt.entity.Users;
import com.ordermgmt.exception.OrderManagmentException;
import com.ordermgmt.payload.request.RegistrationPayload;
import com.ordermgmt.repository.UserRepository;

@Service
public class UserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	UserRepository userRepo;

	public Users getUser(String email) {
		Optional<Users> users = userRepo.findByEmail(email);
		return users.isPresent()?users.get():null;
	}
	
	public boolean getUserExists(long id) {
		return userRepo.findById(id).isPresent();
	}

	public Users updateUser(long userId, RegistrationPayload request) {
		Optional<Users> userOptional = userRepo.findById(userId);
			if(userOptional.isPresent()) {
				Users user = userOptional.get();
				if(!user.getEmail().equals(request.getEmail().trim())) {
					if (userRepo.findByEmail(request.getEmail()).isPresent()) {
					    throw new OrderManagmentException("Email already taken!!");
					}
					user.setEmail(request.getEmail());
				}
				
				user.setFirstName(request.getFirstName());
				user.setLastName(request.getLastName());
				user.setPassword(request.getPassword());
				return userRepo.save(user);
			} else {
				throw new OrderManagmentException("Email not found!!");
			}
	}
}
