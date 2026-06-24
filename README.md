# CANTILEVER 🚀

> A collection of full-stack web applications built with modern JavaScript technologies.

## 🌟 What's Inside?

This repository contains two independent projects:

### 📝 Blog Website
A full-stack blogging platform where users can create, edit, manage, and explore articles.

#### Features
- 🔐 JWT Authentication (Register/Login)
- 👤 Protected Routes
- ✍️ Rich Text Blog Editor (TipTap)
- 📷 Image Upload Support
- 📝 Create, Edit & Delete Posts
- 🔍 Browse and Read Articles
- 📱 Responsive UI
- 🛡️ Input Validation & Security Middleware
- ⚡ REST API Backend
- 💾 MongoDB Database Integration

#### Tech Stack
**Frontend**
- React 19
- React Router
- Vite
- TipTap Editor
- DOMPurify

**Backend**
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt
- Multer
- Express Validator
- Rate Limiting

---

### ✅ Task Manager
A productivity-focused task management application.

#### Features
- Create Tasks
- Track Progress
- Manage Daily Workflow
- Clean User Interface
- Full-Stack Architecture

---

# 🏗 Repository Structure

```text
CANTILEVER/
│
├── blog-website/
│   ├── client/     # React Frontend
│   └── server/     # Express Backend
│
└── task-manager/
```

# 🖥 Blog Website Screens

- Home Page
- Authentication Pages
- Blog Listing
- Individual Blog View
- Blog Creation Dashboard
- Blog Editing Interface

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/rimuru-OP/CANTILEVER.git
cd CANTILEVER
```

## Blog Website Frontend

```bash
cd blog-website/client
npm install
npm run dev
```

## Blog Website Backend

```bash
cd blog-website/server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside `blog-website/server`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

# 🔌 API Overview

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Posts

```http
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

# 🎯 Key Learning Outcomes

This repository demonstrates:

- Full-stack application development
- Authentication & Authorization
- REST API Design
- MongoDB Data Modeling
- File Upload Handling
- React State Management
- Protected Routing
- Secure Backend Practices
- Component-Based Frontend Architecture

# 🚀 Future Improvements

- Comments System
- User Profiles
- Blog Categories & Tags
- Search & Filtering
- Dark Mode
- Email Verification
- Bookmarking System
- Admin Dashboard

# 👨‍💻 Author

Annany Thakur

If you like this project, consider giving the repository a ⭐.
