import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../features/auth/AuthContext'
import { toast } from 'react-hot-toast'
import { ArrowRight, Mail, Lock, User, Hotel, Phone, BedDouble, UtensilsCrossed, Building2, MapPin } from 'lucide-react'
import gsap from 'gsap'
import type { UserRole } from '../../types'

const ROLES = [
  { value: 'hotel_admin' as UserRole, label: 'Hotel', icon: BedDouble },
  { value: 'restaurant_admin' as UserRole, label: 'Restaurant', icon: UtensilsCrossed },
  { value: 'hybrid_admin' as UserRole, label: 'Hybrid', icon: Building2 },
]

const InputWrapper = ({ label, icon: Icon, type = "text", placeholder, name, required = false, register, watch, setValue }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentValue = watch ? watch(name) : '';

  return (
    <label className={`block auth-el relative ${isOpen ? 'z-50' : 'z-10'}`}>
      <span className="text-xs font-semibold text-foreground/80 mb-1.5 inline-block">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      <div className={`relative flex items-center gap-2.5 bg-muted/40 border transition-all rounded-xl px-3.5 h-11 shadow-sm ${isOpen ? 'border-op-purple ring-1 ring-op-purple/30 bg-background' : 'border-border focus-within:border-op-purple focus-within:ring-1 focus-within:ring-op-purple/30 focus-within:bg-background'}`}>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
        
        {type === 'select' ? (
           <div className="relative w-full h-full flex items-center cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
             {/* Hidden input to register with form */}
             <input type="hidden" {...register(name, { required })} />
             
             <div className="flex-1 text-sm truncate pr-4 text-left">
               {currentValue ? <span className="text-foreground">{currentValue}</span> : <span className="text-muted-foreground/60">Select {label}</span>}
             </div>
             
             <div className="absolute right-0 text-muted-foreground">
                <svg className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-op-purple' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
             </div>

             {/* Custom Dropdown Menu */}
             {isOpen && (
               <>
                 {/* Invisible backdrop to catch outside clicks */}
                 <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
                 
                 <div className="absolute top-[calc(100%+6px)] left-0 w-full min-w-[200px] bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                   {placeholder.map((opt: string) => (
                     <div 
                       key={opt} 
                       onClick={(e) => {
                         e.stopPropagation();
                         setValue(name, opt, { shouldValidate: true });
                         setIsOpen(false);
                       }}
                       className={`px-3.5 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${currentValue === opt ? 'bg-op-purple/10 text-op-purple font-medium' : 'hover:bg-muted text-foreground'}`}
                     >
                       {opt}
                       {currentValue === opt && (
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                       )}
                     </div>
                   ))}
                 </div>
               </>
             )}
           </div>
        ) : (
          <input {...register(name, { required })} type={type} placeholder={placeholder} className="bg-transparent w-full h-full outline-none text-sm placeholder:text-muted-foreground/40" />
        )}
      </div>
    </label>
  );
};

