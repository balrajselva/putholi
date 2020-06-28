package org.putholi.core.service;

import org.putholi.core.dao.DEORepository;
import org.putholi.core.dao.ProjectRepository;
import org.putholi.core.dao.SchoolRepository;
import org.putholi.core.dao.UserRepository;
import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	@Autowired
	private SchoolRepository schoolRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DEORepository deoRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Transactional
	public long save(final School school, Map<String, byte[]> files, String imgPath) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		school.setSchoolStatus("SCHOOL_REGISTERED");
		if (files != null && files.size() > 0) {
			files.forEach((k,v) -> {
				Set<SchoolImage> siSet = new HashSet<SchoolImage>();
				String filePath = fileSubPath+ school.getSchoolInfo().getSchoolName()+"_";
				SchoolImage si = new SchoolImage(filePath+k,v,school.getProofOfId().getComments());
				si.setSchool(school);
				siSet.add(si);
				school.setSchoolImages(siSet);
			});
		}
		
		Set<Project> project = new HashSet<Project>();
		project.add(this.createDefaultProject(school));
		school.setProjects(project);
		
		//set user to the Requirement.
		this.setUser(school);
		
		schoolRepository.save(school);
		if (files != null && files.size() > 0) {
			this.saveImgToFS(imgPath,fileSubPath,school.getSchoolImages());
		}
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
	
	private void saveImgToFS(String dirPath, String fileSubPath, Set<SchoolImage> list) {
		list.forEach(schoolImg -> {
			String tmpDirPath = dirPath+"\\"+fileSubPath;
			if(!Files.isDirectory(Paths.get(tmpDirPath))) {
				try {
					Files.createDirectories(Paths.get(tmpDirPath));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
			Path path = Paths.get(dirPath+"\\"+schoolImg.getFilePath());
			
			
            try {
				Files.write(path, schoolImg.getImage());
			} catch (IOException e) {
				e.printStackTrace();
			}
		});
	}



	@Override
	public List<School> getAll() {
		return (List<School>) schoolRepository.findAll();
	}

	@Override
	public List<School> getAllByCity(String cityId) {
		return schoolRepository.findByAddressCity(cityId);
	}

	@Override
	public List<School> getAllByDistrict(String districtId) {
		return schoolRepository.findByAddressDistrict(districtId);
	}

//	@Override
//	public List<School> getAllByName(String contains) {
//		return schoolRepository.getAllByName(contains);
//	}

	@Override
	public List<School> getAllByLocality(String localityId) {
		return schoolRepository.findByAddressLocality(localityId);
	}
	
	@Override
	public List<School> getByUserId(long userId) {
		return schoolRepository.getByUserId(userId);
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
		School school = schoolRepository.findBySchoolId(id);
		if(status == "OPEN_FOR_REQUIREMENTS"){
			userRepository.updateUserSchoolStatus(school.getVolunteerId(), NULL);
			schoolRepository.updateSchoolStatusAndVolunteerId(id,status,school.getVolunteerId());
		}
		else{
			schoolRepository.updateSchoolStatus(id, status);
		}
		return schoolRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public School updateVolunteerId(long id, Long volunteerId) {
		schoolRepository.updateVolunteerId(id,volunteerId);
		projectRepository.updateVolunteerId(id,volunteerId);
		return schoolRepository.findById(id).orElse(null);
	}

	@Transactional
	public School updateSchoolStatusAndVolunteerId(long id, Long volunteerId, String status) {
		schoolRepository.updateSchoolStatusAndVolunteerId(id, status, volunteerId);
		projectRepository.updateVolunteerId(id,volunteerId);
		return schoolRepository.findById(id).orElse(null);
	}

	@Override
	public School get(long id) {
		return schoolRepository.findById(id).orElse(null);
	}

	

}
