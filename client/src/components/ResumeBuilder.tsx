import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ResumeData, ResumeEducation, ResumeEntry, ResumeProject } from '../types';

type Props = {
  resume: ResumeData;
  onChange: Dispatch<SetStateAction<ResumeData>>;
  onExportPdf: () => void;
};

export function ResumeBuilder({ resume, onChange, onExportPdf }: Props) {
  function updateBasics(field: keyof ResumeData['basics'], value: string) {
    onChange((current) => ({
      ...current,
      basics: {
        ...current.basics,
        [field]: value,
      },
    }));
  }

  function updateEducation(index: number, field: keyof ResumeEducation, value: string | string[]) {
    onChange((current) => ({
      ...current,
      education: current.education.map((entry, entryIndex) => (entryIndex === index ? { ...entry, [field]: value } : entry)),
    }));
  }

  function updateExperience(index: number, field: keyof ResumeEntry, value: string | string[]) {
    onChange((current) => ({
      ...current,
      experience: current.experience.map((entry, entryIndex) => (entryIndex === index ? { ...entry, [field]: value } : entry)),
    }));
  }

  function updateProject(index: number, field: keyof ResumeProject, value: string | string[]) {
    onChange((current) => ({
      ...current,
      projects: current.projects.map((entry, entryIndex) => (entryIndex === index ? { ...entry, [field]: value } : entry)),
    }));
  }

  function updateListSection(section: 'skills' | 'awards' | 'publications', index: number, value: string) {
    onChange((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));
  }

  function addListItem(section: 'skills' | 'awards' | 'publications') {
    onChange((current) => ({
      ...current,
      [section]: [...current[section], ''],
    }));
  }

  function removeListItem(section: 'skills' | 'awards' | 'publications', index: number) {
    onChange((current) => ({
      ...current,
      [section]: current[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function addEducation() {
    onChange((current) => ({
      ...current,
      education: [
        ...current.education,
        {
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
          location: '',
          details: [''],
        },
      ],
    }));
  }

  function addExperience() {
    onChange((current) => ({
      ...current,
      experience: [
        ...current.experience,
        {
          title: '',
          organization: '',
          startDate: '',
          endDate: '',
          location: '',
          bullets: [''],
        },
      ],
    }));
  }

  function addProject() {
    onChange((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          title: '',
          organization: '',
          startDate: '',
          endDate: '',
          location: '',
          bullets: [''],
        },
      ],
    }));
  }

  return (
    <div className="builder-card">
      <div className="builder-header-row">
        <h2>Edit Content</h2>
        <button type="button" className="secondary-button" onClick={onExportPdf}>
          Export PDF
        </button>
      </div>

      <details className="builder-section category-card" open>
        <summary className="section-summary">Profile</summary>
        <label>
          Name
          <input value={resume.basics.name} onChange={(event) => updateBasics('name', event.target.value)} />
        </label>
        <label>
          Email
          <input value={resume.basics.email} onChange={(event) => updateBasics('email', event.target.value)} />
        </label>
        <label>
          Phone
          <input value={resume.basics.phone} onChange={(event) => updateBasics('phone', event.target.value)} />
        </label>
        <label>
          Location
          <input value={resume.basics.location} onChange={(event) => updateBasics('location', event.target.value)} />
        </label>
        <label>
          LinkedIn
          <input value={resume.basics.linkedin} onChange={(event) => updateBasics('linkedin', event.target.value)} />
        </label>
        <label>
          Website
          <input value={resume.basics.website} onChange={(event) => updateBasics('website', event.target.value)} />
        </label>
        <label>
          Summary
          <textarea
            rows={4}
            value={resume.summary}
            onChange={(event) => onChange((current) => ({ ...current, summary: event.target.value }))}
          />
        </label>
      </details>

      <SectionCollection title="Education" onAdd={addEducation}>
        {resume.education.map((entry, index) => (
          <div key={`education-${index}`} className="repeatable-card">
            <label>
              School
              <input value={entry.school} onChange={(event) => updateEducation(index, 'school', event.target.value)} />
            </label>
            <label>
              Degree
              <input value={entry.degree} onChange={(event) => updateEducation(index, 'degree', event.target.value)} />
            </label>
            <div className="two-up">
              <label>
                Start
                <input value={entry.startDate} onChange={(event) => updateEducation(index, 'startDate', event.target.value)} />
              </label>
              <label>
                End
                <input value={entry.endDate} onChange={(event) => updateEducation(index, 'endDate', event.target.value)} />
              </label>
            </div>
            <label>
              Location
              <input value={entry.location ?? ''} onChange={(event) => updateEducation(index, 'location', event.target.value)} />
            </label>
            <label>
              Details separated by new lines
              <textarea
                rows={3}
                value={entry.details.join('\n')}
                onChange={(event) => updateEducation(index, 'details', event.target.value.split('\n').filter(Boolean))}
              />
            </label>
          </div>
        ))}
      </SectionCollection>

      <SectionCollection title="Experience" onAdd={addExperience}>
        {resume.experience.map((entry, index) => (
          <div key={`experience-${index}`} className="repeatable-card">
            <label>
              Role
              <input value={entry.title} onChange={(event) => updateExperience(index, 'title', event.target.value)} />
            </label>
            <label>
              Company
              <input value={entry.organization} onChange={(event) => updateExperience(index, 'organization', event.target.value)} />
            </label>
            <div className="two-up">
              <label>
                Start
                <input value={entry.startDate} onChange={(event) => updateExperience(index, 'startDate', event.target.value)} />
              </label>
              <label>
                End
                <input value={entry.endDate} onChange={(event) => updateExperience(index, 'endDate', event.target.value)} />
              </label>
            </div>
            <label>
              Location
              <input value={entry.location ?? ''} onChange={(event) => updateExperience(index, 'location', event.target.value)} />
            </label>
            <label>
              Bullets separated by new lines
              <textarea
                rows={4}
                value={entry.bullets.join('\n')}
                onChange={(event) => updateExperience(index, 'bullets', event.target.value.split('\n').filter(Boolean))}
              />
            </label>
          </div>
        ))}
      </SectionCollection>

      <SectionCollection title="Projects" onAdd={addProject}>
        {resume.projects.map((entry, index) => (
          <div key={`project-${index}`} className="repeatable-card">
            <label>
              Project
              <input value={entry.title} onChange={(event) => updateProject(index, 'title', event.target.value)} />
            </label>
            <label>
              Organization
              <input value={entry.organization} onChange={(event) => updateProject(index, 'organization', event.target.value)} />
            </label>
            <div className="two-up">
              <label>
                Start
                <input value={entry.startDate} onChange={(event) => updateProject(index, 'startDate', event.target.value)} />
              </label>
              <label>
                End
                <input value={entry.endDate} onChange={(event) => updateProject(index, 'endDate', event.target.value)} />
              </label>
            </div>
            <label>
              Location
              <input value={entry.location ?? ''} onChange={(event) => updateProject(index, 'location', event.target.value)} />
            </label>
            <label>
              Bullets separated by new lines
              <textarea
                rows={4}
                value={entry.bullets.join('\n')}
                onChange={(event) => updateProject(index, 'bullets', event.target.value.split('\n').filter(Boolean))}
              />
            </label>
          </div>
        ))}
      </SectionCollection>

      <SectionCollection title="Skills" onAdd={() => addListItem('skills')}>
        {resume.skills.map((skill, index) => (
          <div key={`skill-${index}`} className="repeatable-row">
            <label>
              Skill {index + 1}
              <input value={skill} onChange={(event) => updateListSection('skills', index, event.target.value)} />
            </label>
            <button type="button" className="secondary-button remove-button" onClick={() => removeListItem('skills', index)}>
              Remove
            </button>
          </div>
        ))}
      </SectionCollection>

      <SectionCollection title="Awards" onAdd={() => addListItem('awards')}>
        {resume.awards.map((award, index) => (
          <div key={`award-${index}`} className="repeatable-row">
            <label>
              Award {index + 1}
              <input value={award} onChange={(event) => updateListSection('awards', index, event.target.value)} />
            </label>
            <button type="button" className="secondary-button remove-button" onClick={() => removeListItem('awards', index)}>
              Remove
            </button>
          </div>
        ))}
      </SectionCollection>

      <SectionCollection title="Publications" onAdd={() => addListItem('publications')}>
        {resume.publications.map((publication, index) => (
          <div key={`publication-${index}`} className="repeatable-row">
            <label>
              Publication {index + 1}
              <input value={publication} onChange={(event) => updateListSection('publications', index, event.target.value)} />
            </label>
            <button type="button" className="secondary-button remove-button" onClick={() => removeListItem('publications', index)}>
              Remove
            </button>
          </div>
        ))}
      </SectionCollection>

      <p className="builder-note">This scaffold keeps the Harvard template fixed; the form only changes content.</p>
    </div>
  );
}

type SectionCollectionProps = {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
};

function SectionCollection({ title, onAdd, children }: SectionCollectionProps) {
  return (
    <details className="builder-section category-card">
      <summary className="section-summary">{title}</summary>
      <div className="builder-header-row section-actions">
        <h3>{title}</h3>
        <button type="button" className="secondary-button" onClick={onAdd}>
          Add {title}
        </button>
      </div>
      <div className="builder-stack">{children}</div>
    </details>
  );
}
