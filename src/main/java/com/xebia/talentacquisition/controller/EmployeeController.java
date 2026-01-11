package com.xebia.talentacquisition.controller;

import com.xebia.talentacquisition.dto.EmployeeResponseDTO;
import com.xebia.talentacquisition.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/homepage")
    public ResponseEntity<List<EmployeeResponseDTO>> getEmployeesNotOnNotice() {
        List<EmployeeResponseDTO> employees = employeeService.getEmployeesNotOnNotice();
        return ResponseEntity.ok(employees);
    }
}
