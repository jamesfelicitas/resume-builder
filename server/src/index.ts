import cors from 'cors';
import express from 'express';
import { resumesRouter } from './routes/resumes.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:5173',
]);

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.has(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/resumes', resumesRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
