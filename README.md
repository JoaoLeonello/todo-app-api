# Task Management API

This is a Task Management API that provides functionality for managing users, organizations, projects, tasks, and task comments.

## Features

- User and organization management.
- Project and task tracking.
- Task status updates.
- Commenting on tasks.
- Role-based access control for users in organizations.

## Database Schema

The API uses the following database schema:

![db_diagram](https://github.com/user-attachments/assets/51de1cdc-9ff2-43f2-92fe-a644f7a77565)

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

Follow these steps to run the API locally using Docker:

### 1. Clone the Repository

```bash
git clone https://github.com/JoaoLeonello/task-management-api.git
cd task-management-api
```

# Env Configuration

Create a `.env` file in the root directory with the following variables:

DATABASE_HOST=postgres 
DATABASE_PORT=5432 
DATABASE_NAME=task_management 
DATABASE_USER=seu_usuario 
DATABASE_PASSWORD=sua_senha

## Build and execute

Use docker-compose to build and execute the app:

```bash
docker-compose up --build
```

## Access the API
access it in localhost:3000
