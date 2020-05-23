DROP DATABASE IF EXISTS putholi_db;
CREATE DATABASE putholi_db;
USE putholi_db;

DROP TABLE IF EXISTS putholi_db.address;

CREATE TABLE IF NOT EXISTS putholi_db.address(
	address_id INT NOT NULL AUTO_INCREMENT,
	address_line_1 VARCHAR(255),
	address_line_2 VARCHAR(255),
	city VARCHAR(255),
	country VARCHAR(50),
	created_by varchar(50) DEFAULT NULL,
	created_date datetime DEFAULT CURRENT_TIMESTAMP,
	district VARCHAR(50),
	locality VARCHAR(50),
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	pincode VARCHAR(10),
	state VARCHAR(50),
	PRIMARY KEY (address_id)
);

DROP TABLE IF EXISTS putholi_db.contacts;

CREATE TABLE IF NOT EXISTS putholi_db.contacts(
	contacts_id INT NOT NULL AUTO_INCREMENT,
	created_by varchar(50) DEFAULT NULL,
	created_date datetime DEFAULT NULL,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	pri_email VARCHAR(100) NOT NULL,
	pri_name VARCHAR(50) NOT NULL,
	pri_num VARCHAR(50) NOT NULL,
	sec_email VARCHAR(100),
	sec_name VARCHAR(50),
	sec_num VARCHAR(50),
	PRIMARY KEY (contacts_id)
);

/*DROP TABLE IF EXISTS deo_info;
CREATE TABLE deo_info (
	created_by varchar(50) DEFAULT NULL,
	created_date datetime NOT NULL,
	deo_file_id INT NOT NULL,
	deo_info_id INT NOT NULL AUTO_INCREMENT,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	project_id INT NOT NULL,
	school_id INT NOT NULL,
	status varchar(255) DEFAULT NULL,
	PRIMARY KEY (deo_info_id),
	CONSTRAINT deo_file FOREIGN KEY (deo_file_id) REFERENCES putholi_db.deo_file (deo_file_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);


DROP TABLE IF EXISTS deo_file;
CREATE TABLE deo_file (
	created_by varchar(50) DEFAULT NULL,
	created_date datetime NOT NULL,
	deo_file_id INT NOT NULL AUTO_INCREMENT,
	deo_info_id INT NOT NULL,
	image longblob NOT NULL,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (deo_file_id),
	CONSTRAINT deo_file FOREIGN KEY (deo_info_id) REFERENCES putholi_db.deo_info (deo_info_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
*/

/*
DROP TABLE IF EXISTS putholi_db.fundallotment;

CREATE TABLE IF NOT EXISTS putholi_db.fundallotment(
	allocated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	collected_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) DEFAULT NULL,
	created_date datetime DEFAULT NULL,
	fundallotment_id INT NOT NULL AUTO_INCREMENT,
	interest INT,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	requirement_id INT NOT NULL,
	totalamount INT NOT NULL,    
	updated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
	userid int NOT NULL,
	PRIMARY KEY (fundallotment_id),
	CONSTRAINT FK_fundallotment_requirement_id FOREIGN KEY (requirement_id) REFERENCES requirement (requirement_id)
	CONSTRAINT FK_fundallotment_user_id FOREIGN KEY (userid) REFERENCES user (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
)
*/
DROP TABLE IF EXISTS `identity_proof`;

