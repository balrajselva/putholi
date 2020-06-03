package com.revamp.core.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.revamp.core.dao.*;
import com.revamp.core.lookup.PuthuyirLookUp;
import com.revamp.core.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class QuotationServiceImpl implements QuotationService {

	@Autowired
	private QuotationRepository quotationRepository;

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
	public Optional<Quotation> getQuotation(long id) {
		return quotationRepository.findById(id);
	}

	@Override
	public List<Quotation> getQuotations() {
		return (List<Quotation>) quotationRepository.findAll();
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
		return quotationRepository.findByQuotationStatus(quotationStatus);
	}

	@Override
	public List<Quotation> findBySchoolId(long schoolId) {
		return quotationRepository.findBySchoolId(schoolId);
	}

	@Override
	public List<Quotation> findByRequirementId(long requirementId) {
		return quotationRepository.findByRequirementId(requirementId);
	}

	@Override
	public List<Quotation> findBySchoolIdAndRequirementId(long schoolId, long requirementId) {
		return quotationRepository.findBySchoolIdAndRequirementId(schoolId, requirementId);
	}

	@Override
	@Transactional
	public Boolean updateQuotation(UpdateQuotation updateQuotation) {
		Boolean isUpdated=true;
		for(Quotation quotation:updateQuotation.getQuotations()) {
			int i=quotationRepository.updateQuotationStatus(quotation.getQuotationId(),PuthuyirLookUp.QUOTATION_ACCEPTED.name());
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
		requirementRepository.updateRequirementStatus(school.getProjects().iterator().next().getProjectId(),status);
	}

	@Override
	public List<Quotation> findBySchoolIdAndStatus(long schoolId) {
		return quotationRepository.findBySchoolIdAndStatus(schoolId);
	}

	@Override
	@Transactional
	public long save(Quotation quotation, Map<String, byte[]> files, Map<String, byte[]> preImage,String imgPath) {
		System.out.println("..SchoolServiceImpl.."+imgPath);
		String fileSubPath = DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDateTime.now())+"\\";
		System.out.println("..SchoolServiceImpl.."+fileSubPath);
		quotation.setQuotationStatus(PuthuyirLookUp.QUOTATION_ADDED.name());
		Optional<Requirement> requirement= requirementRepository.findById(quotation.getRequirementId());
		if (files != null && files.size() > 0) {
			files.forEach((k,v) -> {
				Set<QuotationImage> siSet = new HashSet<QuotationImage>();
				String filePath = fileSubPath+ quotation.getQuotationId()+"_";
				QuotationImage si = new QuotationImage(filePath+k,v,quotation.getProofOfId().getComments());
				si.setQuotation(quotation);
				siSet.add(si);
				quotation.setQuotationImages(siSet);
			});
		}
		if (preImage != null && preImage.size() > 0) {
			preImage.forEach((k,v) -> {
				Set<PreImage> siSet = new HashSet<PreImage>();
				String filePath = fileSubPath+ quotation.getQuotationId()+"_";
				PreImage si = new PreImage(filePath+k,v,quotation.getProofOfId().getComments());
				si.setRequirement(requirement.get());
				siSet.add(si);
				requirement.get().setPreImages(siSet);
			});
		}

		quotationRepository.save(quotation);
		requirementRepository.save(requirement.get());
		if (files != null && files.size() > 0) {
			this.saveImgToFS(imgPath,fileSubPath,quotation.getQuotationImages());
		}
		return quotation.getQuotationId();
	}

	@Override
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
				quotationRepository.save(quotation1);
			}
		}
	}

	private void saveImgToFS(String dirPath, String fileSubPath, Set<QuotationImage> list) {
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
