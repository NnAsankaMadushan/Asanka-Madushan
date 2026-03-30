
export type ProjectPlatform = 'mobile' | 'web';

export interface Project {
  id: string;
  title: string;
  category: string;
  platforms?: ProjectPlatform[];
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  link: string;
  repositoryLinks?: Partial<Record<ProjectPlatform, string>>;
  stats: { label: string; value: string }[];
  video?: string;
  embedUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  color?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description?: string;
  pinnedToBottom?: boolean;
}

export interface Education {
  degree: string;
  field?: string;
  university: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  link?: string;
  categories: ('mobile' | 'ai/ml' | 'web development' | 'devops')[];
}
