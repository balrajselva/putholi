package org.putholi.core.service;

import org.putholi.core.dao.*;
import org.putholi.core.lookup.PuthuyirLookUp;
import org.putholi.core.model.*;
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
@Transactional
public class QuotationServiceImpl implements QuotationService {

	@Value("${image.path}")
	private String imgPath;

	@Autowired
	private final QuotationRepository quotationRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private SchoolRepository schoolRepository;

	@Autowired
	private RequirementRepository requirementRepository;

	@Autowired
	private ImageRepository imageRepository;

	QuotationServiceImpl(QuotationRepository quotationRepository) {
		this.quotationRepository = quotationRepository;
	}

	@Override
	public Quotation getQuotation(long id) {
		Quotation quotation = quotationRepository.findById(id).get();
		quotation.setRequirement(requirementRepository.findById(quotation.getRequirementId()).get());
		for(QuotationImage quotationImage: quotation.getQuotationImages()){
			if(quotationImage.getFilePath() != null) {
				quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
			}
		}
		for(PreImage preImage: quotation.getRequirement().getPreImages()){
				preImage.setImage(getImgFromFS(preImage.getFilePath()));
			}
		return quotation;
	}

	@Override
	public List<Quotation> getQuotations() {
		List<Quotation> quotations = (List<Quotation>) quotationRepository.findAll();
		for (Quotation quotation1 : quotations) {
			quotation1.setRequirement(requirementRepository.findById(quotation1.getRequirementId()).get());
			for(QuotationImage quotationImage: quotation1.getQuotationImages()){
				if(quotationImage.getFilePath() != null) {
					quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
				}
			}
			for(PreImage preImage: quotation1.getRequirement().getPreImages()){
				preImage.setImage(getImgFromFS(preImage.getFilePath()));
			}
		}
		return quotations;
	}

	@Override
	public long save(Quotation quotation) {
		return quotationRepository.save(quotation).getQuotationId();
	}

	@Override
	public void deleteQuotation(long id) {
		quotationRepository.deleteById(id);
	}

	@Override
	public List<Quotation> findByQuotationStatus(String quotationStatus) {
		List<Quotation> quotations = quotationRepository.findByQuotationStatus(quotationStatus);
		for (Quotation quotation1 : quotations) {
			quotation1.setRequirement(requirementRepository.findById(quotation1.getRequirementId()).get());
			for(QuotationImage quotationImage: quotation1.getQuotationImages()){
				if(quotationImage.getFilePath() != null) {
					quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
				}
			}
			for(PreImage preImage: quotation1.getRequirement().getPreImages()){
				preImage.setImage(getImgFromFS(preImage.getFilePath()));
			}
		}
		return quotations;
	}

	@Override
	public List<Quotation> findBySchoolId(long schoolId) {
		List<Quotation> quotations = quotationRepository.findBySchoolId(schoolId);
		for (Quotation quotation1 : quotations) {
			quotation1.setRequirement(requirementRepository.findById(quotation1.getRequirementId()).get());
			for(QuotationImage quotationImage: quotation1.getQuotationImages()){
				if(quotationImage.getFilePath() != null) {
					quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
				}
			}
			for(PreImage preImage: quotation1.getRequirement().getPreImages()){
				if(preImage.getFilePath() != null) {
					preImage.setImage(getImgFromFS(preImage.getFilePath()));
				}
			}
		}
		return quotations;
	}

	@Override
	public List<Quotation> findByRequirementId(long requirementId) {
		List<Quotation> quotations = quotationRepository.findByRequirementId(requirementId);
		for (Quotation quotation1 : quotations) {
			quotation1.setRequirement(requirementRepository.findById(quotation1.getRequirementId()).get());
			for(QuotationImage quotationImage: quotation1.getQuotationImages()){
				if(quotationImage.getFilePath() != null) {
					quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
				}
			}
			for(PreImage preImage: quotation1.getRequirement().getPreImages()){
				preImage.setImage(getImgFromFS(preImage.getFilePath()));
			}
		}
		return quotations;
	}

