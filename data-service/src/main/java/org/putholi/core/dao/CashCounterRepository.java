package org.putholi.core.dao;

import org.putholi.core.model.CashCounter;
import org.springframework.data.repository.CrudRepository;

public interface CashCounterRepository extends CrudRepository<CashCounter, Long> {
}
