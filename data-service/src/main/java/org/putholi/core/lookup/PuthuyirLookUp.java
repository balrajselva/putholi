package org.putholi.core.lookup;

public enum PuthuyirLookUp {

    BATHROOM ( "asset", "bathroom", "Bathroom", "assettype", "infrastructure"),
    FOOTBALL ( "asset", "football", "Football", "assettype", "sports"),
    OTHERS_INFRA ( "asset", "other_infra", "OthersInfra", "assettype", "infrastructure"),
    OTHERS_SPORTS ( "asset", "other_sports", "OthersSports", "assettype", "sports"),
    ASSET_OTHERS ( "asset", "others", "Others", "assettype", "others"),
    INFRASTRUCTURE ( "assettype", "infrastructure", "Infrastructure", "null", "null"),
    ASSERTTYPE_OTHERS ( "assettype", "others", "Others", "null", "null"),
    SPORTS ( "assettype", "sports", "Sports", "null", "null"),
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
    REQ_FULFILLED ( "projectstatus", "reqFulfilled", "ReqFullFilled", "null", "null"),
    ADMIN_APPROVED_QUOTATION("status","adminAcceptedQuotation","adminAcceptedQuotation"),
    PROJECT_INCOMPLETED ( "projectstatus", "projectInCompleted", "ProjectInCompleted", "null", "null"),
    REVIEWER_APPROVED_QUOTATION("status","reviewerAcceptedQuotation","reviewerAcceptedQuotation"),
    APPROVER_APPROVED_QUOTATION("status","approverAcceptedQuotation","approverAcceptedQuotation"),
    ADMIN_REJECTED_QUOTATION("status","adminRejectedQuotation","adminRejectedQuotation"),
    REVIEWER_REJECTED_QUOTATION("status","reviewerRejectedQuotation","reviewerRejectedQuotation"),
    APPROVER_REJECTED_QUOTATION("status","approverRejectedQuotation","approverRejectedQuotation"),
    QUOTATION_ACCEPTED("quotationStatus","quotationAccepted","quotationAccepted"),
    QUOTATION_ADDED("quotationStatus","quotationAdded","quotationAdded"),
    READY_FOR_ALLOTMENT("status","ReadyForAllotment","ReadyForAllotment"),
    DEO_APPROVED("status","DEO_APPROVED","DEO_APPROVED"),
    DEO_REJECTED("status","DEO_REJECTED","DEO_REJECTED"),
    DEO_EMAIL_SENT("status","DEO_EMAIL_SENT","DEO_EMAIL_SENT"),
    FUND_ALLOTED("status","FUND_ALLOTED","FUND_ALLOTED"),
    PROJECT_CLOSED("status","PROJECT_CLOSED","PROJECT_CLOSED"),
    ADMIN_DEO_APPROVED("status","ADMIN_DEO_APPROVED","ADMIN_DEO_APPROVED"),
    SUCCESS("paymentStatus","PAYMENT_SUCCESS","PAYMENT_SUCCESS");
	private final String field;
	private final String key;
	private final String value;
	private String parentField; 
	private String parentValue;
	
	PuthuyirLookUp(String field, String key, String value, String parentField, String parentValue) {
		this.field = field;
		this.key = key;
		this.value = value;
		this.parentField = parentField; 
		this.parentValue = parentValue;
	}
    PuthuyirLookUp(String field, String key, String value) {
        this.field = field;
        this.key = key;
        this.value = value;
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