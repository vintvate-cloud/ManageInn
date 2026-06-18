import React, { useEffect, useState } from 'react'
import type { Business } from '../types'
import { Building2, Phone, MapPin } from 'lucide-react'
import { SiteNav, SiteFooter } from '../components/layout/SiteNav'

export default function BusinessDirectory() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBusinesses() {
      setBusinesses([
        {
          id: '1',
          name: 'The Grand Aurora Hotel',
          type: 'hotel',
          owner_id: 'demo1',
          phone: '+91 9876543210',
          address: 'Mumbai, India',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Spice Symphony',
          type: 'restaurant',
          owner_id: 'demo2',
          phone: '+91 8765432109',
          address: 'Delhi, India',
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Oasis Resort & Spa',
          type: 'both',
          owner_id: 'demo3',
          phone: '+91 7654321098',
          address: 'Goa, India',
          created_at: new Date().toISOString()
        }
      ])
      setLoading(false)
    }

    fetchBusinesses()
  }, [])

  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <SiteNav />

      <section className="pt-40 pb-20 px-6 flex-1">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <p className="text-muted-foreground mb-4 uppercase tracking-widest text-sm font-semibold">Our Partners</p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[1.05]">
            Registered<br /><span className="text-op-purple">Businesses</span>
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover the premium hotels and fine-dining establishments powered by ManageInn.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">
              Loading businesses...
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No businesses registered yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map(biz => (
                <div 
                  key={biz.id} 
                  className="bg-white rounded-3xl p-8 hover-lift border border-transparent hover:border-border transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-op-purple/10 text-op-purple flex items-center justify-center shrink-0">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{biz.name}</h3>
                      <span className="inline-block mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {biz.type === 'both' ? 'Hotel & Restaurant' : biz.type}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border space-y-3">
                    {biz.phone && (
                      <div className="flex items-center gap-3 text-sm text-foreground/80">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {biz.phone}
                      </div>
                    )}
                    {biz.address && (
                      <div className="flex items-center gap-3 text-sm text-foreground/80">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {biz.address}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
