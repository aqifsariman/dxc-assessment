package com.technology.dxc.java.assessment.service;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.technology.dxc.java.assessment.entity.Role;
import com.technology.dxc.java.assessment.entity.User;
import com.technology.dxc.java.assessment.repo.RoleRepo;
import com.technology.dxc.java.assessment.repo.UserRepo;

@Service
public class UserService {
  @Autowired
  private UserRepo userRepo;

  @Autowired
  private RoleRepo roleRepo;

  public Optional<User> findByUsername(String username) {
    return userRepo.findByUsername(username);
  }

  public Boolean existsByUsername(String username) {
    return userRepo.existsByUsername(username);
  }

  public List<User> findAllUsers() {
    return userRepo.findAll();
  }

  public User registerUser(String displayname, String username, String password, Long roleId) {
    Role role = roleRepo.findById(roleId)
        .orElseThrow(() -> new IllegalArgumentException("Invalid role ID"));
    String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
    User user = new User();
    user.setDisplayname(displayname);
    user.setUsername(username);
    user.setPassword(hashedPassword);
    user.setRole(role);
    return userRepo.save(user);
  }

  public Optional<User> validateUserLogin(String username, String password) {
    return userRepo.findByUsername(username)
        .filter(user -> BCrypt.checkpw(password, user.getPassword()));
  }

  public Boolean isUserManager(Long userId) {
    Optional<User> userOpt = userRepo.findById(userId);
    // Role for manager is 3
    if (userOpt.isPresent()) {
      User user = userOpt.get();
      if (user.getRole().getId() == 3L) {
        return true;
      }
    }
    return false;
  }
}
