import React from 'react';
import type { ResumeData } from '../types';

type Props = {
  resume: ResumeData;
};

export function HarvardTemplate({ resume }: Props) {
  return (
    <article className="resume-page">
      <header className="resume-header">
        <h1>{resume.basics.name}</h1>
        <p className="contact-line">
          {resume.basics.email} | {resume.basics.phone} | {resume.basics.location}
        </p>
        <p className="contact-line">
          {resume.basics.linkedin} | {resume.basics.website}
        </p>
      </header>

      {resume.summary ? (
        <section>
          <h2>Summary</h2>
          <p className="resume-paragraph">{resume.summary}</p>
        </section>
      ) : null}

      <section>
        <h2>Education</h2>
        {resume.education.map((entry) => (
          <div key={`${entry.school}-${entry.degree}`} className="resume-item">
            <div className="resume-item-row">
              <strong>{entry.school}</strong>
              <span>{entry.location}</span>
            </div>
            <div className="resume-item-row">
              <span>{entry.degree}</span>
              <span>{entry.startDate} - {entry.endDate}</span>
            </div>
            <ul className="resume-bullets">
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Experience</h2>
        {resume.experience.map((entry) => (
          <div key={`${entry.organization}-${entry.title}`} className="resume-item">
            <div className="resume-item-row">
              <strong>{entry.title}</strong>
              <span>{entry.location}</span>
            </div>
            <div className="resume-item-row">
              <span>{entry.organization}</span>
              <span>{entry.startDate} - {entry.endDate}</span>
            </div>
            <ul className="resume-bullets">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {resume.projects.map((entry) => (
          <div key={`${entry.organization}-${entry.title}`} className="resume-item">
            <div className="resume-item-row">
              <strong>{entry.title}</strong>
              <span>{entry.location}</span>
            </div>
            <div className="resume-item-row">
              <span>{entry.organization}</span>
              <span>{entry.startDate} - {entry.endDate}</span>
            </div>
            <ul className="resume-bullets">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <p className="resume-paragraph">{resume.skills.join(' | ')}</p>
      </section>

      {resume.awards.length ? (
        <section>
          <h2>Awards</h2>
          <p className="resume-paragraph">{resume.awards.join(' | ')}</p>
        </section>
      ) : null}

      {resume.publications.length ? (
        <section>
          <h2>Publications</h2>
          <p className="resume-paragraph">{resume.publications.join(' | ')}</p>
        </section>
      ) : null}
    </article>
  );
}
