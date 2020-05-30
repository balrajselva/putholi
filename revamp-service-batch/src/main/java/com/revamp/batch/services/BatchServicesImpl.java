package com.revamp.batch.services;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revamp.batch.dao.BatchRepository;
import com.revamp.batch.model.School;
import com.revamp.batch.util.BatchConstants;

/**
 * 
 * @author PuthyirDevTeam
 *
 */
@Service
@Transactional(readOnly = false)
public class BatchServicesImpl implements BatchServices {
	private final static Logger logger = LoggerFactory.getLogger(BatchServicesImpl.class);
	
	@Autowired
	private BatchRepository batchRepo;

	@Override
	public List findbySchoolStatus(String pstatus) {
		
		List<School> status = batchRepo.status(pstatus);
		
		
		return status;
	}

	public String updateSchoolStatus(List list,String days) throws IOException, ParseException {
		return updateFundCollection(list,days);
	}

	/**
	 * UpdateFundCollection to verify the logic based on Collected Amount and
	 * Quotation Date
	 * 
	 * @param list
	 * @throws ParseException 
	 * @throws IOException 
	 */
	public String updateFundCollection(List<School> list,String days) throws IOException, ParseException {
		logger.info("updateFundCollection Entry");
		// Current Date
		DateFormat dateFormat = new SimpleDateFormat(BatchConstants.DATE_FORMAT);
		Date currentDate = new Date();
		School school = null;
		// Declared amountPercentage ,school_id and compareDate initialize
		double amountPercentage = 0;
		long school_id = 0;
		long compareDate = 0;
		
		// Check the list size from school table
		if (list.size() > 0) {
			
			System.out.println("Entering into list ---->"+list.size());
			
			for (Iterator<School> iterator = list.iterator(); iterator.hasNext();) {
			
				school = (School) iterator.next();
			
				school_id = school.getSchoolId();
				compareDate = betweenDates(
						dateFormat.
						parse(dateFormat.format(currentDate)),
						new SimpleDateFormat(BatchConstants.DATE_FORMAT).
						parse(school.getQuotation().getQuotationValidityDate()));
			
					
					if(school.getProjects().getCollectedAmount() == school.getProjects().getEstimatedAmount()) {
						
						batchRepo.updateStatus(school_id, BatchConstants.READY_FOR_ALLOTMENT);
						batchRepo.updateProject(school_id, BatchConstants.READY_FOR_ALLOTMENT);
						
					}
					
								
					
					
					//else if(school.getProjects().getCollectedAmount()<school.getProjects().getEstimatedAmount()) {
						
					else if(school.getQuotation().getQuotationStatus().equalsIgnoreCase(BatchConstants.QUOTATION_ACCEPTED)) {
							
							if(compareDate <= Long.parseLong(days)) {
								batchRepo.updateStatus(school_id, BatchConstants.DUE_FOR_ALLOTMENT);
							}
						}
						
					//}
					// Neither matching above two conditions 
					else {
						
						
						
					}
//					
//					// Compare dates Less than equal to 30
//					if (compareDate <= Long.parseLong(days)) {
//						
//						double percentageAmount = calculatePercentage(
//								Double.valueOf(school.getProjects().getCollectedAmount()),
//								Double.valueOf(school.getQuotation().getQuotatedAmount()));
//						// 30 to 99
//						if (percentageAmount >= BatchConstants.MINIMUM_PERCENTAGE && percentageAmount < BatchConstants.MAXIMUM_PERCENTAGE) {
//							batchRepo.updateFundStatus(school.getQuotation().getRequirementId(),
//									BatchConstants.PARTIAL_FUNDCOLLECTED);
//							batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_PARTIALLY_COLLECTED);
//							batchRepo.updateStatus(school_id, BatchConstants.FUND_COLLECTEDCLOSED);
//							
//						}
//						//>99
//						else if(percentageAmount >= BatchConstants.MAXIMUM_PERCENTAGE) {
//							
//							batchRepo.updateStatus(school_id, BatchConstants.FUND_COLLECTEDCLOSED);
//							batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_FULLYCOLLECTED);
//							batchRepo.updateFundStatus(school.getQuotation().getRequirementId(), BatchConstants.FUND_FULLYCOLLECTED);
//							
//						}
//						// less than 30%
//						else {
//							if(amountPercentage>0) {
//								batchRepo.updateStatus(school_id, BatchConstants.FUND_COLLECTEDCLOSED);
//								batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_SHORTAGE);
//								batchRepo.updateFundStatus(school.getQuotation().getRequirementId(), BatchConstants.FUND_SHORTAGE);
//							
//								
//							}else {
//							batchRepo.updateStatus(school_id, BatchConstants.FUND_INPROGRESS);
//							batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_INPROGRESS);
//							batchRepo.updateFundStatus(school.getQuotation().getRequirementId(),
//									BatchConstants.FUND_INPROGRESS);
//						
//							}
//						}
//						
//					}
//					// Compare dates greater than equal to 30
//					if (compareDate >= Long.parseLong(days)) {
//						if (amountPercentage >= BatchConstants.MAXIMUM_PERCENTAGE) {
//							batchRepo.updateStatus(school_id, BatchConstants.FUND_COLLECTEDCLOSED);
//							batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_FULLYCOLLECTED);
//							batchRepo.updateFundStatus(school.getQuotation().getRequirementId(), BatchConstants.FUND_FULLYCOLLECTED);
//							
//							}
//						else if(amountPercentage >= BatchConstants.MINIMUM_PERCENTAGE && amountPercentage < BatchConstants.MAXIMUM_PERCENTAGE) {
//							batchRepo.updateFundStatus(school.getQuotation().getRequirementId(),
//									BatchConstants.FUND_PARTIALLY_COLLECTED);
//							batchRepo.updateStatus(school_id, BatchConstants.FUND_INPROGRESS);
//							batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_PARTIALLY_COLLECTED);
//							
//							
//						
//						}
//						
//						else {
//							if(amountPercentage>0) {
//								batchRepo.updateStatus(school_id, BatchConstants.FUND_COLLECTEDCLOSED);
//								batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_SHORTAGE);
//								batchRepo.updateFundStatus(school.getQuotation().getRequirementId(), BatchConstants.FUND_SHORTAGE);
//							
//								
//							}else {
//							batchRepo.updateStatus(school_id, BatchConstants.FUND_INPROGRESS);
//							batchRepo.updateRequirementStatus(school_id, BatchConstants.FUND_INPROGRESS);
//							batchRepo.updateFundStatus(school.getQuotation().getRequirementId(),
//									BatchConstants.FUND_INPROGRESS);
//						
//							}
//						}
//				}
//
//				} catch (Exception e) {
//					
//				logger.error("IOException "+e.getMessage());
//				return BatchConstants.FAILURE;
//				} 

				
	
			}
		}
		
		
		
		return BatchConstants.SUCCESS;
	}

	/**
	 * 
	 * @param collectedAmount
	 * @param quotationAmount
	 * @return
	 */
	public double calculatePercentage(double collectedAmount, double quotationAmount) {
		return collectedAmount * 100 / quotationAmount;
	}

	/**
	 * 
	 * @param string
	 * @return
	 */
	public static boolean isEmpty(String string) {
		return string == null || string.trim().isEmpty();
	}

	/**
	 * 
	 * @param quotationDate
	 * @param currentDate
	 * @return
	 * @throws IOException
	 */
	public static long betweenDates(Date currentDate,Date quotationDate) throws IOException {
		
		return ChronoUnit.DAYS.between(currentDate.toInstant(),quotationDate.toInstant());
		
	}

}
