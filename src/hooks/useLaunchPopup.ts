import { useState, useEffect } from 'react'
import { siteConfig } from '../data/config'

const STORAGE_KEY = 'mai_launch_popup_closed_at'

export function useLaunchPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const closed = localStorage.getItem(STORAGE_KEY)
    if (closed) {
      const closedAt = parseInt(closed, 10)
      const cooldownMs = siteConfig.popupCooldownDays * 24 * 60 * 60 * 1000
      if (Date.now() - closedAt < cooldownMs) return
    }

    let shown = false

    const showPopup = () => {
      if (!shown) {
        shown = true
        setVisible(true)
      }
    }

    const timer = setTimeout(showPopup, siteConfig.popupDelayMs)

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrolled >= siteConfig.popupScrollPercent) {
        showPopup()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const close = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    setVisible(false)
  }

  return { visible, close }
}
