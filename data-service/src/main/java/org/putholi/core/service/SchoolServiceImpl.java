package org.putholi.core.service;

import org.putholi.core.dao.DEORepository;
import org.putholi.core.dao.ProjectRepository;
import org.putholi.core.dao.SchoolRepository;
import org.putholi.core.dao.UserRepository;
import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static java.sql.Types.NULL;

@Service
@Transactional
public class SchoolServiceImpl implements SchoolService {

	@Value("${image.path}")
	private String imgPath;

	@Autowired
	private SchoolRepository schoolRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DEORepository deoRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Transactional
	public long save(final School school, List<Map<String, byte[]>> files) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		school.setSchoolStatus("SCHOOL_REGISTERED");
		if (files != null && files.size() > 0) {
			List<SchoolImage> siSet = new ArrayList<>();
			for(int i=0;i<files.size();i++) {
				files.get(i).forEach((k, v) -> {
					String filePath = fileSubPath + school.getSchoolId() + "_";
					this.saveImgToFS(imgPath, fileSubPath, v, filePath + k);
					SchoolImage si = new SchoolImage(filePath + k, school.getProofOfId().getComments());
					si.setSchool(school);
					siSet.add(si);
				});
			}
			school.setSchoolImages(siSet);
		}
		
		Set<Project> project = new HashSet<Project>();
		project.add(this.createDefaultProject(school));
		school.setProjects(project);
		
		//set user to the Requirement.
		this.setUser(school);
		schoolRepository.save(school);
		return school.getSchoolId();
	}
	
	private void setUser(School school) {
		User beneUser = this.userRepository.findById(school.getUser().getUserid()).orElse(null);
		school.setUser(beneUser);
		school.getRequirements().forEach(req -> {
			req.setUser(beneUser);
			req.setStatus("REQ_ADDED");
		});
	}
	
	private Project createDefaultProject(School school) {
		Project project = new Project();
		project.setEstimate(10000);
		project.setStatus(PuthuyirLookUp.PROJECT_CREATED);
		school.getRequirements().forEach(req -> req.setProject(project));
		project.setRequirements(new ArrayList<Requirement>(school.getRequirements()));
		project.setSchool(school);
		return project;
	}

	@Override
	public List<School> getAll() {
		return getImageForSchoolList((List<School>) schoolRepository.findAll());
	}

	@Override
	public List<School> getAllByCity(String cityId) {
		return getImageForSchoolList(schoolRepository.findByAddressCity(cityId));
	}

	@Override
	public List<School> getAllByDistrict(String districtId) {
		return getImageForSchoolList(schoolRepository.findByAddressDistrict(districtId));
	}

	@Override
	public List<School> getAllByLocality(String localityId) {
		List<School> school = schoolRepository.findByAddressLocality(localityId);
		return getImageForSchoolList(school);
	}
	
	@Override
	public List<School> getByUserId(long userId) {
		List<School> school = schoolRepository.getByUserId(userId);
		return getImageForSchoolList(school);
	}

	@Override
	public long saveDEOresponse(final DEOInfo deoInfo, Map<String, byte[]> files, String imgPath) {
		String status=PuthuyirLookUp.valueOf(deoInfo.getStatus()).toString();
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		schoolRepository.updateSchoolStatus(deoInfo.getSchool_id(), status);
		if (files != null && files.size() > 0) {
			files.forEach((k,v) -> {
				Set<DEOfile> siSet = new HashSet<DEOfile>();
				String filePath = fileSubPath+ deoInfo.getDeoInfoId()+"_";
				DEOfile si = new DEOfile(v);
				si.setDeoInfo(deoInfo);
				siSet.add(si);
				deoInfo.setDeoFile(siSet);
			});
		}
		deoRepository.save(deoInfo);
		return deoInfo.getDeoInfoId();
	}

	@Override
	@Transactional
	public School updateSchoolStatus(long id, String status) {
		schoolRepository.updateSchoolStatus(id, status);
		School school = schoolRepository.findBySchoolId(id);
		if(status.equals("OPEN_FOR_REQUIREMENTS")){
			userRepository.updateUserSchoolStatus(school.getVolunteerId(), NULL);
			schoolRepository.updateSchoolStatusAndVolunteerId(id,status, (long) NULL);
		}
		else{
			schoolRepository.updateSchoolStatus(id, status);
		}
		return getImageForSchool(schoolRepository.findById(id).orElse(null));
	}

	@Override
	@Transactional
	public School updateVolunteerId(long id, Long volunteerId) {
		schoolRepository.updateVolunteerId(id,volunteerId);
		School school = schoolRepository.findById(id).orElse(null);
		projectRepository.updateVolunteerId(id,volunteerId);
		return getImageForSchool(school);
	}

	@Transactional
	public School updateSchoolStatusAndVolunteerId(long id, Long volunteerId, String status) {
		schoolRepository.updateSchoolStatusAndVolunteerId(id, status, volunteerId);
		projectRepository.updateVolunteerId(id,volunteerId);
		return getImageForSchool(schoolRepository.findById(id).orElse(null));
	}

	@Override
	@Transactional
	public long addRequirement(School school) {
		School schoolFromDB=schoolRepository.findBySchoolId(school.getSchoolId());
		Set<Project> project = schoolFromDB.getProjects();
		project.add(this.createDefaultProject(school));
		schoolFromDB.setProjects(project);
		schoolFromDB.setRequirements(school.getRequirements());
		this.setUser(schoolFromDB);
		schoolRepository.save(schoolFromDB);
		schoolRepository.updateSchoolStatus(schoolFromDB.getSchoolId(),PuthuyirLookUp.SCHOOL_REGISTERED.name());
		return schoolFromDB.getSchoolId();
	}

	@Override
	public School get(long id) {
		return getImageForSchool(schoolRepository.findById(id).orElse(null));
	}

	private void saveImgToFS(String dirPath, String fileSubPath, byte[] image,String filePath) {
		String tmpDirPath = dirPath+"\\"+fileSubPath;
		if(!Files.isDirectory(Paths.get(tmpDirPath))) {
			try {
				Files.createDirectories(Paths.get(tmpDirPath));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		Path path = Paths.get(dirPath+"\\"+filePath);
		try {
			Files.write(path, image);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private byte[] getImgFromFS(String filePath) {
		Path path = Paths.get(imgPath+"\\"+filePath);
		try {
			return Files.readAllBytes(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	private List<School> getImageForSchoolList(List<School> schools){
		schools.forEach(schoolTemp -> {
			for (SchoolImage schoolImage : schoolTemp.getSchoolImages()) {
				schoolImage.setImage(getImgFromFS(schoolImage.getFilePath()));
			}

			//Remove closed projects from the school
			Set<Project> project = new HashSet<>();
			for(Project projectTemp:schoolTemp.getProjects()){
				if(projectTemp.getStatus().equals(PuthuyirLookUp.PROJECT_CLOSED)){
					continue;
				}
				else{
					project.add(projectTemp);
					schoolTemp.setProjects(project);
					break;
				}
			}

		});

		return schools;
	}

	private School getImageForSchool(School school){
		for (SchoolImage schoolImage : school.getSchoolImages()) {
			schoolImage.setImage(getImgFromFS(schoolImage.getFilePath()));
		}
		//Remove closed projects from the school
		Set<Project> project = new HashSet<>();
		for(Project projectTemp:school.getProjects()){
			if(projectTemp.getStatus().equals(PuthuyirLookUp.PROJECT_CLOSED)){
				continue;
			}
			else{
				project.add(projectTemp);
				school.setProjects(project);
				break;
			}
		}
		return school;
	}
}
