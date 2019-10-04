package com.revamp.core.web.util;

public enum LookUp {

	SCHOOL_REGISTERED("projectstatus","schoolRegistered","SchoolRegistered",null,null),
	PROJECT_CREATED("projectstatus","projectCreated","ProjectCreated",null,null),
	REQ_ADDED("projectstatus","reqAdded","ReqAdded",null,null),
	REQ_VIEWED("projectstatus","schoolRegistered","SchoolRegistered",null,null),
	MODIFY_REQ("projectstatus","schoolRegistered","SchoolRegistered",null,null),
	REQ_CONFIRMED("projectstatus","schoolRegistered","SchoolRegistered",null,null),
	PROJECT_CANCELLED("projectstatus","schoolRegistered","SchoolRegistered",null,null),
	REQ_FULFILLED("projectstatus","schoolRegistered","SchoolRegistered",null,null),
	PROJECT_COMPLETED("projectstatus","schoolRegistered","SchoolRegistered",null,null);
	
	String field;
	String key;
	String value;
	String pField; 
	String pKey;
	
	LookUp(String field, String key, String value, String pField, String pKey) {
		this.field = field;
		this.key = key;
		this.value = value;
		this.pField = pField;
		this.pKey = pKey;
	}

	public String getField() {
		return field;
	}

	public String getKey() {
		return key;
	}

	public String getValue() {
		return value;
	}

	public String getpField() {
		return pField;
	}

	public String getpKey() {
		return pKey;
	}

	
}
