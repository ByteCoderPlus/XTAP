package com.xebia.talentacquisition.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
    name = "employee",
    uniqueConstraints = {
        @UniqueConstraint(name = "unique_email", columnNames = "XebiaEmailID")
    },
    indexes = {
        @Index(name = "idx_employee_email", columnList = "XebiaEmailID"),
        @Index(name = "idx_employee_location", columnList = "Base_Location")
    }
)
public class Employee {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Id
    @Column(name = "EmployeeID", nullable = false)
    private String employeeID;

    @Column(name = "FullName", nullable = false, length = 255)
    private String fullName = "";

    @Column(name = "emailID", nullable = false, length = 255, unique = true)
    private String emailID = "";

    @Column(name = "phoneNo", nullable = false, length = 20)
    private String phoneNo = "";

    @Column(name = "base_Location", nullable = false, length = 100)
    private String baseLocation = "";

    @Column(name = "reporting_to", length = 255)
    private String reportingTo;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "total_Experience", nullable = false)
    private Integer totalExperience = 0;

    @Column(name = "primarySkills", columnDefinition = "TEXT")
    private String primarySkills;
    
    @Column(name = "secondarySkills", columnDefinition = "TEXT")
    private String secondarySkills;

    @Column(name = "isActive", nullable = false)
    private boolean isActive = false;

    @Column(name = "isEmployeeOnNotice", nullable = false)
    private boolean isEmployeeOnNotice = false;

    @Column(name = "ctc")
    private String ctc;

}
