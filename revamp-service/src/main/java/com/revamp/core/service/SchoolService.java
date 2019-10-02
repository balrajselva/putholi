package com.revamp.core.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.revamp.core.model.School;

public interface SchoolService {

	long save(School school, Map<String, byte[]> filesInBytes, String imgPath);

	School get(long id);
	
	List<School> getAll();
	
	//List<School> getAllByName(String contains);
	
	List<School> getAllByCity(String cityId);
	
	List<School> getAllByDistrict(String districtId);
	
	List<School> getAllByLocality(String localityId);
	
	List<School> getByUserId(long userId);

}
