package com.revamp.core.service;

import com.revamp.core.model.DEOInfo;
import com.revamp.core.model.School;

import java.util.List;
import java.util.Map;

public interface SchoolService {

	long save(School school, Map<String, byte[]> filesInBytes, String imgPath);

	School get(long id);
	
	List<School> getAll();
	
	//List<School> getAllByName(String contains);
	
	List<School> getAllByCity(String cityId);
	
	List<School> getAllByDistrict(String districtId);
	
	List<School> getAllByLocality(String localityId);
	
	List<School> getByUserId(long userId);

    long saveDEOresponse(DEOInfo deoInfo, Map<String, byte[]> files, String imgPath);

	School updateSchoolStatus(long id, String status);

	School updateSchoolStatusAndVolunteerId(long id,Long volunteerId, String status);

}
