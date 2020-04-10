package com.revamp.core.controller;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.revamp.core.model.*;
import com.revamp.core.web.util.WebUtilities;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revamp.core.service.InvoiceService;

/**
 * 
 * @author Puthuyir Dev Team
 *
 */
@RestController
public class InvoiceController {

	private static final Logger logger = LoggerFactory.getLogger(SchoolController.class);

	@Value("${image.path}")
	private String imgPath;

	@Autowired
	private InvoiceService invoiceService;
	
	@PostMapping(value = "/invoiceUpload")
	public ResponseEntity<?> invoiceUploadFile(@ModelAttribute("regFormModel") SchoolRegFormModel regFormModel,
													 HttpServletRequest request) {
		long id;
		try {
			System.out.println("..regFormModel.getPayload().."+regFormModel );
			Invoice invoice = new ObjectMapper().readValue(regFormModel.getPayload(), Invoice.class);
			System.out.println(invoice);
			if(regFormModel.getFiles() != null && regFormModel.getFiles().length > 0) {
				Map<String, byte[]> filesInBytes = WebUtilities
						.convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()));
				 id = invoiceService.save(invoice, filesInBytes,imgPath);
			} else {
				 id = invoiceService.save(invoice, null, imgPath);
			}
		} catch (IOException ex) {
			logger.debug("Error on multiUploadFileModel {}", ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(id, HttpStatus.OK);
	}

	@GetMapping("/downloadFile/{fileId}")
	public void downloadFile(@PathVariable Long fileId) {
		// Load file from database ResponseEntity<Resource>
		Invoice dbFile = invoiceService.getFile(fileId);

//		return ResponseEntity.ok().contentType(MediaType.parseMediaType(dbFile.getMimeType()))
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getName() + "\"")
//				.body(new ByteArrayResource(dbFile.getFile()));
	}

	/**
	 * 
	 * @return List
	 */
	@GetMapping("/invoice")
	public List<Invoice> getAllInvoice() {
		return invoiceService.getAllInvoice();
	}

	@PostMapping("/invoice")
	public ResponseEntity<Invoice> setInvoice(@RequestBody Invoice invoice) {
		long id = invoiceService.save(invoice);
		invoice.setId(id);
		return ResponseEntity.ok().body(invoice);
	}

	@GetMapping("/invoice/{school_id}")
	public ResponseEntity<List<Invoice>> getAllInvoice(@PathVariable("school_id") long schoolId) {
		return ResponseEntity.ok().body(invoiceService.getInvoiceBySchoolId(schoolId));
	}

	@DeleteMapping("/invoice/{id}")
	public ResponseEntity<String> deleteInvoice(@PathVariable("id") long invoiceId) {
		invoiceService.deleteQuotation(invoiceId);
		return new ResponseEntity<>("DELETE Response", HttpStatus.OK);
	}

	@PostMapping("/invoice/updateFund")
	public ResponseEntity<String> update(@RequestBody Payload payload) {
		invoiceService.updateInvoiceAndFund(payload.getFundMasterList(),payload.getInvoiceList());
		return new ResponseEntity<>("UPDATE Response", HttpStatus.OK);
	}
}
