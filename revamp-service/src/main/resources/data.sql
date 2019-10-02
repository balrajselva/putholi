/*Address*/
INSERT INTO `revamp_db`.`address` (`address_id`, `address_line_1`, `address_line_2`, `city_id`, `pin_code`) 
VALUES ('1', 'test', 'test', 'india', '767698'),
('2', 'test2', 'test2', 'USA', '767698'),
('3', 'test3', 'test3', 'England', '767698');



/*Role*/
insert into revamp_db.role
(roleid, rolename, accesslevel) 
values ('admin','Admin /Super user', ''),
 ('sponsor','Sponsor', ''),
 ('volunteer', 'Volunteer',''),
 ('beneficiary', 'Beneficiary', ''),
 ('approver','Approver','');

/* User */
INSERT INTO `revamp_db`.`user` (`userid`, `firstname`, `lastname`, `addressid`, `roleid`, `emailaddress`, `password`)
VALUES ('1', 'Kamalkanth', 'Durairaj', '1', 'admin', 'dkamalkanth@gmail.com', 'admin'),
('2', 'Jagan', 'Lastname', '2', 'beneficiary', 'jagan@gmail.com', 'jagan'),
('3', 'MuthySamy', 'Ganapathy', '1', 'admin', 'mapmuthu@gmail.com', 'muthu');


/********************************************************
State
********************************************************/
INSERT INTO `revamp_db`.`lookup` (`field`,`key`,`value`,`parent_field`,`parent_key`)VALUES
('state','TN','Tamil Nadu',null,null);


/********************************************************
District
********************************************************/
INSERT INTO `revamp_db`.`lookup`(`field`,`key`,`value`,`parent_field`,`parent_key`) VALUES
('district','kanchipuram','Kanchipuram','state','TN'),
('district','tiruvallur','Tiruvallur','state','TN');


/********************************************************
City
********************************************************/
INSERT INTO `revamp_db`.`lookup`(`field`,`key`,`value`,`parent_field`,`parent_key`) VALUES
('city','ennore','Ennore','district','tiruvallur'),
('city','puzhal','Puzhal','district','tiruvallur'),
('city','padappai','Padappai','district','kanchipuram'),
('city','vallakottai','Vallakottai','district','kanchipuram'),
('city','chennai','Chennai','district','kanchipuram');

/********************************************************
Locality
********************************************************/

INSERT INTO `revamp_db`.`lookup`(`field`,`key`,`value`,`parent_field`,`parent_key`) VALUES
('locality','tambaram','Tambaram','city','chennai'),
('locality','pallavaram','Pallavaram','city','chennai'),
('locality','sholinganallur','Sholinganallur','city','chennai');

/********************************************************
Requirement Type
********************************************************/
INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('reqtype',
'new',
'New Requirement',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('reqtype',
'maintenance',
'Maintenance',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('assettype',
'sports',
'Sports',
null,
null);


/********************************************************
Asset type
********************************************************/
INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('assettype',
'infrastructure',
'Infrastructure',
null,
null);


INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('assettype',
'others',
'Others',
null,
null);


/********************************************************
Asset
********************************************************/
INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('asset',
'football',
'Football',
'assettype',
'sports');

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('asset',
'other_sports',
'Others',
'assettype',
'sports');

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('asset',
'bathroom',
'Bathroom',
'assettype',
'infrastructure');

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('asset',
'other_infra',
'Others',
'assettype',
'infrastructure');

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('asset',
'others',
'Others',
'assettype',
'others');


/********************************************************
School Type
********************************************************/
INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('schooltype',
'nursery',
'Nursery',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('schooltype',
'primary',
'Primary',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('schooltype',
'middle',
'Middle School',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('schooltype',
'secondary',
'Secondary School',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`field`,
`key`,
`value`,
`parent_field`,
`parent_key`)
VALUES
('schooltype',
'highersecondary',
'Higher Secondary School',
null,
null);


/* quotation insert */
INSERT INTO `revamp_db`.`quotation`
(`quotation_id`,
`image_id`,
`quotated_amount`,
`warranty`,
`trader_name`,
`address_id`,
`phone`,
`collected_by`,
`verified_by`,
`reviewer`,
`quotation_status`,
`quotation_date`,
`quotation_validity_date`,
`school_id`,
`requirement_id`,
`is_quotation_active`,
`created_date`,
`created_by`,
`modified_by`,
`modified_date`)
VALUES
(
'1', '1', '100', '1', 'test', '1', NULL, NULL, NULL, NULL, NULL, '2018-12-26 23:13:34', '2018-12-26 23:13:34', '1', '1', NULL, NULL, NULL, NULL, NULL);






