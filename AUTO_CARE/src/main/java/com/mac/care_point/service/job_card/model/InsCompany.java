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
@Table(name = "inscompany")
public class InsCompany implements Serializable {

    @Id
    @Column(name = "comno")
    private String comNo;

    @Column(name = "comname")
    private String comName;

    @Column(name = "userid")
    private String userId;

    public InsCompany() {
    }

    public InsCompany(String comNo, String comName, String userId) {
        this.comNo = comNo;
        this.comName = comName;
        this.userId = userId;
    }

    public String getComNo() {
        return comNo;
    }

    public void setComNo(String comNo) {
        this.comNo = comNo;
    }

    public String getComName() {
        return comName;
    }

    public void setComName(String comName) {
        this.comName = comName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
