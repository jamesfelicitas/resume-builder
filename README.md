# Resume Builder

Harvard-style resume builder scaffold using React and Node.js.

## Structure

- `client/` React UI and Harvard template preview
- `server/` Express API and validation

## Next step

Install dependencies in each workspace and then wire the preview to the export endpoint.

## Railway backend deployment

The PDF export runs through the Express server, so that service should be deployed to Railway instead of Vercel.

Use the repository root as the Railway project directory and let Railway run the root scripts:

- Build command: `npm run build`
- Start command: `npm start`

Set these environment variables on Railway:

- `PORT` is provided by Railway automatically.
- `CORS_ALLOWED_ORIGINS` should include your Vercel frontend URL, for example `https://your-app.vercel.app`.

Set this environment variable on Vercel for the client:

- `VITE_API_BASE_URL` should point to your Railway service URL, for example `https://your-backend.up.railway.app`.

After that, the Vercel frontend will call the Railway backend for draft saves and PDF downloads.
