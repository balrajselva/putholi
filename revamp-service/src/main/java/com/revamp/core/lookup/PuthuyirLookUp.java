package com.revamp.core.lookup;

public enum PuthuyirLookUp {

BATHROOM ( "asset", "bathroom", "Bathroom", "assettype", "infrastructure"),
 FOOTBALL ( "asset", "football", "Football", "assettype", "sports"),
 OTHERS_INFRA ( "asset", "other_infra", "OthersInfra", "assettype", "infrastructure"),
 OTHERS_SPORTS ( "asset", "other_sports", "OthersSports", "assettype", "sports"),
 ASSET_OTHERS ( "asset", "others", "Others", "assettype", "others"),
 INFRASTRUCTURE ( "assettype", "infrastructure", "Infrastructure", "null", "null"),
 ASSERTTYPE_OTHERS ( "assettype", "others", "Others", "null", "null"),
 SPORTS ( "assettype", "sports", "Sports", "null", "null"),
 CHENNAI ( "city", "chennai", "Chennai", "district", "kanchipuram"),
 ENNORE ( "city", "ennore", "Ennore", "district", "tiruvallur"),
 PADAPPAI ( "city", "padappai", "Padappai", "district", "kanchipuram"),
 PUZHAL ( "city", "puzhal", "Puzhal", "district", "tiruvallur"),
 VELLAKOTTAI ( "city", "vallakottai", "Vallakottai", "district", "kanchipuram"),
 KANCHIPURAM ( "district", "kanchipuram", "Kanchipuram", "state", "TN"),
 TIRUVALLUR ( "district", "tiruvallur", "Tiruvallur", "state", "TN"),
 PALLAVARAM ( "locality", "pallavaram", "Pallavaram", "city", "chennai"),
 SHOLINGANALLUR ( "locality", "sholinganallur", "Sholinganallur", "city", "chennai"),
 TAMBARAM ( "locality", "tambaram", "Tambaram", "city", "chennai"),
 MAINTENANCE ( "reqtype", "maintenance", "Maintenance", "null", "null"),
 NEW_REQ ( "reqtype", "new", "New Requirement", "null", "null"),
 HIGHER_SEC_SCHOOL ( "schooltype", "highersecondary", "Higher Secondary School", "null", "null"),
 MIDDLE_SCHOOL ( "schooltype", "middle", "Middle School", "null", "null"),
 NURSERY ( "schooltype", "nursery", "Nursery", "null", "null"),
 PRIMART ( "schooltype", "primary", "Primary", "null", "null"),
 SECONDARY_SCHOOL ( "schooltype", "secondary", "Secondary School", "null", "null"),
 TAMILNADU ( "state", "TN", "Tamil Nadu", "null", "null"),
 SCHOOL_REGISTERED ( "projectstatus", "schoolRegistered", "SchoolRegistered", "null", "null"),
 PROJECT_CREATED ( "projectstatus", "projectCreated", "ProjectCreated", "null", "null"),
 PROJECT_COMPLETED ( "projectstatus", "projectCompleted", "ProjectCompleted", "null", "null"),
 PROJECT_CANCELLED ( "projectstatus", "projectCancelled", "ProjectCancelled", "null", "null"),
 REQ_ADDED ( "projectstatus", "reqAdded", "ReqAdded", "null", "null"),
 REQ_VIEWED ( "projectstatus", "reqViewed", "ReqViewed", "null", "null"),
 REQ_MODIFIED ( "projectstatus", "reqModified", "ReqModified", "null", "null"),
 REQ_CONFIRMED ( "projectstatus", "reqConfirmed", "ReqConfirmed", "null", "null"),
 REQ_FULFILLED ( "projectstatus", "reqFulfilled", "ReqFullFilled", "null", "null");
 
	private String field;
	private String key;
	private String value;
	private String parentField; 
	private String parentValue;
	
	PuthuyirLookUp(String field, String key, String value, String parentField, String parentValue) {
		this.field = field;
		this.key = key;
		this.value = value;
		this.parentField = parentField; 
		this.parentValue = parentValue;
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

	public String getParentField() {
		return parentField;
	}

	public String getParentValue() {
		return parentValue;
	}


}