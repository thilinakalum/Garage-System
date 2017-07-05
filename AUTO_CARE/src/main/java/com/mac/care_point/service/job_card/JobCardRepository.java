/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.job_card.model.JobSummary;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author HP
 */
public interface JobCardRepository extends JpaRepository<JobSummary, Integer> {

    @Query("select job from JobSummary job where job.jobNo in (select max(cast(jobx.jobNo as int)) from JobSummary jobx where jobx.vehicleNo like %:vehicleNo1% or jobx.vehicleNo like %:vehicleNo2% or jobx.vehicleNo like %:vehicleNo3% group by jobx.vehicleNo)")
    public List<JobSummary> findByVehicleNoLike(
            @Param("vehicleNo1") String vehicleNo1,
            @Param("vehicleNo2") String vehicleNo2,
            @Param("vehicleNo3") String vehicleNo3,
            Pageable pageable);

    default List<JobSummary> findByVehicleNoLikeLimit10(String vehicleNo1, String vehicleNo2, String vehicleNo3) {
        return findByVehicleNoLike(vehicleNo1, vehicleNo2, vehicleNo3, new PageRequest(0, 10));
    }
    
    //get jobCard max number
    @Query("select max(cast(job.jobNo as int)) from JobSummary job")
    public Integer maxJobCardNo();
    
    //get all vehicle makes
    @Query("select distinct j.make from JobSummary j")// group by j.make
    public List<String> findVehicleMakes();
    
    //get all vehicle types
    @Query("select distinct j.type from JobSummary j")// group by j.type
    public List<String> findByVehicleTypes();
    
    //get all vehicle models
    @Query("select distinct j.model from JobSummary j")//group by j.model
    public List<String> findByVehicleModels();
    
    //get all vehicle models
//    @Query("select distinct j.cusNo from JobSummary j where j.jobNo")//group by j.cusNo
//    public List<String> findByCusNo(String jo);

    public List<JobSummary> findByVehicleNoAndJobC(String vehicleNo, String status);
    
}
