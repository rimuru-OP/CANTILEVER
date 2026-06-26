# CANTILEVER

> A collection of full-stack web applications built during my internship at Cantilever, using modern JavaScript technologies across the entire stack.

---

## Projects

### 📝 MyBlog — [myblog-cl.netlify.app](https://myblog-cl.netlify.app/)

A full-stack blogging platform where users can write, edit, and explore articles with a rich text editing experience.

**Features**
- JWT-based authentication (register & login)
- Rich text editor powered by TipTap
- Cloud image uploads via Cloudinary
- Create, edit, and delete posts
- Server-side pagination and search
- Protected routes and input validation
- Rate limiting on auth endpoints
- Skeleton loaders and error boundaries
- Responsive UI

**Tech Stack**

| Layer | Technologies |
|---|---|
| Frontend | React 19, React Router, Vite, TipTap, DOMPurify |
| Backend | Node.js, Express.js, MongoDB Atlas, Mongoose |
| Auth & Security | JWT, Bcrypt, Express Validator, Rate Limiting |
| Storage | Cloudinary (image uploads) |

---

### ✅ DoIt — [doit-cl.netlify.app](https://doit-cl.netlify.app/)

A Kanban-style task manager for organizing and tracking daily work across four status stages.

**Features**
- Four-column Kanban board (To Do → In Progress → In Review → Done)
- Create, edit, and delete tasks
- Move tasks between columns
- Priority levels and search/filter
- Live stats dashboard in a Review tab
- Skeleton loading states
- Responsive UI

**Tech Stack**

| Layer | Technologies |
|---|---|
| Frontend | React 19, React Router, Vite |
| Backend | Node.js, Express.js, MongoDB Atlas, Mongoose |
| Auth & Security | JWT, Bcrypt, Express Validator |

---

## Repository Structure

```
CANTILEVER/
│
├── blog-website/
│   ├── client/     # React + Vite frontend
│   └── server/     # Express + MongoDB backend
│
└── task-manager/
    ├── client/     # React + Vite frontend
    └── server/     # Express + MongoDB backend
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account (for MyBlog image uploads)

### Clone the Repository

```bash
git clone https://github.com/rimuru-OP/CANTILEVER.git
cd CANTILEVER
```

---

### MyBlog — Local Setup

**Backend**

```bash
cd blog-website/server
npm install
npm run dev
```

Create a `.env` file inside `blog-website/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend**

```bash
cd blog-website/client
npm install
npm run dev
```

---

### DoIt — Local Setup

**Backend**

```bash
cd task-manager/server
npm install
npm run dev
```

Create a `.env` file inside `task-manager/server`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Frontend**

```bash
cd task-manager/client
npm install
npm run dev
```

---

## API Reference

### MyBlog

#### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

#### Posts

```http
GET    /api/posts          # Paginated list with optional search
GET    /api/posts/:id
POST   /api/posts          # Protected — requires JWT
PUT    /api/posts/:id      # Protected — owner only
DELETE /api/posts/:id      # Protected — owner only
```

---

### DoIt

#### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

#### Tasks

```http
GET    /api/tasks          # All tasks for authenticated user
POST   /api/tasks          # Protected — requires JWT
PUT    /api/tasks/:id      # Protected — owner only
DELETE /api/tasks/:id      # Protected — owner only
```

---

## Deployment

| Project | Frontend | Backend |
|---|---|---|
| MyBlog | Netlify | Railway |
| DoIt | Netlify | Railway |

---

## Key Learnings

- Full-stack application development with the MERN stack
- REST API design and best practices
- JWT-based authentication and route protection
- MongoDB data modeling and Mongoose schemas
- Cloud file storage with Cloudinary
- Component-based frontend architecture with React
- State management, protected routing, and UX patterns
- Deployment across Netlify and Railway

---

## Author

**Annany Thakur**  
[GitHub](https://github.com/rimuru-OP)

If you found this useful, consider giving the repo a ⭐