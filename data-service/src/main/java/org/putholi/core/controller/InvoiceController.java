package org.putholi.core.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.putholi.core.model.Invoice;
import org.putholi.core.model.Payload;
import org.putholi.core.model.SchoolRegFormModel;
import org.putholi.core.service.InvoiceService;
import org.putholi.core.web.util.WebUtilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

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
			if(regFormModel.getFiles() != null ) {
				Map<String, byte[]> filesInBytes = WebUtilities
						.convertMultiPartToBytes(Arrays.asList(regFormModel.getFiles()));
				Map<String, byte[]> postImageInBytes = null;
//				if(regFormModel.getPreImage() != null) {
//					postImageInBytes = WebUtilities
//							.convertMultiPartToBytes(regFormModel.getPostImage());
//				}
				 id = invoiceService.save(invoice, filesInBytes, postImageInBytes, imgPath);
			} else {
				 id = invoiceService.save(invoice, null, null, imgPath);
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

	@GetMapping("/invoice/requirement/{school_id}")
	public ResponseEntity<List<Invoice>> getInvoiceByRequrementid(@PathVariable("school_id") long schoolId) {
		return ResponseEntity.ok().body(invoiceService.getInvoiceByRequirementId(schoolId));
	}

	@DeleteMapping("/invoice/{id}")
	public ResponseEntity<String> deleteInvoice(@PathVariable("id") long invoiceId) {
		invoiceService.deleteQuotation(invoiceId);
		return new ResponseEntity<>("DELETE Response", HttpStatus.OK);
	}

	@PostMapping("/invoice/updateFund")
	public ResponseEntity<String> update(@RequestBody Payload payload) {
		invoiceService.updateInvoiceAndFund(payload.getFundMasterList(),payload.getInvoice());
        if(payload.getInvoice() != null && payload.getAdminComments()!=null) {
            invoiceService.updateAdminComments(payload.getInvoice().getId(), payload.getAdminComments());
        }
        if(payload.getInvoice() != null && payload.getApproverComments()!=null){
            invoiceService.updateApproverComments(payload.getInvoice().getId(), payload.getApproverComments());
        }
        if(payload.getInvoice() != null && payload.getReviewerComments()!=null){
            invoiceService.updateReviewerComments(payload.getInvoice().getId(), payload.getReviewerComments());
        }
		return new ResponseEntity<>("UPDATE Response", HttpStatus.OK);
	}

	@PostMapping("/invoice/status/{id}/{userId}/{status}")
	public ResponseEntity<String> update(@PathVariable("id") Long invoiceId,@PathVariable("userId") Long userId, @PathVariable("status") String status) {
		invoiceService.updateStatus(invoiceId,userId,status);
		return new ResponseEntity<>("UPDATE Response", HttpStatus.OK);
	}

	@PostMapping("/invoice/updateStatus")
	public ResponseEntity<String> updateStatus(@RequestBody Payload payload) {
		if(payload.getInvoiceId() != null && payload.getAdminComments() != null) {
			invoiceService.updateAdminComments(payload.getInvoiceId(), payload.getAdminComments());
		}
		if(payload.getInvoiceId() != null && payload.getApproverComments()!=null){
			invoiceService.updateApproverComments(payload.getInvoiceId(), payload.getApproverComments());
		}
		if(payload.getInvoiceId() != null &&payload.getReviewerComments()!=null){
			invoiceService.updateReviewerComments(payload.getInvoiceId(), payload.getReviewerComments());
		}
		return new ResponseEntity<>("UPDATE Response", HttpStatus.OK);
	}
}
