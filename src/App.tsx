import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { Navbar } from './components/Navbar'
import { HeroSequence } from './components/HeroSequence'
import { AutomationDemo } from './components/AutomationDemo'
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
        <HeroSequence lang={lang} />
        <AutomationDemo lang={lang} />
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
