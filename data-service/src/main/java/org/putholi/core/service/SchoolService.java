package org.putholi.core.service;

import org.putholi.core.model.DEOInfo;
import org.putholi.core.model.School;

import java.util.List;
import java.util.Map;

public interface SchoolService {

	long save(School school, List<Map<String, byte[]>> filesInBytes);

	School get(long id);
	
	List<School> getAll();
	
	//List<School> getAllByName(String contains);
	
	List<School> getAllByCity(String cityId);
	
	List<School> getAllByDistrict(String districtId);
	
	List<School> getAllByLocality(String localityId);
	
	List<School> getByUserId(long userId);

    long saveDEOresponse(DEOInfo deoInfo, Map<String, byte[]> files, String imgPath);

	School updateSchoolStatus(long id, String status);

	School updateVolunteerId(long id,Long volunteerId);

	School updateSchoolStatusAndVolunteerId(long id,Long volunteerId, String status);

    long addRequirement(School school);

	DEOInfo getDeoResponse(long projectId);
}
