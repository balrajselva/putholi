package com.revamp.core.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.revamp.core.dao.FundAllotmentRepository;
import com.revamp.core.model.FundAllotment;
import com.revamp.core.model.InvoiceImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.core.dao.InvoiceRepository;
import com.revamp.core.model.Invoice;
import com.revamp.exception.InvoiceFileNotFoundException;
@Service
@Transactional(readOnly = true)
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	public InvoiceRepository repository;

	@Autowired
	public FundAllotmentRepository fundMasterRepository;

	@Override
	@Transactional
	public long save(Invoice invoice, Map<String, byte[]> files, String imgPath) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		if (files != null && files.size() > 0) {
			files.forEach((k,v) -> {
				Set<InvoiceImage> siSet = new HashSet<InvoiceImage>();
				String filePath = fileSubPath+ invoice.getId()+"_";
				InvoiceImage si = new InvoiceImage(filePath+k,v,invoice.getProofOfId().getComments());
				si.setInvoice(invoice);
				siSet.add(si);
				invoice.setInvoiceImages(siSet);
			});
		}

		repository.save(invoice);
		if (files != null && files.size() > 0) {
			this.saveImgToFS(imgPath,fileSubPath,invoice.getInvoiceImages());
		}
		return invoice.getId();
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

	@Override
	public long save(Invoice invoice) {
		return repository.save(invoice).getId();
	}

	@Override
	public void deleteQuotation(long invoiceId) {
		repository.deleteById(invoiceId);
	}

	@Override
	public List<Invoice> getInvoiceBySchoolId(long schoolId) {
		return repository.findBySchoolId(schoolId);
	}

	@Override
	@Transactional
	public void updateInvoiceAndFund(List<FundAllotment> fundAllotmentList, List<Invoice> invoiceList) {
		invoiceList.forEach(invoice -> {
			fundAllotmentList.forEach(fundMaster -> {
				if(Objects.equals(fundMaster.getRequirementId(),invoice.getRequirement().getRequirementId())){
					Invoice invoice1 = repository.findByInvoiceId(invoice.getId());
					invoice1.setFundMaster(fundMaster);
					repository.save(invoice1);
				}
			});
		});
	}

	@Override
	@Transactional
	public void updateStatus(Long invoiceId, Long userId, String status) {
		repository.updateStatus(invoiceId,status);
		repository.updateAdmin(invoiceId,userId);
	}

	private void saveImgToFS(String dirPath, String fileSubPath, Set<InvoiceImage> list) {
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


}
