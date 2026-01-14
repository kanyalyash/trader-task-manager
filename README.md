# Trader Task Management App (Full Stack)

A full-stack Task Management application built with **Next.js (Frontend)** and **Node.js + Express + MongoDB Atlas (Backend)**.

It includes:
-  User Authentication (Register/Login) using JWT + Cookies
-  Protected Dashboard Route
-  Task CRUD (Create, Read, Update, Delete)
-  Search + Filter Tasks
-  Task Status Toggle (Pending / Completed)
-  Edit Task Title
-  Logout (clears cookie)

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- cookie-parser, cors, dotenv

---

## Features

### Authentication
- Register new users
- Login user
- JWT stored in **HTTP-only cookie**
- Protected dashboard route using `/api/auth/me`
- Logout clears authentication cookie

### Tasks
- Add task
- View all tasks
- Update task status (Pending / Completed)
- Edit task title
- Delete task
- Search tasks by title
- Filter tasks by status

### Dashboard
- Shows task stats:
  - Total tasks
  - Completed tasks
  - Pending tasks

---

##  Folder Structure
trader/
frontend/
backend/


### Frontend important folders
frontend/
app/
login/
register/
dashboard/
components/
lib/


### Backend important folders
backend/
src/
config/
models/
routes/
middleware/
