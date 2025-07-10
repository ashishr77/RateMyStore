# 📦 RateMyStore

A full-stack MERN-based Store Rating platform that supports three roles: **Admin**, **Store Owner**, and **User**. Each role has specific capabilities designed for managing and interacting with stores and their ratings.

---

## 🚀 Features by Role

### 🛡️ Admin
- Login as admin.
- View a dashboard with:
  - Total Users
  - Total Stores
  - Total Ratings
- Create:
  - New Users
  - New Store Owners
  - New Admins
- View list of all users and stores:
  - Users: Name, Email, Address, Role
  - Stores: Name, Email, Address, Average Rating
- Filter users/stores by name, email, address, or role.
- Logout securely.

🖼️ Screenshot:  
![Admin Dashboard](./images/admin_dashboard.png)

---

### 🏪 Store Owner
- Login as store owner.
- View personal store performance including:
  - Average rating
  - Number of ratings
- Update store password.
- Logout securely.

🖼️ Screenshot:  
![Store Dashboard](./images/store_dashboard.png)

---

### 👤 User
- Register and login as a normal user.
- View all listed stores with:
  - Store Name, Email, Address, Ratings
- Rate any store (1–5 stars) and leave feedback.
- Update password.
- Logout securely.

🖼️ Screenshot:  
![User Dashboard](./images/user_dashboard.png)

---

## ⚙️ Tech Stack

### 🔧 Backend:
- Node.js
- Express.js
- PostgreSQL (via Drizzle ORM)
- JWT Authentication
- Role-based Access Control

### 🎨 Frontend:
- React.js
- Vite + TailwindCSS
- React Router
- Context API for auth

---

## 🛠️ Setup Instructions

 **Clone this repository:**
   ```bash
   git clone https://github.com/ashishr77/RateMyStore.git
   cd RateMyStore
  ```
## 🧠 Auther
👨‍💻 Built with ❤️ by Ashish Rathod
