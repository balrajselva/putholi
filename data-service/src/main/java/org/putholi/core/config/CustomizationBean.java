package org.putholi.core.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class CustomizationBean implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

	
	@Value("${image.path}")
    private String imgPath;

	@Override
	public void customize(ConfigurableServletWebServerFactory factory) {
		factory.setDocumentRoot(new File(imgPath));
	}
}