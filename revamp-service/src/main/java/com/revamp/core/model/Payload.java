package com.revamp.core.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Payload{
    private FundAllotment fundMasterList;

    private Invoice invoiceList;

    private String adminComments;

    private String approverComments;

    private String reviewerComments;

    private Long invoiceId;
}