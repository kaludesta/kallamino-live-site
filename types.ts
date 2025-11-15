
export interface NavLink {
  name: string;
  path: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationLink: string;
  image: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string; 
  image: string;
}

export interface Resource {
  id: number;
  title: string;
  type: 'PDF' | 'Slides' | 'Tutorial' | 'Link';
  description: string;
  url: string;
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    album: string;
}

export interface MembershipSubmission {
  id: number;
  name: string;
  grade: string;
  skills: string;
  telegram: string;
  date: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
}
