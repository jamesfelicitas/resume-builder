export type ResumeEntry = {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  location?: string;
  bullets: string[];
};

export type ResumeProject = {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  location?: string;
  bullets: string[];
};

export type ResumeEducation = {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location?: string;
  details: string[];
};

export type ResumeData = {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  education: ResumeEducation[];
  experience: ResumeEntry[];
  projects: ResumeProject[];
  skills: string[];
  awards: string[];
  publications: string[];
};
