import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { UserProfile, UserRole, BusinessType } from '../../types'

export interface User {
  id: string
  email?: string
}

export interface Session {
  user: User
  access_token: string
}

interface AuthState {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, name: string, role: UserRole, businessName?: string, phone?: string) => Promise<{ error: string | null, session: Session | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  createBusiness: (name: string, type: BusinessType) => Promise<{ error: string | null }>
}

type AuthContextType = AuthState & AuthActions

const AuthContext = createContext<AuthContextType | null>(null)

// Mock profiles for demo
const MOCK_USERS: Record<string, UserProfile> = {
  'hotel@demo.com': {
    id: 'demo-hotel-001',
    email: 'hotel@demo.com',
    name: 'Raj Sharma',
    role: 'hotel_admin',
    business_id: 'biz-hotel-001',
    plan: 'pro',
    created_at: new Date().toISOString(),
  },
  'restaurant@demo.com': {
    id: 'demo-rest-001',
    email: 'restaurant@demo.com',
    name: 'Priya Nair',
    role: 'restaurant_admin',
    business_id: 'biz-rest-001',
    plan: 'pro',
    created_at: new Date().toISOString(),
  },
  'admin@demo.com': {
    id: 'demo-hybrid-001',
    email: 'admin@demo.com',
    name: 'Arjun Mehta',
    role: 'hybrid_admin',
    business_id: 'biz-hybrid-001',
    plan: 'premium',
    created_at: new Date().toISOString(),
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for demo session
    const savedProfile = localStorage.getItem('hh_demo_profile')
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile(parsed)
      setUser({ id: parsed.id, email: parsed.email } as User)
      setSession({ user: { id: parsed.id, email: parsed.email }, access_token: 'mock-token' })
    }
    setLoading(false)
  }, [])

  // ── Sign In ──────────────────────────────────────────────
  async function signIn(email: string, password: string) {
    const mockProfile = MOCK_USERS[email]
    if (mockProfile && password === 'demo123') {
      setProfile(mockProfile)
      setUser({ id: mockProfile.id, email: mockProfile.email } as User)
      setSession({ user: { id: mockProfile.id, email: mockProfile.email }, access_token: 'mock-token' })
      localStorage.setItem('hh_demo_profile', JSON.stringify(mockProfile))
      return { error: null }
    }
    return { error: 'Invalid credentials. Use demo accounts below.' }
  }

  // ── Sign Up ──────────────────────────────────────────────
  async function signUp(email: string, password: string, name: string, role: UserRole, businessName?: string, phone?: string) {
    const mockProfile: UserProfile = {
      id: 'demo-new-' + Date.now(),
      email,
      name,
      role,
      business_id: 'biz-new-' + Date.now(),
      plan: 'pro',
      created_at: new Date().toISOString(),
    }
    setProfile(mockProfile)
    setUser({ id: mockProfile.id, email } as User)
    const newSession = { user: { id: mockProfile.id, email } as User, access_token: 'mock-token' }
    setSession(newSession)
    localStorage.setItem('hh_demo_profile', JSON.stringify(mockProfile))
    return { error: null, session: newSession }
  }

  // ── Sign Out ─────────────────────────────────────────────
  async function signOut() {
    setProfile(null)
    setUser(null)
    setSession(null)
    localStorage.removeItem('hh_demo_profile')
  }

  // ── Update Profile ───────────────────────────────────────
  async function updateProfile(updates: Partial<UserProfile>) {
    if (!profile) return
    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    localStorage.setItem('hh_demo_profile', JSON.stringify(newProfile))
  }

  // ── Create Business ──────────────────────────────────────
  async function createBusiness(name: string, type: BusinessType) {
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{
      user, profile, session, loading,
      isAuthenticated: !!user,
      signIn, signUp, signOut, updateProfile, createBusiness,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
