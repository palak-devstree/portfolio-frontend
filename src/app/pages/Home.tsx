import { useMemo } from 'react'
import { Navbar, type NavItem } from '../components/Navbar'
import { SectionHeader } from '../components/SectionHeader'
import { Reveal } from '../components/Reveal'
import { Hero } from '../components/sections/Hero'
import { Stats } from '../components/sections/Stats'
import { ProjectsSection } from '../components/sections/Projects'
import { WritingSection } from '../components/sections/Writing'
import { SystemDesignsSection } from '../components/sections/SystemDesigns'
import { LabSection } from '../components/sections/Lab'
import { AboutSection } from '../components/sections/About'
import { ContactSection } from '../components/sections/Contact'
import { LogPanel } from '../components/LogPanel'
import { AssistantButton } from '../components/AssistantButton'
import { usePortfolioData } from '../../lib/usePortfolioData'

export function Home() {
  const { profile, projects, posts, systemDesigns, experiments, dashboard } =
    usePortfolioData()

  // Build nav items dynamically, respecting feature flags.
  const navItems = useMemo<NavItem[]>(() => {
    const items: NavItem[] = [{ id: 'hero', label: 'Home' }]
    if (profile.show_projects) items.push({ id: 'projects', label: 'Projects' })
    if (profile.show_blog) items.push({ id: 'writing', label: 'Writing' })
    if (profile.show_system_designs)
      items.push({ id: 'designs', label: 'Systems' })
    if (profile.show_lab) items.push({ id: 'lab', label: 'Lab' })
    if (profile.show_about) items.push({ id: 'about', label: 'About' })
    items.push({ id: 'contact', label: 'Contact' })
    return items
  }, [profile])

  const brand = useMemo(() => {
    const first = profile.full_name.split(' ')[0]?.toLowerCase() ?? 'portfolio'
    return `${first}.ops`
  }, [profile.full_name])

  let sectionIndex = 0
  const nextIdx = () => `[${String(++sectionIndex).padStart(2, '0')}]`

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: '#0b0b0f', color: '#e2e2e8' }}
    >
      {/* Ambient scanline overlay */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.9) 2px 3px)',
        }}
      />

      <Navbar
        items={navItems}
        brandName={brand}
        resumeUrl={profile.resume_url}
      />

      <Hero profile={profile} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {/* Stats strip — always visible */}
        <section className="py-10">
          <Reveal>
            <Stats dashboard={dashboard} profile={profile} />
          </Reveal>
        </section>

        {profile.show_projects && (
          <section id="projects" className="py-14 scroll-mt-20">
            <SectionHeader
              index={nextIdx()}
              title="Projects"
              subtitle="backend systems, APIs, infrastructure"
            />
            <ProjectsSection projects={projects} />
          </section>
        )}

        {profile.show_blog && (
          <section id="writing" className="py-14 scroll-mt-20">
            <SectionHeader
              index={nextIdx()}
              title="Writing"
              subtitle="long-form notes on systems & engineering"
            />
            <WritingSection posts={posts} />
          </section>
        )}

        {profile.show_system_designs && (
          <section id="designs" className="py-14 scroll-mt-20">
            <SectionHeader
              index={nextIdx()}
              title="System Designs"
              subtitle="architectures for real-world scale"
            />
            <SystemDesignsSection designs={systemDesigns} />
          </section>
        )}

        {profile.show_lab && (
          <section id="lab" className="py-14 scroll-mt-20">
            <SectionHeader
              index={nextIdx()}
              title="Lab"
              subtitle="experiments, benchmarks & research"
            />
            <LabSection experiments={experiments} />
          </section>
        )}

        {profile.show_about && (
          <section id="about" className="py-14 scroll-mt-20">
            <SectionHeader
              index={nextIdx()}
              title="About"
              subtitle="background, focus, stack"
            />
            <AboutSection profile={profile} />
          </section>
        )}

        <section id="contact" className="py-14 scroll-mt-20">
          <SectionHeader
            index={nextIdx()}
            title="Contact"
            subtitle="open inbox / fast reply"
          />
          <ContactSection profile={profile} />
        </section>

        <section className="py-10">
          <Reveal>
            <LogPanel title="System Log" />
          </Reveal>
        </section>

        {/* Footer */}
        <footer
          className="pt-8 mt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          style={{ borderColor: '#1f1f28' }}
        >
          <div
            className="font-mono"
            style={{ fontSize: '11px', color: '#4a4a58' }}
          >
            © {new Date().getFullYear()} {profile.full_name} · built with care
          </div>
          <div
            className="font-mono flex items-center gap-2"
            style={{ fontSize: '11px', color: '#4a4a58' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#2dd4bf' }}
            />
            <span>uptime {dashboard.uptime_percentage.toFixed(2)}%</span>
          </div>
        </footer>
      </main>

      <AssistantButton />
    </div>
  )
}
