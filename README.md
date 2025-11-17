
# Internship Task  
**Repository:** [Solayiwo/internship-task](https://github.com/Solayiwo/internship-task)  
**Project Name:** Pre-Task (React + Vite)  

---

## About the Project  
This repository contains an **internship pre-task** built using **React** and **Vite**, showcasing a modern front-end workflow, clean structure, mock API setup(using jsonserver).  
It provides a solid foundation for building user interfaces, API interactions, and feature-rich applications.

---

## Live Demo  
Visit the live app here:  
👉 **https://internship-task-lovat.vercel.app/**

---

## Features  
- ⚡ Fast dev environment using Vite  
- 🧩 Clean component-based structure  
- 📦 JSON Server mock backend included  
- 🛠️ ESLint setup for code quality  
- 🚀 Ready for deployment (Vercel config included)  
- 📁 Sample `db.json` and `components.json`  
- 🎨 Supports custom styling  

---

## Tech Stack  
- **React (Vite)**
- **TailwindCSS**
- **JSON Server** (Mock API)
- **npm**

---

## Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (LTS recommended)  
- **npm**

---

### Installation  
Clone the project and install dependencies:

```bash
git clone https://github.com/Solayiwo/internship-task.git
cd internship-task
npm install
```

---

## Running the Frontend  
Start the React development server:

```bash
npm run dev
```

This launches the app locally (e.g., `http://localhost:5173`).

---

## Starting JSON Server (Mock API)

This project includes a local mock backend via **JSON Server** reading from `db.json`.

Start it with:

```bash
npm run start:api
```

This serves the API at:

```
http://localhost:4000
```
---

### 🔧 Recommended Development Workflow

Run **both** servers in separate terminals:

```bash
# Terminal 1 - frontend
npm run dev

# Terminal 2 - mock backend
npm run start:api
```

---

### Example Data for db.json

To credit an account after signup/signin, you can use the following transaction object:

{
  "id": 1,
  "title": "Received from David",
  "amount": 90000000,
  "type": "credit",
  "date": "2025-11-16"
}

---

## Folder Structure  
```
internship-task/
├─ public/
├─ src/
│   ├─ assets/
│   ├─ components/
│   ├─ App.jsx
│   └─ main.jsx
├─ db.json
├─ index.html
├─ components.json
├─ package.json
├─ eslint.config.js
├─ vite.config.js
├─ vercel.json
└─ README.md
```

---

## License  
This project is available under the **MIT License**.

---

## Contact  
**Author:** Solayiwo  
**GitHub:** https://github.com/Solayiwo  
**Project Link:** https://github.com/Solayiwo/internship-task  

---

Built with ❤️ by Solayiwo
