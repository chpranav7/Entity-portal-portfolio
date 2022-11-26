package com.entityportal.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.entityportal.service.FileUploadService;

@CrossOrigin
@RestController
@RequestMapping("/api/file")
public class FileUploadController {
	
	@Autowired
	FileUploadService service;
	
	@PostMapping(value = "/upload/{userId}", consumes = "multipart/form-data")
	public ResponseEntity<?> fileUpload(@PathVariable long userId, @RequestParam("file") MultipartFile request)
			throws IOException {
		return ResponseEntity.status(HttpStatus.OK).body(service.fileUploadCsv(userId, request));
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?>getdataofuser(@PathVariable("userId") long userId){
		return ResponseEntity.status(HttpStatus.OK).body(service.getdata(userId));
	}
		
	@GetMapping()
	public ResponseEntity<?> getAllData()  {
		return ResponseEntity.status(HttpStatus.OK).body(service.getAllDatas());
	}
}
