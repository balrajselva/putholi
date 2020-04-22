package com.revamp.core.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Paths;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.revamp.core.payload.TrackDonationResponsePayLoad;
import com.revamp.core.service.DonationService;

@RestController
public class TrackDonationController {

	@Autowired
	private DonationService donationService;
	
	private File uploadDirRoot;
	 
    @Autowired
    TrackDonationController(@Value("${image.path}") String uploadDir) {
        this.uploadDirRoot = new File(uploadDir);
    }

	@GetMapping("/donation/{trackid}")
	public ResponseEntity<TrackDonationResponsePayLoad> getDonation(@PathVariable("trackid") String trackId) {
		TrackDonationResponsePayLoad payLoad = donationService.findMyDonation(trackId);
		return new ResponseEntity<TrackDonationResponsePayLoad>(payLoad, HttpStatus.OK);
	}

	/*
	 * @PostMapping(value = "/uploadImages", consumes = { "multipart/form-data" })
	 * public ResponseEntity<String> writeMultiple(@RequestParam("files")
	 * MultipartFile[] files,
	 * 
	 * @RequestParam("imguplmodule") String imgUploadModule,
	 * 
	 * @RequestParam("boid") String boId, HttpServletRequest request) throws
	 * Exception { System.out.println("..imguplmodule...."+imgUploadModule);
	 * System.out.println("..boid...."+boId);
	 * 
	 * Arrays.asList(files).stream().forEach(file -> { File fileForEmployee;
	 * 
	 * try { fileForEmployee = uploadPath(file); } catch (IOException e) { throw new
	 * RuntimeException(e); }
	 * 
	 * try (InputStream in = file.getInputStream(); OutputStream out = new
	 * FileOutputStream(fileForEmployee)) { FileCopyUtils.copy(in, out); } catch
	 * (IOException ex) { throw new RuntimeException(ex); } }); // return
	 * ResponseEntity.ok().build(); return new
	 * ResponseEntity<String>("Image Uploaded Successfully", HttpStatus.OK); }
	 * 
	 *
	 * private File uploadPath(MultipartFile file) throws IOException { File
	 * uploadPath = Paths.get(this.uploadDirRoot.getPath()).toFile();
	 * if(uploadPath.exists() == false) { uploadPath.mkdirs(); }
	 * System.out.println("AbsolutePath...."+uploadPath.getAbsolutePath());
	 * System.out.println("File...."+file.getOriginalFilename()); return new
	 * File(uploadPath.getAbsolutePath(), file.getOriginalFilename()); }
	 */
}
