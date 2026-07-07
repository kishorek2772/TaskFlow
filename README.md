# ⚡ TaskFlow — Node.js + Express + Sequelize + React JSX

Same app, same MySQL database, same features — built with Node.js instead of Spring Boot.

---

## 🚀 Setup

### 1. Backend
```bash
cd backend
npm install
```

Edit `.env` if your MySQL credentials differ from `root/root`.

```bash
npm run dev      # uses nodemon, auto-restarts on changes
```
Runs on **http://localhost:8080**
Tables are auto-created in MySQL on first run (`sequelize.sync()`).

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on **http://localhost:3000**, proxies `/api` calls to the backend.

### 3. MySQL
```sql
CREATE DATABASE taskflow_db;
```
That's it — Sequelize creates `users`, `projects`, `tasks` tables automatically.

---

## 🗺️ Learning Flow (Backend) — Read Files in This Order

### 1️⃣ Models (= JPA Entities)
```
src/models/User.js
src/models/Project.js
src/models/Task.js
src/models/index.js     ← relationships (hasMany / belongsTo)
```

### 2️⃣ Config
```
src/config/database.js  ← Sequelize connection (= application.properties DB section)
```

### 3️⃣ Utils
```
src/utils/jwt.js        ← generateToken/verifyToken (= JwtUtil.java)
```

### 4️⃣ Middleware (= Spring Security Filters)
```
src/middleware/authMiddleware.js   ← (= JwtAuthFilter.java)
src/middleware/errorHandler.js     ← (= GlobalExceptionHandler.java)
```

### 5️⃣ Controllers (= Service + Controller combined)
```
src/controllers/authController.js
src/controllers/projectController.js
src/controllers/taskController.js
```

### 6️⃣ Routes (= @RequestMapping)
```
src/routes/authRoutes.js
src/routes/projectRoutes.js
src/routes/taskRoutes.js
```

### 7️⃣ Entry Point (= TaskflowApplication.java + SecurityConfig.java)
```
src/server.js
```

---

## 🔁 Spring Boot → Node.js Concept Mapping

| Spring Boot | Node.js Equivalent |
|---|---|
| `@Entity` class | Sequelize `.define()` model |
| `@Repository` / `JpaRepository` | Sequelize model methods (`findAll`, `findByPk`, `create`...) |
| `@Service` | Controller function body (business logic) |
| `@RestController` + `@RequestMapping` | Express `router.get/post/put/delete` |
| `JwtAuthFilter` (`OncePerRequestFilter`) | `authMiddleware.js` (`app.use`) |
| `SecurityConfig` (permitAll/authenticated) | Route mounting order in `server.js` |
| `GlobalExceptionHandler` (`@RestControllerAdvice`) | `errorHandler.js` (last `app.use`) |
| `application.properties` | `.env` file |
| `spring.jpa.hibernate.ddl-auto=update` | `sequelize.sync({ alter: true })` |
| Maven / `pom.xml` | npm / `package.json` |
| `mvn spring-boot:run` | `npm run dev` |
| BCryptPasswordEncoder | `bcryptjs` |
| `@Valid` + DTOs | Manual `if (!field)` checks in controllers |
| `UserDetails` / `UserDetailsService` | `req.user` set inside `authMiddleware.js` |

---

## 📁 Frontend Differences from the Vite+TS Version

| TypeScript version | This JSX version |
|---|---|
| `.tsx` files | `.jsx` files |
| `src/types/index.ts` | ❌ removed (no static types) |
| Typed function signatures | Plain JS functions |
| Everything else | **Identical** — same components, same logic, same API calls |

---

## 🔗 API Endpoints (unchanged)

| Method | URL | Auth |
|--------|-----|------|
| POST | /api/auth/register | No |
| POST | /api/auth/login | No |
| GET | /api/projects | Yes |
| POST | /api/projects | Yes |
| DELETE | /api/projects/:id | Yes |
| GET | /api/tasks?projectId= | Yes |
| POST | /api/tasks | Yes |
| PUT | /api/tasks/:id | Yes |
| PATCH | /api/tasks/:id/status | Yes |
| DELETE | /api/tasks/:id | Yes |
