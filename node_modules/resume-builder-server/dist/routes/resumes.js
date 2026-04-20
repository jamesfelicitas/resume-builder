import { Router } from 'express';
import puppeteer from 'puppeteer';
import { createDraft, getDraft, updateDraft } from '../lib/draftStore.js';
import { renderResumeHtml } from '../lib/renderResumeHtml.js';
import { resumeSchema } from '../validators/resume.js';
export const resumesRouter = Router();
function toSafePdfFileName(value) {
    const cleaned = value
        .replace(/[\\/:*?"<>|\x00-\x1f]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return cleaned || 'resume';
}
async function sendPdfFromResume(resume, filenameBase, res) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    try {
        const page = await browser.newPage();
        await page.setContent(renderResumeHtml(resume), { waitUntil: 'networkidle0' });
        const pdfBytes = await page.pdf({
            format: 'Letter',
            printBackground: true,
            margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
        });
        const pdfBuffer = Buffer.from(pdfBytes);
        const safeFileName = toSafePdfFileName(filenameBase);
        res.status(200);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}.pdf"`);
        res.setHeader('Content-Length', String(pdfBuffer.length));
        return res.end(pdfBuffer);
    }
    catch (error) {
        console.error('Failed to generate PDF', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Failed to generate PDF' });
        }
        return res.end();
    }
    finally {
        await browser.close();
    }
}
async function sendResumePdf(id, res) {
    const draft = getDraft(id);
    if (!draft) {
        return res.status(404).json({ message: 'Draft not found' });
    }
    return sendPdfFromResume(draft.resume, draft.resume.basics.name, res);
}
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
resumesRouter.post('/export/pdf/direct', async (req, res) => {
    const parsed = resumeSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.flatten() });
    }
    return sendPdfFromResume(parsed.data, parsed.data.basics.name, res);
});
resumesRouter.post('/:id/export/pdf', async (req, res) => sendResumePdf(req.params.id, res));
resumesRouter.get('/:id/export/pdf', async (req, res) => sendResumePdf(req.params.id, res));
