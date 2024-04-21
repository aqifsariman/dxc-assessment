package com.technology.dxc.java.assessment;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MigrationRunner implements CommandLineRunner {

  private final JdbcMigration jdbcMigration;

  public MigrationRunner(JdbcMigration jdbcMigration) {
    this.jdbcMigration = jdbcMigration;
  }

  @Override
  public void run(String... args) throws Exception {
    jdbcMigration.applyMigrations();
  }
}
