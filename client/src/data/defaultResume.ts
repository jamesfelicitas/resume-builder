import type { ResumeData } from '../types';

export const defaultResume: ResumeData = {
  basics: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  awards: [],
  publications: [],
};