CREATE TABLE `identity_proof` (
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `identity_proof_id` int(11) NOT NULL AUTO_INCREMENT,
  `modified_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `image` longblob,
  `filepath` varchar(200) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`identity_proof_id`)
)

DROP TABLE IF EXISTS putholi_db.invoice_details;

CREATE TABLE putholi_db.invoice_details (
	account_number varchar(50) DEFAULT NULL,
	bankname varchar(50) DEFAULT NULL,
	created_by varchar(50) DEFAULT NULL,
	created_date datetime NOT NULL,
	email_id varchar(50) DEFAULT NULL,
	from_address varchar(50) DEFAULT NULL,
	invoice_date  datetime NOT NULL,
	invoice_details_id int NOT NULL AUTO_INCREMENT,
	invoice_duedate datetime NULL,
	invoice_number varchar(50) NULL,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	phone_number varchar(10) DEFAULT NULL,
	to_address varchar(50) DEFAULT NULL,
	PRIMARY KEY (invoice_details_id)
);


DROP TABLE IF EXISTS putholi_db.invoice_requirements;

CREATE TABLE putholi_db.invoice_requirements (
	created_by varchar(50) DEFAULT NULL,
	created_date datetime NOT NULL,
	descriptions varchar(100) DEFAULT NULL,
	invoice_details_id INT NOT NULL,
	invoice_requirements_id int NOT NULL AUTO_INCREMENT,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	price INT NOT NULL,
	quantity INT DEFAULT NULL,
	sub_total INT NOT NULL,
	PRIMARY KEY (invoice_requirements_id),
	CONSTRAINT FK_invoice_requirements_invoice_details_id FOREIGN KEY (invoice_details_id) REFERENCES invoice_details(invoice_details_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS putholi_db.lookup;
 
CREATE TABLE IF NOT EXISTS putholi_db.lookup (
  lookup_id int NOT NULL AUTO_INCREMENT,
  key_field varchar(50) DEFAULT NULL,
  key_value varchar(50) DEFAULT NULL,
  parent_field varchar(50) DEFAULT NULL,
  parent_key varchar(50) DEFAULT NULL,
  PRIMARY KEY (lookup_id)
);



DROP TABLE IF EXISTS putholi_db.donation_user;

CREATE TABLE IF NOT EXISTS donation_user (
  created_by varchar(50) DEFAULT NULL,
  created_date datetime DEFAULT NULL,
  donation_userid INT NOT NULL AUTO_INCREMENT,
  emailaddress varchar(45) DEFAULT NULL,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  modified_by varchar(50) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  password varchar(50) DEFAULT NULL,
  passwordhint varchar(500) DEFAULT NULL,
  phonenumber varchar(15) DEFAULT NULL,
  PRIMARY KEY (donation_userid)
);

DROP TABLE IF EXISTS putholi_db.schoolinfo;

CREATE TABLE IF NOT EXISTS putholi_db.schoolinfo(
	created_by varchar(50) DEFAULT NULL,
	created_date datetime DEFAULT NULL,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	number_of_students INT NOT NULL,
	number_of_teachers INT NOT NULL,
	school_info_id INT NOT NULL AUTO_INCREMENT,
	school_name VARCHAR(50) NOT NULL,
	school_reg_number VARCHAR(50) NOT NULL,
	school_type VARCHAR(50) NOT NULL,
	PRIMARY KEY (school_info_id),
	CONSTRAINT UNIQUE schoolinfo(school_reg_number)
);


DROP TABLE IF EXISTS putholi_db.school;

CREATE TABLE IF NOT EXISTS putholi_db.school(
	address_id INT NOT NULL,
	contacts_id INT NOT NULL,
	created_by varchar(50) DEFAULT NULL,
	created_date datetime DEFAULT CURRENT_TIMESTAMP,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	school_id INT NOT NULL AUTO_INCREMENT,
	school_info_id INT NOT NULL,
	school_status VARCHAR(50) NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (school_id),
	CONSTRAINT FK_school_contacts_id FOREIGN KEY (contacts_id) REFERENCES contacts (contacts_id) ON DELETE NO ACTION ON UPDATE CASCADE,
	CONSTRAINT FK_school_address_id FOREIGN KEY (address_id) REFERENCES address (address_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    /*CONSTRAINT FK_school_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE CASCADE,*/
	CONSTRAINT FK_school_school_info_id FOREIGN KEY (school_info_id) REFERENCES schoolinfo (school_info_id) ON DELETE NO ACTION ON UPDATE CASCADE
	
);

DROP TABLE IF EXISTS putholi_db.schoolimage;

CREATE TABLE IF NOT EXISTS putholi_db.schoolimage(
	comments varchar(500) DEFAULT NULL,
	created_by varchar(50) DEFAULT NULL,
	created_date datetime DEFAULT CURRENT_TIMESTAMP,
	filepath VARCHAR(200) NOT NULL,
	image longblob NOT NULL,
	image_id INT NOT NULL AUTO_INCREMENT,
	school_id INT NOT NULL,
  	modified_by varchar(50) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,	
	PRIMARY KEY (image_id),
	CONSTRAINT FK_schoolimage_school_id FOREIGN KEY (school_id) REFERENCES school(school_id) ON DELETE NO ACTION ON UPDATE CASCADE
);



DROP TABLE IF EXISTS putholi_db.project;

CREATE TABLE IF NOT EXISTS putholi_db.project(
	collected_amount INT,
	created_by varchar(50) DEFAULT NULL,
	created_date datetime DEFAULT NULL,
	estimated_amount INT,
	modified_by varchar(50) DEFAULT NULL,
	modified_date datetime DEFAULT NULL,
	project_id INT NOT NULL AUTO_INCREMENT,
	school_id INT NOT NULL,
	status VARCHAR(50) NOT NULL,
    v_status BIT AS (CASE WHEN status = 'ProjectCreated' THEN b'1' ELSE NULL END) VIRTUAL,
	PRIMARY KEY (project_id),
	CONSTRAINT FK_project_school_id FOREIGN KEY (school_id) REFERENCES putholi_db.school (school_id),
	CONSTRAINT UNIQUE project(project_id,school_id,v_status)
);

DROP TABLE IF EXISTS putholi_db.invoice;

CREATE TABLE putholi_db.invoice (
  created_by varchar(50) DEFAULT NULL,
  created_date datetime DEFAULT NULL,
  file longblob,
  invoice_details_id INT NOT NULL,
  invoice_id INT NOT NULL AUTO_INCREMENT,
  file_type varchar(50) DEFAULT NULL,
  modified_by varchar(50) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  name varchar(100) DEFAULT NULL,
  project_id int DEFAULT NULL,
  type varchar(50) DEFAULT NULL,
  PRIMARY KEY (invoice_id),
  CONSTRAINT FK_INVOICE_PROJECT_ID FOREIGN KEY (project_id) REFERENCES project (project_id) ON UPDATE CASCADE,
  CONSTRAINT FK_INVOICE_invoice_details_id FOREIGN KEY (invoice_details_id) REFERENCES invoice_details(invoice_details_id) ON UPDATE CASCADE
);


DROP TABLE IF EXISTS putholi_db.user;

CREATE TABLE IF NOT EXISTS putholi_db.user (
  address_id INT DEFAULT NULL,
  comments varchar(255) DEFAULT NULL,
  created_by varchar(50) DEFAULT NULL,
  created_date datetime NOT NULL,
  emailaddress varchar(100) DEFAULT NULL,
  firstname varchar(50) DEFAULT NULL,
  gender varchar(1) DEFAULT NULL,
  identity_proof_id INT NOT NULL,
  lastname varchar(50) DEFAULT NULL,
  modified_by varchar(50) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  password varchar(25) DEFAULT NULL,
  phonenumber varchar(15) DEFAULT NULL,
  role varchar(255) DEFAULT NULL,
  school_id INT DEFAULT NULL,
  sponsormail varchar(100) DEFAULT NULL,
  sponsorname varchar(100) DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  user_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (user_id),
  UNIQUE KEY UK_user_emailaddress (emailaddress),
  CONSTRAINT FK_user_address_id FOREIGN KEY (address_id) REFERENCES address(address_id) ON DELETE NO ACTION ON UPDATE CASCADE,
  /*CONSTRAINT FK_user_school_id FOREIGN KEY (school_id) REFERENCES school(school_id) ON DELETE NO ACTION ON UPDATE CASCADE,*/
  CONSTRAINT FK_user_identity_proof_id FOREIGN KEY (identity_proof_id) REFERENCES identity_proof(identity_proof_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS putholi_db.SchoolUser;

CREATE TABLE IF NOT EXISTS putholi_db.SchoolUser(
	school_user_id INT NOT NULL AUTO_INCREMENT,
	school_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (school_user_id),
	CONSTRAINT FK_SchoolUser_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE CASCADE,
	CONSTRAINT FK_SchoolUser_school_id FOREIGN KEY (school_id) REFERENCES school(school_id) ON DELETE NO ACTION ON UPDATE CASCADE
);


DROP TABLE IF EXISTS putholi_db.requirement;

CREATE TABLE IF NOT EXISTS putholi_db.requirement(
  assetname varchar(50) NOT NULL,
  assettype varchar(50) NOT NULL,
  created_by varchar(50) DEFAULT NULL,
  created_date datetime DEFAULT NULL,
  modified_by varchar(50) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  priority varchar(50) DEFAULT NULL,
  project_id int NOT NULL,
  quantity int NOT NULL,
  reqtype varchar(50) NOT NULL,
  requirement_id int NOT NULL AUTO_INCREMENT,
  status VARCHAR(50) NOT NULL,
  user_id int NOT NULL,
  PRIMARY KEY (requirement_id),
  CONSTRAINT FK_requirement_project_id FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT FK_requirement_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE NO ACTION ON UPDATE CASCADE
);


DROP TABLE IF EXISTS putholi_db.quotation;

CREATE TABLE quotation (
  address_line_1 varchar(50) DEFAULT NULL,	
  city varchar(50) DEFAULT NULL,
  collected_by varchar(50) DEFAULT NULL,
  comment varchar(100) DEFAULT NULL,
  company_address varchar(255) DEFAULT NULL,
  company_name varchar(100) DEFAULT NULL,
  created_by varchar(50) DEFAULT NULL,
  created_date datetime NOT NULL,
  details varchar(255) DEFAULT NULL,
  discount_details varchar(100) DEFAULT NULL,
  item_description varchar(100) DEFAULT NULL,
  image_id INT DEFAULT NULL,
  is_quotation_active varchar(3) DEFAULT NULL,
  modified_by varchar(50) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  phone_number varchar(15) DEFAULT NULL,
  pincode varchar(10) DEFAULT NULL,
  project_id INT NOT NULL,
  quantity INT DEFAULT NULL,
  quotated_amount DOUBLE DEFAULT NULL,
  quotation_date datetime DEFAULT NULL,
  quotation_id INT NOT NULL,
  quotation_prepared_by varchar(50) DEFAULT NULL,
  quotation_status varchar(50) DEFAULT NULL,
  quotation_validity_date datetime DEFAULT NULL,
  requirement_id INT DEFAULT NULL,
  reviewer varchar(50) DEFAULT NULL,
  school_id INT NOT NULL,
  shipping_cost varchar(50) DEFAULT NULL,
  street varchar(50) DEFAULT NULL,
  state varchar(50) DEFAULT NULL,
  tax varchar(50) DEFAULT NULL,
  total_amount varchar(50) DEFAULT NULL,
  unit_ price varchar(50) DEFAULT NULL,
  verified_by varchar(50) DEFAULT NULL,
  warranty varchar(255) DEFAULT NULL,
  PRIMARY KEY (quotation_id),
  CONSTRAINT FK_quotation_school_id FOREIGN KEY (school_id) REFERENCES putholi_db.school (school_id),
  CONSTRAINT FK_quotation_project_id FOREIGN KEY (project_id) REFERENCES putholi_db.project (project_id),
  CONSTRAINT FK_quotation_requirement_id FOREIGN KEY (requirement_id) REFERENCES putholi_db.requirement (requirement_id)
);

DROP TABLE IF EXISTS putholi_db.donation;

CREATE TABLE IF NOT EXISTS putholi_db.donation(
	amount INT NOT NULL,
	created_by varchar(50) DEFAULT NULL,
  	created_date datetime DEFAULT NULL,
	donation_id INT NOT NULL AUTO_INCREMENT,
	donor_id INT NOT NULL,
	payment_mode VARCHAR(50) NOT NULL,
	payment_status VARCHAR(50) NOT NULL,
	project_id INT NOT NULL,
	tracking_id VARCHAR(100) NOT NULL,
  	modified_by varchar(50) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (donation_id),
	CONSTRAINT FK_donation_project_id FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE NO ACTION ON UPDATE CASCADE,
	CONSTRAINT FK_donation_donor_id FOREIGN KEY (donor_id) REFERENCES USER (user_id) ON DELETE NO ACTION ON UPDATE CASCADE
);


DROP TABLE IF EXISTS putholi_db.volunteer_reference;

CREATE TABLE putholi_db.volunteer_reference (
  address_id INT DEFAULT NULL,
  created_by varchar(50) DEFAULT NULL,
  created_date datetime NOT NULL,
  volunteer_reference_id INT NOT NULL AUTO_INCREMENT,
  modified_by varchar(50) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  referal_emails varchar(100) DEFAULT NULL,
  sponsor_email varchar(100) DEFAULT NULL,
  sponsor_name varchar(100) DEFAULT NULL,
  PRIMARY KEY (volunteer_reference_id),
  CONSTRAINT FK_volunteer_reference_address_id FOREIGN KEY (address_id) REFERENCES address(address_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS putholi_db.audittrail;

CREATE TABLE IF NOT EXISTS putholi_db.audittrail(
	comments varchar(500) DEFAULT NULL,
	lastlogindate datetime(6) DEFAULT NULL,
	lastupdateddate datetime(6) DEFAULT NULL,
	roleid int DEFAULT NULL,
	user_id int NOT NULL,
	id int NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT audittrail_user_userid FOREIGN KEY (user_id) REFERENCES putholi_db.user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);