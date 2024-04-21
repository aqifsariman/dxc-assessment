package com.technology.dxc.java.assessment.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.technology.dxc.java.assessment.entity.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {

  Optional<Role> findById(Long id);
}
