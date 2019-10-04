package com.revamp.email.dao;

import org.springframework.data.repository.CrudRepository;

import com.revamp.email.model.School;
/**
 * 
 * @author Puthuyir DEV TEAM
 *
 */
public interface EmailRepository extends CrudRepository<School ,Long>  {

}
