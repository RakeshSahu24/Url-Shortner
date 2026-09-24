# URL Shortener

A full-stack URL shortening service with a React interface, an Express API, and MongoDB persistence. Create compact links, redirect visitors to their destination, and inspect timestamped visit activity.

**Live Demo:** TODO

## Features

- Generate unique short links with an 8-character ID
- Redirect short links to the original destination
- Record the timestamp of every visit
- View total clicks and visit history
- Copy generated links to the clipboard
- Responsive, accessible interface

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **IDs:** Nano ID

## Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) running locally, or a MongoDB Atlas connection string

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd short-url
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env
```

The local defaults use the Vite proxy for API calls:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/short-url
CORS_ORIGIN=http://localhost:5173
VITE_API_BASE_URL=/api
VITE_PUBLIC_BACKEND_URL=http://localhost:3000
```

### 4. Start the backend

The API uses port `3000` and the local MongoDB connection string by default:

```bash
npm start
```

For automatic backend restarts during development, use:

```bash
npm run dev:server
```

### 5. Start the frontend

In a second terminal, run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The Vite proxy forwards `/api` requests to the backend during local development.

## Environment Variables

### Backend

| Variable | Required in production | Description |
| --- | --- | --- |
| `NODE_ENV` | Yes | Set to `production` for deployment. |
| `PORT` | No | API port; defaults to `3000`. Some hosts provide this automatically. |
| `MONGODB_URI` | Yes | MongoDB connection string. The backend fails fast in production when it is missing. |
| `CORS_ORIGIN` | Yes | Comma-separated origins allowed to call the API, such as the deployed Vercel or Netlify origin. Wildcard `*` is not allowed in production. |

### Frontend

Set both frontend variables before running `npm run build`. Vite embeds them into the production bundle.

| Variable | Required in production | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Yes | API base URL used by Axios. For local development, use `/api` to use the Vite proxy. For production, use the deployed backend origin. |
| `VITE_PUBLIC_BACKEND_URL` | Yes | Public backend origin used to build links shown to users. For production, use the deployed backend origin. |

## API Reference

### Health check

```http
GET /health
```

**Response (`200 OK`):**

```json
{
  "status": "ok"
}
```

### Create a short URL

```http
POST /url
Content-Type: application/json

{
  "url": "https://example.com/a/very/long/url"
}
```

Only valid `http` and `https` URLs are accepted. Invalid input returns `400 Bad Request`.

**Response (`201 Created`):**

```json
{
  "id": "AbC123xy"
}
```

### Follow a short URL

```http
GET /url/:shortId
```

Records a visit and redirects to the original URL. Returns `404 Not Found` if the short ID does not exist.

### Get analytics

```http
GET /url/:shortId/analytics
```

**Response (`200 OK`):**

```json
{
  "totalClicks": 2,
  "visitHistory": [
    { "timestamp": 1758672000000 },
    { "timestamp": 1758672060000 }
  ]
}
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run dev:server` | Start the Express API with nodemon |
| `npm start` | Start the Express API with plain Node.js |
| `npm run build` | Type-check and build the frontend |
| `npm run typecheck` | Run TypeScript validation |
| `npm run lint` | Lint frontend source files |
| `npm run preview` | Preview the production frontend build |

## Project Structure

```text
.
├── controllers/       # URL controller logic
├── models/            # Mongoose models
├── routes/            # Express routes
├── src/               # React frontend
│   ├── api/           # API client and error handling
│   ├── components/    # UI components
│   └── types/         # TypeScript types
├── index.js           # Express application entry point
└── vite.config.ts     # Vite configuration and development proxy
```

## Deployment

### MongoDB Atlas

1. Create a free MongoDB Atlas account and cluster.
2. Create a database user with access to the deployment database.
3. Allow network access from the backend host. Add the host's outbound IP addresses in Atlas Network Access, following Render or Railway's current guidance.
4. Copy the Atlas connection string into the backend `MONGODB_URI` environment variable, replacing the username, password, and database placeholders. Do not commit this value.

### Backend on Render or Railway

1. Create a new web service from this repository.
2. Use the repository root as the service root.
3. Use `npm install` to install dependencies and `npm start` as the start command.
4. Set the backend environment variables:

   ```text
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=<MongoDB Atlas connection string>
   CORS_ORIGIN=<deployed frontend origin>
   ```

5. Deploy the service and verify `https://<backend-domain>/health` returns `{ "status": "ok" }`.
6. Add the deployed frontend origin to `CORS_ORIGIN` if it differs from the value used during the first deployment.

The backend is a Node.js service. The frontend build is deployed separately.

### Frontend on Vercel or Netlify

1. Import this repository into Vercel or Netlify.
2. Set the framework preset to Vite and the root directory to the repository root.
3. Set these environment variables before the build:

   ```text
   VITE_API_BASE_URL=<deployed backend origin>
   VITE_PUBLIC_BACKEND_URL=<deployed backend origin>
   ```

4. Use `npm run build` as the build command.
5. Publish directory: `dist`.
6. Deploy and verify link creation, redirects, and analytics from the deployed frontend.

The application is a single page without client-side routing, so no SPA fallback rewrite is required.

## License

This project is available under the ISC License.
