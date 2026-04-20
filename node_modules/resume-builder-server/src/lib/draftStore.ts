import { randomUUID } from 'node:crypto';
import type { ResumePayload } from '../validators/resume.js';

const drafts = new Map<string, ResumePayload>();

export function createDraft(resume: ResumePayload) {
  const id = randomUUID();
  drafts.set(id, resume);
  return { id, resume };
}

export function getDraft(id: string) {
  const resume = drafts.get(id);
  return resume ? { id, resume } : null;
}

export function updateDraft(id: string, resume: ResumePayload) {
  if (!drafts.has(id)) {
    return null;
  }

  drafts.set(id, resume);
  return { id, resume };
}
