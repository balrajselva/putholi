DROP DATABASE IF EXISTS revamp_db;
CREATE DATABASE revamp_db;
USE revamp_db;

/********************************************************
    The Address table, to hold contact info for entities
********************************************************/

DROP TABLE IF EXISTS revamp_db.address;

CREATE TABLE IF NOT EXISTS revamp_db.address(
	address_id INT NOT NULL AUTO_INCREMENT,
	address_line_1 VARCHAR(90),
	address_line_2 VARCHAR(90),
	district VARCHAR(45),
	city VARCHAR(45),
    locality VARCHAR(45),
    pincode VARCHAR(10),
    state VARCHAR(10),
    country VARCHAR(10),
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (address_id)
);

DROP TABLE IF EXISTS revamp_db.contacts;

CREATE TABLE IF NOT EXISTS revamp_db.contacts(
	contacts_id INT NOT NULL AUTO_INCREMENT,
	pri_name VARCHAR(45) NOT NULL,
    pri_num VARCHAR(45) NOT NULL,
	pri_email VARCHAR(90) NOT NULL,
    sec_name VARCHAR(45),
    sec_num VARCHAR(45),
	sec_email VARCHAR(90),
    created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (contacts_id)
);

DROP TABLE IF EXISTS revamp_db.schoolinfo;

CREATE TABLE IF NOT EXISTS revamp_db.schoolinfo(
	school_info_id INT NOT NULL AUTO_INCREMENT,
    school_reg_number VARCHAR(45) NOT NULL,
	school_name VARCHAR(45) NOT NULL,
	school_type VARCHAR(45) NOT NULL,
	number_of_students INT NOT NULL,
	number_of_teachers INT NOT NULL,
	created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (school_info_id),
    CONSTRAINT UNIQUE schoolinfo(school_reg_number)
);

DROP TABLE IF EXISTS revamp_db.role;

CREATE TABLE IF NOT EXISTS revamp_db.role(
  roleid varchar(45) NOT NULL,
  rolename varchar(45) DEFAULT NULL,
  accesslevel varchar(45) DEFAULT NULL,
  PRIMARY KEY (roleid)
);

DROP TABLE IF EXISTS revamp_db.user;

CREATE TABLE IF NOT EXISTS revamp_db.user(
  userid INT NOT NULL AUTO_INCREMENT ,
  firstname varchar(45) NOT NULL,
  lastname varchar(45) NOT NULL,
  status varchar(45) DEFAULT 'REGISTERED',
  /*addressid INT not null, */ 
  role varchar(45) NOT NULL,
  phonenumber varchar(45) DEFAULT NULL,
  emailaddress varchar(45) DEFAULT NULL,
  password varchar(50) DEFAULT NULL,
  /*passwordhint varchar(500) DEFAULT NULL,*/
  created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
  PRIMARY KEY (userid)
/*FOREIGN KEY (addressid) REFERENCES revamp_db.address (address_id),  */
  /*FOREIGN KEY (roleid) REFERENCES revamp_db.role (roleid)*/
  /*ON DELETE NO ACTION
ON UPDATE CASCADE*/
);

/********************************************************
The School table, to collect school information
********************************************************/
DROP TABLE IF EXISTS revamp_db.school;

CREATE TABLE IF NOT EXISTS revamp_db.school(
	school_id INT NOT NULL AUTO_INCREMENT,
    contacts_id INT NOT NULL,
    address_id INT NOT NULL,
    school_info_id INT NOT NULL,
    school_status VARCHAR(45) NOT NULL,
    /**user_id INT NOT NULL,*/
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (school_id),
	FOREIGN KEY (contacts_id) REFERENCES contacts (contacts_id),
	FOREIGN KEY (address_id) REFERENCES address (address_id),
	FOREIGN KEY (school_info_id) REFERENCES schoolinfo (school_info_id)
    /*FOREIGN KEY (user_id) REFERENCES user (userid)*/
	ON DELETE NO ACTION
	ON UPDATE CASCADE
);

DROP TABLE IF EXISTS revamp_db.schoolimage;

