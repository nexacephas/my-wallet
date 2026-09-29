import { Menu, Moon, Search, Sun, Bell } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import {
  Activity,
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  BarChart3,
  BellRing,
  Bitcoin,
  BrainCircuit,
  CandlestickChart,
  CheckCheck,
  CircleDollarSign,
  CircleHelp,
  LayoutDashboard,
  LockKeyhole,
  Settings,
  WalletCards,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSettings } from '../../context/useAppSettings'
import './Navbar.css'

type NavbarProps = {
  onMobileMenuOpen: () => void
}

const pageTitles: Record<string, { title: string; detail: string }> = {
  '/dashboard': { title: 'Overview', detail: 'Your portfolio at a glance' },
  '/ai-insights': { title: 'AI Insights', detail: 'Understand your portfolio data' },
  '/help-support': { title: 'Help & Support', detail: 'Find answers and get help' },
  '/convert': { title: 'Convert', detail: 'Exchange currencies instantly' },
  '/markets': { title: 'Markets', detail: 'Explore the market' },
  '/trade': { title: 'Trade', detail: 'Make your next move' },
  '/wallet': { title: 'Wallet', detail: 'Manage your assets' },
  '/transactions': { title: 'Transactions', detail: 'Review your activity' },
  '/settings': { title: 'Settings', detail: 'Manage your preferences' },
}

const searchItems = [
  { label: 'Overview', detail: 'Portfolio summary', path: '/dashboard', icon: LayoutDashboard, type: 'Page' },
  { label: 'AI Insights', detail: 'Portfolio analysis', path: '/ai-insights', icon: BrainCircuit, type: 'Page' },
  { label: 'Markets', detail: 'Explore digital assets', path: '/markets', icon: BarChart3, type: 'Page' },
  { label: 'Trade', detail: 'Buy and sell assets', path: '/trade', icon: CandlestickChart, type: 'Page' },
  { label: 'Wallet', detail: 'Balances and funding', path: '/wallet', icon: WalletCards, type: 'Page' },
  { label: 'Transactions', detail: 'Recent account activity', path: '/transactions', icon: ArrowLeftRight, type: 'Page' },
  { label: 'Settings', detail: 'Profile and preferences', path: '/settings', icon: Settings, type: 'Page' },
  { label: 'Help & Support', detail: 'Guides and assistance', path: '/help-support', icon: CircleHelp, type: 'Page' },
  { label: 'Convert', detail: 'Convert between crypto and fiat', path: '/convert', icon: ArrowLeftRight, type: 'Page' },
  { label: 'Bitcoin (BTC)', detail: 'BTC / USD market', path: '/markets/btc', icon: Bitcoin, type: 'Market' },
  { label: 'Ethereum (ETH)', detail: 'ETH / USD market', path: '/markets/eth', icon: CircleDollarSign, type: 'Market' },
  { label: 'Solana (SOL)', detail: 'SOL / USD market', path: '/markets/sol', icon: Activity, type: 'Market' },
]

const initialNotifications = [
  {
    id: 'deposit',
    title: 'Deposit completed',
    detail: 'Your $12,000 USD deposit is available.',
    time: '8 min ago',
    icon: ArrowDownLeft,
    tone: 'deposit',
    path: '/transactions',
    unread: true,
  },
  {
    id: 'security',
    title: 'New sign-in verified',
    detail: 'Windows · Chrome · Abuja, Nigeria',
    time: '1 hour ago',
    icon: LockKeyhole,
    tone: 'security',
    path: '/settings',
    unread: true,
  },
  {
    id: 'market',
    title: 'SOL moved +6.5%',
    detail: 'Solana is among today’s top movers.',
    time: '3 hours ago',
    icon: ArrowUpRight,
    tone: 'market',
    path: '/markets/sol',
    unread: false,
  },
]

