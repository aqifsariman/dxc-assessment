package com.technology.dxc.java.assessment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRegistrationDto {
  private String displayname;
  private String username;
  private String password;
  private Long role;

  @Override
  public String toString() {
    return "UserRegistrationDto{" +
        "displayname:'" + displayname + '\'' +
        "username='" + username + '\'' +
        ", password='" + (password != null ? "present" : "null") + '\'' +
        ", roleId=" + role +
        '}';
  }
}
