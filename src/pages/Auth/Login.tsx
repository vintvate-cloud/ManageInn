import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../features/auth/AuthContext'
import { toast } from 'react-hot-toast'
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react'
import gsap from 'gsap'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

const DEMO_ACCOUNTS = [
  { role: 'Hotel Admin', email: 'hotel@demo.com', password: 'demo123' },
  { role: 'Restaurant Admin', email: 'restaurant@demo.com', password: 'demo123' },
  { role: 'Hybrid Admin', email: 'admin@demo.com', password: 'demo123' },
]

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    const { error } = await signIn(data.email, data.password)
    setLoading(false)

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Welcome back!')
    navigate(from, { replace: true })
  }

  function fillDemo(email: string, password: string) {
    setValue('email', email)
    setValue('password', password)
  }

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".auth-el", { opacity: 0, y: 16, duration: 0.7, ease: "power3.out", stagger: 0.06 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="min-h-screen flex bg-muted/40 text-foreground">
      {/* Sidebar matching DashboardShell */}
      <aside className="hidden lg:flex flex-col w-64 lg:w-80 shrink-0 bg-foreground text-background p-6 justify-between h-screen sticky top-0">
        <div>
          <Link to="/" className="font-display text-2xl py-2 inline-block auth-el">ManageInn</Link>
          <div className="mt-8 space-y-4">
            <h2 className="font-display text-4xl leading-tight auth-el">
              Run your whole hotel from one home.
            </h2>
            <p className="text-sm text-background/70 auth-el leading-relaxed">
              2,300+ teams run their properties on ManageInn. Reservations, housekeeping, revenue, and guest AI — unified.
            </p>
          </div>
        </div>
        <div className="text-xs text-background/50 auth-el">
          The AI Operating System for Hospitality
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="font-display text-3xl auth-el">ManageInn</Link>
          </div>

          <div className="bg-background rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
            <h1 className="font-display text-4xl auth-el">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground auth-el">
              Sign in to run your operations from one platform.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-4 auth-el"
            >
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Email</span>
                <div className={`mt-1 flex items-center gap-2 bg-muted/50 border border-transparent focus-within:border-op-purple/30 focus-within:bg-background transition-colors rounded-xl px-3 ${errors.email ? 'border-destructive' : ''}`}>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                    <input 
                      {...register('email')}
                      type="email" 
                      placeholder="you@hotel.com" 
                      className="bg-transparent w-full py-2.5 outline-none text-sm placeholder:text-muted-foreground/50" 
                    />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Password</span>
                <div className={`mt-1 flex items-center gap-2 bg-muted/50 border border-transparent focus-within:border-op-purple/30 focus-within:bg-background transition-colors rounded-xl px-3 ${errors.password ? 'border-destructive' : ''}`}>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                    <input 
                      {...register('password')}
                      type={showPass ? 'text' : 'password'} 
                      placeholder="••••••••" 
                      className="bg-transparent w-full py-2.5 outline-none text-sm placeholder:text-muted-foreground/50" 
                    />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
              </label>

              <div className="flex items-center justify-between text-xs mt-2">
                <label className="inline-flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-muted-foreground/30 text-op-purple focus:ring-op-purple" /> Remember me
                </label>
                <a href="#" className="font-medium hover:text-foreground transition-colors">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background rounded-full py-3 font-semibold inline-flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all mt-6"
              >
                {loading ? 'Signing in...' : <>Sign in <ArrowRight className="h-4 w-4" /></>}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground font-medium">Demo Accounts</span></div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {DEMO_ACCOUNTS.map(acc => (
                  <button 
                    key={acc.role}
                    type="button" 
                    onClick={() => fillDemo(acc.email, acc.password)}
                    className="bg-muted/50 border border-transparent hover:border-border rounded-xl py-2 px-1 text-xs font-medium text-muted-foreground hover:text-foreground text-center transition-colors"
                  >
                    {acc.role}
                  </button>
                ))}
              </div>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground auth-el">
            New to ManageInn?{" "}
            <Link to="/signup" className="font-semibold text-foreground hover:underline">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
