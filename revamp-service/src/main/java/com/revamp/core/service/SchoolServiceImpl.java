package com.revamp.core.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.SchoolRepository;
import com.revamp.core.dao.UserRepository;
import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.Project;
import com.revamp.core.model.Requirement;
import com.revamp.core.model.School;
import com.revamp.core.model.SchoolImage;
import com.revamp.core.model.User;

@Service
@Transactional(readOnly = true)
public class SchoolServiceImpl implements SchoolService {

	@Autowired
	private SchoolRepository schoolRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Transactional
	public long save(final School school, Map<String, byte[]> files, String imgPath) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		school.setStatus(PuthuyirLookUp.SCHOOL_REGISTERED);
		files.forEach((k,v) -> {
			String filePath = fileSubPath+ school.getSchoolInfo().getSchoolName()+"_";
			SchoolImage si = new SchoolImage(filePath+k,v,school.getProofOfId().getComments());
			si.setSchool(school);
			school.getSchoolImages().add(si);
		});
		
		Set<Project> project = new HashSet<Project>();
		project.add(this.createDefaultProject(school));
		school.setProjects(project);
		
		//set user to the Requirement.
		this.setUser(school);
		
		schoolRepository.save(school);
		
		this.saveImgToFS(imgPath,fileSubPath,school.getSchoolImages());
		return school.getSchoolId();
	}
	
	private void setUser(School school) {
		//TODO: currently cd it is hard coded to User ID 2.
		User beneUser = this.userRepository.findById((long) 2).orElse(null);
	
		school.setUser(beneUser);
		school.getRequirements().forEach(req -> {
			req.setUser(beneUser);
			req.setStatus(PuthuyirLookUp.REQ_ADDED);
		});
	}
	
	private Project createDefaultProject(School school) {
		Project project = new Project();
		project.setEstimate(10000);
		project.setStatus(PuthuyirLookUp.PROJECT_CREATED);
		school.getRequirements().forEach(req -> req.setProject(project));
		project.setRequirements(new HashSet<Requirement>(school.getRequirements()));
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
	public School get(long id) {
		return schoolRepository.findById(id).orElse(null);
	}

	

}
