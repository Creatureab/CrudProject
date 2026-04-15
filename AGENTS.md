# Repository Guidelines

## Project Structure & Module Organization
This repository is split into `backend/` and `frontend/my-app/`.

- `backend/index.js` starts the Express API and MongoDB connection.
- `backend/controller/`, `backend/models/`, and `backend/routes/` hold request handlers, Mongoose schemas, and route definitions.
- `frontend/my-app/src/app/` contains the Next.js App Router entry points.
- `frontend/my-app/src/components/`, `src/actions/`, `src/reducers/`, `src/redux/`, and `src/api/` contain the UI, Redux flow, and API client code.
- Static assets live in `frontend/my-app/public/` and `frontend/my-app/src/image/`.

Ignore generated or installed content such as `node_modules/` and `.next/`.

## Build, Test, and Development Commands
Run commands from the package that owns them.

- `cd backend && npm run dev`: start the Express API with `nodemon` on port `5000`.
- `cd backend && npm start`: same backend startup path as `dev`.
- `cd frontend/my-app && npm run dev`: start the Next.js app on port `3000`.
- `cd frontend/my-app && npm run build`: create a production build.
- `cd frontend/my-app && npm start`: serve the production build.
- `cd frontend/my-app && npm run lint`: run ESLint with the Next.js config.

## Coding Style & Naming Conventions
Use JavaScript with ES modules in the backend and React function components in the frontend. Match the surrounding file style: many backend files use 4-space indentation, while newer frontend files use 2 spaces. Keep imports grouped at the top, prefer semicolons, and use:

- `PascalCase` for React components such as `Posts` and `Form`
- `camelCase` for functions, variables, and Redux actions
- descriptive lowercase filenames for backend modules such as `routes/post.js`

Use the `@/*` alias in `frontend/my-app` for imports from `src/`.

## Testing Guidelines

There are currently no automated test scripts or coverage gates in this workspace. Until tests are added, contributors should at minimum run `npm run lint` in `frontend/my-app` and manually verify the main flow: loading posts, creating a memory, and API connectivity between ports `3000` and `5000`.

## Commit & Pull Request Guidelines
Local `.git` history is not present in this workspace, so no existing commit convention can be verified here. Use short, imperative commit messages with a clear scope, for example `frontend: add post form validation`.

Pull requests should include a concise summary, affected areas, manual test notes, and screenshots for UI changes.

## Security & Configuration Tips
Do not hardcode secrets. The MongoDB connection string is currently embedded in `backend/index.js`; move it to environment variables before sharing or deploying the project.