	@Override
	public List<Quotation> findBySchoolIdAndRequirementId(long schoolId, long requirementId) {
		List<Quotation> quotations = quotationRepository.findBySchoolIdAndRequirementId(schoolId, requirementId);
		for (Quotation quotation1 : quotations) {
			quotation1.setRequirement(requirementRepository.findById(quotation1.getRequirementId()).get());
			for(QuotationImage quotationImage: quotation1.getQuotationImages()){
				if(quotationImage.getFilePath() != null) {
					quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
				}
			}
			for(PreImage preImage: quotation1.getRequirement().getPreImages()){
				preImage.setImage(getImgFromFS(preImage.getFilePath()));
			}
		}
		return quotations;
	}

	@Override
	@Transactional
	public Boolean updateQuotation(UpdateQuotation updateQuotation) {
		Boolean isUpdated=true;
		for(Quotation quotation:updateQuotation.getQuotations()) {
			int i=quotationRepository.updateQuotationStatus(quotation.getQuotationId(), PuthuyirLookUp.QUOTATION_ACCEPTED.name());
			requirementRepository.updateRequirementEstimate(quotation.getRequirementId(),Integer.valueOf(quotation.getTotalAmount()));
		}
		if(isUpdated==true){
			schoolRepository.updateSchoolStatus(updateQuotation.getQuotations().get(0).getSchoolId(),PuthuyirLookUp.ADMIN_APPROVED_QUOTATION.name());
			School school=schoolRepository.findBySchoolId(updateQuotation.getQuotations().get(0).getSchoolId());
			projectRepository.updateProject(school.getProjects().iterator().next().getProjectId(),PuthuyirLookUp.ADMIN_APPROVED_QUOTATION,Integer.valueOf(updateQuotation.getTotalAmount()),updateQuotation.getAdminComments());
			requirementRepository.updateRequirementStatus(school.getProjects().iterator().next().getProjectId(),PuthuyirLookUp.ADMIN_APPROVED_QUOTATION.name());
		}
		return isUpdated;
	}

	@Override
	public void updateSelectedQuotation(UpdateQuotation updateQuotation) {
		String status =null;
		switch (updateQuotation.getStatus()) {
			case "ReviewerConfirmed":
				status = PuthuyirLookUp.REVIEWER_APPROVED_QUOTATION.name();
				break;
			case "ApproverConfirmed":
				status = PuthuyirLookUp.APPROVER_APPROVED_QUOTATION.name();
				break;
			case "ReviewerRejected":
				status = PuthuyirLookUp.REVIEWER_REJECTED_QUOTATION.name();
				break;
			case "ApproverRejected":
				status = PuthuyirLookUp.APPROVER_REJECTED_QUOTATION.name();
				break;
		}
		schoolRepository.updateSchoolStatus(updateQuotation.getSchoolId(),status);
		if(status.equals(PuthuyirLookUp.APPROVER_APPROVED_QUOTATION.name())){
			schoolRepository.updateDonationFlag(updateQuotation.getSchoolId(),"Y");
		}
		School school=schoolRepository.findBySchoolId(updateQuotation.getSchoolId());
		if(status.startsWith("APPROVER")) {
			projectRepository.updateApproverStatus(school.getProjects().iterator().next().getProjectId(), PuthuyirLookUp.valueOf(status), updateQuotation.getApproverComments());
		}
		else  if(status.startsWith("REVIEWER")) {
			projectRepository.updateReviewerStatus(school.getProjects().iterator().next().getProjectId(), PuthuyirLookUp.valueOf(status), updateQuotation.getReviewerComments());
		}
		if(status.equals(PuthuyirLookUp.REVIEWER_REJECTED_QUOTATION.name()) || status.equals(PuthuyirLookUp.APPROVER_REJECTED_QUOTATION.name())){
			updateQuotation.getRejectQuotations().forEach((k,v)->{
				for(Quotation quotation:v){
					Quotation tempQuotation = quotationRepository.findByQuotationId(quotation.getQuotationId());
					tempQuotation.setQuotationStatus(PuthuyirLookUp.QUOTATION_ADDED.toString());
					quotationRepository.save(tempQuotation);
				}
			});
		}
		requirementRepository.updateRequirementStatus(school.getProjects().iterator().next().getProjectId(),status);
	}

