package org.putholi.core.dao;

import org.putholi.core.dto.TrackDonationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DonationRepositoryImpl implements TrackDonationCustomRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;

	//with quotation returning duplicate records

	/*private static final String FIND_BY_TRACKING_ID = "select don.amount,pro.project_id projectId,pro.collected_amount collectedAmt, pro.estimated_amount estimatedamt, "+
	"(pro.estimated_amount - pro.collected_amount) balanceAmt, req.assettype, req.assetname, req.quantity, req.status, req.requirement_id requirementId, "+
	"qot.quotation_id quotationId, qot.item_description itemDesc,qot.quantity qotQty, qot.total_amount qotTotalAmt,qot.company_name qotCompanyName, inv.total_amount invoiceAmt "+
	"from requirement req, project pro, donation don,  quotation qot, invoice inv "+
	"where don.tracking_id= :trackingId "+
	"and don.project_id = pro.project_id "+
	"and pro.project_id = req.project_id "+
	"and req.requirement_id = qot.requirement_id "+
	"and req.requirement_id = inv.requirement_id";
	*/

	/*
	private static final String FIND_BY_TRACKING_ID = "select don.amount,pro.project_id projectId,pro.collected_amount collectedAmt, pro.estimated_amount estimatedamt, "+
	"(pro.estimated_amount - pro.collected_amount) balanceAmt, req.assettype, req.assetname, req.quantity, req.status, req.requirement_id requirementId, "+
	 "inv.total_amount invoiceAmt "+
	"from requirement req, project pro, donation don,  invoice inv "+
	"where don.tracking_id= :trackingId "+
	"and don.project_id = pro.project_id "+
	"and pro.project_id = req.project_id "+
	"and req.requirement_id = inv.requirement_id";
*/

	private static final String FIND_BY_TRACKING_ID = "\r\n" +
			"select don.amount,pro.project_id projectId,pro.collected_amount collectedAmt, pro.estimated_amount estimatedamt, \r\n" +
			"(pro.estimated_amount - pro.collected_amount) balanceAmt, req.assettype, req.assetname, req.quantity, req.status, req.requirement_id requirementId,  \r\n" +
			" inv.total_amount invoiceAmt, pi.filepath \r\n" +
			"from requirement req, project pro, donation don,  invoice inv, preimage pi \r\n" +
			"where don.tracking_id= :trackingId \r\n" +
			"and don.project_id = pro.project_id  \r\n" +
			"and pro.project_id = req.project_id \r\n" +
			"and req.requirement_id = inv.requirement_id\r\n" +
			"and pi.requirement_id = req.requirement_id; \r\n" +
			"";


	@Autowired
	DonationRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Transactional(readOnly = false)
	@Override
	public List<TrackDonationDTO> findByTrackingId(String trackingId) {
		Map<String, String> queryParams = new HashMap<>();
		queryParams.put("trackingId", trackingId);

		List<TrackDonationDTO> searchResults = jdbcTemplate.query(FIND_BY_TRACKING_ID, queryParams,
				new BeanPropertyRowMapper<>(TrackDonationDTO.class));

		return searchResults;
	}



}
