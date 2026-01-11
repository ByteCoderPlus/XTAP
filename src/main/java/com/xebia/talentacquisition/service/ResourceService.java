package com.xebia.talentacquisition.service;

import com.xebia.talentacquisition.dto.*;
import com.xebia.talentacquisition.entity.Account;
import com.xebia.talentacquisition.entity.Resource;
import com.xebia.talentacquisition.mapper.ResourceMapper;
import com.xebia.talentacquisition.repository.AccountRepository;
import com.xebia.talentacquisition.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final AccountRepository accountRepository;
    private final ResourceMapper resourceMapper;

    public PaginationResponse<ResourceDTO> getAllResources(
            Integer page, Integer limit, Resource.ResourceStatus status,
            String location, String skill, String search, String sortBy, String sortOrder) {
        
        Pageable pageable = createPageable(page, limit, sortBy, sortOrder);
        String statusStr = status != null ? status.name() : null;
        Page<Resource> resourcePage = resourceRepository.findWithFilters(statusStr, location, skill, search, pageable);
        
        List<ResourceDTO> dtos = resourcePage.getContent().stream()
                .map(resourceMapper::toDTO)
                .collect(Collectors.toList());
        
        PaginationResponse.PaginationInfo paginationInfo = PaginationResponse.PaginationInfo.builder()
                .currentPage(resourcePage.getNumber() + 1)
                .totalPages(resourcePage.getTotalPages())
                .totalItems(resourcePage.getTotalElements())
                .itemsPerPage(resourcePage.getSize())
                .build();
        
        return PaginationResponse.<ResourceDTO>builder()
                .data(dtos)
                .pagination(paginationInfo)
                .build();
    }

    public ApiResponse<ResourceDTO> getResourceById(String id) {
        Resource resource = resourceRepository.findByEmployeeId(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
        return ApiResponse.<ResourceDTO>builder()
                .data(resourceMapper.toDTO(resource))
                .build();
    }

    public ApiResponse<ResourceDTO> createResource(ResourceDTO dto) {
        if (resourceRepository.findByEmployeeId(dto.getEmployeeId()).isPresent()) {
            throw new RuntimeException("Resource with employee ID already exists: " + dto.getEmployeeId());
        }
        if (resourceRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Resource with email already exists: " + dto.getEmail());
        }
        
        Resource resource = resourceMapper.toEntity(dto);
        resource = resourceRepository.save(resource);
        return ApiResponse.<ResourceDTO>builder()
                .data(resourceMapper.toDTO(resource))
                .build();
    }

    public ApiResponse<ResourceDTO> updateResource(Long id, ResourceDTO dto) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
        
        if (dto.getName() != null) resource.setName(dto.getName());
        if (dto.getEmail() != null) resource.setEmail(dto.getEmail());
        if (dto.getDesignation() != null) resource.setDesignation(dto.getDesignation());
        if (dto.getLocation() != null) resource.setLocation(dto.getLocation());
        if (dto.getStatus() != null) resource.setStatus(dto.getStatus());
        if (dto.getAvailabilityDate() != null) resource.setAvailabilityDate(dto.getAvailabilityDate());
        if (dto.getReleaseDate() != null) resource.setReleaseDate(dto.getReleaseDate());
        if (dto.getTotalExperience() != null) resource.setTotalExperience(dto.getTotalExperience());
        if (dto.getSkills() != null) {
            resource.setSkills(dto.getSkills().stream()
                    .map(resourceMapper::skillToEntity)
                    .collect(Collectors.toList()));
        }
        if (dto.getCtc() != null) resource.setCtc(dto.getCtc());
        if (dto.getCtcCurrency() != null) resource.setCtcCurrency(dto.getCtcCurrency());
        
        resource = resourceRepository.save(resource);
        return ApiResponse.<ResourceDTO>builder()
                .data(resourceMapper.toDTO(resource))
                .build();
    }

    public ApiResponse<Map<String, String>> deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new RuntimeException("Resource not found with id: " + id);
        }
        resourceRepository.deleteById(id);
        return ApiResponse.<Map<String, String>>builder()
                .data(Map.of("message", "Resource deleted successfully"))
                .build();
    }

    public ApiResponse<StatisticsDTO> getResourceStatistics() {
        List<Resource> allResources = resourceRepository.findAll();
        
        Map<String, Long> byStatus = allResources.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getStatus().name(),
                        Collectors.counting()
                ));
        
        Map<String, Long> byLocation = allResources.stream()
                .filter(r -> r.getLocation() != null)
                .collect(Collectors.groupingBy(
                        Resource::getLocation,
                        Collectors.counting()
                ));
        
        StatisticsDTO stats = StatisticsDTO.builder()
                .total((long) allResources.size())
                .atp(byStatus.getOrDefault("ATP", 0L))
                .deployed(byStatus.getOrDefault("DEPLOYED", 0L))
                .softBlocked(byStatus.getOrDefault("SOFT_BLOCKED", 0L))
                .byStatus(byStatus)
                .byLocation(byLocation)
                .build();
        
        return ApiResponse.<StatisticsDTO>builder()
                .data(stats)
                .build();
    }

    public ApiResponse<List<String>> getAvailableLocations() {
        List<String> locations = resourceRepository.findDistinctLocations();
        return ApiResponse.<List<String>>builder()
                .data(locations)
                .build();
    }

    public ApiResponse<List<String>> getAvailableSkills() {
        List<String> skills = resourceRepository.findDistinctSkillNames();
        return ApiResponse.<List<String>>builder()
                .data(skills)
                .build();
    }

    public List<ResourceDTO> exportResources(
            String format, Resource.ResourceStatus status,
            String location, String skill, String search) {
        // Get all resources matching filters (no pagination for export)
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
        String statusStr = status != null ? status.name() : null;
        Page<Resource> resourcePage = resourceRepository.findWithFilters(
                statusStr, location, skill, search, pageable);
        
        return resourcePage.getContent().stream()
                .map(resourceMapper::toDTO)
                .collect(Collectors.toList());
    }

    private Pageable createPageable(Integer page, Integer limit, String sortBy, String sortOrder) {
        int pageNumber = (page != null && page > 0) ? page - 1 : 0;
        int pageSize = (limit != null && limit > 0) ? limit : 10;
        
        Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) 
                ? Sort.Direction.DESC 
                : Sort.Direction.ASC;
        
        Sort sort = sortBy != null 
                ? Sort.by(direction, sortBy)
                : Sort.by(Sort.Direction.ASC, "name");
        
        return PageRequest.of(pageNumber, pageSize, sort);
    }

    public ApiResponse<ResourceDTO> softBlockResource(String employeeId, Long accountId, java.time.LocalDate blockedUntil) {
        Resource resource = resourceRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Resource not found with employee ID: " + employeeId));
        
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));
        
        // Check if already soft-blocked by this account
        com.xebia.talentacquisition.entity.ResourceSoftBlock existingBlock = resource.getSoftBlocks().stream()
                .filter(sb -> sb.getAccount().getId().equals(accountId))
                .findFirst()
                .orElse(null);
        
        if (existingBlock == null) {
            // Create new soft block
            com.xebia.talentacquisition.entity.ResourceSoftBlock softBlock = 
                com.xebia.talentacquisition.entity.ResourceSoftBlock.builder()
                    .resource(resource)
                    .account(account)
                    .blockedUntil(blockedUntil)
                    .build();
            resource.getSoftBlocks().add(softBlock);
        } else {
            // Update existing soft block date
            existingBlock.setBlockedUntil(blockedUntil);
        }
        
        Resource savedResource = resourceRepository.save(resource);
        
        return ApiResponse.<ResourceDTO>builder()
                .data(resourceMapper.toDTO(savedResource))
                .build();
    }
}