	@Override
	public List<Quotation> findBySchoolIdAndStatus(long schoolId) {
		List<Quotation> quotations = quotationRepository.findBySchoolIdAndStatus(schoolId);
		for (Quotation quotation1 : quotations) {
			quotation1.setRequirement(requirementRepository.findById(quotation1.getRequirementId()).get());
			for(QuotationImage quotationImage: quotation1.getQuotationImages()){
				if(quotationImage.getFilePath() != null) {
					quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
				}
			}
			for(PreImage preImage: quotation1.getRequirement().getPreImages()){
				preImage.setImage(getImgFromFS(preImage.getFilePath()));
			}
		}
		return quotations;
	}

	@Override
	@Transactional
	public long save(Quotation quotation, Map<String, byte[]> files, List<Map<String, byte[]>> preImage,String imgPath) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		quotation.setQuotationStatus(PuthuyirLookUp.QUOTATION_ADDED.name());
		Optional<Requirement> requirement= requirementRepository.findById(quotation.getRequirementId());
		if (files != null && files.size() > 0) {
			files.forEach((k,v) -> {
				Set<QuotationImage> siSet = new HashSet<QuotationImage>();
				String filePath = fileSubPath+ quotation.getQuotationId()+"_";
				this.saveImgToFS(imgPath,fileSubPath,v,filePath+k);
				QuotationImage si = new QuotationImage(filePath+k,null,quotation.getProofOfId().getComments());
				si.setQuotation(quotation);
				siSet.add(si);
				quotation.setQuotationImages(siSet);
			});
		}
		if (preImage != null && preImage.size() > 0) {
			List<PreImage> siSet = new ArrayList<>();
			for(int i=0;i<preImage.size();i++) {
				preImage.get(i).forEach((k, v) -> {
					String filePath = fileSubPath + quotation.getQuotationId() + "_";
					this.saveImgToFS(imgPath, fileSubPath, v, filePath + k);
					PreImage si = new PreImage(filePath + k, null, quotation.getProofOfId().getComments());
					si.setRequirement(requirement.get());
					siSet.add(si);
				});
			}
			requirement.get().setPreImages(siSet);
		}

		quotationRepository.save(quotation);
		requirementRepository.save(requirement.get());
		return quotation.getQuotationId();
	}

	@Override
	@Transactional
	public void rejectQuotation(UpdateQuotation updateQuotation) {
		schoolRepository.updateSchoolStatus(updateQuotation.getSchoolId(),PuthuyirLookUp.ADMIN_REJECTED_QUOTATION.name());
		School school=schoolRepository.findBySchoolId(updateQuotation.getSchoolId());
		projectRepository.updateProjectStatus(school.getProjects().iterator().next().getProjectId(), PuthuyirLookUp.ADMIN_REJECTED_QUOTATION,updateQuotation.getAdminComments());
		requirementRepository.updateRequirementStatus(school.getProjects().iterator().next().getProjectId(),PuthuyirLookUp.ADMIN_REJECTED_QUOTATION.name());
		for (Map.Entry<Long,List<Quotation>> quotation:updateQuotation.getRejectQuotations().entrySet()) {
			Requirement requirement = requirementRepository.findById(quotation.getKey()).get();
			if(requirement.getPreImages()!=null) {
				for (PreImage preImage : requirement.getPreImages()) {
					imageRepository.deleteById(preImage.getImageId());
					requirement.setPreImages(null);
					requirementRepository.save(requirement);
				}
			}
			List<Quotation> quotationList = quotation.getValue();
			for(Quotation quotation1:quotationList){
				quotation1.setQuotationStatus(PuthuyirLookUp.ADMIN_REJECTED_QUOTATION.name());
				quotationRepository.updateQuotationStatus(quotation1.getQuotationId(),quotation1.getQuotationStatus());
			}
		}
	}

	@Override
	public List<Quotation> findByProjectId(Long projectId) {
		List<Quotation> quotations = quotationRepository.findByProjectId(projectId);
		for (Quotation quotation1 : quotations) {
			quotation1.setRequirement(requirementRepository.findById(quotation1.getRequirementId()).get());
			for(QuotationImage quotationImage: quotation1.getQuotationImages()){
				if(quotationImage.getFilePath() != null) {
					quotationImage.setImage(getImgFromFS(quotationImage.getFilePath()));
				}
			}
			for(PreImage preImage: quotation1.getRequirement().getPreImages()){
				if(preImage.getFilePath() != null) {
					preImage.setImage(getImgFromFS(preImage.getFilePath()));
				}
			}
		}
		return quotations;
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
