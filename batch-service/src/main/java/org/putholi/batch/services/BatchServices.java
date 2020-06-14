package org.putholi.batch.services;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface BatchServices {
 List findbySchoolStatus(String status);
 String updateSchoolStatus(List list,String days) throws IOException, ParseException;
}
