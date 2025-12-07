"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getPostBySlug } from "@/lib/supabase-data"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import type { Post } from "@/lib/types"

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const { user, loading: authLoading } = useSupabaseUser()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      if (!slug) return
      try {
        const data = await getPostBySlug(slug)
        setPost(data)
      } catch (error) {
        console.error('Error loading post:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug])

  if (loading || authLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Back to Learn
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const showFullContent = !post.is_premium || user
  const contentPreview = post.content ? post.content.slice(0, 500) + '...' : ''

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Learn
            </Link>

            <div className="flex items-center gap-3 mb-6">
              {post.tag && (
                <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                  {post.tag}
                </span>
              )}
              {post.is_premium && (
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium">
                  Premium Content
                </span>
              )}
              {post.read_time && (
                <span className="text-muted-foreground text-sm">{post.read_time}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="text-sm text-muted-foreground mb-8">
              Published on {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>

            {post.image_url && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-12">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none">
              {showFullContent ? (
                <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                  {post.content?.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      )
                    }
                    return (
                      <p key={index} className="mb-4 text-muted-foreground">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              ) : (
                <>
                  <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed relative">
                    <p className="mb-4 text-muted-foreground">{contentPreview}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
                  </div>
                  
                  <div className="glass rounded-2xl p-8 text-center mt-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Premium Content</h3>
                    <p className="text-muted-foreground mb-6">
                      Sign in to access the full article and unlock all premium content.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/login"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-colors"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  )
}
