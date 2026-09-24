# URL Shortener

A full-stack URL shortening service with a React interface, an Express API, and MongoDB persistence. Create compact links, redirect visitors to their destination, and inspect timestamped visit activity.

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
- [MongoDB](https://www.mongodb.com/) running locally

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

For local development, the defaults in `.env.example` are:

```env
VITE_API_BASE_URL=/api
VITE_PUBLIC_BACKEND_URL=http://localhost:3000
```

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL used by the frontend to call the API. The Vite development server proxies `/api` to the backend. |
| `VITE_PUBLIC_BACKEND_URL` | Public backend origin used to build links shown to users. |

### 4. Start the backend

The API runs on port `3000` and connects to `mongodb://localhost:27017/short-url`.

```bash
npm start
```

### 5. Start the frontend

In a second terminal, run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API Reference

### Create a short URL

```http
POST /url
Content-Type: application/json

{
  "url": "https://example.com/a/very/long/url"
}
```

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
| `npm start` | Start the Express API with nodemon |
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

## Production Notes

- The backend currently uses a fixed port and local MongoDB connection string in `index.js`.
- `npm run build` builds the frontend only. A production API process must run separately and the environment variables must be set before building the frontend.
- When the frontend and API use different origins, configure the API to allow requests from the deployed frontend.

## License

This project is available under the ISC License.
