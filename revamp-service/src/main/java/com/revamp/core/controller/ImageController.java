package com.revamp.core.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.revamp.core.model.SchoolImage;
import com.revamp.core.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.revamp.core.model.ImageDetails;
import com.revamp.core.service.ImageService;


/**
 * 
 * @author PuthirDevTeam
 *
 */
@RestController
public class ImageController {
	private final static Logger logger = LoggerFactory.getLogger(ImageController.class);
	
	@Autowired
	private ImageService imageService;
	
	private File uploadDirRoot;
	@Autowired
	ImageController(@Value("${image.path}") String uploadDir) {
        this.uploadDirRoot = new File(uploadDir);
    }

@PostMapping(value = "/uploadImages", consumes = { "multipart/form-data" })
	public ResponseEntity<String> writeMultiple(@RequestParam("files") MultipartFile[] files,
			@RequestParam("imguplmodule")final String imgUploadModule,
			@RequestParam("moduleid")final String moduleId,
			HttpServletRequest request) throws Exception {
		System.out.println("..imguplmodule...."+imgUploadModule);
		System.out.println("..boid...."+moduleId);
		List<ImageDetails> imgDetails = new ArrayList<>();
		Arrays.asList(files).stream().forEach(file -> {
			File fileForEmployee;

			try {
				fileForEmployee = uploadPath(file,imgUploadModule, moduleId);
				ImageDetails imgDet = new ImageDetails();
				imgDet.setFilePath(fileForEmployee.getAbsolutePath());
				imgDet.setModule(imgUploadModule);
				imgDet.setModuleId(Long.valueOf(moduleId));
				imgDetails.add(imgDet);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}

			try (InputStream in = file.getInputStream(); OutputStream out = new FileOutputStream(fileForEmployee)) {
				FileCopyUtils.copy(in, out);
			} catch (IOException ex) {
				throw new RuntimeException(ex);
			}
		});
		imageService.save(imgDetails);
		return new ResponseEntity<String>("Image Uploaded Successfully", HttpStatus.OK);
	}
	

    private File uploadPath(MultipartFile file, String imgUploadModule, String moduleId) throws IOException 
    {
    	String directory = this.uploadDirRoot.getPath()+"\\"+imgUploadModule+"\\"+moduleId;
    	
        File uploadPath = Paths.get(directory).toFile();
        if(uploadPath.exists() == false) {
            uploadPath.mkdirs();
        }
        System.out.println("AbsolutePath...."+uploadPath.getAbsolutePath());
        System.out.println("File...."+file.getOriginalFilename());
        
        File imgFile = new File(directory, file.getOriginalFilename());
        return imgFile;
        
    }


	/**
	 * 
	 * @param request
	 * @param fileUpload
	 * @return
	 * @throws Exception
	 */
	//---Add new image---
/*	@RequestMapping(value = "/image", method = RequestMethod.POST)
	public ResponseEntity<?> save(HttpServletRequest request, @RequestParam CommonsMultipartFile[] fileUpload)
			throws Exception {

		if (fileUpload != null && fileUpload.length > 0) {
			for (CommonsMultipartFile aFile : fileUpload) {

				SchoolImage uploadFile = new SchoolImage();
				// uploadFile.setImage(aFile.getBytes());
				long id = imageService.save(uploadFile);
				uploadFile.setImageId(id);
				// uploadFile.setImage(null);
				return ResponseEntity.ok().body(uploadFile);
			}
		}

		return ResponseEntity.badRequest().body(null);
	}*/

	//---Get a image by id---
	/**
	 * 
	 * @param imageId
	 * @return
	 */
/*	@RequestMapping(value = "/image/{id}", method = RequestMethod.GET)
	public ResponseEntity<SchoolImage> get(@PathVariable("id") long imageId) {
		SchoolImage image = imageService.get(imageId);
		return ResponseEntity.ok().body(image);
	}*/

}