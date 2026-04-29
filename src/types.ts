export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
}

export interface Application {
  id: string;
  company: string;
  role: string;
  status: 'Draft' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  dateApplied: string;
  notes?: string;
}

export interface TargetCompany {
  name: string;
  description: string;
  matchScore: number; // calculated by AI
  openRoles: number;
}
