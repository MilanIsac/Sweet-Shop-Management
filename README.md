# Sweet Shop Management System

A full-stack MERN application for managing sweets with authentication, role-based access control (Admin/User), CRUD operations, and admin dashboard.


🚀 Features
🔐 Authentication

Signup & Login (JWT based)
Persistent login using localStorage
Protected routes
Role-based access (User / Admin)

🍭 Sweets Management

View all sweets (Users)
Add / Edit / Delete sweets (Admin only)
Price, stock, and name validation

👨‍💼 Admin Dashboard

Total sweets count
Inventory overview
Admin-only routes & APIs

🌐 Frontend

React + Vite
React Router v6
Context API for authentication
Axios for API calls
Always-visible Navbar

🛠 Backend

Node.js + Express
MongoDB Atlas
Mongoose ODM
JWT authentication
Middleware for auth & role protection
Jest tests for APIs



🏗 Tech Stack

| Layer    | Technology         |
| -------- | ------------------ |
| Frontend | React, Vite, Axios |
| Backend  | Node.js, Express   |
| Database | MongoDB Atlas      |
| Auth     | JWT                |
| Testing  | Jest, Supertest    |
| State    | React Context API  |



📂 Project Structure
```
sweet-shop-mgmt/
│
├── server/                         # Backend (Node + Express)
│   ├── src/
│   │   ├── controllers/            # Business logic
│   │   │   ├── controllers.auth.js
│   │   │   ├── controllers.sweets.js
│   │   │   └── controllers.admin.js
│   │   │
│   │   ├── routes/                 # API routes
│   │   │   ├── routes.auth.js
│   │   │   ├── routes.sweets.js
│   │   │   └── routes.admin.js
│   │   │
│   │   ├── middleware/             # Middlewares
│   │   │   ├── middleware.auth.js
│   │   │   ├── middleware.role.js
│   │   │   └── middleware.admin.js
│   │   │
│   │   ├── models/                 # Mongoose models
│   │   │   ├── models.user.js
│   │   │   └── models.sweet.js
│   │   │
│   │   ├── tests/                  # Jest tests
│   │   │   ├── auth.test.js
│   │   │   ├── sweets.test.js
│   │   │   ├── sweets.admin.test.js
│   │   │   └── role.middleware.test.js
│   │   │
│   │   ├── app.js                  # Express app config
│   │   └── server.js               # Server entry point
│   │
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── package-lock.json
│
├── client/
│   └── frontend/                   # Frontend (React + Vite)
│       ├── src/
│       │   ├── Pages/              # Pages
│       │   │   ├── Signup.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Sweets.jsx
│       │   │   └── Admin.jsx
│       │   │
│       │   ├── components/         # Reusable components
│       │   │   ├── Navbar.jsx
│       │   │   ├── ProtectedRoute.jsx
│       │   │   └── AdminRoute.jsx
│       │   │
│       │   ├── auth/               # Auth context & hooks
│       │   │   ├── authContext.jsx
│       │   │   ├── authProvider.jsx
│       │   │   └── useAuth.js
│       │   │
│       │   ├── api/                # Axios API calls
│       │   │   └── api.js
│       │   │
│       │   ├── App.jsx
│       │   └── main.jsx
│       │
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```


⚙️ Backend Setup
1️⃣ Install Dependencies
cd server
npm install

2️⃣ Environment Variables (.env)
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sweetshop
JWT_SECRET=supersecretkey

3️⃣ Start Backend
npm run dev

✔ Server runs at: http://localhost:3000


⚙️ Frontend Setup
1️⃣ Install Dependencies
cd client/frontend
npm install

2️⃣ Start Frontend
npm run dev

✔ Frontend runs at: http://localhost:5173


👥 Roles

User
Signup
Login
View sweets
Admin
Add sweets
Edit sweets
Delete sweets
View admin dashboard
⚠️ Admin role is assigned manually in DB or via seed script.


🧪 Testing (Backend)
cd server
npm test

✔ Auth tests
✔ Role middleware tests
✔ Sweets CRUD tests



📌 Future Enhancements

Order management
Payment integration
Sweet categories
Image upload (Cloudinary)
Pagination & search
Admin analytics charts
