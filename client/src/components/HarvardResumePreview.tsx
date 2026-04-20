import React from 'react';
import type { ResumeData } from '../types';
import { HarvardTemplate } from '../templates/HarvardTemplate';

type Props = {
  resume: ResumeData;
};

export function HarvardResumePreview({ resume }: Props) {
  return <HarvardTemplate resume={resume} />;
}
