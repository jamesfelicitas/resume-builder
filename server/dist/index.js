import cors from 'cors';
import express from 'express';
import { resumesRouter } from './routes/resumes.js';
const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => {
    res.json({ ok: true });
});
app.use('/api/resumes', resumesRouter);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
