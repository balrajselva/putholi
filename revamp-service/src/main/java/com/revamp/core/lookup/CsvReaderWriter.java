package com.revamp.core.lookup;

import com.opencsv.CSVWriter;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;

import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;


public class CsvReaderWriter {
	public static List<? extends CsvBean> readBeansFromCsv(Path path, Class<? extends CsvBean> clazz) throws Exception {
		HeaderColumnNameMappingStrategy<CsvBean> ms = new HeaderColumnNameMappingStrategy<CsvBean>();
	     ms.setType(clazz);
	 
	     Reader reader = Files.newBufferedReader(path);
	     List<? extends CsvBean> beans = new CsvToBeanBuilder<CsvBean>(reader)
	       .withType(clazz)
	       .withMappingStrategy(ms)
	       .build().parse();
	 
	    reader.close();
	    return beans;
	}
	
	public static String writeCsvFromBean(Path path, List<? extends CsvBean> list) throws Exception {
	    Writer writer  = new FileWriter(path.toString());
	 
	    StatefulBeanToCsv<CsvBean> sbc = new StatefulBeanToCsvBuilder<CsvBean> (writer)
	       .withSeparator(CSVWriter.DEFAULT_SEPARATOR)
	       .build();
	    sbc.write((CsvBean) list);
	    writer.close();
	    return path.toString();
	}
	
}