function Navbar({ onMobileMenuOpen }: NavbarProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { settings, updateSettings } = useAppSettings()
  const [openPanel, setOpenPanel] = useState<'search' | 'notifications' | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(initialNotifications)
  const [settingsError, setSettingsError] = useState('')
  const popoverRef = useRef<HTMLDivElement>(null)
  const page = pageTitles[pathname] ?? (pathname.startsWith('/markets/')
    ? { title: 'Markets', detail: 'Asset market details' }
    : pageTitles['/dashboard'])
  const isDark = document.documentElement.dataset.theme === 'dark'
  const initials = settings.fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const unreadCount = notifications.filter((notification) => notification.unread).length
  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return searchItems.slice(0, 6)

    return searchItems.filter((item) =>
      `${item.label} ${item.detail} ${item.type}`.toLowerCase().includes(query),
    )
  }, [searchQuery])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) {
        setOpenPanel(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenPanel(null)
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpenPanel('search')
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const toggleTheme = () => {
    try {
      updateSettings({
        ...settings,
        appearance: isDark ? 'light' : 'dark',
      })
      setSettingsError('')
    } catch {
      setSettingsError('Unable to save appearance preference.')
    }
  }

  const openSearchItem = (path: string) => {
    navigate(path)
    setOpenPanel(null)
    setSearchQuery('')
  }

  const openNotification = (id: string, path: string) => {
    setNotifications((current) => current.map((notification) =>
      notification.id === id ? { ...notification, unread: false } : notification,
    ))
    setOpenPanel(null)
    navigate(path)
  }

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })))
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
        <div className="navbar-popover-host" ref={popoverRef}>
          <button
            className={`navbar-icon-button navbar-search${openPanel === 'search' ? ' selected' : ''}`}
            type="button"
            aria-label="Search"
            aria-expanded={openPanel === 'search'}
            aria-controls="navbar-search-panel"
            onClick={() => setOpenPanel((current) => current === 'search' ? null : 'search')}
          >
            <Search size={18} />
          </button>
          <button
            className={`navbar-icon-button${openPanel === 'notifications' ? ' selected' : ''}`}
            type="button"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={openPanel === 'notifications'}
            aria-controls="navbar-notifications-panel"
            onClick={() => setOpenPanel((current) => current === 'notifications' ? null : 'notifications')}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-dot" />}
          </button>

          {openPanel === 'search' && (
            <section className="navbar-popover navbar-search-panel" id="navbar-search-panel" aria-label="Search Nexa">
              <div className="navbar-popover-heading">
                <div><span>QUICK FIND</span><strong>Search Nexa</strong></div>
                <kbd>ESC</kbd>
              </div>
              <label className="navbar-search-field">
                <Search size={17} />
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search pages, assets, settings..."
                  aria-label="Search pages and assets"
                />
                {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search"><X size={15} /></button>}
              </label>
              <div className="navbar-search-results" role="list" aria-label="Search results">
                {filteredSearchItems.length > 0 ? filteredSearchItems.map(({ label, detail, path, icon: Icon, type }) => (
                  <button className="navbar-search-result" type="button" role="listitem" key={path} onClick={() => openSearchItem(path)}>
                    <span className="navbar-result-icon"><Icon size={16} /></span>
                    <span className="navbar-result-copy"><strong>{label}</strong><small>{detail}</small></span>
                    <span className="navbar-result-type">{type}</span>
                  </button>
                )) : <p className="navbar-no-results">No matching pages or assets.</p>}
              </div>
              <div className="navbar-popover-footer"><span>Navigate anywhere in Nexa</span><span><kbd>CTRL</kbd><kbd>K</kbd></span></div>
            </section>
          )}

          {openPanel === 'notifications' && (
            <section className="navbar-popover navbar-notifications-panel" id="navbar-notifications-panel" aria-label="Notifications">
              <div className="navbar-popover-heading">
                <div><span>ACCOUNT UPDATES</span><strong>Notifications{unreadCount > 0 && <i>{unreadCount}</i>}</strong></div>
                <button className="navbar-mark-read" type="button" onClick={markAllRead} disabled={unreadCount === 0}>
                  <CheckCheck size={14} /> Mark all read
                </button>
              </div>
              <div className="navbar-notification-list">
                {notifications.map(({ id, title, detail, time, icon: Icon, tone, path, unread }) => (
                  <button className={`navbar-notification${unread ? ' unread' : ''}`} key={id} type="button" onClick={() => openNotification(id, path)}>
                    <span className={`navbar-notification-icon ${tone}`}><Icon size={16} /></span>
                    <span className="navbar-notification-copy"><strong>{title}</strong><small>{detail}</small><time>{time}</time></span>
                    {unread && <span className="navbar-unread-dot" aria-label="Unread" />}
                  </button>
                ))}
              </div>
              <div className="navbar-popover-footer"><span>Recent account activity</span><span><BellRing size={13} /> Nexa alerts</span></div>
            </section>
          )}
        </div>
        <button className="navbar-icon-button" type="button" aria-label={isDark ? 'Use light theme' : 'Use dark theme'} onClick={toggleTheme}>
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        {settingsError && <span className="navbar-settings-error" role="alert">{settingsError}</span>}
        <button className="navbar-profile" type="button" aria-label="Open profile menu">
          <span className="navbar-avatar">{initials}</span>
          <span className="navbar-profile-copy"><strong>{settings.fullName}</strong><small>Pro account</small></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar