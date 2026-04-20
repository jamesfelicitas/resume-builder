import React, { useEffect, useMemo, useState } from 'react';
import { defaultResume } from './data/defaultResume';
import { ResumeBuilder } from './components/ResumeBuilder';
import { HarvardResumePreview } from './components/HarvardResumePreview';
import type { ResumeData } from './types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export default function App() {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [status, setStatus] = useState('Ready');

  const draftPayload = useMemo(() => JSON.stringify(resume), [resume]);

  useEffect(() => {
    window.localStorage.removeItem('resume-builder:draft-id');
    void createDraft(defaultResume);
  }, []);

  useEffect(() => {
    if (!draftId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveDraft(draftId, resume);
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [draftId, draftPayload]);

  async function createDraft(initialResume: ResumeData) {
    setStatus('Creating draft...');

    const response = await fetch(`${apiBaseUrl}/api/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initialResume),
    });

    if (!response.ok) {
      setStatus('Draft creation failed');
      return;
    }

    const data = await response.json() as { id: string; resume: ResumeData };
    setDraftId(data.id);
    setResume(data.resume);
    window.localStorage.setItem('resume-builder:draft-id', data.id);
    setStatus('Draft loaded');
  }

  async function loadDraft(id: string) {
    setStatus('Loading draft...');

    const response = await fetch(`${apiBaseUrl}/api/resumes/${id}`);

    if (!response.ok) {
      window.localStorage.removeItem('resume-builder:draft-id');
      await createDraft(defaultResume);
      return;
    }

    const data = await response.json() as { id: string; resume: ResumeData };
    setDraftId(data.id);
    setResume(data.resume);
    setStatus('Draft loaded');
  }

  async function saveDraft(id: string, nextResume: ResumeData) {
    setStatus('Saving...');

    const response = await fetch(`${apiBaseUrl}/api/resumes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextResume),
    });

    if (response.status === 404) {
      window.localStorage.removeItem('resume-builder:draft-id');
      await createDraft(nextResume);
      return;
    }

    if (!response.ok) {
      setStatus('Save failed');
      return;
    }

    setStatus('Saved');
  }

  async function exportPdf() {
    if (!draftId) {
      return;
    }

    const response = await fetch(`${apiBaseUrl}/api/resumes/${draftId}/export/pdf`, {
      method: 'POST',
    });

    if (!response.ok) {
      setStatus('PDF export failed');
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${resume.basics.name || 'resume'}.pdf`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    setStatus('PDF ready');
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Harvard-style resume builder</p>
          
        </div>
      </header>

      <main className="app-layout">
        <section className="editor-panel">
          <ResumeBuilder resume={resume} onChange={setResume} onExportPdf={exportPdf} />
        </section>

        <section className="preview-panel">
          <HarvardResumePreview resume={resume} />
        </section>
      </main>
    </div>
  );
}
