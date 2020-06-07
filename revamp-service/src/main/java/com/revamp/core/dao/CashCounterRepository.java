package com.revamp.core.dao;

import com.revamp.core.model.CashCounter;
import com.revamp.core.model.FundAllotment;
import org.springframework.data.repository.CrudRepository;

public interface CashCounterRepository extends CrudRepository<CashCounter, Long> {
}
