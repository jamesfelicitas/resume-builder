import React, { useEffect, useMemo, useState } from 'react';
import { defaultResume } from './data/defaultResume';
import { ResumeBuilder } from './components/ResumeBuilder';
import { HarvardResumePreview } from './components/HarvardResumePreview';
import type { ResumeData } from './types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';
const draftResumeKey = 'resume-builder:draft-resume';

function loadStoredResume() {
  const storedResume = window.localStorage.getItem(draftResumeKey);

  if (!storedResume) {
    return defaultResume;
  }

  try {
    return JSON.parse(storedResume) as ResumeData;
  } catch {
    return defaultResume;
  }
}

function toSafePdfFileName(value: string) {
  const cleaned = value
    .replace(/[\\/:*?"<>|\x00-\x1f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || 'resume';
}

export default function App() {
  const [resume, setResume] = useState<ResumeData>(() => loadStoredResume());
  const [draftId, setDraftId] = useState<string | null>(null);
  const [status, setStatus] = useState('Ready');
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const draftPayload = useMemo(() => JSON.stringify(resume), [resume]);

  useEffect(() => {
    void createDraft(resume);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(draftResumeKey, draftPayload);
  }, [draftPayload]);

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
    try {
      setStatus('Preparing PDF...');
      const response = await fetch(`${apiBaseUrl}/api/resumes/export/pdf/direct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });

      if (!response.ok) {
        let responseBody = '';

        try {
          responseBody = await response.text();
        } catch {
          responseBody = '';
        }

        console.error('PDF export failed', {
          url: `${apiBaseUrl}/api/resumes/export/pdf/direct`,
          status: response.status,
          statusText: response.statusText,
          body: responseBody,
        });

        setStatus(`PDF export failed (${response.status})`);
        return;
      }

      const contentType = response.headers.get('content-type') ?? '';

      if (!contentType.toLowerCase().includes('application/pdf')) {
        console.error('PDF export returned unexpected content-type', {
          url: `${apiBaseUrl}/api/resumes/export/pdf/direct`,
          contentType,
        });
        setStatus('PDF export failed (invalid response)');
        return;
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        console.error('PDF export returned empty blob', {
          url: `${apiBaseUrl}/api/resumes/export/pdf/direct`,
        });
        setStatus('PDF export failed (empty PDF)');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${toSafePdfFileName(resume.basics.name)}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.setTimeout(() => window.URL.revokeObjectURL(url), 60000);
      setStatus('PDF ready');
    } catch (error) {
      console.error('PDF export request threw an error', error);
      const message = error instanceof Error ? error.message : '';
      setStatus(message ? `PDF export failed (${message})` : 'PDF export failed');
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Harvard-style resume builder</p>
          <button
            type="button"
            className="secondary-button mobile-preview-toggle"
            onClick={() => setShowMobilePreview((current) => !current)}
          >
            {showMobilePreview ? 'Back to Editor' : 'Preview'}
          </button>
        </div>
      </header>

      <main className="app-layout">
        <section className={`editor-panel ${showMobilePreview ? 'hidden-mobile' : ''}`}>
          <ResumeBuilder resume={resume} onChange={setResume} onExportPdf={exportPdf} />
        </section>

        <section className={`preview-panel ${showMobilePreview ? '' : 'hidden-mobile'}`}>
          <HarvardResumePreview resume={resume} />
        </section>
      </main>
    </div>
  );
}
