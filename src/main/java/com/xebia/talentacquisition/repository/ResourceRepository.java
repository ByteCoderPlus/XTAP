package com.xebia.talentacquisition.repository;

import com.xebia.talentacquisition.entity.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    Optional<Resource> findByEmployeeId(String employeeId);

    Optional<Resource> findByEmail(String email);

    Page<Resource> findByStatus(Resource.ResourceStatus status, Pageable pageable);

    Page<Resource> findByLocation(String location, Pageable pageable);

    @Query("SELECT DISTINCT r.location FROM Resource r WHERE r.location IS NOT NULL")
    List<String> findDistinctLocations();

    @Query(value = "SELECT DISTINCT rs.skill_name FROM resource_skills rs WHERE rs.skill_name IS NOT NULL", nativeQuery = true)
    List<String> findDistinctSkillNames();

    @Query(value = "SELECT DISTINCT r.* FROM resources r " +
           "WHERE (:search IS NULL OR " +
           "LOWER(r.name::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.email::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.designation::text) LIKE LOWER('%' || :search || '%') OR " +
           "EXISTS (SELECT 1 FROM resource_skills rs WHERE rs.resource_id = r.id AND LOWER(rs.skill_name::text) LIKE LOWER('%' || :search || '%')))",
           countQuery = "SELECT COUNT(DISTINCT r.id) FROM resources r " +
           "WHERE (:search IS NULL OR " +
           "LOWER(r.name::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.email::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.designation::text) LIKE LOWER('%' || :search || '%') OR " +
           "EXISTS (SELECT 1 FROM resource_skills rs WHERE rs.resource_id = r.id AND LOWER(rs.skill_name::text) LIKE LOWER('%' || :search || '%')))",
           nativeQuery = true)
    Page<Resource> searchResources(@Param("search") String search, Pageable pageable);

    @Query(value = "SELECT DISTINCT r.* FROM resources r " +
           "WHERE (:status IS NULL OR r.status::text = :status) AND " +
           "(:location IS NULL OR r.location::text = :location) AND " +
           "(:skillName IS NULL OR EXISTS (SELECT 1 FROM resource_skills rs WHERE rs.resource_id = r.id AND rs.skill_name::text = :skillName)) AND " +
           "(:search IS NULL OR " +
           "LOWER(r.name::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.email::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.designation::text) LIKE LOWER('%' || :search || '%') OR " +
           "EXISTS (SELECT 1 FROM resource_skills rs WHERE rs.resource_id = r.id AND LOWER(rs.skill_name::text) LIKE LOWER('%' || :search || '%')))",
           countQuery = "SELECT COUNT(DISTINCT r.id) FROM resources r " +
           "WHERE (:status IS NULL OR r.status::text = :status) AND " +
           "(:location IS NULL OR r.location::text = :location) AND " +
           "(:skillName IS NULL OR EXISTS (SELECT 1 FROM resource_skills rs WHERE rs.resource_id = r.id AND rs.skill_name::text = :skillName)) AND " +
           "(:search IS NULL OR " +
           "LOWER(r.name::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.email::text) LIKE LOWER('%' || :search || '%') OR " +
           "LOWER(r.designation::text) LIKE LOWER('%' || :search || '%') OR " +
           "EXISTS (SELECT 1 FROM resource_skills rs WHERE rs.resource_id = r.id AND LOWER(rs.skill_name::text) LIKE LOWER('%' || :search || '%')))",
           nativeQuery = true)
    Page<Resource> findWithFilters(
            @Param("status") String status,
            @Param("location") String location,
            @Param("skillName") String skillName,
            @Param("search") String search,
            Pageable pageable
    );
}
