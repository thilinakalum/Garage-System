/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.login;

import com.mac.care_point.login.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface UserRepositoy extends JpaRepository<User, String>{

    public List<User> findByUserNameAndPassword(String userName, String password);
    
}
