package org.putholi.core.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Payload{
    private FundAllotment fundMasterList;
    private Invoice invoiceList;
}