export default function SignupPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>('hotel_admin')

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { role: 'hotel_admin' }
  })

  async function onSubmit(data: any) {
    setLoading(true)
    const { error, session } = await signUp(data.email, data.password, data.ownerName || data.name, data.role, data.businessName, data.mobileNumber)
    setLoading(false)

    if (error) {
      toast.error(error)
      return
    }

    if (!session) {
      toast.success('Account created! Please check your email.', { duration: 6000 })
      navigate('/login')
      return
    }

    toast.success('Account created! Welcome to ManageInn.')
    navigate('/dashboard')
  }

  function selectRole(role: UserRole) {
    setSelectedRole(role)
    setValue('role', role)
  }

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".auth-el", { opacity: 0, y: 10, duration: 0.5, ease: "power2.out", stagger: 0.03 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="h-screen w-screen bg-background text-foreground overflow-hidden flex">
      {/* Sidebar restored */}
      <aside className="hidden lg:flex flex-col w-64 lg:w-80 shrink-0 bg-foreground text-background p-6 justify-between h-screen sticky top-0">
        <div>
          <Link to="/" className="font-display text-2xl py-2 inline-block auth-el">ManageInn</Link>
          <div className="mt-8 space-y-4">
            <h2 className="font-display text-4xl leading-tight auth-el">
              The AI Operating System for Hospitality
            </h2>
            <p className="text-sm text-background/70 auth-el leading-relaxed">
              Run your whole hotel from one home. Reservations, housekeeping, revenue, and guest AI — unified.
            </p>
          </div>
        </div>
        <div className="text-xs text-background/50 auth-el">
          Free 14-day trial. Cancel anytime.
        </div>
      </aside>

      {/* Main Form Area */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-muted/20 p-4 sm:p-6">
        
        {/* Top Header */}
        <header className="flex justify-between items-center shrink-0 mb-4 auth-el">
          <div className="font-display text-2xl flex items-center gap-2">
            Create account
          </div>
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-semibold text-foreground hover:underline">Sign in</Link>
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 min-h-0 flex flex-col bg-background border border-border rounded-2xl overflow-hidden shadow-sm p-5">
          
          {/* Top Section: Role Selector & Basic Action */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 shrink-0">
            <div className="flex gap-2 auth-el">
              {ROLES.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => selectRole(r.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition ${
                    selectedRole === r.value 
                      ? 'border-op-purple bg-op-purple/10 text-op-purple' 
                      : 'border-border bg-background text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <r.icon className="h-4 w-4" /> {r.label}
                </button>
              ))}
              <input type="hidden" {...register('role')} />
            </div>

            <button type="submit" disabled={loading} className="bg-foreground text-background rounded-xl px-6 py-2 text-sm font-semibold inline-flex items-center gap-2 hover:bg-foreground/90 transition-all auth-el shrink-0 shadow-sm">
              {loading ? 'Creating...' : <>Complete Setup <ArrowRight className="h-4 w-4" /></>}
            </button>
          </div>

          {/* Form Fields Grid - Uses min-h-0 to fit inside parent without page scrolling */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* GRID LAYOUT FOR ALL SECTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-4 pb-4">
              
              {/* SECTION: Business Info */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex items-center gap-2 auth-el mt-1">
                <div className="h-px bg-border flex-1"></div>
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Business Details</span>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <InputWrapper register={register} watch={watch} setValue={setValue} label="Business Name" icon={Hotel} placeholder="The Grand Aurora" name="businessName" required />
              
              {selectedRole === 'hotel_admin' && (
                <>
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Hotel Type" type="select" placeholder={["Hotel", "Resort", "Lodge", "Guest House", "Homestay"]} name="hotelType" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Total Rooms" type="number" placeholder="50" name="rooms" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Total Floors" type="number" placeholder="4" name="floors" />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Check-In" type="time" name="checkInTime" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Check-Out" type="time" name="checkOutTime" required />
                </>
              )}

              {selectedRole === 'restaurant_admin' && (
                <>
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Restaurant Type" type="select" placeholder={["Restaurant", "Cafe", "Fast Food", "Fine Dining", "Cloud Kitchen"]} name="restaurantType" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Total Tables" type="number" placeholder="20" name="tables" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Seating Capacity" type="number" placeholder="80" name="capacity" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Kitchen Type" type="select" placeholder={["Veg", "Non-Veg", "Both"]} name="kitchenType" required />
                </>
              )}

              {selectedRole === 'hybrid_admin' && (
                <>
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Total Rooms" type="number" placeholder="50" name="rooms" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Total Tables" type="number" placeholder="20" name="tables" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Check-In" type="time" name="checkInTime" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Check-Out" type="time" name="checkOutTime" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Kitchen Type" type="select" placeholder={["Veg", "Non-Veg", "Both"]} name="kitchenType" required />
                  <InputWrapper register={register} watch={watch} setValue={setValue} label="Restaurant Name" icon={UtensilsCrossed} placeholder="If different" name="hybridRestaurantName" />
                </>
              )}

              {/* SECTION: Location */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex items-center gap-2 mt-2 auth-el">
                <div className="h-px bg-border flex-1"></div>
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Location & Tax</span>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <div className="lg:col-span-2"><InputWrapper register={register} watch={watch} setValue={setValue} label="Full Address" icon={MapPin} placeholder="Street address" name="address" required /></div>
              <InputWrapper register={register} watch={watch} setValue={setValue} label="City" placeholder="City" name="city" required />
              <InputWrapper register={register} watch={watch} setValue={setValue} label="State" placeholder="State" name="state" required />
              <InputWrapper register={register} watch={watch} setValue={setValue} label="Country" placeholder="Country" name="country" required />
              <InputWrapper register={register} watch={watch} setValue={setValue} label="Pincode" placeholder="Zip code" name="pincode" required />
              
              <InputWrapper register={register} watch={watch} setValue={setValue} label="GST Number" placeholder="Optional" name="gstNumber" />
              {selectedRole === 'hybrid_admin' && (
                <InputWrapper register={register} watch={watch} setValue={setValue} label="PAN Number" placeholder="Optional" name="panNumber" />
              )}

              {/* SECTION: Contact */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 flex items-center gap-2 mt-2 auth-el">
                <div className="h-px bg-border flex-1"></div>
                <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Admin Account</span>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <InputWrapper register={register} watch={watch} setValue={setValue} label="Owner Name" icon={User} placeholder="Full name" name="ownerName" required />
              <InputWrapper register={register} watch={watch} setValue={setValue} label="Mobile Number" type="tel" icon={Phone} placeholder="+91 98765..." name="mobileNumber" required />
              <InputWrapper register={register} watch={watch} setValue={setValue} label="Email Address" type="email" icon={Mail} placeholder="you@company.com" name="email" required />
              <InputWrapper register={register} watch={watch} setValue={setValue} label="Secure Password" type="password" icon={Lock} placeholder="••••••••" name="password" required />

            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
