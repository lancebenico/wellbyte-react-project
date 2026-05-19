import { Mail, MapPin, Phone } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import PageWrapper from '../components/layout/PageWrapper'
import SectionHeader from '../components/common/SectionHeader'
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
      <PageWrapper maxWidth="max-w-3xl">
        <div className="space-y-6 w-full min-w-0">
          <SectionHeader
            eyebrow={PAGE_COPY.support.eyebrow}
            title={PAGE_COPY.support.title}
            subtitle={`${PAGE_COPY.support.subtitle} For urgent mental health crises, use the hospital hotline or national hotlines below.`}
            className="mb-2"
          />

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
            <p className="text-xs font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
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

          <p className="text-[11px] text-text-muted text-center pt-2">
            Information provided for convenience; confirm details with each office. WellByte is not affiliated with UST.
          </p>
        </div>
      </PageWrapper>
    </PageTransition>
  )
}
