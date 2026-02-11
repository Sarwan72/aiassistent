# AI Assistant (MERN)

Voice-enabled AI assistant built with a MERN-style stack (Express + MongoDB backend, React + Vite frontend). The assistant uses a Gemini API endpoint for natural-language intent parsing and Cloudinary for optional image uploads.

## Project structure

- `backend/` — Express server, MongoDB models, authentication, Gemini integration
- `frontend/` — React (Vite) app, voice UI and assistant pages

## Features

- User authentication (signup / login / logout)
- Customize assistant avatar and name (image upload supported)
- Voice recognition and speech synthesis in the browser
- Intent parsing via Gemini API with JSON responses
- Built-in commands: searches (Google/YouTube), open sites, date/time, calculator, weather, etc.

## Environment variables

Backend (.env):

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret used to sign authentication tokens
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — (if using Cloudinary uploads)
- `GEMINI_API_URL` — URL for the Gemini/LLM endpoint used for intent parsing
- `PORT` — optional server port (default 5000)

Frontend (.env or .env.local for Vite):

- `VITE_BACKEND_URL` — e.g. `http://localhost:5000`

Note: keep secrets out of source control.

## Install & run

1. Backend
   - cd backend
   - npm install
   - create a `.env` file with the variables above
   - start the server (see `package.json` scripts): `npm run dev` or `npm start`

2. Frontend
   - cd frontend
   - npm install
   - set `VITE_BACKEND_URL` in `.env` (e.g. `http://localhost:5000`)
   - `npm run dev` (starts Vite dev server)

## API (overview)

- POST `/api/auth/signup` — create account
- POST `/api/auth/login` — login (sets auth cookie)
- GET `/api/auth/logout` — logout (clears cookie)
- GET `/api/user/profile` — get current user (requires auth cookie)
- PUT `/api/user/update` — update assistant name/image (multipart/form-data `assistantImage`)
- POST `/api/user/asktoassistant` — send a text command to the assistant (requires auth)

Protected endpoints require the auth cookie (JWT) returned by the login route.

## Key files to inspect

- `backend/src/gemini.js` — builds the prompt and calls the Gemini API.
- `backend/src/controllers/user.controller.js` — handles assistant commands and intent responses.
- `frontend/src/pages/Home.jsx` — voice recognition, speech synthesis, and UI for using the assistant.

## Notes & tips

- The Gemini integration expects the model to return a JSON object inside its text; the server extracts the first JSON object it finds and routes based on its `type` field.
- File uploads are stored to `backend/uploads` and (optionally) uploaded to Cloudinary.
- Update `frontend/src/context/UserContext.jsx` to change how the frontend calls the backend.

## Next steps you might want

- Add tests and CI
- Improve error handling and user feedback for LLM failures
- Add persistent sessions or refresh tokens

---
If you'd like, I can also add a short CONTRIBUTING.md or example `.env.example` file next.
