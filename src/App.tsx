import { useState } from 'react'
import heroImage from '@/imports/image.png'
import projectImage from '@/imports/image-1.png'
import { ImageWithFallback } from '@/components/ImageWithFallback'

const experience = [
  { year: '2026', company: 'Pfizer', role: 'Software Engineering Extern' },
  { year: '2026', company: 'ZotMeet', role: 'Lead Software Engineer' },
  { year: '2025', company: 'FUSION Engineering', role: 'Lead Software Engineer' },
  { year: '2025', company: 'AntAlmanac', role: 'Software Engineer' },
]

const projects = [
  {
    id: 'openai',
    title: 'OpenAI x Hardware',
    tags: ['Product Design', 'Prototyping'],
    gradient: 'linear-gradient(135deg, #f7c59f 0%, #e8a87c 30%, #d4856a 60%, #c9768f 100%)',
    description: 'Exploring the intersection of AI and physical computing — designing interactions that feel natural across hardware form factors.',
  },
  {
    id: 'chess',
    title: 'GTO Chess Strategy Tool',
    tags: ['Product Design', 'Engineering'],
    gradient: 'linear-gradient(135deg, #e8f4fd 0%, #c9e8f8 50%, #a8d5f0 100%)',
    description: 'A chess analysis interface that breaks down GTO vs exploitative strategy for any given position.',
    isLight: true,
  },
  {
    id: 'bloomberg',
    title: 'Bloomberg Terminal UX',
    tags: ['UX Research', 'Interface Design'],
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    description: 'Redesigning complex financial data workflows for the Bloomberg Terminal professional audience.',
  },
  {
    id: '1password',
    title: '1Password Onboarding',
    tags: ['Product Design', 'Mobile'],
    gradient: 'linear-gradient(135deg, #f0f7ff 0%, #d6eaff 50%, #b8d4ff 100%)',
    description: 'Streamlining the new-user experience to reduce time-to-value for enterprise password management.',
    isLight: true,
  },
]

