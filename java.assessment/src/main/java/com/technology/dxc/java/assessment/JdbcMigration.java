package com.technology.dxc.java.assessment;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.stream.Collectors;

@Component
public class JdbcMigration {
  private static final Logger logger = LoggerFactory.getLogger(JdbcMigration.class);

  @Value("${spring.datasource.url}")
  private String dbUrl;

  @Value("${spring.datasource.username}")
  private String dbUsername;

  @Value("${spring.datasource.password}")
  private String dbPassword;

  public void applyMigrations() throws Exception {
    logger.info("Starting database migrations...");

    PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    try {
      Resource[] resources = resolver.getResources("classpath*:db/migration/*.sql");
      try (Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
        for (Resource resource : resources) {
          try (BufferedReader reader = new BufferedReader(
              new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            String sql = reader.lines().collect(Collectors.joining("\n"));
            try (Statement stmt = conn.createStatement()) {
              stmt.execute(sql);
              logger.info("Executed migration: {}", resource.getFilename());
            } catch (Exception e) {
              logger.error("Failed to execute migration: {}", resource.getFilename(), e);
              throw e;
            }
          }
        }
        logger.info("Database migrations completed successfully.");
      }
    } catch (Exception e) {
      logger.error("Failed to apply database migrations", e);
      throw new RuntimeException("Failed to apply database migrations", e);
    }
  }
}
