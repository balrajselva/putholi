package org.putholi.email.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@Data
public class Volunteer {

    private String from;

    private List<String> to;

    private List<String> cc;

    private String subject;

    private String registrationLink;

    private String message;

    private String name;

    private Map<String, Object> model;

}
