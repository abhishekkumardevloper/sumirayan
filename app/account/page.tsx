"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"
import { supabase } from "@/lib/supabaseClient"
import { useSupabaseUser } from "@/hooks/use-supabase-user"

export default function AccountPage() {
  const router = useRouter()
  const { user, loading } = useSupabaseUser()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
  const userEmail = user.email || ""
  const avatarUrl = user.user_metadata?.avatar_url

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto relative"
      >
        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-6 mb-8">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
              <p className="text-muted-foreground">{userEmail}</p>
            </div>
          </div>

          <div className="border-t border-border pt-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Account Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email</label>
                <p className="text-foreground">{userEmail}</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Account Created</label>
                <p className="text-foreground">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Sign-in Method</label>
                <p className="text-foreground capitalize">
                  {user.app_metadata?.provider || "Email"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/learn" className="flex-1">
              <GradientButton variant="primary" size="lg" className="w-full">
                Go to Learn
              </GradientButton>
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 px-6 py-3 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
