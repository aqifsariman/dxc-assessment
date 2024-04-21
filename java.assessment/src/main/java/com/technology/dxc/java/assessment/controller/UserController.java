package com.technology.dxc.java.assessment.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.technology.dxc.java.assessment.dto.UserLoginDto;
import com.technology.dxc.java.assessment.dto.UserRegistrationDto;
import com.technology.dxc.java.assessment.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto registrationDto) {
    if (userService.existsByUsername(registrationDto.getUsername())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\":\"Username already exists\"}");
    }
    try {
      userService.registerUser(registrationDto.getDisplayname(), registrationDto.getUsername(),
          registrationDto.getPassword(),
          registrationDto.getRole());
      return ResponseEntity.ok("{\"message\":\"User registered successfully\", \"success\":true}");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\":\"" + e.getMessage() + "\"}");
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody UserLoginDto loginDto) {
    return userService.validateUserLogin(loginDto.getUsername(), loginDto.getPassword())
        .map(user -> {
          // Create a structured response object
          Map<String, Object> response = new HashMap<>();
          response.put("message", "Login successful!");
          response.put("success", true);
          Map<String, Object> userDetails = new HashMap<>();
          userDetails.put("username", user.getUsername());
          userDetails.put("displayname", user.getDisplayname());
          userDetails.put("role", user.getRole().getRoleName());
          response.put("user", userDetails);

          return ResponseEntity.ok(response);
        })
        .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Map.of(
                "message", "Invalid userid or password.",
                "success", false)));
  }

  @GetMapping("/is-manager/{userId}")
  public ResponseEntity<?> isUserManager(@PathVariable Long userId) {
    try {
      Boolean isUserManager = userService.isUserManager(userId);
      if (isUserManager) {
        return ResponseEntity.ok("success");
      }
      return ResponseEntity.ok("user is not a manager");

    } catch (Exception e) {
      return ResponseEntity.badRequest().body("User not found");
    }
  }
}
