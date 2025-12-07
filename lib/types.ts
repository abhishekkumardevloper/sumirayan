export interface UserMeta {
  id: string
  user_id: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'pro'
  status: 'inactive' | 'active' | 'cancelled' | 'expired'
  started_at: string | null
  ends_at: string | null
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  tag: string | null
  is_premium: boolean
  is_featured: boolean
  image_url: string | null
  read_time: string | null
  author_id: string | null
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string | null
  date: string
  location: string | null
  status: 'upcoming' | 'completed'
  image_url: string | null
  created_at: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: 'design' | 'photography' | 'art'
  short_description: string | null
  image_url: string | null
  client_name: string | null
  created_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  company: string | null
  role: string | null
  quote: string
  avatar_url: string | null
  created_at: string
}

export interface Job {
  id: string
  title: string
  description: string | null
  location: string | null
  type: string | null
  status: 'open' | 'closed'
  created_at: string
}

export interface Application {
  id: string
  job_id: string
  applicant_name: string
  email: string
  resume_url: string | null
  message: string | null
  created_at: string
}

export interface ProjectRequest {
  id: string
  user_id: string | null
  name: string
  email: string
  phone: string | null
  project_type: string | null
  budget: string | null
  message: string | null
  attachments: Record<string, any> | null
  created_at: string
}
