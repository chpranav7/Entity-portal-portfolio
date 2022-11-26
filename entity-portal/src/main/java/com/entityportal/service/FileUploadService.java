package com.entityportal.service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.entityportal.entity.Account;
import com.entityportal.entity.Users;
import com.entityportal.payload.request.AccountDto;
import com.entityportal.repository.AccountRepository;
import com.entityportal.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

@Service
public class FileUploadService {

	@Autowired
	UserRepository userRepo;

	@Autowired
	AccountRepository accountRepo;

	@Autowired
	EntityManager entityManager;

	public List<Account> fileUploadCsv(long userId, MultipartFile request) throws IOException {
		List<Account> resp = new ArrayList<Account>();
		Optional<Users> userOptional = userRepo.findById(userId);
		if (userOptional.isPresent()) {
			try {
				CsvSchema csv = CsvSchema.emptySchema().withHeader();
				CsvMapper mapper = new CsvMapper();

				MappingIterator<Map<?, ?>> mappingIterator = mapper.reader().forType(Map.class).with(csv)
						.readValues(new InputStreamReader(request.getInputStream()));
				List<Map<?, ?>> list = mappingIterator.readAll();
				List<AccountDto> pojo = mapper.convertValue(list, new TypeReference<List<AccountDto>>() {
				});

				for (AccountDto value : pojo) {
					Account account = new Account();
					account.setAddedBy(userOptional.get());
					account.setAddedAt(LocalDateTime.now());
					LocalDate dateTime = tryParse(value.getDate());
					account.setAccountNumber(value.getAccountNumber());
					account.setDate(dateTime);
					account.setAmount(value.getAmount());
					account.setCity(value.getCity());
					account.setCountry(value.getCountry());
					account.setCurrency(value.getCurrency());
					account.setDescription(value.getDescription());
					account.setAccountId(value.getId());
					account.setPasscode(value.getPasscode());
					accountRepo.save(account);
					resp.add(account);
				}
				System.out.println("resp===>" + resp);
				return resp;

			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return null;
	}

	private LocalDate tryParse(String dateString) {
		List<String> formatStrings = Arrays.asList("dd-MM-yyyy", "MMMM d, yyyy", "MMMM d,yyyy", "dd.M.yy");
		{
			for (String formatString : formatStrings) {
				try {
					DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatString);
					return LocalDate.parse(dateString, formatter);
				} catch (DateTimeParseException e) {
					System.out.println(e.getMessage());
				}
			}

			return null;
		}
	}
	
	public List<Account> getAllDatas() {
		return accountRepo.findAllByOrderByDateDesc();
	}
	
	public List<Account>getdata(long userId){
		Optional<Users>userOptional = userRepo.findById(userId);
		return accountRepo.findByaddedBy(userOptional.get());
		
	}
}
