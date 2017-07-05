/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author HP
 */
@Entity
@Table(name = "jobsum")
public class JobSummary implements Serializable {

    @Id
    @Column(name = "jobno")
    private String jobNo;

    @Column(name = "jobdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date jobDate;

    @Column(name = "intime")
    private String inTime;
    
    @Column(name = "vehno")
    private String vehicleNo;

    @Column(name = "type")
    private String type;

    @Column(name = "vmake")
    private String make;

    @Column(name = "vmodel")
    private String model;
    
    @Column(name = "inm")
    private String inMillage;
    
    @Column(name = "engno")
    private String engineNo;
    
    @Column(name = "cheno")
    private String chasieNo;
    
    @Column(name = "myear")
    private String madeYear;
    
    @Column(name = "claimno")
    private String claimNo;
    
    @Column(name = "jobc")
    private String jobC;
    
    @Column(name = "accidentdate")
//    @Temporal(TemporalType.TIMESTAMP)
    private Date accidentDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cusno")
    private Customer customer;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "inscomno")
    private InsCompany insComNo;

    public JobSummary() {
    }

    public String getJobNo() {
        return jobNo;
    }

    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }

    public Date getJobDate() {
        return jobDate;
    }

    public void setJobDate(Date jobDate) {
        this.jobDate = jobDate;
    }

    public String getInTime() {
        return inTime;
    }

    public void setInTime(String inTime) {
        this.inTime = inTime;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getInMillage() {
        return inMillage;
    }

    public void setInMillage(String inMillage) {
        this.inMillage = inMillage;
    }

    public String getEngineNo() {
        return engineNo;
    }

    public void setEngineNo(String engineNo) {
        this.engineNo = engineNo;
    }

    public String getChasieNo() {
        return chasieNo;
    }

    public void setChasieNo(String chasieNo) {
        this.chasieNo = chasieNo;
    }

    public String getMadeYear() {
        return madeYear;
    }

    public void setMadeYear(String madeYear) {
        this.madeYear = madeYear;
    }

    public String getClaimNo() {
        return claimNo;
    }

    public void setClaimNo(String claimNo) {
        this.claimNo = claimNo;
    }

    public Date getAccidentDate() {
        return accidentDate;
    }

    public void setAccidentDate(Date accidentDate) {
        this.accidentDate = accidentDate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public InsCompany getInsComNo() {
        return insComNo;
    }

    public void setInsComNo(InsCompany insComNo) {
        this.insComNo = insComNo;
    }

    public String getJobC() {
        return jobC;
    }

    public void setJobC(String jobC) {
        this.jobC = jobC;
    }
    
}
