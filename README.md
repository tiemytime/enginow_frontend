# Student Task Manager

A modern, clean task management app with daily planning features.

## 🌐 Live Demo

**Frontend:** https://enginow-frontend.vercel.app  
**Backend API:** https://student-task-manager-3.onrender.com

## ✨ Features

- Create and manage tasks with priorities and due dates
- Daily todo planner for quick daily tasks
- Task filtering and search
- Confetti animations when completing tasks
- Keyboard shortcuts
- Export tasks functionality
- Dark mode UI

## 🛠 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Axios  
**Backend:** Node.js, Express, MongoDB, JWT Auth

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- MongoDB connection string

### Installation

1. **Clone the repo**

   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create `.env` file:

   ```bash
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Open http://localhost:5173

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── api/           # API calls
├── components/    # React components
├── context/       # State management
├── pages/         # Main pages
└── utils/         # Helper functions
```

## 🔑 Key Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build locally
```
