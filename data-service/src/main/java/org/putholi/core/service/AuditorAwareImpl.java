package org.putholi.core.service;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    
    public Optional<String> getCurrentAuditor() {
        
//    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    	Object pricipal = auth.getPrincipal();
//    	System.out.println("Lofinuseee***" + pricipal.toString());
  	return Optional.ofNullable("puthuyir");
    
    }
}