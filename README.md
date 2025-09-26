# 🌟 CraftMaven

CraftMaven is a modern, curated e-commerce marketplace built for local artisans, crafters, and small businesses to showcase and sell their unique handmade products.

Think of it as a refined version of Etsy — focused on **local stories**, **quality craftsmanship**, and **delightful shopping experiences**.

---

## 🚀 Tech Stack

### 🖼 Frontend
- **React** (Vite) — blazing-fast build tool for modern React
- **TailwindCSS** — utility-first CSS framework
- **React Router** — client-side routing
- **Recoil / React Query** — state and server data management
- **Cloudinary** — media hosting & optimization

### 🛠 Backend
- **Node.js + Express** — RESTful API server
- **MongoDB (Atlas)** — NoSQL database
- **JWT Auth** — secure token-based authentication
- **Stripe** — payments and checkout flow
- **S3 / Cloudinary** — file & image uploads
- **SendGrid / Nodemailer** — email notifications (orders, receipts, etc.)

---

## 📁 Project Structure

```bash
craftmaven/
│
├── apps/
│   ├── client/         # React frontend (Vite)
│   └── server/         # Express backend
│
├── packages/
│   ├── ui/             # Shared components
│   ├── hooks/          # Reusable frontend hooks
│   ├── types/          # Shared TypeScript types
│   └── utils/          # Shared utilities
│
├── scripts/            # DB seeding, backups, CLI tools
├── infrastructure/     # CI, Docker, Nginx configs
└── README.md
