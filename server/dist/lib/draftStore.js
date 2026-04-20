import { randomUUID } from 'node:crypto';
const drafts = new Map();
export function createDraft(resume) {
    const id = randomUUID();
    drafts.set(id, resume);
    return { id, resume };
}
export function getDraft(id) {
    const resume = drafts.get(id);
    return resume ? { id, resume } : null;
}
export function updateDraft(id, resume) {
    if (!drafts.has(id)) {
        return null;
    }
    drafts.set(id, resume);
    return { id, resume };
}
