# Resume Builder

Harvard-style resume builder scaffold using React and Node.js.

## Structure

- `client/` React UI and Harvard template preview
- `server/` Express API and validation

## Next step

Install dependencies in each workspace and then wire the preview to the export endpoint.

## Backend deployment

The PDF export runs through the Express server, so that service should be deployed as a Node service, such as Render or Railway, instead of Netlify/Vercel static hosting.

Use the repository root as the backend project directory and let the host run the root scripts:

- Build command: `npm run build`
- Start command: `npm start`

Set these environment variables on the backend host:

- `PORT` is provided by Render/Railway automatically.
- `CORS_ALLOWED_ORIGINS` should include your frontend URL, for example `https://harvardresume-builder.netlify.app`.

Set this environment variable on Netlify/Vercel for the client:

- `VITE_API_BASE_URL` should point to your backend service URL, for example `https://resume-builder-q8nz.onrender.com`.

After that, the frontend will call the backend for draft saves and PDF downloads.
