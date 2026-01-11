package com.xebia.talentacquisition.service;

import com.xebia.talentacquisition.dto.EmployeeResponseDTO;
import com.xebia.talentacquisition.entity.Employee;
import com.xebia.talentacquisition.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<EmployeeResponseDTO> getEmployeesNotOnNotice() {
        List<Employee> employees = employeeRepository.findByIsEmployeeOnNoticeFalse();
        return employees.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private EmployeeResponseDTO mapToDTO(Employee employee) {
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setEmployeeID(employee.getEmployeeID());
        dto.setFullName(employee.getFullName());
        dto.setEmailID(employee.getEmailID());
        dto.setPhoneNo(employee.getPhoneNo());
        dto.setBaseLocation(employee.getBaseLocation());
        dto.setReportingTo(employee.getReportingTo());
        dto.setGender(employee.getGender());
        dto.setTotalExperience(employee.getTotalExperience());
        dto.setPrimarySkills(convertToSkillList(employee.getPrimarySkills()));
        dto.setSecondarySkills(convertToSkillList(employee.getSecondarySkills()));
        dto.setActive(employee.isActive());
        dto.setEmployeeOnNotice(employee.isEmployeeOnNotice());
        dto.setCtc(employee.getCtc());
        return dto;
    }

    private List<String> convertToSkillList(String skills) {
        if (!StringUtils.hasText(skills)) {
            return Collections.emptyList();
        }
        return Arrays.stream(skills.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }
}
