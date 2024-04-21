package com.technology.dxc.java.assessment;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

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
      // Assuming SQL files are placed in src/main/resources/db/migration
      Resource[] resources = resolver.getResources("classpath:/db/migration/*.sql");
      try (Connection conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
        for (Resource resource : resources) {
          String sql = new String(Files.readAllBytes(resource.getFile().toPath()), StandardCharsets.UTF_8);
          try (Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            logger.info("Executed migration: {}", resource.getFilename());
          } catch (Exception e) {
            logger.error("Failed to execute migration: {}", resource.getFilename(), e);
            throw e; // Rethrow to stop further execution in case of failure
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
