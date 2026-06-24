# CANTILEVER

A small full-stack project collection built during the Cantilever internship journey.

This repository currently contains **two separate MERN-style applications**:

- **Blog Website** — a full-stack blogging platform with authentication, post management, image uploads, and a rich text editor.
- **Task Manager** — a task management app with authentication, protected routes, and a dashboard workflow.

---

## Projects

### 1) Blog Website

A blogging platform where authenticated users can create, edit, and delete posts, upload cover images, and browse posts with search and pagination.

**Highlights**
- User registration and login with JWT
- Create, update, delete, and read blog posts
- Image upload support with Multer
- Rich text editor for blog content
- Search and pagination for posts
- Protected routes for author actions
- Responsive frontend UI

**Tech Stack**
- React
- Vite
- React Router
- TipTap
- Node.js
- Express
- MongoDB / Mongoose
- JWT
- Multer
- bcryptjs

---

### 2) Task Manager

A task management application with authentication and a protected dashboard for managing tasks.

**Highlights**
- User registration, login, logout, and session restoration
- Protected dashboard route
- Task create, update, delete, and list APIs
- Cookie-based auth flow
- Dashboard/kanban-style task workflow
- Responsive frontend UI

**Tech Stack**
- React
- Vite
- React Router DOM
- Node.js
- Express
- MongoDB / Mongoose
- JWT
- HTTP-only cookies
- bcryptjs

---

## Repository Structure

```bash
CANTILEVER/
├── blog-website/
│   ├── client/
│   └── server/
└── task-manager/
    ├── client/
    └── server/
```

---

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB connection string
- A `.env` file for each backend

---

## Blog Website Setup

### 1. Install dependencies

```bash
cd blog-website/client
npm install

cd ../server
npm install
```

### 2. Configure environment variables

Create `blog-website/server/.env`:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Run the backend

```bash
cd blog-website/server
npm run dev
```

### 4. Run the frontend

```bash
cd blog-website/client
npm run dev
```

### Blog API Endpoints

**Auth**
- `POST /api/auth/register`
- `POST /api/auth/login`

**Posts**
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts` *(protected, multipart/form-data)*
- `PUT /api/posts/:id` *(protected, multipart/form-data)*
- `DELETE /api/posts/:id` *(protected)*

---

## Task Manager Setup

### 1. Install dependencies

```bash
cd task-manager/client
npm install

cd ../server
npm install
```

### 2. Configure environment variables

Create `task-manager/server/.env`:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

Create `task-manager/client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Run the backend

```bash
cd task-manager/server
npm run dev
```

### 4. Run the frontend

```bash
cd task-manager/client
npm run dev
```

### Task API Endpoints

**Auth**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

**Tasks**
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

## Notes

- The blog backend creates an `uploads/` folder automatically for images.
- The task manager uses `credentials: "include"` so cookies work correctly across frontend and backend.
- Both apps expect MongoDB to be running and the `.env` values to be set correctly before starting.

---

## Author

**Annany Thakur**  
GitHub: `rimuru-OP`

---

## License

This project is intended for educational and internship use.
