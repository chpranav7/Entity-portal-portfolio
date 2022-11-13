package com.ordermgmt.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
public class Account {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private long id;
  
  private long accountId;
  
  @OneToOne
  @JoinColumn(name = "added_by")
  private Users addedBy;
  
  private String accountNumber;
  
  private long amount;
  
  private String currency;
  
  private String description;
  
  private String passcode;
  
  private String city;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = JsonFormat.DEFAULT_TIMEZONE)
  private LocalDate  date;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss", timezone = JsonFormat.DEFAULT_TIMEZONE)
  private LocalDateTime  addedAt;
  
  private String country;

}
