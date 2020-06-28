package org.putholi.core.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Payload{
    private FundAllotment fundMasterList;

    private Invoice invoice;

    private String adminComments;

    private String approverComments;

    private String reviewerComments;

    private Long invoiceId;

    private Long projectId;
}