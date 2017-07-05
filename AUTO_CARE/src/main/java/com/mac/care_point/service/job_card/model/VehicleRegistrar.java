/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 *
 * @author HP
 */
@Entity
@Table(name = "vehreg")
public class VehicleRegistrar implements Serializable{
    
    @Id
    @Column(name = "indno")
    private String indNo;
    
    @Column(name = "vehno")
    private String vehicleNo;
    
    @Column(name = "cusno")
    private String customer;

    public VehicleRegistrar() {
    }

    public VehicleRegistrar(String indNo, String vehicleNo, String customer) {
        this.indNo = indNo;
        this.vehicleNo = vehicleNo;
        this.customer = customer;
    }

    

    public String getIndNo() {
        return indNo;
    }

    public void setIndNo(String indNo) {
        this.indNo = indNo;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

}
