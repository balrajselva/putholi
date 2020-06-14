package org.putholi.core.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.Proxy;

import java.util.List;
import java.util.Map;

@Proxy(lazy = false)
@Getter
@Setter
@ToString
@JsonAutoDetect
public class UpdateQuotation {
    @JsonIgnore
    private List<Quotation> quotations;

    private String totalAmount;

    private String adminComments;

    private String approverComments;

    private String reviewerComments;

    private Long schoolId;

    private String status;

    Map<Long,List<Quotation>> rejectQuotations;

}
