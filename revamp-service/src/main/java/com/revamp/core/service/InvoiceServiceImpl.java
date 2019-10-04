package com.revamp.core.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.revamp.core.dao.InvoiceRepository;
import com.revamp.core.model.Invoice;
import com.revamp.exception.InvoiceFileNotFoundException;
import com.revamp.exception.InvoiceUploadException;
@Service
@Transactional(readOnly = true)
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	public InvoiceRepository repository;
    
	@Transactional
	public Invoice uploadInvoice(MultipartFile[] files ,Invoice invoice) {
		List<String> fileNames = new ArrayList<String>();
		try {

			List<Invoice> storedFile = new ArrayList<Invoice>();

		for (MultipartFile multiFile : files) {
				Invoice pinvoice = repository.findByName(multiFile.getOriginalFilename());

				if (pinvoice != null) {
					pinvoice.setFile(multiFile.getBytes());
				} else {
					pinvoice = new Invoice(multiFile.getOriginalFilename(), multiFile.getContentType(),
							multiFile.getBytes());

				}
				fileNames.add(multiFile.getOriginalFilename());
				storedFile.add(pinvoice);
		
			}
		    
			// Save to database

			repository.save(invoice);

		} catch (Exception ex) {
		    throw new InvoiceUploadException("File Upload Exception" + ex.getMessage());

		}
		return null;
	}

	@Override
	public Invoice getFile(long id) {
		 return repository.findById(id)
	                .orElseThrow(() -> new InvoiceFileNotFoundException("File not found with id " + id));
	    
	}

	@Override
	public List<Invoice> getAllInvoice() {
		// TODO Auto-generated method stub
		return (List<Invoice>) repository.findAll();
	}


}
