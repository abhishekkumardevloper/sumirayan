import { supabase, isSupabaseConfigured } from './supabaseClient'
import type { Post, Event, PortfolioItem, Testimonial, Job, Application, ProjectRequest } from './types'
import { articles, events as staticEvents, testimonials as staticTestimonials, services } from './data'

// Helper functions to map static data to database types
function mapStaticArticleToPost(article: typeof articles[0], index: number): Post {
  return {
    id: String(article.id),
    title: article.title,
    slug: article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    excerpt: article.excerpt,
    content: article.excerpt,
    tag: article.category,
    image_url: article.image,
    is_premium: index === 2,
    is_featured: article.featured || false,
    read_time: article.readTime,
    author_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

function mapStaticEventToEvent(event: typeof staticEvents[0]): Event {
  return {
    id: String(event.id),
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    status: event.status,
    image_url: null,
    created_at: new Date().toISOString(),
  }
}

function mapStaticTestimonial(t: typeof staticTestimonials[0]): Testimonial {
  const parts = t.role.split(', ')
  const role = parts[0]
  const company = parts[1] || null
  return {
    id: String(t.id),
    client_name: t.name,
    company: company,
    role: role,
    quote: t.content,
    avatar_url: t.avatar,
    created_at: new Date().toISOString(),
  }
}

// ============ POSTS ============
export async function getPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return articles.map(mapStaticArticleToPost)
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return articles.map(mapStaticArticleToPost)
  }
}

export async function getFeaturedPost(): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    const featured = articles.find(a => a.featured)
    return featured ? mapStaticArticleToPost(featured, 0) : null
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('is_featured', true)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching featured post:', error)
    const featured = articles.find(a => a.featured)
    return featured ? mapStaticArticleToPost(featured, 0) : null
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    const post = articles.find(a => 
      a.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug
    )
    return post ? mapStaticArticleToPost(post, 0) : null
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function getLatestPosts(limit: number = 3): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return articles.slice(0, limit).map(mapStaticArticleToPost)
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return articles.slice(0, limit).map(mapStaticArticleToPost)
  }
}

// ============ EVENTS ============
export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    return staticEvents.map(mapStaticEventToEvent)
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return staticEvents.map(mapStaticEventToEvent)
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    return staticEvents.filter(e => e.status === 'upcoming').map(mapStaticEventToEvent)
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'upcoming')
      .order('date', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return staticEvents.filter(e => e.status === 'upcoming').map(mapStaticEventToEvent)
  }
}

export async function getNextUpcomingEvent(): Promise<Event | null> {
  if (!isSupabaseConfigured()) {
    const upcoming = staticEvents.find(e => e.status === 'upcoming')
    return upcoming ? mapStaticEventToEvent(upcoming) : null
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'upcoming')
      .order('date', { ascending: true })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data || null
  } catch (error) {
    console.error('Error fetching next event:', error)
    const upcoming = staticEvents.find(e => e.status === 'upcoming')
    return upcoming ? mapStaticEventToEvent(upcoming) : null
  }
}

// ============ PORTFOLIO ITEMS ============
export async function getPortfolioItems(category?: 'design' | 'photography' | 'art'): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured()) {
    const categoryData = category ? services[category] : null
    if (!categoryData) return []
    
    const items = 'caseStudies' in categoryData 
      ? categoryData.caseStudies 
      : 'gallery' in categoryData 
        ? categoryData.gallery 
        : []
    
    return items.map((item, index) => ({
      id: String(index + 1),
      title: item.title,
      category: category!,
      short_description: 'category' in item ? item.category : null,
      image_url: item.image,
      client_name: null,
      created_at: new Date().toISOString(),
    }))
  }

  try {
    let query = supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return []
  }
}

// ============ TESTIMONIALS ============
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return staticTestimonials.map(mapStaticTestimonial)
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return staticTestimonials.map(mapStaticTestimonial)
  }
}

// ============ JOBS ============
export async function getJobs(): Promise<Job[]> {
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

// ============ APPLICATIONS ============
export async function submitApplication(application: Omit<Application, 'id' | 'created_at'>): Promise<Application | null> {
  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([application])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error submitting application:', error)
    return null
  }
}

// ============ PROJECT REQUESTS ============
export async function submitProjectRequest(request: Omit<ProjectRequest, 'id' | 'created_at'>): Promise<ProjectRequest | null> {
  if (!isSupabaseConfigured()) {
    return null
  }

  try {
    const { data, error } = await supabase
      .from('project_requests')
      .insert([request])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error submitting project request:', error)
    return null
  }
}

export async function getUserProjectRequests(userId: string): Promise<ProjectRequest[]> {
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('project_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching user project requests:', error)
    return []
  }
}
