package org.putholi.core.service;

import org.putholi.core.dao.FundAllotmentRepository;
import org.putholi.core.dao.InvoiceRepository;
import org.putholi.core.dao.RequirementRepository;
import org.putholi.core.model.*;
import org.putholi.exception.InvoiceFileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional(readOnly = false)
public class InvoiceServiceImpl implements InvoiceService {

	@Value("${image.path}")
	private String imgPath;

	@Autowired
	public InvoiceRepository repository;

	@Autowired
	public RequirementRepository requirementRepository;

	@Autowired
	public FundAllotmentRepository fundMasterRepository;

	@Override
	@Transactional
	public long save(Invoice invoice, Map<String, byte[]> files, List<Map<String,byte[]>> postImage, String imgPath) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		Requirement requirement= requirementRepository.findById(invoice.getRequirement().getRequirementId()).get();
		if (files != null && files.size() > 0) {
			files.forEach((k,v) -> {
				Set<InvoiceImage> siSet = new HashSet<InvoiceImage>();
				String filePath = fileSubPath+ invoice.getId()+"_";
				this.saveImgToFS(imgPath,fileSubPath,v,filePath+k);
				InvoiceImage si = new InvoiceImage(filePath+k,null,invoice.getProofOfId().getComments());
				si.setInvoice(invoice);
				siSet.add(si);
				invoice.setInvoiceImages(siSet);
			});
		}
		if (postImage != null && postImage.size() > 0) {
			List<PostImage> siSet = new ArrayList<>();
			for (int i=0;i<postImage.size();i++) {
				postImage.get(i).forEach((k, v) -> {
					String filePath = fileSubPath + invoice.getId() + "_";
					this.saveImgToFS(imgPath, fileSubPath, v, filePath + k);
					PostImage si = new PostImage(filePath + k, null, invoice.getProofOfId().getComments());
					si.setInvoice(invoice);
					siSet.add(si);
				});
			}
			invoice.setPostImages(siSet);
		}

		// Invoice Status will be "INVOICE_IN_PROGRESS" in requirement table
		requirement.setInvoiceStatus("INVOICE_IN_PROGRESS");
		requirementRepository.save(requirement);

