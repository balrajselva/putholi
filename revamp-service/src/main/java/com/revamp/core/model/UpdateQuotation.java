package com.revamp.core.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.hibernate.annotations.Proxy;

import java.util.List;
import java.util.Map;

@Proxy(lazy = false)
@Getter
@Setter
@ToString
@JsonAutoDetect
public class UpdateQuotation {
    private List<Quotation> quotations;

    private String totalAmount;

    private String comment;
}
