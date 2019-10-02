package com.revamp.core.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revamp.core.model.School;
import com.revamp.core.model.SchoolRegFormModel;
import com.revamp.core.service.SchoolService;
import com.revamp.core.web.util.WebUtilities;

/**
 * 
 * @author PuthyirDevTeam
 *
 */
@RestController
@PropertySource(value= {"classpath:application.properties"})
public class SchoolController {
	private final static Logger logger = LoggerFactory.getLogger(SchoolController.class);

	@Autowired
	private SchoolService schoolService;
	
	 @Value("${image.path}")
     private String imgPath;


	/**
	 * 
	 * @param regFormModel
	 * @param request
	 * @return
	 */
	@PostMapping("/school")
	public ResponseEntity<?> multiUploadFileModel(@ModelAttribute SchoolRegFormModel regFormModel,
			HttpServletRequest request) {

		try {
			Map<String, byte[]> filesInBytes = WebUtilities
					.convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()));
			School school = new ObjectMapper().readValue(regFormModel.getPayload(), School.class);
			long id = schoolService.save(school, filesInBytes,imgPath);
		} catch (IOException ex) {
			ex.printStackTrace();
			return new ResponseEntity(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity("Successfully uploaded!", HttpStatus.OK);

	}


	/**
	 * 
	 * @param schoolId
	 * @return
	 */
	@GetMapping("/school/{id}")
	public ResponseEntity<School> get(@PathVariable("id") long schoolId) {
		School school = schoolService.get(schoolId);
		return ResponseEntity.ok().body(school);
	}

	
	/**
	 * 
	 * @param schoolId
	 * @return
	 */
	@GetMapping("/school/user/{id}")
	public ResponseEntity<List<School>> getSchoolByUserId(@PathVariable("id") long userId) {
		List<School> list = schoolService.getByUserId(userId);
		return ResponseEntity.ok().body(list);
	}

	
	/**
	 * 
	 * @param school
	 * @param request
	 * @return
	 */
	@GetMapping("/school")
	@ResponseBody
	public ResponseEntity<List<School>> getAll(@RequestBody(required = false) School school,
			HttpServletRequest request) {
		List<School> schools = schoolService.getAll();

		return ResponseEntity.ok().body(schools);
	}

	/**
	 * 
	 * @param cityId
	 * @return
	 */
	@GetMapping("/school/city/{cityid}")
	public ResponseEntity<List<School>> getAllByCity(@PathVariable("cityid") String cityId) {
		List<School> schools = schoolService.getAllByCity(cityId);
		return ResponseEntity.ok().body(schools);
	}

	/**
	 * 
	 * @param districtId
	 * @return
	 */
	@GetMapping("/school/district/{districtid}")
	public ResponseEntity<List<School>> getAllByDistrict(@PathVariable("districtid") String districtId) {
		List<School> schools = schoolService.getAllByDistrict(districtId);
		return ResponseEntity.ok().body(schools);
	}

	/**
	 * 
	 * @param localityId
	 * @return
	 */
	@GetMapping("/school/locality/{localityid}")
	public ResponseEntity<List<School>> getAllByLocality(@PathVariable("localityid") String localityId) {
		List<School> schools = schoolService.getAllByLocality(localityId);
		return ResponseEntity.ok().body(schools);
	}

}