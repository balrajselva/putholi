package org.putholi.core.web.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public final class WebUtilities {
	
	private WebUtilities() {}

	public static Map<String,byte[]> convertMultiPartToBytes(List<MultipartFile> files) throws IOException {
    	Map<String, byte[]> map = new HashMap<>();
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }
            map.put(file.getOriginalFilename(), file.getBytes());
        }
        return Collections.unmodifiableMap(map);
    }
    
}
