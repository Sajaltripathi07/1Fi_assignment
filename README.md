# 1Fi – Products on EMI

Product listing with EMI plans. Data from MongoDB via Express API; UI in React + Tailwind.

**Workflow & code explanation:** [PROJECT_EXPLANATION_README.md](./PROJECT_EXPLANATION_README.md)

---

## Stack

- **Frontend:** React, Vite, React Router, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)

---

## Run locally

**1. Backend**

```bash
cd backend
npm install
cp .env.example .env   # set MONGODB_URI
npm run seed
npm run dev
```

→ http://localhost:5000

**2. Frontend** (new terminal)

```bash
cd frontend
npm install
npm run dev
```

→ http://localhost:3000

Open the app, click a product, pick variant + EMI plan, then **Proceed**.

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:slug` | Single product (full details + EMI plans) |
| GET | `/api/health` | Health check |

---

## Troubleshooting

- **Port 5000 in use:** `netstat -ano | findstr :5000` → `taskkill /PID <pid> /F` (Windows). On Mac/Linux: `lsof -ti:5000 | xargs kill -9`
