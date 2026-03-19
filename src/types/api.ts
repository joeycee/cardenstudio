export type Service = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  price_from: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: number;
  client_name: string;
  business_name: string;
  role: string;
  quote: string;
  rating: number | null;
  featured: boolean;
  client_image: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PortfolioProject = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  featured_image: string | null;
  project_url: string | null;
  github_url: string | null;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  business_name: string;
  project_type: string;
  budget_range: string;
  timeline: string;
  message: string;
  recaptcha_token: string;
};

export type ContactSubmissionResponse = {
  id: number;
  created_at: string;
  notification_delivered?: boolean;
  detail?: string;
};
