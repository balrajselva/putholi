package org.putholi.data.core.config;

import javax.sql.DataSource;

import org.putholi.data.core.service.AuditorAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableJpaRepositories(basePackages = {
        "com.revamp.core.dao"
})
@EnableTransactionManagement
public class JpaAuditingConfiguration {
	
	    @Bean
	    public AuditorAware<String> auditorAware() {
		      return new AuditorAwareImpl();
	    }
	
	    @Bean
	    NamedParameterJdbcTemplate jdbcTemplate(DataSource dataSource) {
	        return new NamedParameterJdbcTemplate(dataSource);
	    }
}
