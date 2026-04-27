// ============================================================================
// API response types — match the backend shapes exactly.
// ============================================================================

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface ProfileResponse {
  id?: number
  full_name: string
  job_title: string
  tagline: string
  years_of_experience: number
  professional_summary: string
  skills: SkillCategory[]

  email?: string
  phone?: string
  location?: string
  resume_url?: string
  github_url?: string
  linkedin_url?: string
  twitter_url?: string
  website_url?: string

  show_blog: boolean
  show_projects: boolean
  show_system_designs: boolean
  show_lab: boolean
  show_about: boolean
  show_education: boolean
  show_certificates: boolean
  show_experience: boolean

  current_learning: string[]
  current_building: string[]
  current_exploring: string[]

  // Site copy — customisable strings
  navbar_brand?: string
  hero_badge?: string
  hero_cluster_label?: string
  subtitle_projects?: string
  subtitle_writing?: string
  subtitle_designs?: string
  subtitle_lab?: string
  subtitle_about?: string
  subtitle_contact?: string
  contact_response_note?: string
  
  // About section headings
  heading_learning?: string
  heading_building?: string
  heading_exploring?: string

  created_at?: string
  updated_at?: string
}

export type ProjectStatus = 'building' | 'done' | 'planned' | 'exploring'

export interface ProjectResponse {
  id: number
  name: string
  description: string
  stack: string[]
  status: ProjectStatus
  github_url?: string
  details_url?: string
  github_stars: number
  github_forks: number
  featured: boolean
  display_order: number
  last_commit_date?: string
  created_at?: string
  updated_at?: string
}

export interface BlogPostResponse {
  id: number
  title: string
  slug: string
  content: string
  preview: string
  tags: string[]
  published_date: string
  read_time_minutes: number
  is_published: boolean
  views_count: number
  meta_description?: string
  meta_keywords?: string[]
  updated_date?: string
  created_at?: string
  updated_at?: string
}

export type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced'

export interface SystemDesignResponse {
  id: number
  title: string
  description: string
  stack: string[]
  notes: string[]
  diagram_url?: string
  diagram_type?: string
  complexity_level: ComplexityLevel
  created_at?: string
  updated_at?: string
}

export type LabStatus = 'experimenting' | 'testing' | 'completed'

export interface LabExperimentResponse {
  id: number
  title: string
  description: string
  stack: string[]
  status: LabStatus
  findings?: string
  created_at?: string
  updated_at?: string
}

export interface DashboardResponse {
  projects_count: number
  blog_posts_count: number
  system_designs_count: number
  lab_experiments_count: number
  uptime_percentage: number
  total_views: number
  timestamp?: string
}

export interface ContactMessageCreate {
  name: string
  email: string
  subject: string
  message: string
}

export interface EducationResponse {
  id: number
  institution: string
  degree: string
  field_of_study?: string
  start_date?: string
  end_date?: string
  description?: string
  description_points: string[]
  location?: string
  display_order: number
  created_at?: string
  updated_at?: string
}

export interface CertificateResponse {
  id: number
  title: string
  issuer: string
  issue_date?: string
  expiry_date?: string
  credential_id?: string
  credential_url?: string
  image_url?: string
  description?: string
  display_order: number
  created_at?: string
  updated_at?: string
}

export interface ExperienceResponse {
  id: number
  company: string
  position: string
  company_url?: string
  location?: string
  start_date?: string
  end_date?: string
  description?: string
  description_points: string[]
  technologies: string[]
  project_urls: string[]
  display_order: number
  created_at?: string
  updated_at?: string
}
