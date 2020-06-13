package org.putholi.core.dao;

import org.putholi.core.dto.TrackDonationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DonationRepositoryImpl implements TrackDonationCustomRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;

	private static final String FIND_BY_TRACKING_ID = "select don.amount,pro.collected_amount collectedAmount, pro.estimate, "
			+ "(pro.estimate - pro.collected_amount) balanceamt, req.assettype, req.assetname, req.quantity, req.status from donation don, project pro, requirement req "
			+ "	where tracking_id= :trackingId" + "	and don.project_id = pro.project_id"
			+ "	and don.project_id = req.project_id";

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
