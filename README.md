# Todo List API

A TypeScript-based REST API built with Express.js and Prisma, providing endpoints for managing todo tasks.

I decided to use Docker so that devs could easily bootstrap the project and get and up and running.
There's also support for full local development without Docker.

## 🚀 Quick Start with Docker

The fastest way to get started is using Docker Compose for development:

```bash
# Clone the repository
git clone <repository-url>
cd todo-backend

# Start the development environment
docker compose -f docker-compose.dev.yml up --build
```

The API will be available at `http://localhost:3001` with hot-reload enabled.

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- MySQL 8+ (if running locally)

## 🛠️ Setup Options

### Option 1: Docker Development Environment (Recommended)

1. Start the development environment:

   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

2. The API will automatically:
   - Set up the MySQL database
   - Run Prisma migrations
   - Start the development server with hot-reload

### Option 2: Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your `.env` file:

   ```bash
   DATABASE_URL="mysql://user:password@localhost:3306/todo_db"
   PORT=3001
   ```

3. Start MySQL locally or use Docker for the database only:

   ```bash
   docker compose -f docker-compose.dev.yml up db
   ```

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🧹 Docker Cleanup

### Stopping Containers

1. **Stop containers but preserve data:**

   ```bash
   # Stop containers while keeping volumes and images
   docker compose -f docker-compose.dev.yml down

   # Stop containers and remove volumes
   docker compose -f docker-compose.dev.yml down -v
   ```

2. **Stop and remove everything:**
   ```bash
   # Stop containers, remove volumes, images, and orphaned containers
   docker compose -f docker-compose.dev.yml down -v --rmi all --remove-orphans
   ```

### Cleaning Individual Components

1. **Remove just the database volume:**

   ```bash
   docker volume rm todo-backend_todo_db_data
   ```

2. **Remove project-specific images:**

   ```bash
   # Remove the API image
   docker rmi todo-backend-api

   # Remove the MySQL image
   docker rmi mysql:8
   ```

3. **Clean unused resources:**

   ```bash
   # Remove all stopped containers
   docker container prune

   # Remove unused volumes
   docker volume prune

   # Remove unused networks
   docker network prune

   # Remove unused images
   docker image prune
   ```

### Complete System Cleanup

⚠️ **Warning**: This will remove ALL Docker resources on your system, including those from other projects.

```bash
# Remove everything - containers, images, volumes, networks
docker system prune -a --volumes
```

### Verification Commands

Check if cleanup was successful:

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List volumes
docker volume ls

# List networks
docker network ls

# List images
docker images
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Issues**

   ```
   Error: P1001: Can't reach database server
   ```

   Solutions:

   - Check if MySQL container is running: `docker ps`
   - Verify database credentials in `.env`
   - Ensure database port (3306) is not in use
   - Wait a few seconds for MySQL to fully initialize

2. **Prisma Client Issues**

   ```
   Error: Cannot find module '@prisma/client'
   ```

   Solutions:

   ```bash
   # Regenerate Prisma Client
   npx prisma generate

   # If using Docker, rebuild the container
   docker compose -f docker-compose.dev.yml up --build
   ```

3. **Hot Reload Not Working**
   - Ensure volume mounts are correct in `docker-compose.dev.yml`
   - Check if `ts-node-dev` is running with `--poll` flag
   - Verify file permissions in the container

## 📚 API Documentation

### Endpoints

- `GET /api/tasks` - List tasks with pagination and filters
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Testing the API with Thunder Client

If you're using Visual Studio Code, you can use Thunder Client, a lightweight REST API client extension, to test the API endpoints. Here's how to get started:

1. **Install Thunder Client**

   - Open VS Code Extensions (Ctrl+Shift+X or Cmd+Shift+X)
   - Search for "Thunder Client"
   - Click Install on the extension by "Ranga Vadhineni"

2. **Access Thunder Client**

   - Click the Thunder Client icon in the VS Code activity bar (left sidebar)
   - Or use the command palette (Ctrl+Shift+P or Cmd+Shift+P) and type "Thunder Client"

3. **Available Endpoints**

   ```
   GET    http://localhost:3001/api/tasks      // List all tasks
   POST   http://localhost:3001/api/tasks      // Create a new task
   PUT    http://localhost:3001/api/tasks/:id  // Update a task
   DELETE http://localhost:3001/api/tasks/:id  // Delete a task
   ```

4. **Example Requests**

   **Create a Task:**

   ```json
   POST http://localhost:3001/api/tasks
   Content-Type: application/json

   {
     "title": "Complete project documentation",
     "color": "blue"
   }
   ```

   **Update a Task:**

   ```json
   PUT http://localhost:3001/api/tasks/:id
   Content-Type: application/json

   {
     "title": "Updated task title",
     "color": "green",
     "completed": true
   }
   ```

5. **Testing Workflow**

   - Create a new request in Thunder Client
   - Select the HTTP method (GET, POST, PUT, DELETE)
   - Enter the endpoint URL
   - For POST/PUT requests, go to the "Body" tab and enter the JSON payload
   - Click "Send" to execute the request

6. **Response Handling**

   - Successful requests will return appropriate status codes:
     - GET: 200 OK
     - POST: 201 Created
     - PUT: 200 OK
     - DELETE: 204 No Content
   - Failed requests will return error status codes with explanatory messages

7. **Collections**
   - You can save your requests in Thunder Client collections
   - Click "Collections" in Thunder Client
   - Create a new collection named "Todo API"
   - Save your frequently used requests for easy access

This setup provides a convenient way to test your API endpoints directly from VS Code without needing to switch to external tools like Postman.

## 🏗️ Project Structure

```
src/
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── routes/         # API route definitions
├── types/         # TypeScript interfaces
└── server.ts      # Application entry point
```

## 🤝 Contributing

This is just a full stack take-home test, but if it were to be expanded upon, here's what we could add.

### Current Priorities

1. **API Documentation**

   - Create OpenAPI/Swagger documentation
   - Add request/response examples
   - Document error codes and handling

2. **Testing Infrastructure**

   - Set up Jest for unit testing
   - Add integration tests with supertest
   - Create test fixtures and helpers

3. **Feature Enhancements**

   - Add task categories/tags support
   - Implement task due dates
   - Add bulk operations endpoints
   - Create task activity logging

4. **Performance Improvements**

   - Add Redis caching layer
   - Optimize database queries
   - Implement connection pooling

5. **Dockerization Improvements**
   - Allow database port to be set for entry script etc.

### Development Guidelines

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
