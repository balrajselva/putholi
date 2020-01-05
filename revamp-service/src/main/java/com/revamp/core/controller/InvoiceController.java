package com.revamp.core.controller;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revamp.core.model.FundAllotment;
import com.revamp.core.model.Invoice;
import com.revamp.core.service.InvoiceService;

/**
 * 
 * @author Puthuyir Dev Team
 *
 */
@RestController
public class InvoiceController {

	@Autowired
	private InvoiceService invoiceService;

	/**
	 * 
	 * @param invoice
	 * @param files
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	@RequestMapping(method = RequestMethod.POST, value = "/invoiceUpload")
	public ResponseEntity<Invoice> invoiceUploadFile(@RequestParam("invoice") String invoice,
			@RequestParam("files") MultipartFile[] files) throws JsonParseException, JsonMappingException, IOException {
		final Invoice invoiceObject = new ObjectMapper().readValue(invoice, Invoice.class);
		// To check the Object
		if (invoiceObject != null) {
			invoiceService.uploadInvoice(files, invoiceObject);
		}
		return new ResponseEntity("Successfully uploaded!", HttpStatus.OK);

	}

	@GetMapping("/downloadFile/{fileId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
		// Load file from database
		Invoice dbFile = invoiceService.getFile(fileId);

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(dbFile.getMimeType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getName() + "\"")
				.body(new ByteArrayResource(dbFile.getFile()));
	}

	/**
	 * 
	 * @return List
	 */
	@GetMapping("/invoice")
	public List<Invoice> getAllInvoice() {
		return invoiceService.getAllInvoice();
	}

}
