package com.revamp.core.lookup;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;

public class PuthuyirLookUpEnumGenerator {

	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		VelocityEngine velocityEngine = new VelocityEngine();

		velocityEngine.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
		velocityEngine.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
		velocityEngine.init();
		Template template = velocityEngine.getTemplate("templates/PuthuyirLookUpEnumTemplate.vm");
		VelocityContext context = new VelocityContext();

		context.put("packageName", "com.revamp.core.lookup");
		context.put("className", "PuthuyirLookUp");
		List<LookUpCodeBean> lookUpCodeList = new ArrayList<>();

		try {
			Path path = Paths.get(args[0] + "/src/main/resources/csv/LookUp.csv");
			lookUpCodeList = (List<LookUpCodeBean>) CsvReaderWriter.readBeansFromCsv(path, LookUpCodeBean.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		context.put("lookUpCodeList", lookUpCodeList);

		StringWriter stringWriter = new StringWriter();
		template.merge(context, stringWriter);

		try {
			writeStringToFile(new File(args[0] + "/src/main/java/com/revamp/core/lookup/" + "PuthuyirLookUp" + ".java"),
					stringWriter.toString());
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private static void writeStringToFile(File file, String aContents) throws FileNotFoundException, IOException {
		if (file == null) {
			throw new IllegalArgumentException("File should not be null.");
		}
		Writer output = new BufferedWriter(new FileWriter(file));
		try {
			output.write(aContents);
			System.out.println(aContents);
		} finally {
			output.flush();
			output.close();
		}
	}

}
