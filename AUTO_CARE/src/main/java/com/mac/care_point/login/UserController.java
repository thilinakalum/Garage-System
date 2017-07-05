/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.login;

import com.mac.care_point.login.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */

@CrossOrigin
@RestController
@RequestMapping("/api/care-point/login")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @RequestMapping(value = "/find-by-user-name-and-password/{userName}/{password}", method = RequestMethod.GET)
    public List<User> findByUserNameAndPassword(@PathVariable("userName") String userName, @PathVariable("password") String password ){
        return userService.findByUserNameAndPassword(userName, password);
    }
    
}
