import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AutomationDemo } from './components/AutomationDemo'
import { UseCases } from './components/UseCases'
import { MoreThanExamples } from './components/MoreThanExamples'
import { HowWeWork } from './components/HowWeWork'
import { WhyMAI } from './components/WhyMAI'
import { LeadMagnet } from './components/LeadMagnet'
import { ContactSection } from './components/ContactSection'
import { LaunchPopup } from './components/LaunchPopup'
import { Footer } from './components/Footer'

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, toggle: toggleLang } = useLanguage()

  return (
    <div className={theme}>
      <Navbar lang={lang} toggleLang={toggleLang} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero lang={lang} />
        <AutomationDemo lang={lang} />
        <UseCases lang={lang} />
        <MoreThanExamples lang={lang} />
        <HowWeWork lang={lang} />
        <WhyMAI lang={lang} />
        <LeadMagnet lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <LaunchPopup lang={lang} />
    </div>
  )
}
