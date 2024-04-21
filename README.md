# Login Application DXC Technology

## Overview

This project is built using React for the frontend and Spring Boot with PostgreSQL JDBC for the backend.

## Stacks Used

1. React
2. Maven Spring Boot
3. PostgreSQL JDBC

## Environment Variables

### React

Place .env in the root of the folder with the following details:

- `REACT_APP_API_REGISTRATION_ENDPOINT`: The API endpoint for user registration from Spring Boot Backend (e.g. http://localhost:8080/api/register).
- `REACT_APP_API_LOGIN_ENDPOINT`: The API endpoint for user login from Spring Boot Backend (e.g. http://localhost:8080/api/login).

### Spring Boot

- `DB_URL`: The URL of the PostgreSQL database.
- `DB_USERNAME`: The username for accessing the PostgreSQL database.
- `DB_PASSWORD`: The password for accessing the PostgreSQL database.
- `ALLOWED_ORIGINS`: The endpoint the frontend React app is using (e.g. http://localhost:3000).

## Setup

### React

1. Clone the repository: `git clone https://github.com/aqifsariman/dxc-assessment.git`
2. Navigate to the project directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

### Spring Boot

1. Navigate to the backend directory from root directory: `cd java.assessment`
2. Start the Spring Boot application: `mvn spring-boot:run`

## Important

All users that are registered will be given user role. Manager role will need to be changed in db manually. Implementation in UI for change of roles have not been implemented as per following assessment requirements.