		// Save invoice
		repository.save(invoice);
		return invoice.getId();
	}

	@Override
	@Transactional
	public long saveReceipt(Invoice invoice, Map<String, byte[]> files) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		Requirement requirement= requirementRepository.findById(invoice.getRequirement().getRequirementId()).get();
		invoice= repository.findByInvoiceId(invoice.getId());
		if (files != null && files.size() > 0) {
			Invoice finalInvoice = invoice;
			files.forEach((k, v) -> {
				Set<Receipt> siSet = new HashSet<>();
				String filePath = fileSubPath+ finalInvoice.getId()+"_";
				this.saveImgToFS(imgPath,fileSubPath,v,filePath+k);
				Receipt si = new Receipt(filePath+k,null);
				si.setInvoice(finalInvoice);
				siSet.add(si);
				finalInvoice.setReceipts(siSet);
			});
		}

		// Save invoice
		repository.save(invoice);
		return invoice.getId();
	}


	@Override
	public Invoice getFile(long id) {
		Invoice invoice = repository.findById(id)
				.orElseThrow(() -> new InvoiceFileNotFoundException("File not found with id " + id));
		for(InvoiceImage invoiceImage: invoice.getInvoiceImages()){
			if(invoiceImage.getFilePath() != null) {
				invoiceImage.setImage(getImgFromFS(invoiceImage.getFilePath()));
			}
		}
		for(PostImage postImage:invoice.getPostImages()){
			postImage.setImage(getImgFromFS(postImage.getFilePath()));
		}
		for (Receipt receipt : invoice.getReceipts()) {
			if(receipt.getFilePath() != null) {
				receipt.setImage(getImgFromFS(receipt.getFilePath()));
			}
		}
		return invoice;
	}

	@Override
	public List<Invoice> getAllInvoice() {
		// TODO Auto-generated method stub
		List<Invoice> invoices = (List<Invoice>) repository.findAll();
		for(Invoice invoice:invoices) {
			for(InvoiceImage invoiceImage: invoice.getInvoiceImages()){
				if(invoiceImage.getFilePath() != null) {
					invoiceImage.setImage(getImgFromFS(invoiceImage.getFilePath()));
				}
			}
			for (PostImage postImage : invoice.getPostImages()) {
				postImage.setImage(getImgFromFS(postImage.getFilePath()));
			}
			for (Receipt receipt : invoice.getReceipts()) {
				if(receipt.getFilePath() != null) {
					receipt.setImage(getImgFromFS(receipt.getFilePath()));
				}
			}
		}
		return invoices;
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
		List<Invoice> invoices = repository.findBySchoolId(schoolId);
		for(Invoice invoice:invoices) {
			for(InvoiceImage invoiceImage: invoice.getInvoiceImages()){
				if(invoiceImage.getFilePath() != null) {
					invoiceImage.setImage(getImgFromFS(invoiceImage.getFilePath()));
				}
			}
			for (PostImage postImage : invoice.getPostImages()) {
				postImage.setImage(getImgFromFS(postImage.getFilePath()));
			}
			for (Receipt receipt : invoice.getReceipts()) {
				if(receipt.getFilePath() != null) {
					receipt.setImage(getImgFromFS(receipt.getFilePath()));
				}
			}
		}
		return invoices;
	}

	@Override
	public List<Invoice> getPaidInvoiceBySchoolId(long schoolId) {
		List<Invoice> invoices = repository.findPaidInvoiceBySchoolId(schoolId);
		for(Invoice invoice:invoices) {
			for(InvoiceImage invoiceImage: invoice.getInvoiceImages()){
				if(invoiceImage.getFilePath() != null) {
					invoiceImage.setImage(getImgFromFS(invoiceImage.getFilePath()));
				}
			}
			for (PostImage postImage : invoice.getPostImages()) {
				postImage.setImage(getImgFromFS(postImage.getFilePath()));
			}
			for (Receipt receipt : invoice.getReceipts()) {
				if(receipt.getFilePath() != null) {
					receipt.setImage(getImgFromFS(receipt.getFilePath()));
				}
			}
		}
		return invoices;
	}

    @Override
    public List<Invoice> getInvoiceByRequirementId(long requirementId) {
		List<Invoice> invoices = repository.findByRequirementId(requirementId);
		for(Invoice invoice:invoices) {
			for(InvoiceImage invoiceImage: invoice.getInvoiceImages()){
				if(invoiceImage.getFilePath() != null) {
					invoiceImage.setImage(getImgFromFS(invoiceImage.getFilePath()));
				}
			}
			for (PostImage postImage : invoice.getPostImages()) {
				postImage.setImage(getImgFromFS(postImage.getFilePath()));
			}
			for (Receipt receipt : invoice.getReceipts()) {
				if(receipt.getFilePath() != null) {
					receipt.setImage(getImgFromFS(receipt.getFilePath()));
				}
			}
		}
        return invoices;
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

	private void saveImgToFS(String dirPath, String fileSubPath, byte[] image,String filePath) {
		String tmpDirPath = dirPath+"\\"+fileSubPath;
		if(!Files.isDirectory(Paths.get(tmpDirPath))) {
			try {
				Files.createDirectories(Paths.get(tmpDirPath));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		Path path = Paths.get(dirPath+"\\"+filePath);

		try {
			Files.write(path, image);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}


	@Override
	public List<Invoice> findByInvoiceStatus(String invoiceStatus) {
		return repository.findByInvoiceStatus(invoiceStatus);
	}

	private byte[] getImgFromFS(String filePath) {
		Path path = Paths.get(imgPath+"\\"+filePath);
		try {
			return Files.readAllBytes(path);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
