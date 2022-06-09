package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studio.studio.entity.GraphicDesign;

@Repository
public interface GraphicDesignRepository extends JpaRepository<GraphicDesign, String> {

}
