package org.putholi.core.service;

import org.putholi.core.dao.UserRepository;
import org.putholi.core.model.IdentityProof;
import org.putholi.core.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Value("${image.path}")
	private String imgPath;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public long save(User user, List<Map<String, byte[]>> files, String imgPath) {
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..UserServiceImpl.."+fileSubPath);
		long userId=userRepository.save(user).getUserid();
		if (files != null && files.size() > 0) {
			List<IdentityProof> siSet = new ArrayList<>();
			for(int i=0;i<files.size();i++) {
				files.get(i).forEach((k, v) -> {
					String filePath = fileSubPath + userId + "_";
					// Save image only in fileSystem
					this.saveImgToFS(imgPath, fileSubPath, v, filePath + k);
					IdentityProof id = new IdentityProof(filePath + k);
					id.setUser(user);
					siSet.add(id);
				});
			}
			user.setIdentityProof(siSet);
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
		User user = userRepository.findById(id).orElse(null);
		if(Objects.nonNull(user)) {
			for (IdentityProof identityProof : user.getIdentityProof()) {
				identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
			}
		}
		return user;
	}

	@Override
	public User updateUserSchoolStatus(long id, long schoolId) {
		userRepository.updateUserSchoolStatus(id, schoolId);
		User user = userRepository.findById(id).orElse(null);
		if(Objects.nonNull(user)) {
			for (IdentityProof identityProof : user.getIdentityProof()) {
				identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
			}
		}
		return user;
	}

	@Override
	public List<User> findAllVolunteers() {
		List<User> userList= userRepository.findAllVolunteers();
		if(Objects.nonNull(userList)) {
			for (User user : userList) {
				for (IdentityProof identityProof : user.getIdentityProof()) {
					identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
				}
			}
		}
		return userList;
	}

	@Override
	public void removeSchoolId(Long oldVolunteerId) {
		userRepository.removeSchoolId(oldVolunteerId);
	}

	public User get(long id) {
		User user = userRepository.findById(id).orElse(null);
		if(Objects.nonNull(user)) {
			for (IdentityProof identityProof : user.getIdentityProof()) {
				identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
			}
		}
		return user;
	}

	public User findByEmailAddress(String email) {
		User user = userRepository.findByEmailAddress(email);
		if(Objects.nonNull(user)) {
			for (IdentityProof identityProof : user.getIdentityProof()) {
				identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
			}
		}
		return user;
	}

	public List<User> findAllUsers() {
		List<User> userList= (List<User>) userRepository.findAll();
		if(Objects.nonNull(userList)) {
			for (User user : userList) {
				for (IdentityProof identityProof : user.getIdentityProof()) {
					identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
				}
			}
		}
		return userList;
	}

	@Override
	public void deleteUser(long id) {
		User user = userRepository.findById(id).orElse(null);
		if (user != null)
			userRepository.delete(user);
	}

	@Override
	public List<User> findByStatus(String status) {
		List<User> userList= userRepository.findByStatus(status);
		if(Objects.nonNull(userList)) {
			for (User user : userList) {
				for (IdentityProof identityProof : user.getIdentityProof()) {
					identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
				}
			}
		}
		return userList;
	}

	@Override
	public User findByEmailAddressPassword(String imgPath, String emailAddress, String password) {
		User user = userRepository.findByEmailAddressPassword(emailAddress,password);
		if(Objects.nonNull(user)) {
			for (IdentityProof identityProof : user.getIdentityProof()) {
				identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
			}
		}
		return user;
	}

	@Override
	public List<User> findByDistrict(String district) {
		List<User> userList= userRepository.findByDistrict(district);
		if(Objects.nonNull(userList)) {
			for (User user : userList) {
				for (IdentityProof identityProof : user.getIdentityProof()) {
					identityProof.setImage(getImgFromFS(identityProof.getFilePath()));
				}
			}
		}
		return userList;

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
}
