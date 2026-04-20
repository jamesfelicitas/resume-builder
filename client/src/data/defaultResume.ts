import type { ResumeData } from '../types';

export const defaultResume: ResumeData = {
  basics: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '(555) 123-4567',
    location: 'Boston, MA',
    linkedin: 'linkedin.com/in/janedoe',
    website: 'janedoe.dev',
  },
  summary: '',
  education: [
    {
      school: 'Harvard University',
      degree: 'B.A. in Economics',
      startDate: '2020',
      endDate: '2024',
      location: 'Cambridge, MA',
      details: ['GPA: 3.9/4.0', 'Relevant coursework: Data Analysis, Econometrics'],
    },
  ],
  experience: [
    {
      title: 'Software Engineer',
      organization: 'Acme Corp',
      startDate: '2024',
      endDate: 'Present',
      location: 'Remote',
      bullets: ['Built a resume export flow that reduced manual formatting time by 60%.', 'Improved form completion by simplifying the editing workflow.'],
    },
  ],
  projects: [
    {
      title: 'Resume Builder',
      organization: 'Personal Project',
      startDate: '2026',
      endDate: 'Present',
      location: 'Remote',
      bullets: ['Built a Harvard-style resume builder with live preview and PDF export.'],
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Puppeteer'],
  awards: [],
  publications: [],
};
