import { z } from 'zod';
export const resumeSchema = z.object({
    basics: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        location: z.string().min(1),
        linkedin: z.string().optional().default(''),
        website: z.string().optional().default(''),
    }),
    summary: z.string().optional().default(''),
    education: z.array(z.object({
        school: z.string().min(1),
        degree: z.string().min(1),
        startDate: z.string().min(1),
        endDate: z.string().min(1),
        location: z.string().optional().default(''),
        details: z.array(z.string()),
    })),
    experience: z.array(z.object({
        title: z.string().min(1),
        organization: z.string().min(1),
        startDate: z.string().min(1),
        endDate: z.string().min(1),
        location: z.string().optional().default(''),
        bullets: z.array(z.string()),
    })),
    projects: z.array(z.object({
        title: z.string().min(1),
        organization: z.string().min(1),
        startDate: z.string().min(1),
        endDate: z.string().min(1),
        location: z.string().optional().default(''),
        bullets: z.array(z.string()),
    })),
    skills: z.array(z.string()),
    awards: z.array(z.string()),
    publications: z.array(z.string()),
});
