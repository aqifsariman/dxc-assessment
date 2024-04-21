package com.technology.dxc.java.assessment.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technology.dxc.java.assessment.entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  boolean existsByUsername(String username);

}