export default function App() {
  const [activeNav, setActiveNav] = useState('WORK')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white text-[#111]">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8e8e8]">
        <nav className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#111]">Ethan Chao</span>
            <span className="text-[#ccc]">|</span>
            <span className="text-[10px] tracking-wider uppercase text-[#888] font-medium">Product + Software Engineering</span>
          </div>

          <div className="flex items-center gap-7">
            {['WORK', 'FUN', 'ABOUT', 'RESUME'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className="text-[11px] tracking-widest font-medium transition-colors"
                style={{ color: activeNav === item ? '#e05a28' : '#888' }}
              >
                {item}
              </button>
            ))}
          </div>

        </nav>
      </header>

      {/* Hero */}
      <main className="pt-12">
        <section className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: headline */}
          <div>
            <h1 className="text-[42px] lg:text-[54px] leading-[1.1] font-light text-[#111] tracking-tight">
              I'm Ethan, a software<br />
              engineer who{' '}
              <em
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
                className="font-normal"
              >
                leads.
              </em>
            </h1>
          </div>

          {/* Right: experience timeline */}
          <div className="pt-2">
            <div className="flex justify-end mb-6">
              <div className="w-2 h-2 rounded-full bg-[#e05a28]" />
            </div>
            <table className="w-full">
              <tbody>
                {experience.map((exp, i) => (
                  <tr
                    key={i}
                    className="group border-t border-[#e8e8e8] hover:bg-[#fafafa] transition-colors"
                  >
                    <td className="py-3 pr-6 text-[11px] text-[#888] font-medium w-12">{exp.year}</td>
                    <td className="py-3 pr-8 text-[13px] font-semibold text-[#111] w-40">{exp.company}</td>
                    <td className="py-3 text-[12px] text-[#666]">{exp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Projects */}
        <section className="max-w-[1200px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured project — full bleed gradient */}
            <div
              className="relative overflow-hidden cursor-pointer group"
              style={{ height: 340, borderRadius: 2 }}
              onMouseEnter={() => setHoveredProject('openai')}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #f7c59f 0%, #e8a87c 30%, #d4856a 60%, #c9768f 100%)' }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div
                  className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 text-[10px] tracking-widest font-semibold text-white border border-white/60 px-3 py-1.5"
                  style={{ borderRadius: 20, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.15)' }}
                >
                  <span className="text-[8px]">⊙</span> VIEW CASE STUDY
                </div>
                <h2 className="text-[22px] font-light text-white tracking-tight">OpenAI x Hardware</h2>
              </div>
            </div>

            {/* Second project — screenshot */}
            <div
              className="relative overflow-hidden cursor-pointer group bg-[#f5f8fc]"
              style={{ height: 340, borderRadius: 2 }}
              onMouseEnter={() => setHoveredProject('chess')}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <ImageWithFallback
                src={projectImage}
                alt="GTO Strategy Tool interface"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/30 via-transparent to-transparent">
                <div
                  className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 text-[10px] tracking-widest font-semibold text-white border border-white/60 px-3 py-1.5"
                  style={{ borderRadius: 20, backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.3)' }}
                >
                  <span className="text-[8px]">⊙</span> VIEW CASE STUDY
                </div>
                <h2 className="text-[22px] font-light text-white tracking-tight">GTO Strategy Tool</h2>
              </div>
            </div>

            {/* Third project */}
            <div
              className="relative overflow-hidden cursor-pointer group"
              style={{ height: 260, borderRadius: 2, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
              onMouseEnter={() => setHoveredProject('bloomberg')}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02] rounded-sm"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
              />
              <div className="relative inset-0 flex flex-col justify-end p-8 h-full">
                <div
                  className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 text-[10px] tracking-widest font-semibold text-white border border-white/30 px-3 py-1.5"
                  style={{ borderRadius: 20, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.1)' }}
                >
                  <span className="text-[8px]">⊙</span> VIEW CASE STUDY
                </div>
                <div className="mt-auto">
                  <span className="text-[10px] tracking-widest text-white/50 font-medium uppercase mb-2 block">Bloomberg</span>
                  <h2 className="text-[20px] font-light text-white tracking-tight">Terminal UX Redesign</h2>
                </div>
              </div>
            </div>

            {/* Fourth project */}
            <div
              className="relative overflow-hidden cursor-pointer group bg-[#f0f7ff]"
              style={{ height: 260, borderRadius: 2 }}
              onMouseEnter={() => setHoveredProject('1password')}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #d6eaff 50%, #b8d4ff 100%)' }}
              />
              <div className="relative flex flex-col justify-end p-8 h-full">
                <div
                  className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 text-[10px] tracking-widest font-semibold text-[#111] border border-black/20 px-3 py-1.5"
                  style={{ borderRadius: 20, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.5)' }}
                >
                  <span className="text-[8px]">⊙</span> VIEW CASE STUDY
                </div>
                <div className="mt-auto">
                  <span className="text-[10px] tracking-widest text-[#888] font-medium uppercase mb-2 block">1Password</span>
                  <h2 className="text-[20px] font-light text-[#111] tracking-tight">Onboarding Redesign</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About strip */}
        <section className="border-t border-[#e8e8e8] max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-[10px] tracking-widest font-semibold text-[#888] uppercase mb-4">About</h3>
              <p className="text-[14px] leading-relaxed text-[#444]">
                I'm a developer who writes production code — equally comfortable in Figma and a TypeScript codebase. I care about the details that make software feel inevitable.
              </p>
            </div>
            <div>
              <h3 className="text-[10px] tracking-widest font-semibold text-[#888] uppercase mb-4">Currently</h3>
              <p className="text-[14px] leading-relaxed text-[#444]">
                Building an OCR + RAG pipelines at  <strong className="text-[#111] font-medium">Pfizer</strong>. While leading project teams at UC Irvine
              </p>
            </div>
            <div>
              <h3 className="text-[10px] tracking-widest font-semibold text-[#888] uppercase mb-4">Links</h3>
              <div className="flex flex-col gap-2">
                {['LinkedIn', 'GitHub', 'Resume'].map((link) => (
                  <button key={link} className="text-[13px] text-[#111] text-left hover:text-[#e05a28] transition-colors flex items-center gap-1.5 group/link">
                    <span className="text-[#ccc] group-hover/link:text-[#e05a28] transition-colors">→</span>
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e8e8e8] max-w-[1200px] mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-[10px] tracking-widest text-[#888] uppercase">Ethan Chao © 2026</span>
          <span className="text-[10px] tracking-widest text-[#888] uppercase">Product + Software Engineer</span>
        </footer>
      </main>
    </div>
  )
}
