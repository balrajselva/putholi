
/********************************************************
Requirement Type
********************************************************/
INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('159','reqtype',
'new',
'New Requirement',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('189','reqtype',
'maintenance',
'Maintenance',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('12','assettype',
'sports',
'Sports',
null,
null);


/********************************************************
Asset type
********************************************************/
INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('190','assettype',
'infrastructure',
'Infrastructure',
null,
null);


INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('021','assettype',
'others',
'Others',
null,
null);


/********************************************************
Asset
********************************************************/
INSERT INTO `revamp_db`.`lookup`(`lookup_id`,`key_field`,`key_value`,`parent_field`,`parent_key`)VALUES('109','asset','Football','assettype','sports');

INSERT INTO `revamp_db`.`lookup`(`lookup_id`,`key_field`,`key_value`,`parent_field`,`parent_key`)VALUES('169','asset','other_sports','Others','assettype','sports');

INSERT INTO `revamp_db`.`lookup`(`lookup_id`,`key_field`,`key_value`,`parent_field`,`parent_key`VALUES('168','asset','Bathroom','assettype','infrastructure');

INSERT INTO `revamp_db`.`lookup`(`lookup_id`,`key_field`,`key_value`,`parent_field`,`parent_key`)VALUES('167','asset','Infrastructure','assettype','Library')

INSERT INTO `revamp_db`.`lookup` (`lookup_id`,`key_field`,`key_value`,`parent_field`,`parent_key`)VALUES('166','asset','Others','assettype','others');


/********************************************************
School Type
********************************************************/
INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('155','schooltype',
'nursery',
'Nursery',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('145','schooltype',
'primary',
'Primary',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('1','schooltype',
'middle',
'Middle School',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('100','schooltype',
'secondary',
'Secondary School',
null,
null);

INSERT INTO `revamp_db`.`lookup`
(`lookup_id`,`key_field`,
`key_value`,
`parent_field`,
`parent_key`)
VALUES
('112','schooltype',
'highersecondary',
'Higher Secondary School',
null,
null);


/* quotation insert
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


*/



