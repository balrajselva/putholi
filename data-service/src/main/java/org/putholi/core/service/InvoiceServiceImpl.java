package org.putholi.core.service;

import org.putholi.core.dao.FundAllotmentRepository;
import org.putholi.core.dao.InvoiceRepository;
import org.putholi.core.dao.RequirementRepository;
import org.putholi.core.model.*;
import org.putholi.exception.InvoiceFileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@Service
@Transactional(readOnly = false)
public class InvoiceServiceImpl implements InvoiceService {

	@Autowired
	public InvoiceRepository repository;

	@Autowired
	public RequirementRepository requirementRepository;

	@Autowired
	public FundAllotmentRepository fundMasterRepository;

	@Override
	@Transactional
	public long save(Invoice invoice, Map<String, byte[]> files, Map<String,byte[]> postImage, String imgPath) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		Requirement requirement= requirementRepository.findById(invoice.getRequirement().getRequirementId()).get();
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
		if (postImage != null && postImage.size() > 0) {
			postImage.forEach((k,v) -> {
				Set<PostImage> siSet = new HashSet<>();
				String filePath = fileSubPath+ invoice.getId()+"_";
				PostImage si = new PostImage(filePath+k,v,invoice.getProofOfId().getComments());
				si.setInvoice(invoice);
				siSet.add(si);
				invoice.setPostImages(siSet);
			});
		}

		// Invoice Status will be "INVOICE_IN_PROGRESS" in requirement table
		requirement.setInvoiceStatus("INVOICE_IN_PROGRESS");
		requirementRepository.save(requirement);

		// Save invoice
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
    public List<Invoice> getInvoiceByRequirementId(long requirementId) {
        return repository.findByRequirementId(requirementId);
    }

    @Override
	@Transactional
	public void updateInvoiceAndFund(FundAllotment fundAllotment, Invoice invoice) {
		Invoice invoice1 = repository.findByInvoiceId(invoice.getId());
		invoice1.setFundMaster(fundAllotment);
		repository.save(invoice1);
		fundMasterRepository.save(fundAllotment);
	}

	@Override
	@Transactional
	public void updateStatus(Long invoiceId, Long userId, String status) {
		repository.updateStatus(invoiceId,status);
		repository.updateAdmin(invoiceId,userId);
	}

    @Override
    public void updateAdminComments(long invoiceId, String adminComments) {
        repository.updateAdminComments(invoiceId,adminComments);
    }

    @Override
    public void updateApproverComments(long invoiceId, String approverComments) {
        repository.updateApproverComments(invoiceId,approverComments);
    }

    @Override
    public void updateReviewerComments(long invoiceId, String reviewerComments) {
        repository.updateReviewerComments(invoiceId,reviewerComments);
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


	@Override
	public List<Invoice> findByInvoiceStatus(String invoiceStatus) {
		return repository.findByInvoiceStatus(invoiceStatus);
	}


}
