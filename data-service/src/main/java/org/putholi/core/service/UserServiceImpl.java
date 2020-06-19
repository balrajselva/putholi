package org.putholi.core.service;

import org.putholi.core.dao.UserRepository;
import org.putholi.core.model.IdentityProof;
import org.putholi.core.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public long save(User user, List<Map<String, byte[]>> files, String imgPath) {
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..UserServiceImpl.."+fileSubPath);
		long userId=userRepository.save(user).getUserid();
		if (files != null && files.size() > 0) {
			for(int i=0;i<files.size();i++) {
				files.get(i).forEach((k, v) -> {
					Set<IdentityProof> siSet = new HashSet<IdentityProof>();
					String filePath = fileSubPath + userId + "_";
					// Save image only in fileSystem
					this.saveImgToFS(imgPath, fileSubPath, v, filePath + k);
					IdentityProof id = new IdentityProof(filePath + k);
					id.setUser(user);
					siSet.add(id);
					user.setIdentityProof(siSet);
				});
			}
		}
		return userRepository.save(user).getUserid();
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

	@Transactional
	@Modifying
	public User updateUserStatus(long id, String status) {
		userRepository.updateUserStatus(id, status);
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public User updateUserSchoolStatus(long id, long schoolId) {
		userRepository.updateUserSchoolStatus(id, schoolId);
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public List<User> findAllVolunteers() {
		return userRepository.findAllVolunteers();
	}

	@Override
	public void removeSchoolId(Long oldVolunteerId) {
		userRepository.removeSchoolId(oldVolunteerId);
	}

	public User get(long id) {
		return userRepository.findById(id).orElse(null);
	}

	public User findByEmailAddress(String email) {
		return userRepository.findByEmailAddress(email);
	}

	public List<User> findAllUsers() {
		return (List<User>) userRepository.findAll();
	}

	@Override
	public void deleteUser(long id) {
		User user = userRepository.findById(id).orElse(null);
		if (user != null)
			userRepository.delete(user);
	}

	@Override
	public List<User> findByStatus(String status) {
		return userRepository.findByStatus(status);
	}

	@Override
	public User findByEmailAddressPassword(String emailAddress, String password) {
		return userRepository.findByEmailAddressPassword(emailAddress,password);
	}

	@Override
	public List<User> findByDistrict(String district) {
		return userRepository.findByDistrict(district);
	}

}
