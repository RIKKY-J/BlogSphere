# 🌌 BlogSphere

BlogSphere is a modern, responsive full-stack blogging platform where users can discover and publish stories.

---

## 📋 What is this project about?

It is built as a Next.js application using the App Router, styled with Tailwind CSS, and backed by a MongoDB database.

### Core Features:
*   **User Accounts**: Secure user registration and login/logout authentication powered by `NextAuth.js`.
*   **Write Stories**: Authenticated users can write and publish new blog posts.
*   **Category Filtering**: Filter and read posts dynamically by categories (Technology, Design, Business, Lifestyle) using fast server-side URL queries.
*   **Premium Theme**: Clean responsive layout featuring a modern dark theme, smooth micro-interactions, and Lucide icons.

---

## 🚀 How to Run the Project

### 1. Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Create a file named `.env.local` in the root folder and add your MongoDB connection URI and authentication secrets:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/blogsphere
NEXTAUTH_SECRET=your_nextauth_development_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Start the Server
Run the following command to start the Next.js development server:
```bash
npm run dev
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.
