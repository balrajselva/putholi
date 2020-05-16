package com.revamp.batch.services;

import java.util.List;

public interface BatchServices {
 List findbySchoolStatus(String status);
 String updateSchoolStatus(List list,String days);
}
