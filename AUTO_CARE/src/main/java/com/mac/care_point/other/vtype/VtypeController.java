/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.other.vtype;

import com.mac.care_point.other.vtype.model.Vtype;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author HP
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/care-point/transaction/job-card/vehicle-type")
public class VtypeController {
    
    @Autowired
    private VtypeService vtypeService;
    
    @RequestMapping(value = "find-vehicle-type" , method = RequestMethod.GET)
    public List<Vtype> findVehicleType(){
        return vtypeService.findVehicleType();
    }
}
