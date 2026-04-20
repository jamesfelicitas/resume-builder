import { Router } from 'express';
import puppeteer from 'puppeteer';
import { createDraft, getDraft, updateDraft } from '../lib/draftStore.js';
import { renderResumeHtml } from '../lib/renderResumeHtml.js';
import { resumeSchema } from '../validators/resume.js';
export const resumesRouter = Router();
resumesRouter.post('/', (req, res) => {
    const parsed = resumeSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten() });
    }
    return res.status(201).json(createDraft(parsed.data));
});
resumesRouter.get('/:id', (req, res) => {
    const draft = getDraft(req.params.id);
    if (!draft) {
        return res.status(404).json({ message: 'Draft not found' });
    }
    return res.json(draft);
});
resumesRouter.put('/:id', (req, res) => {
    const parsed = resumeSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten() });
    }
    const updated = updateDraft(req.params.id, parsed.data);
    if (!updated) {
        return res.status(404).json({ message: 'Draft not found' });
    }
    return res.json(updated);
});
resumesRouter.post('/:id/export/pdf', async (req, res) => {
    const draft = getDraft(req.params.id);
    if (!draft) {
        return res.status(404).json({ message: 'Draft not found' });
    }
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    try {
        const page = await browser.newPage();
        await page.setContent(renderResumeHtml(draft.resume), { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'Letter',
            printBackground: true,
            margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${draft.resume.basics.name || 'resume'}.pdf"`);
        return res.send(pdfBuffer);
    }
    finally {
        await browser.close();
    }
});
