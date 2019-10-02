package com.revamp.core.lookup;
import com.opencsv.bean.CsvBindByName;

public class LookUpCodeBean extends CsvBean {

		@CsvBindByName(column = "Id")
		private int id;
		@CsvBindByName(column = "Name")
		private String name;
		@CsvBindByName(column = "Field")
		private String field;
		@CsvBindByName(column = "Key")
		private String key;
		@CsvBindByName(column = "Value")
		private String value;
		@CsvBindByName(column = "ParentField")
		private String parentField;
		@CsvBindByName(column = "ParentKey")
		private String parentKey;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getField() {
			return field;
		}
		public void setField(String field) {
			this.field = field;
		}
		public String getKey() {
			return key;
		}
		public void setKey(String key) {
			this.key = key;
		}
		public String getValue() {
			return value;
		}
		public void setValue(String value) {
			this.value = value;
		}
		public String getParentField() {
			return parentField;
		}
		public void setParentField(String parentField) {
			this.parentField = parentField;
		}
		public String getParentKey() {
			return parentKey;
		}
		public void setParentKey(String parentKey) {
			this.parentKey = parentKey;
		}

		
	
	}
