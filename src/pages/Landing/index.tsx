import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import s from './Landing.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ── SCROLL REVEAL & PARALLAX UTILITIES ─────────────────────── */
function useGSAPAnimations() {
  useGSAP(() => {
    // 1. Fade Reveal
    gsap.utils.toArray('[data-r]').forEach((el: any) => {
      gsap.fromTo(el, 
        { autoAlpha: 0, y: 50 }, 
        { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    })

    // 2. Image Parallax (moving image within its container)
    gsap.utils.toArray('[data-parallax]').forEach((img: any) => {
      gsap.to(img, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    // 3. Full Width Showcase Scrub Scale
    gsap.utils.toArray('[data-scrub-scale]').forEach((img: any) => {
      gsap.to(img, {
        scale: 1.2, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    // 4. Staggered Bento Cards
    gsap.fromTo('[data-bento-card]', 
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '[data-bento-grid]', start: 'top 80%' } }
    )

    // 5. Footer Title Reveal
    gsap.utils.toArray('[data-footer-title]').forEach((el: any) => {
      gsap.fromTo(el, 
        { autoAlpha: 0, y: 40, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 95%' } }
      )
    })
  }, [])
}

/* ── (Images are sourced from premium collections) ───────── */

export default function Landing() {
  useGSAPAnimations()
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={s.lp}>
      {/* ── NAVIGATION ─────────────────────────────────────── */}
      <nav className={`${s.nav} ${navVisible ? s.navVisible : ''}`}>
        <Link to="/" className={s.logo}>
          <div className={s.logoMark}>H</div>
          <span className={s.logoName}>ManageInn</span>
        </Link>
        <div className={s.navCta}>
          <Link to="/businesses" className={s.navLink}>Our Partners</Link>
          <Link to="/login" className={s.navLink}>Member Portal</Link>
          <Link to="/signup" className={s.btnGold}>Inquire Now</Link>
        </div>
      </nav>

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className={s.hero}>
        <div className={s.heroContent}>
          <div className={s.eyebrow}>Enterprise Resource Planning</div>
          <h1 className={s.heroTitle}>
            ManageInn
          </h1>
          <p className={s.heroSub}>
            A modern, cinematic command center designed for visionary businesses. Harmonize your resources, accelerate workflows, and oversee every organizational detail effortlessly.
          </p>
        </div>
      </section>

      <div className={s.bgMidBrown}>
        {/* ── EDITORIAL MODULE 1: HR ──────────────────────── */}
        <section className={s.editorialSec}>
          <div className={s.asymGrid}>
            <div className={s.asymText} data-r>
              <div className={s.edLabel}>01 — Human Resources</div>
              <h2 className={s.edH2}>Empowered<br/><i>Workforce</i></h2>
              <p className={s.edP}>
                Elevate your talent management to an art form. Visual organizational charts, deep performance analytics, and seamless payroll—beautifully orchestrated on a single pane of glass.
              </p>
              <Link to="/signup" className={s.btnGold}>Explore HR Suite</Link>
            </div>
            <div className={s.asymImgWrap} data-r>
              <img data-parallax src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop" className={s.edImgTall} alt="Luxury Hotel Interior" />
            </div>
          </div>
        </section>

        {/* ── FULL WIDTH SHOWCASE ────────────────────────────── */}
        <section className={s.fwImgWrap}>
           <img data-scrub-scale src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=2000&auto=format&fit=crop" className={s.fwImg} alt="Property View" />
        </section>

        {/* ── EDITORIAL MODULE 2: FINANCE ─────────────────── */}
        <section className={s.editorialSec}>
          <div className={`${s.asymGrid} ${s.asymGridRev}`}>
            <div className={s.asymText} data-r>
              <div className={s.edLabel}>02 — Financial Control</div>
              <h2 className={s.edH2}>Economic<br/><i>Precision</i></h2>
              <p className={s.edP}>
                From macro-level corporate forecasting to real-time micro-transactions. Harmonize departmental budgets with absolute financial velocity and clarity.
              </p>
              <Link to="/signup" className={s.btnGold}>Discover Finance</Link>
            </div>
            <div className={s.asymImgWrap} data-r>
              <img data-parallax src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop" className={s.edImgTall} alt="Fine Dining Setup" />
            </div>
          </div>
        </section>
      </div>

      {/* ── MARQUEE ────────────────────────────────────────── */}
      <div className={s.marquee}>
        <div className={s.marqueeTrack}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={s.marqueeItem}>
              ManageInn ERP <span>✦</span> Scalable <span>✦</span> Intelligent <span>✦</span> Secure <span>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BENTO GRID FEATURES ────────────────────────────── */}
      <section className={s.bentoSec}>
        <div className={s.bentoHeader} data-r>
          <div className={s.edLabel} style={{ justifyContent: 'center', paddingLeft: 0 }}>The Ecosystem</div>
          <h2 className={s.edH2}>Intelligence <i>&amp;</i> Design</h2>
        </div>

        <div className={s.bentoGrid} data-bento-grid>
          {/* Card 1 */}
          <div className={`${s.bCard} ${s.c8}`} data-bento-card>
            <div>
              <div className={s.bT}>Unified Ecosystem</div>
              <div className={s.bD}>Manage finance, operations, and human capital concurrently without ever switching contexts.</div>
            </div>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" className={s.bImgLg} alt="Dashboard Snapshot" />
          </div>

          {/* Card 2 */}
          <div className={`${s.bCard} ${s.c4}`} data-bento-card>
            <div>
              <div className={s.bT}>Live Analytics</div>
              <div className={s.bD}>Revenue, metrics, and KPI tracking in real-time, presented with extreme clarity.</div>
            </div>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" className={s.bImg} alt="Chart Preview" />
          </div>

          {/* Card 3 */}
          <div className={`${s.bCard} ${s.c6}`} data-bento-card>
            <div>
              <div className={s.bT}>Automated Compliance</div>
              <div className={s.bD}>Auto-calculated taxes, audit-proof ledgers, and immaculate reporting generation.</div>
            </div>
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop" className={s.bImg} alt="Invoice Graphic" />
          </div>

          {/* Card 4 */}
          <div className={`${s.bCard} ${s.c6}`} data-bento-card>
            <div>
              <div className={s.bT}>Supabase Secured</div>
              <div className={s.bD}>Bank-grade encryption, instant synchronization, and role-based access controls.</div>
            </div>
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" className={s.bImg} alt="Architecture Abstract" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className={s.footer}>
        <div data-r>
          <h2 className={s.footerTitle} data-footer-title>ManageInn</h2>
          <div className={s.footerNav}>
            <Link to="/login" className={s.navLink}>Member Portal</Link>
            <Link to="/pricing" className={s.navLink}>Membership Tiers</Link>
            <a href="#" className={s.navLink}>Contact Concierge</a>
          </div>
          <Link to="/signup" className={s.btnGold} style={{ display: 'inline-block', marginBottom: '6vw' }}>Request Access</Link>
        </div>

        <div className={s.footerBot}>
          <span>© 2026 ManageInn Elite.</span>
          <div style={{ display: 'flex', gap: '2vw' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
