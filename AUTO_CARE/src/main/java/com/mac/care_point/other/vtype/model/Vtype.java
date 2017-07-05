/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.other.vtype.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "VType")
public class Vtype implements Serializable { 
    @Id
    @Column(name = "Vtype")
    private String vtype;

    public Vtype() {
    }

    public Vtype(String vtype) {
        this.vtype = vtype;
    }
    
    public String getVtype() {
        return vtype;
    }
    public void setVtype(String vtype) {
        this.vtype = vtype;
    }
    
}
