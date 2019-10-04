package com.revamp.core.service;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

public class AuditorAwareImpl implements AuditorAware<String> {

    
    public Optional<String> getCurrentAuditor() {
        
//    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//    	Object pricipal = auth.getPrincipal();
//    	System.out.println("Lofinuseee***" + pricipal.toString());
  	return Optional.ofNullable("puthuyir");
    
    }
}