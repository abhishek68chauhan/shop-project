# Deployment

This project deploys as two services: the Node/Express backend and the Vite frontend.

## Local development

1. Copy `backend/.env.example` to `backend/.env` and fill in the backend values.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Install and start both services from the repository root:

```powershell
npm install
npm install --prefix backend
npm install --prefix frontend
npm run start
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:5000`.

## Deploy the backend

Create a Node web service in Render, Railway, or a similar Node host with:

```text
Root directory: backend
Build command: npm install
Start command: npm start
```

Set these environment variables on the backend service:

```text
MONGO_URI
JWT_SECRET
FRONTEND_URL=https://your-frontend-domain.example
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
EMAIL_USER
EMAIL_PASS
```

The host supplies `PORT` automatically. Do not commit `backend/.env`.

## Deploy the frontend

Create a static site in Render, Netlify, or Vercel with:

```text
Root directory: frontend
Build command: npm run build
Publish directory: dist
```

Set this build environment variable to the deployed backend URL without a trailing slash:

```text
VITE_API_URL=https://your-backend-domain.example
```

After the frontend URL is known, update the backend `FRONTEND_URL` value and redeploy the backend. For client-side routing, configure the host to rewrite all paths to `/index.html`.

## Verify a deployment

```powershell
Invoke-WebRequest https://your-backend-domain.example/
npm run build --prefix frontend
```

The backend request should return `Backend is running successfully`, and the frontend build should complete successfully.