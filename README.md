# 🎬 StreamSentra — Backend

A scalable, secure, and Kafka-powered backend for **StreamSentra**, built with **NestJS** and **Prisma**, integrated with **Cloudinary** for video storage and delivery, and JWT-based authentication.

---

## 🚀 Tech Stack

### Backend
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Messaging & Cloud
![Kafka](https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-0C71C3?style=for-the-badge&logo=cloudinary&logoColor=white)

- **NestJS** — Node.js framework for building scalable APIs  
- **Prisma** — Type-safe ORM for MongoDB  
- **MongoDB Atlas** — Cloud database  
- **Cloudinary** — Video uploads & optimized streaming  
- **Kafka** — Asynchronous video processing pipeline  
- **JWT Auth** — Secure user authentication  

---

## ✨ Features

### 👤 User Management
- Registration & login with email/password  
- Password hashing with bcrypt  
- JWT-based authentication and protected routes  

### 🎞️ Video Handling
- Upload videos via **multipart/form-data**  
- Store video metadata in MongoDB  
- Cloudinary integration for video storage and streaming  
- Kafka-based processing (e.g., transcoding, notifications)  
- Each user can only access their own videos  

### 🛠️ Developer Features
- Modular NestJS architecture  
- Prisma for database management and migrations  
- Kafka events for decoupled video processing  
- Detailed error handling and validation  

---

## 📁 Project Structure

backend/
│── src/
│ ├── auth/
│ │ ├── auth.module.ts
│ │ ├── auth.service.ts
│ │ └── jwt.strategy.ts
│ ├── video/
│ │ ├── video.controller.ts
│ │ ├── video.service.ts
│ │ └── video.module.ts
│ ├── cloudinary/
│ │ ├── cloudinary.module.ts
│ │ └── cloudinary.service.ts
│ ├── kafka/
│ │ ├── kafka.service.ts
│ │ └── kafka.module.ts
│ ├── prisma/
│ │ └── prisma.service.ts
│ └── main.ts
│
├── prisma/
│ └── schema.prisma
│
└── package.json
---

## 🔧 Environment Variables

Create a `.env` file:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
KAFKA_BROKER=<your-kafka-broker-url>

yaml
Copy code

---

## ▶️ Run Locally

```bash
git clone https://github.com/TheRealCocky/stremaforge-server
cd stremaforge-server
npm install
npm run start:dev
App running at:
👉 http://localhost:3000

🧩 API Endpoints
Auth
bash
Copy code
POST /auth/register
POST /auth/login
Videos
sql
Copy code
GET  /videos          -> Get all videos for authenticated user
POST /videos/upload   -> Upload a new video (requires Bearer token)
All video operations require JWT Authorization:

makefile
Copy code
Authorization: Bearer <token>
⚡ Kafka Integration
Kafka used for video processing tasks (e.g., transcoding, notifications)

Worker listens to video-uploads topic

Automatically updates video status after processing

🌐 Deployment
Optimized for Render or any Node.js cloud provider.

bash
Copy code
npm run build
npm run start:prod
🧑‍💻 Author
TheRealCocky — Full-stack developer building scalable, cloud-ready media platforms.

⭐ Contribute
PRs and suggestions are welcome!

📜 License
MIT
