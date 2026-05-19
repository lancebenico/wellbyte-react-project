import { createElement } from 'react'
import { BookOpen, HeartHandshake, Mail, MapPin, Phone, ShieldAlert } from 'lucide-react'
import PageTransition from '../components/ui/layout/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import PageHero from '../components/ui/layout/PageHero'
import { PAGE_COPY } from '../utils/constants/pages'

function Tel({ children, number }) {
  const href = `tel:${number.replace(/\D/g, '')}`
  return (
    <a href={href} className="text-retro-blue font-medium hover:underline inline-flex items-center gap-1">
      <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden />
      {children}
    </a>
  )
}

function Section({ title, children }) {
  return (
    <section className="retro-window overflow-hidden">
      <div className="retro-titlebar bg-[#fafafa]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">{title}</span>
      </div>
      <div className="p-5 sm:p-6 space-y-3 text-sm text-text-secondary leading-relaxed">{children}</div>
    </section>
  )
}

export default function SupportResourcesPage() {
  return (
    <PageTransition>
      <PageWrapper maxWidth="max-w-7xl" className="bg-[#faf9f7]">
        <div className="space-y-6 w-full min-w-0">
          <PageHero
            eyebrow={PAGE_COPY.support.eyebrow}
            title={PAGE_COPY.support.title}
            subtitle={`${PAGE_COPY.support.subtitle} For urgent mental health crises, use the hospital hotline or national hotlines below.`}
            icon={HeartHandshake}
            placement="left"
            asideLabel="Choose the right doorway"
            asideChildren={
              <>
                {[
                  { icon: ShieldAlert, title: 'Immediate danger', text: 'Use local emergency services or urgent hospital lines.' },
                  { icon: HeartHandshake, title: 'Need to talk', text: 'Reach counseling, peer responders, or crisis hotlines.' },
                  { icon: BookOpen, title: 'Academic support', text: 'Check tutoring, labs, departments, and college offices.' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-white/12 p-4 text-white">
                    <div className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-cics-red">
                        {createElement(Icon, { className: 'h-4 w-4', 'aria-hidden': true })}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{title}</p>
                        <p className="mt-1 text-xs font-medium leading-relaxed text-white/70">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            }
          />

          <div className="rounded-2xl border border-cics-red/12 bg-cics-red-light/65 p-4 shadow-[0_10px_30px_rgba(74,15,24,0.04)] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-cics-red shadow-sm">
                  <ShieldAlert className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-cics-red-deep">If this is urgent, start here.</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-cics-red-dark/80">
                    If you are in immediate danger, contact local emergency services. For urgent mental health crises, use the UST Hospital emergency line or national crisis hotlines below.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1 text-sm font-bold text-cics-red">
                <Tel number="+63287313001">USTH +63-2-8731-3001</Tel>
                <Tel number="1553">NCMH 1553</Tel>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Section title="Counseling &amp; career">
            <h2 className="text-base font-semibold text-text-primary">UST Counseling and Career Center (CCC)</h2>
            <p>
              Offers comprehensive counseling, psychological assessments, and well-being programs.
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-text-muted shrink-0 mt-0.5" aria-hidden />
              <span>
                Rm. 204, Health Service Building and 3/F, UST Main Building.
              </span>
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <Tel number="+63287409720">+63-2-8740-9720</Tel>
              <span className="text-text-muted">or</span>
              <Tel number="+63234061611">+63-2-3406-1611</Tel>
              <span className="text-text-muted">(local 8212/8224)</span>
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <Mail className="w-4 h-4 text-text-muted shrink-0" aria-hidden />
              <a
                href="mailto:counseling.career.center@ust.edu.ph"
                className="text-retro-blue font-medium hover:underline break-all"
              >
                counseling.career.center@ust.edu.ph
              </a>
            </p>
          </Section>

          <Section title="Peer support (TMHR)">
            <h2 className="text-base font-semibold text-text-primary">Thomasian Mental Health Responders (TMHR)</h2>
            <p>
              A community service program that provides free psychosocial support and psychological first aid to both
              Thomasians and non-Thomasians.
            </p>
            <p>
              <strong className="text-text-primary">How to avail:</strong> Register through their online sign-up link
              (check the official Facebook page for the current form).
            </p>
            <p>
              <strong className="text-text-primary">Facebook:</strong> Thomasian Mental Health Responders — search on
              Facebook for the official page to sign up or send a message.
            </p>
          </Section>

          <Section title="Psychotrauma clinic">
            <h2 className="text-base font-semibold text-text-primary">UST Psychotrauma Clinic</h2>
            <p>Provides specialized mental health services year-round.</p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-text-muted shrink-0 mt-0.5" aria-hidden />
              <span>Thomas Aquinas Research Complex (TARC) Building.</span>
            </p>
            <p>
              <Tel number="+63287861611">8786-1611</Tel>
              <span className="text-text-muted"> (local 4012)</span>
            </p>
            <p className="text-xs text-text-muted">
              For updates and Facebook presence, search for the UST Psychotrauma Clinic on Facebook.
            </p>
          </Section>

          <Section title="Tutoring &amp; academic labs">
            <h2 className="text-base font-semibold text-text-primary">Tutoring &amp; learning support</h2>
            <p>
              Tutoring labs and peer support vary by college and program. Check your department or college office,
              official UST announcements, and your Canvas or student portal for scheduled tutorial sessions and learning
              commons hours.
            </p>
          </Section>

          <Section title="Hospital &amp; clinical (USTH)">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              For more clinical or emergency needs, the UST Hospital (USTH) offers specialized psychiatric care.
            </p>
            <div className="space-y-4 pt-1">
              <div>
                <h3 className="font-semibold text-text-primary">San Lorenzo Ward — Center for Behavioral Medicine</h3>
                <p className="mt-1">
                  A psychiatric unit for acute care, including inpatient admission and specialized psychotherapy.
                </p>
                <p className="mt-2">
                  <Tel number="+63287313001">+63-2-8731-3001</Tel>
                  <span className="text-text-muted"> (local 2538)</span>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Department of Neuroscience and Behavioral Medicine</h3>
                <p className="mt-1">Provides psychiatric consultations and neurologic assessments.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">UST Hospital emergency hotline</h3>
                <p className="mt-1">
                  For urgent mental health crises, 24-hour emergency line:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>
                    <Tel number="+63287313001">+63-2-8731-3001</Tel>
                    <span className="text-text-muted"> (local 2357/2291)</span>
                  </li>
                  <li>
                    Mobile: <Tel number="+639498296947">0949-829-6947</Tel>
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Spiritual &amp; additional support">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text-primary">Center for Campus Ministry</h3>
                <p className="mt-1">
                  Offers spiritual guidance and retreats, which are often integrated into the university&apos;s holistic
                  approach to wellness.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Department of Behavioral Science</h3>
                <p className="mt-1">Academic department focused on psychological well-being.</p>
              </div>
            </div>
          </Section>

          <Section title="National crisis hotlines (24/7)">
            <p className="text-xs font-medium text-cics-red-dark bg-cics-red-light border border-cics-red/15 rounded-md px-3 py-2">
              If you are in immediate distress and cannot reach university services, you can use these national lines.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-text-primary">NCMH Crisis Hotline</h3>
                <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 items-center">
                  <Tel number="1553">1553</Tel>
                  <span className="text-text-muted">(Luzon-wide toll-free)</span>
                </p>
                <p className="mt-1">
                  <Tel number="+639178998727">0917-899-8727</Tel>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Hopeline PH</h3>
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <Tel number="+639175584673">0917-558-4673</Tel>
                  <Tel number="+639188734673">0918-873-4673</Tel>
                </p>
              </div>
            </div>
          </Section>
          </div>

          <p className="text-[11px] text-text-muted text-center pt-2">
            Information provided for convenience; confirm details with each office. WellByte is not affiliated with UST.
          </p>
        </div>
      </PageWrapper>
    </PageTransition>
  )
}
