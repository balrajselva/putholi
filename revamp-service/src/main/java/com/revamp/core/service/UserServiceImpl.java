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

import com.revamp.core.model.IdentityProof;
import com.revamp.core.model.SchoolImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.UserRepository;
import com.revamp.core.model.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public long save(User user, Map<String, byte[]> files, String imgPath) {
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..UserServiceImpl.."+fileSubPath);
		if (files != null && files.size() > 0) {

			files.forEach((k,v) -> {
				Set<IdentityProof> siSet = new HashSet<IdentityProof>();
				String filePath = fileSubPath+ user.getFirstName()+"_";
				IdentityProof id = new IdentityProof(filePath+k,v,user.getProofOfId().getComments());
				id.setUser(user);
				siSet.add(id);
				user.setIdentityProof(siSet);
			});
		}
		if (files != null && files.size() > 0) {
			this.saveImgToFS(imgPath,fileSubPath,user.getIdentityProof());
		}
		return userRepository.save(user).getUserid();
	}
	private void saveImgToFS(String dirPath, String fileSubPath, Set<IdentityProof> list) {
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
