package org.putholi.core.controller;

import org.putholi.core.model.SchoolImage;
import org.putholi.core.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;

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

	/**
	 * 
	 * @param request
	 * @param fileUpload
	 * @return
	 * @throws Exception
	 */
	//---Add new image---
	@RequestMapping(value = "/image", method = RequestMethod.POST)
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
	}

	//---Get a image by id---
	/**
	 * 
	 * @param imageId
	 * @return
	 */
	@RequestMapping(value = "/image/{id}", method = RequestMethod.GET)
	public ResponseEntity<SchoolImage> get(@PathVariable("id") long imageId) {
		SchoolImage image = imageService.get(imageId);
		return ResponseEntity.ok().body(image);
	}

}