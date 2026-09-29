import { AnimatePresence, motion } from 'framer-motion'
import {
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Settings,
  WalletCards,
  ArrowLeftRight,
  BarChart3,
  BrainCircuit,
  CandlestickChart,
  Coins,
  Sparkles,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSettings } from '../../context/useAppSettings'
import './Sidebar.css'

type SidebarProps = {
  isMobileOpen: boolean
  onMobileClose: () => void
}

const primaryLinks = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'AI Insights', path: '/ai-insights', icon: BrainCircuit },
  { label: 'Markets', path: '/markets', icon: BarChart3 },
  { label: 'Convert', path: '/convert', icon: Coins },
  { label: 'Trade', path: '/trade', icon: CandlestickChart },
  { label: 'Wallet', path: '/wallet', icon: WalletCards },
  { label: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
]

function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const navigate = useNavigate()
  const { settings } = useAppSettings()
  const initials = settings.fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = () => {
    onMobileClose()
    navigate('/auth', { replace: true })
  }

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.button
            className="sidebar-backdrop"
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`sidebar ${isMobileOpen ? 'is-mobile-open' : ''}`}
      >
        <div className="sidebar-topline">
          <NavLink className="sidebar-brand" to="/dashboard" onClick={onMobileClose}>
            <span className="sidebar-brand-mark"><Sparkles size={16} strokeWidth={2.5} /></span>
            <span>Nexa</span>
          </NavLink>
          <button className="sidebar-close" type="button" aria-label="Close navigation" onClick={onMobileClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          <p className="sidebar-label">Workspace</p>
          {primaryLinks.map(({ label, path, icon: Icon }) => (
            <NavLink
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              key={path}
              to={path}
              onClick={onMobileClose}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <p className="sidebar-label">More</p>
          <NavLink className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} to="/settings" onClick={onMobileClose}>
            <Settings size={19} strokeWidth={1.8} />
            <span>Settings</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => `sidebar-link sidebar-button${isActive ? ' active' : ''}`}
            to="/help-support"
            onClick={onMobileClose}
          >
            <CircleHelp size={19} strokeWidth={1.8} />
            <span>Help &amp; Support</span>
          </NavLink>
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials}</div>
            <div className="sidebar-user-copy"><strong>{settings.fullName}</strong><span>Pro account</span></div>
            <button
              className="sidebar-logout-button"
              type="button"
              aria-label="Log out"
              title="Log out"
              onClick={handleLogout}
            >
              <LogOut size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar