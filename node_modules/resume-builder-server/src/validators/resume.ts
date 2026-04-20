import { z } from 'zod';

export const resumeSchema = z.object({
  basics: z.object({
    name: z.string().default(''),
    email: z.string().default(''),
    phone: z.string().default(''),
    location: z.string().default(''),
    linkedin: z.string().optional().default(''),
    website: z.string().optional().default(''),
  }),
  summary: z.string().optional().default(''),
  education: z.array(
    z.object({
      school: z.string().default(''),
      degree: z.string().default(''),
      startDate: z.string().default(''),
      endDate: z.string().default(''),
      location: z.string().optional().default(''),
      details: z.array(z.string()).default([]),
    }),
  ),
  experience: z.array(
    z.object({
      title: z.string().default(''),
      organization: z.string().default(''),
      startDate: z.string().default(''),
      endDate: z.string().default(''),
      location: z.string().optional().default(''),
      bullets: z.array(z.string()).default([]),
    }),
  ),
  projects: z.array(
    z.object({
      title: z.string().default(''),
      organization: z.string().default(''),
      startDate: z.string().default(''),
      endDate: z.string().default(''),
      location: z.string().optional().default(''),
      bullets: z.array(z.string()).default([]),
    }),
  ),
  skills: z.array(z.string()).default([]),
  awards: z.array(z.string()).default([]),
  publications: z.array(z.string()).default([]),
});

export type ResumePayload = z.infer<typeof resumeSchema>;
