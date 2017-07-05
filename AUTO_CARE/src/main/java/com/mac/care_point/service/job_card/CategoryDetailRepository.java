/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.job_card.model.CategoryDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface CategoryDetailRepository extends JpaRepository<CategoryDetail, Integer>{

    public List<CategoryDetail> findByJobNo(String jobNo);
    
}