CREATE TABLE IF NOT EXISTS revamp_db.schoolimage(
	image_id INT NOT NULL AUTO_INCREMENT,
	image longblob,
	school_id INT NOT NULL,
	filepath VARCHAR(200) NOT NULL,
	comments varchar(500) DEFAULT NULL,
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
	created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,	
	PRIMARY KEY (image_id),
	FOREIGN KEY (school_id) REFERENCES revamp_db.school (school_id) ON DELETE NO ACTION ON UPDATE CASCADE	
);

DROP TABLE IF EXISTS revamp_db.project;

CREATE TABLE IF NOT EXISTS revamp_db.project(
	project_id INT NOT NULL AUTO_INCREMENT,
    school_id INT NOT NULL,
    estimate INT,
    collected_amount INT,
    status VARCHAR(45) NOT NULL,
    v_status BIT AS (CASE WHEN status = 'ProjectCreated' THEN b'1' ELSE NULL END) VIRTUAL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
    PRIMARY KEY (project_id),
    CONSTRAINT school_id FOREIGN KEY (school_id) REFERENCES revamp_db.school (school_id),
    CONSTRAINT UNIQUE project(project_id,school_id,v_status)
);


DROP TABLE IF EXISTS revamp_db.audittrail;

CREATE TABLE IF NOT EXISTS revamp_db.audittrail(
id int NOT NULL,
  userid int NOT NULL,
  roleid int DEFAULT NULL,
  lastlogindate datetime(6) DEFAULT NULL,
  lastupdateddate datetime(6) DEFAULT NULL,
  comments varchar(500) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT audittrail_user_userid FOREIGN KEY (userid) REFERENCES revamp_db.user (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
); 

DROP TABLE IF EXISTS revamp_db.lookup;
 
CREATE TABLE IF NOT EXISTS revamp_db.lookup (
  lookup_id int NOT NULL AUTO_INCREMENT,
  key_field varchar(45) DEFAULT NULL,
  key_value varchar(45) DEFAULT NULL,
  parent_field varchar(45) DEFAULT NULL,
  parent_key varchar(45) DEFAULT NULL,
  PRIMARY KEY (lookup_id)
);

DROP TABLE IF EXISTS revamp_db.requirement;

CREATE TABLE IF NOT EXISTS revamp_db.requirement(
  requirement_id int NOT NULL AUTO_INCREMENT,
  project_id int NOT NULL,
  user_id int NOT NULL,
  reqtype varchar(45) NOT NULL,
  assettype varchar(45) NOT NULL,
  assetname varchar(45) NOT NULL,
  quantity int NOT NULL,
  status VARCHAR(45) NOT NULL,
  date_created datetime DEFAULT CURRENT_TIMESTAMP,
  priority varchar(45) DEFAULT NULL,
  created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
  PRIMARY KEY (requirement_id),
  CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES user (userid)
);


DROP TABLE IF EXISTS revamp_db.donation;

CREATE TABLE IF NOT EXISTS revamp_db.donation(
	donation_id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    payment_mode VARCHAR(45) NOT NULL,
    amount INT NOT NULL,
    payment_status VARCHAR(45) NOT NULL,
    createdate datetime(6) DEFAULT NULL,
    created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (donation_id),
    CONSTRAINT FK_donation_project_id FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE NO ACTION ON UPDATE CASCADE
);

DROP TABLE IF EXISTS revamp_db.quotation;

CREATE TABLE quotation (
  quotation_id int NOT NULL AUTO_INCREMENT,
  image_id int DEFAULT NULL,
  quotated_amount int DEFAULT NULL,
  warranty varchar(100) DEFAULT NULL,
  trader_name varchar(100) DEFAULT NULL,
  address_id int NOT NULL,
  phone varchar(100) DEFAULT NULL,
  collected_by varchar(100) DEFAULT NULL,
  verified_by varchar(100) DEFAULT NULL,
  reviewer varchar(100) DEFAULT NULL,
  quotation_status varchar(100) DEFAULT NULL,
  quotation_date datetime DEFAULT CURRENT_TIMESTAMP,
  quotation_validity_date datetime DEFAULT CURRENT_TIMESTAMP,
  school_id int NOT NULL,
  requirement_id int NOT NULL,
  is_quotation_active varchar(100) DEFAULT NULL,
  created_date datetime DEFAULT NULL,
  created_by varchar(45) DEFAULT NULL,
  modified_by varchar(45) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  PRIMARY KEY (quotation_id),
  CONSTRAINT quotation_address_id FOREIGN KEY (address_id) REFERENCES address (address_id),
  CONSTRAINT quotation_requirement_id FOREIGN KEY (requirement_id) REFERENCES requirement (requirement_id),
  CONSTRAINT quotation_school_id FOREIGN KEY (school_id) REFERENCES school (school_id)
);

DROP TABLE IF EXISTS revamp_db.fundallotment;

CREATE TABLE IF NOT EXISTS revamp_db.fundallotment(
	fundallotment_id INT NOT NULL AUTO_INCREMENT,
    userid int NOT NULL,
	requirement_id INT NOT NULL,
    collected_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    totalamount INT NOT NULL,    
    interest INT,
    allocated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_date datetime DEFAULT NULL,
  	created_by varchar(45) DEFAULT NULL,
  	modified_by varchar(45) DEFAULT NULL,
  	modified_date datetime DEFAULT NULL,
	PRIMARY KEY (fundallotment_id),
    CONSTRAINT FK_fundallotment_requirement_id FOREIGN KEY (requirement_id) REFERENCES requirement (requirement_id),
    CONSTRAINT FK_fundallotment_user_id FOREIGN KEY (userid) REFERENCES user (userid) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS revamp_db.invoice;

CREATE TABLE revamp_db.invoice (
  invoice_id int NOT NULL AUTO_INCREMENT,
  project_id int DEFAULT NULL,
  name varchar(100) DEFAULT NULL,
  type varchar(50) DEFAULT NULL,
  file longblob,
  created_by varchar(255) DEFAULT NULL,
  created_date datetime DEFAULT NULL,
  modified_by varchar(255) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  mime_type varchar(255) DEFAULT NULL,
  invoice_details_id bigint DEFAULT NULL,
  PRIMARY KEY (invoice_id),
  CONSTRAINT invoice_ibfk_1 FOREIGN KEY (project_id) REFERENCES project (project_id) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS revamp_db.invoice_details;

CREATE TABLE revamp_db.invoice_details (
  invoice_details_id int NOT NULL AUTO_INCREMENT,
  from_address varchar(45) DEFAULT NULL,
  to_address varchar(45) DEFAULT NULL,
  invoice_number varchar(45) DEFAULT NULL,
  invoice_date varchar(45) DEFAULT NULL,
  invoice_duedate varchar(45) DEFAULT NULL,
  bankname varchar(45) DEFAULT NULL,
  emailId varchar(45) DEFAULT NULL,
  phoneNumber varchar(45) DEFAULT NULL,
  accountNumber varchar(45) DEFAULT NULL,
  created_by varchar(255) DEFAULT NULL,
  created_date datetime NOT NULL,
  modified_by varchar(255) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  account_number varchar(255) DEFAULT NULL,
  phone_number varchar(255) DEFAULT NULL,
  email_id varchar(255) DEFAULT NULL,
  PRIMARY KEY (invoice_details_id)
);

DROP TABLE IF EXISTS revamp_db.invoice_requirements;

CREATE TABLE revamp_db.invoice_requirements (
  requirement_id int NOT NULL AUTO_INCREMENT,
  qty varchar(45) DEFAULT NULL,
  descriptions varchar(45) DEFAULT NULL,
  price varchar(45) DEFAULT NULL,
  subTotal varchar(45) DEFAULT NULL,
  created_by varchar(255) DEFAULT NULL,
  created_date datetime NOT NULL,
  modified_by varchar(255) DEFAULT NULL,
  modified_date datetime DEFAULT NULL,
  invoice_details bigint DEFAULT NULL,
  sub_total varchar(255) DEFAULT NULL,
  PRIMARY KEY (requirement_id)
);
