package org.putholi.core.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.putholi.core.model.DEOInfo;
import org.putholi.core.model.School;
import org.putholi.core.model.SchoolRegFormModel;
import org.putholi.core.service.SchoolService;
import org.putholi.core.service.UserService;
import org.putholi.core.web.util.WebUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author PuthyirDevTeam
 *
 */
@RestController
@PropertySource(value = { "classpath:application.properties" })
@CrossOrigin(origins = "http://localhost")
public class SchoolController {
	private static final Logger logger = LoggerFactory.getLogger(SchoolController.class);

	@Autowired
	private SchoolService schoolService;

	@Autowired
	private UserService userService;

	 @Value("${image.path}")
     private String imgPath;


	/**
	 * 
	 * @param regFormModel
	 * @param request
	 * @return
	 */
	@PostMapping("/school")
	public ResponseEntity<?> multiUploadFileModel(@ModelAttribute("regFormModel") SchoolRegFormModel regFormModel,
			HttpServletRequest request) {

		try {
			System.out.println("..regFormModel.getPayload().."+regFormModel );
			School school = new ObjectMapper().readValue(regFormModel.getPayload(), School.class);
			System.out.println(school);
			if(regFormModel.getFiles() != null) {
				Map<String, byte[]> filesInBytes = WebUtilities
						.convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()));
				long id = schoolService.save(school, filesInBytes,imgPath);
			} else {
				long id = schoolService.save(school, null, imgPath);
			}
		} catch (IOException ex) {
			logger.debug("Error on multiUploadFileModel {}", ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Successfully uploaded!", HttpStatus.OK);

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

	@PutMapping("/updateSchool/{id}/{status}")
	public ResponseEntity<School> updateSchool(@PathVariable long id, @PathVariable String status) {
		System.out.println("Update school"+id+""+status);
		School school = schoolService.updateSchoolStatus(id, status);
		return ResponseEntity.ok().body(school);
	}

	/**
	 *
	 * @param school
	 * @param request
	 * @return
	 */
	@GetMapping("/getAllSchools")
	@ResponseBody
	public ResponseEntity<List<School>> getAll(@RequestBody(required = false) School school,
			HttpServletRequest request) {
		List<School> schools = schoolService.getAll();
		System.out.println("All schools---"+schools);
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

    @PostMapping("/school/saveDEOresponse")
    public ResponseEntity<?> saveDEoresponse(@ModelAttribute("regFormModel") SchoolRegFormModel regFormModel,HttpServletRequest request){
        try {
            System.out.println("..regFormModel.getPayload().."+regFormModel );
            DEOInfo deoInfo = new ObjectMapper().readValue(regFormModel.getPayload(), DEOInfo.class);
            if(regFormModel.getFiles() != null) {
                Map<String, byte[]> filesInBytes = WebUtilities
                        .convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()));
                long id = schoolService.saveDEOresponse(deoInfo, filesInBytes,imgPath);
            } else {
                long id = schoolService.saveDEOresponse(deoInfo, null, imgPath);
            }
        } catch (IOException ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Successfully uploaded!", HttpStatus.OK);
    }

	@PostMapping("/school/assignSchool/{schoolId}/{userId}")
	@Transactional
	public ResponseEntity<?> assignSchool(@PathVariable("schoolId") long schoolId,@PathVariable("userId") long userId) {
		System.out.println(schoolId+"---"+userId);
		userService.updateUserSchoolStatus(userId,schoolId);
		schoolService.updateSchoolStatusAndVolunteerId(schoolId,userId,"VOLUNTEER_ASSIGNED");
		return new ResponseEntity<>("Successfully uploaded!", HttpStatus.OK);
	}

	@PostMapping("/school/changeVolunteer/{schoolId}/{oldVolunteerId}/{newVolunteerId}")
	@Transactional
	public ResponseEntity<?> assignSchool(@PathVariable("schoolId") long schoolId,@PathVariable("oldVolunteerId") Long oldVolunteerId,@PathVariable("newVolunteerId") Long newVolunteerId) {
		userService.updateUserSchoolStatus(newVolunteerId,schoolId);
		userService.removeSchoolId(oldVolunteerId);
		schoolService.updateVolunteerId(schoolId,newVolunteerId);
		return new ResponseEntity<>("Successfully uploaded!", HttpStatus.OK);
	}
}