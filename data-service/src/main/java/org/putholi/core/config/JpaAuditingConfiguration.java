package org.putholi.core.config;

import org.putholi.core.service.AuditorAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableJpaRepositories(basePackages = {
        "org.putholi.core.dao"
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
