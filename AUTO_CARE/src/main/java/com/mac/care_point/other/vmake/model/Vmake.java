/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.other.vmake.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "vmake")
@XmlRootElement
public class Vmake implements Serializable {
    
    @Id
    @Column(name = "vmake")
    private String vMake;

    public String getVMake() {
        return vMake;
    }

    public void setVMake(String vMake) {
        this.vMake = vMake;
    }

 

}
