import { Menu, Moon, Search, Sun, Bell } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

type NavbarProps = {
  onMobileMenuOpen: () => void
}

const pageTitles: Record<string, { title: string; detail: string }> = {
  '/dashboard': { title: 'Overview', detail: 'Your portfolio at a glance' },
  '/ai-insights': { title: 'AI Insights', detail: 'Understand your portfolio data' },
  '/help-support': { title: 'Help & Support', detail: 'Find answers and get help' },
  '/markets': { title: 'Markets', detail: 'Explore the market' },
  '/trade': { title: 'Trade', detail: 'Make your next move' },
  '/wallet': { title: 'Wallet', detail: 'Manage your assets' },
  '/transactions': { title: 'Transactions', detail: 'Review your activity' },
  '/settings': { title: 'Settings', detail: 'Manage your preferences' },
}

function Navbar({ onMobileMenuOpen }: NavbarProps) {
  const { pathname } = useLocation()
  const [isDark, setIsDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const page = pageTitles[pathname] ?? pageTitles['/dashboard']

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    setIsDark(!isDark)
  }

  return (
    <header className="navbar">
      <div className="navbar-heading">
        <button className="navbar-menu-button" type="button" aria-label="Open navigation" onClick={onMobileMenuOpen}>
          <Menu size={21} />
        </button>
        <div><h1>{page.title}</h1><p>{page.detail}</p></div>
      </div>

      <div className="navbar-actions">
        <button className="navbar-icon-button navbar-search" type="button" aria-label="Search">
          <Search size={19} />
        </button>
        <button className="navbar-icon-button" type="button" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
        <button className="navbar-icon-button" type="button" aria-label={isDark ? 'Use light theme' : 'Use dark theme'} onClick={toggleTheme}>
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button className="navbar-profile" type="button" aria-label="Open profile menu">
          <span className="navbar-avatar">AM</span>
          <span className="navbar-profile-copy"><strong>Alex Morgan</strong><small>Pro account</small></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar