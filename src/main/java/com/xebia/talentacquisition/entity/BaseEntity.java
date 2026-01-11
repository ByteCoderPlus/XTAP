package com.xebia.talentacquisition.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import org.springframework.data.convert.Jsr310Converters;

import java.io.Serializable;
import java.time.LocalDateTime;

public class BaseEntity implements Serializable {

    @Column(name = "created_date")
    @Convert(converter = Jsr310Converters.DateToLocalDateTimeConverter.class)
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    @Convert(converter = Jsr310Converters.DateToLocalDateTimeConverter.class)
    private LocalDateTime updatedDate;

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
        updatedDate = LocalDateTime.now();
    }

    @PreUpdate
    protected  void onUpDate() {
        updatedDate = LocalDateTime.now();
    }
}
