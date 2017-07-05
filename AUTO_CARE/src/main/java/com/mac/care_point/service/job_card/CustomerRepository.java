/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_card;

import com.mac.care_point.service.job_card.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author HP
 */
public interface CustomerRepository extends JpaRepository<Customer, String> {

    @Query("select max(cast (c.customerNo as int)) from Customer c")
    public Integer maxCustomerNumber();

    public Customer findByMobileNo(String mobileNo);

    public Customer findByNic(String nic);
    
//    public Customer findByCusNo(String customerNo);

}
