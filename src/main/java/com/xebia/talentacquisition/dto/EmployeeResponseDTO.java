package com.xebia.talentacquisition.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponseDTO {
    private Long id;
    private String employeeID;
    private String fullName;
    private String emailID;
    private String phoneNo;
    private String baseLocation;
    private String reportingTo;
    private String gender;
    private Integer totalExperience;
    private List<String> primarySkills;
    private List<String> secondarySkills;
    private boolean isActive;
    private boolean isEmployeeOnNotice;
    private String ctc;
}
