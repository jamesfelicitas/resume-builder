export function renderResumeHtml(resume) {
    const educationHtml = resume.education
        .map((entry) => `
      <div class="resume-item">
        <div class="resume-item-row">
          <strong>${escapeHtml(entry.school)}</strong>
          <span>${escapeHtml(entry.startDate)} - ${escapeHtml(entry.endDate)}</span>
        </div>
        <div class="resume-item-row">
          <span>${escapeHtml(entry.degree)}</span>
          <span>${escapeHtml(entry.location ?? '')}</span>
        </div>
        <ul>
          ${entry.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}
        </ul>
      </div>
    `)
        .join('');
    const experienceHtml = resume.experience
        .map((entry) => `
      <div class="resume-item">
        <div class="resume-item-row">
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(entry.startDate)} - ${escapeHtml(entry.endDate)}</span>
        </div>
        <div class="resume-item-row">
          <span>${escapeHtml(entry.organization)}</span>
          <span>${escapeHtml(entry.location ?? '')}</span>
        </div>
        <ul>
          ${entry.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
        </ul>
      </div>
    `)
        .join('');
    const projectHtml = resume.projects
        .map((entry) => `
      <div class="resume-item">
        <div class="resume-item-row">
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(entry.startDate)} - ${escapeHtml(entry.endDate)}</span>
        </div>
        <div class="resume-item-row">
          <span>${escapeHtml(entry.organization)}</span>
          <span>${escapeHtml(entry.location ?? '')}</span>
        </div>
        <ul>
          ${entry.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
        </ul>
      </div>
    `)
        .join('');
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(resume.basics.name)} - Resume</title>
        <style>
          @page { size: letter; margin: 0.5in; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            color: #000;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.25;
          }
          .resume-page {
            width: 100%;
          }
          .resume-header {
            text-align: center;
            margin-bottom: 18px;
          }
          .resume-header h1 {
            margin: 0;
            font-size: 22pt;
          }
          .contact-line {
            margin: 4px 0 0;
          }
          section { margin-top: 16px; }
          section h2 {
            margin: 0 0 8px;
            font-size: 11pt;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .resume-item { margin-bottom: 12px; }
          .resume-item-row {
            display: flex;
            justify-content: space-between;
            gap: 12px;
          }
          .resume-item ul {
            margin: 6px 0 0 18px;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <article class="resume-page">
          <header class="resume-header">
            <h1>${escapeHtml(resume.basics.name)}</h1>
            <p class="contact-line">${escapeHtml(resume.basics.email)} | ${escapeHtml(resume.basics.phone)} | ${escapeHtml(resume.basics.location)}</p>
            <p class="contact-line">${escapeHtml(resume.basics.linkedin)} | ${escapeHtml(resume.basics.website)}</p>
          </header>

          ${resume.summary ? `<section><h2>Summary</h2><p>${escapeHtml(resume.summary)}</p></section>` : ''}

          <section>
            <h2>Education</h2>
            ${educationHtml}
          </section>

          <section>
            <h2>Experience</h2>
            ${experienceHtml}
          </section>

          ${resume.projects.length ? `<section><h2>Projects</h2>${projectHtml}</section>` : ''}

          ${resume.skills.length ? `<section><h2>Skills</h2><p>${escapeHtml(resume.skills.join(' | '))}</p></section>` : ''}
          ${resume.awards.length ? `<section><h2>Awards</h2><p>${escapeHtml(resume.awards.join(' | '))}</p></section>` : ''}
          ${resume.publications.length ? `<section><h2>Publications</h2><p>${escapeHtml(resume.publications.join(' | '))}</p></section>` : ''}
        </article>
      </body>
    </html>
  `;
}
function escapeHtml(value) {
    return value
        .split('&').join('&amp;')
        .split('<').join('&lt;')
        .split('>').join('&gt;')
        .split('"').join('&quot;')
        .split("'").join('&#39;');
}
