<p align="center">
  <img src="frontend/src/assets/LOGO.png" alt="CraftMaven Logo" width="120"/>
</p>

<h1 align="center">🧶 CraftMaven</h1>
<p align="center">
  <em>Where Creativity Meets Commerce – A modern marketplace for handmade crafts</em>
</p>

---

## 🌟 Overview

**CraftMaven** is a full-stack e-commerce platform designed for craft sellers and artists to showcase their handmade creations.  
It offers a smooth, responsive, and modern experience for both sellers and buyers — combining creativity, simplicity, and technology.

---

## ✨ Features

- 🏠 **Beautiful Landing Page** with animated hero section  
- 👩‍🎨 **Seller Dashboard** for managing listings and tracking sales  
- 🛍️ **Product Pages** with search, filters, and category organization  
- 🔐 **Role-based Authentication** (Seller & Buyer)  
- 🤖 **AI Recommendations** for smarter discovery  
- 💳 **Payment-ready structure** (Razorpay/Stripe integration planned)  
- 📱 **Responsive design** that works perfectly across devices  

---


---

## 🛠️ Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React.js, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT, bcrypt |
| **AI / ML** | TensorFlow.js or custom logic |
| **Deployment** | Vercel (frontend), Render (backend), MongoDB Atlas |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/CraftMaven.git
cd CraftMaven


2️⃣ Install dependencies
cd frontend && npm install
cd ../backend && npm install

3️⃣ Create a .env file in backend/
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Run the project
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm start

🧩 Folder Structure
CraftMaven/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── LOGO.png
│   │   │   └── ss/
│   │   │        ├── SellerDash.png
│   │   │        ├── ss2.png
│   │   │        └── ss3.png
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── package.json
└── README.md
