
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  link: string;
  stats: { label: string; value: string }[];
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
}

export interface Education {
  degree: string;
  field: string;
  university: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
}
