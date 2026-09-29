import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Globe2,
  KeyRound,
  Laptop,
  LockKeyhole,
  LogOut,
  Mail,
  Moon,
  MoreHorizontal,
  Monitor,
  Save,
  Shield,
  ShieldCheck,
  Smartphone,
  Sun,
  Trash2,
  UserRound,
  WalletCards,
} from 'lucide-react'
import { defaultSettings } from '../../context/appSettings'
import { useAppSettings } from '../../context/useAppSettings'
import './Settings.css'

const sessions = [
  {
    id: 1,
    device: 'Windows · Chrome',
    location: 'Abuja, Nigeria',
    lastActive: 'Active now',
    current: true,
    icon: 'desktop',
  },
  {
    id: 2,
    device: 'Android · Nexa App',
    location: 'Abuja, Nigeria',
    lastActive: '2 hours ago',
    current: false,
    icon: 'mobile',
  },
  {
    id: 3,
    device: 'MacBook · Safari',
    location: 'Lagos, Nigeria',
    lastActive: 'Sep 22, 2026',
    current: false,
    icon: 'desktop',
  },
]

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${checked ? 'checked' : ''}`}
      onClick={onChange}
      aria-label={label}
      aria-pressed={checked}
    >
      <span />
    </button>
  )
}

function Settings() {
  const { settings, updateSettings } = useAppSettings()
  const [activeSection, setActiveSection] = useState('profile')

  const [showPassword, setShowPassword] = useState(false)

  const [fullName, setFullName] = useState(settings.fullName)
  const [username, setUsername] = useState(settings.username)
  const [email, setEmail] = useState(settings.email)
  const [phone, setPhone] = useState(settings.phone)

  const [twoFactor, setTwoFactor] = useState(settings.twoFactor)
  const [loginAlerts, setLoginAlerts] = useState(settings.loginAlerts)
  const [transactionAlerts, setTransactionAlerts] = useState(settings.transactionAlerts)
  const [marketAlerts, setMarketAlerts] = useState(settings.marketAlerts)
  const [productUpdates, setProductUpdates] = useState(settings.productUpdates)
  const [newsletter, setNewsletter] = useState(settings.newsletter)

  const [currency, setCurrency] = useState(settings.currency)
  const [language, setLanguage] = useState(settings.language)
  const [timezone, setTimezone] = useState(settings.timezone)
  const [appearance, setAppearance] = useState(settings.appearance)

  const [showBalances, setShowBalances] = useState(settings.showBalances)
  const [compactMode, setCompactMode] = useState(settings.compactMode)
  const [biometric, setBiometric] = useState(settings.biometric)

  const [saveState, setSaveState] = useState('idle')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    // Keep the open form draft aligned with saved settings from other tabs.
    // eslint-disable-next-line react/set-state-in-effect
    setFullName(settings.fullName)
    setUsername(settings.username)
    setEmail(settings.email)
    setPhone(settings.phone)
    setTwoFactor(settings.twoFactor)
    setLoginAlerts(settings.loginAlerts)
    setTransactionAlerts(settings.transactionAlerts)
    setMarketAlerts(settings.marketAlerts)
    setProductUpdates(settings.productUpdates)
    setNewsletter(settings.newsletter)
    setCurrency(settings.currency)
    setLanguage(settings.language)
    setTimezone(settings.timezone)
    setAppearance(settings.appearance)
    setShowBalances(settings.showBalances)
    setCompactMode(settings.compactMode)
    setBiometric(settings.biometric)
  }, [settings])

  const sectionMeta = useMemo(
    () => ({
      profile: {
        eyebrow: 'ACCOUNT',
        title: 'Profile',
        description:
          'Manage your personal details and account information.',
      },
      security: {
        eyebrow: 'PROTECTION',
        title: 'Security',
        description:
          'Control authentication, login protection and active sessions.',
      },
      notifications: {
        eyebrow: 'COMMUNICATION',
        title: 'Notifications',
        description:
          'Choose which alerts and updates you want to receive.',
      },
      preferences: {
        eyebrow: 'PERSONALIZATION',
        title: 'Preferences',
        description:
          'Customize your display, currency and application experience.',
      },
      sessions: {
        eyebrow: 'DEVICES',
        title: 'Sessions',
        description:
          'Review devices that currently have access to your account.',
      },
    }),
    [],
  )

  const handleSave = () => {
    setSaveState('saving')
    setSaveError('')

    try {
      updateSettings({
        ...defaultSettings,
        fullName,
        username,
        email,
        phone,
        twoFactor,
        loginAlerts,
        transactionAlerts,
        marketAlerts,
        productUpdates,
        newsletter,
        currency,
        language,
        timezone,
        appearance,
        showBalances,
        compactMode,
        biometric,
      })
      setSaveState('saved')
      window.setTimeout(() => {
        setSaveState('idle')
      }, 2200)
    } catch {
      setSaveState('idle')
      setSaveError('Unable to save settings. Check browser storage and try again.')
    }
  }

  const copyUserId = async () => {
    try {
      await navigator.clipboard.writeText('NX-USER-2048')
    } catch {
      // Clipboard access can be unavailable in some browsers.
    }
  }

  const renderProfile = () => (
    <motion.div
      className="settings-content-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="settings-card profile-card">
        <div className="settings-card-heading">
          <div>
            <span className="settings-card-eyebrow">
              PERSONAL INFORMATION
            </span>
            <h2>Profile details</h2>
            <p>
              These details are associated with your Nexa account.
            </p>
          </div>

          <div className="profile-avatar-large">{fullName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div>
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Full name</span>
            <div className="settings-input-wrap">
              <UserRound size={16} />
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Your full name"
              />
            </div>
          </label>

          <label className="settings-field">
            <span>Username</span>
            <div className="settings-input-wrap">
              <span className="input-prefix">@</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
              />
            </div>
          </label>

          <label className="settings-field">
            <span>Email address</span>
            <div className="settings-input-wrap">
              <Mail size={16} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
              />
              <span className="verified-badge">
                <Check size={11} />
                Verified
              </span>
            </div>
          </label>

          <label className="settings-field">
            <span>Phone number</span>
            <div className="settings-input-wrap">
              <Smartphone size={16} />
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+234..."
              />
            </div>
          </label>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">ACCOUNT ID</span>
            <h2>Nexa identity</h2>
            <p>
              Use this ID when contacting support about your account.
            </p>
          </div>
        </div>

        <div className="account-id-row">
          <div>
            <span>Account ID</span>
            <strong>NX-USER-2048</strong>
          </div>

          <button type="button" onClick={copyUserId}>
            <Copy size={15} />
            Copy ID
          </button>
        </div>
      </section>

      <section className="settings-card danger-card">
        <div className="danger-icon">
          <Trash2 size={18} />
        </div>

        <div className="danger-content">
          <span className="settings-card-eyebrow">DANGER ZONE</span>
          <h2>Close account</h2>
          <p>
            Permanently close your Nexa account and remove access to
            the platform.
          </p>
        </div>

        <button className="danger-button" type="button">
          Close account
          <ChevronRight size={15} />
        </button>
      </section>
    </motion.div>
  )

  const renderSecurity = () => (
    <motion.div
      className="settings-content-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="settings-card">
        <div className="security-score">
          <div className="security-score-icon">
            <ShieldCheck size={22} />
          </div>

          <div className="security-score-content">
            <div className="security-score-top">
              <div>
                <span className="settings-card-eyebrow">
                  SECURITY STATUS
                </span>
                <h2>Your account is protected</h2>
              </div>

              <span className="security-status-pill">
                <span />
                Strong
              </span>
            </div>

            <div className="security-progress">
              <span />
            </div>

            <p>
              Two-factor authentication, login alerts and biometric
              protection are enabled.
            </p>
          </div>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">
              AUTHENTICATION
            </span>
            <h2>Login protection</h2>
            <p>
              Add extra layers of protection to your account.
            </p>
          </div>
        </div>

        <div className="settings-list">
          <div className="settings-list-item">
            <div className="settings-list-icon green">
              <KeyRound size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Two-factor authentication</strong>
              <span>
                Require a verification code when signing in from a
                new device.
              </span>
            </div>

            <Toggle
              checked={twoFactor}
              onChange={() => setTwoFactor((value) => !value)}
              label="Toggle two-factor authentication"
            />
          </div>

          <div className="settings-list-item">
            <div className="settings-list-icon blue">
              <Bell size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Login alerts</strong>
              <span>
                Get notified whenever your account is accessed.
              </span>
            </div>

            <Toggle
              checked={loginAlerts}
              onChange={() => setLoginAlerts((value) => !value)}
              label="Toggle login alerts"
            />
          </div>

          <div className="settings-list-item">
            <div className="settings-list-icon purple">
              <Smartphone size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Biometric unlock</strong>
              <span>
                Use biometric authentication on supported devices.
              </span>
            </div>

            <Toggle
              checked={biometric}
              onChange={() => setBiometric((value) => !value)}
              label="Toggle biometric unlock"
            />
          </div>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">
              PASSWORD
            </span>
            <h2>Change password</h2>
            <p>
              Keep your password unique and difficult to guess.
            </p>
          </div>
        </div>

        <div className="settings-form-stack">
          <label className="settings-field">
            <span>Current password</span>
            <div className="settings-input-wrap">
              <LockKeyhole size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                defaultValue="nexa-password"
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword((value) => !value)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </label>

          <div className="settings-form-grid">
            <label className="settings-field">
              <span>New password</span>
              <div className="settings-input-wrap">
                <LockKeyhole size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                />
              </div>
            </label>

            <label className="settings-field">
              <span>Confirm password</span>
              <div className="settings-input-wrap">
                <LockKeyhole size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="password-requirements">
          <span>Password should contain:</span>
          <div>
            <span>
              <Check size={11} /> 8+ characters
            </span>
            <span>
              <Check size={11} /> Uppercase & lowercase
            </span>
            <span>
              <Check size={11} /> Number or symbol
            </span>
          </div>
        </div>

        <button className="secondary-action-button" type="button">
          Update password
        </button>
      </section>
    </motion.div>
  )

  const renderNotifications = () => (
    <motion.div
      className="settings-content-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">
              TRANSACTION ALERTS
            </span>
            <h2>Financial activity</h2>
            <p>
              Stay informed about important activity on your account.
            </p>
          </div>
        </div>

        <div className="settings-list">
          <div className="settings-list-item">
            <div className="settings-list-icon green">
              <WalletCards size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Transaction notifications</strong>
              <span>
                Receive alerts for deposits, withdrawals, purchases
                and sales.
              </span>
            </div>

            <Toggle
              checked={transactionAlerts}
              onChange={() =>
                setTransactionAlerts((value) => !value)
              }
              label="Toggle transaction notifications"
            />
          </div>

          <div className="settings-list-item">
            <div className="settings-list-icon orange">
              <Bell size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Market alerts</strong>
              <span>
                Get notified about significant asset price movements.
              </span>
            </div>

            <Toggle
              checked={marketAlerts}
              onChange={() => setMarketAlerts((value) => !value)}
              label="Toggle market alerts"
            />
          </div>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">PRODUCT</span>
            <h2>Nexa updates</h2>
            <p>
              Hear about new features and important platform
              announcements.
            </p>
          </div>
        </div>

        <div className="settings-list">
          <div className="settings-list-item">
            <div className="settings-list-icon blue">
              <Monitor size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Product updates</strong>
              <span>
                Receive occasional updates about new Nexa features.
              </span>
            </div>

            <Toggle
              checked={productUpdates}
              onChange={() =>
                setProductUpdates((value) => !value)
              }
              label="Toggle product updates"
            />
          </div>

          <div className="settings-list-item">
            <div className="settings-list-icon purple">
              <Mail size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Newsletter</strong>
              <span>
                Receive market education and product news by email.
              </span>
            </div>

            <Toggle
              checked={newsletter}
              onChange={() => setNewsletter((value) => !value)}
              label="Toggle newsletter"
            />
          </div>
        </div>
      </section>

      <section className="notification-preview">
        <div className="notification-preview-icon">
          <Bell size={18} />
        </div>

        <div>
          <strong>You'll receive important alerts</strong>
          <span>
            Security and transaction-critical notifications may
            still be delivered even when optional alerts are disabled.
          </span>
        </div>
      </section>
    </motion.div>
  )

  const renderPreferences = () => (
    <motion.div
      className="settings-content-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">DISPLAY</span>
            <h2>Appearance</h2>
            <p>Choose how Nexa looks across your devices.</p>
          </div>
        </div>

        <div className="appearance-grid">
          <button
            type="button"
            className={`appearance-option ${
              appearance === 'light' ? 'selected' : ''
            }`}
            onClick={() => setAppearance('light')}
          >
            <div className="appearance-preview light">
              <div />
              <div />
              <div />
            </div>

            <div className="appearance-option-label">
              <Sun size={15} />
              Light
            </div>

            {appearance === 'light' && (
              <span className="appearance-check">
                <Check size={11} />
              </span>
            )}
          </button>

          <button
            type="button"
            className={`appearance-option ${
              appearance === 'dark' ? 'selected' : ''
            }`}
            onClick={() => setAppearance('dark')}
          >
            <div className="appearance-preview dark">
              <div />
              <div />
              <div />
            </div>

            <div className="appearance-option-label">
              <Moon size={15} />
              Dark
            </div>

            {appearance === 'dark' && (
              <span className="appearance-check">
                <Check size={11} />
              </span>
            )}
          </button>

          <button
            type="button"
            className={`appearance-option ${
              appearance === 'system' ? 'selected' : ''
            }`}
            onClick={() => setAppearance('system')}
          >
            <div className="appearance-preview system">
              <div />
              <div />
              <div />
            </div>

            <div className="appearance-option-label">
              <Monitor size={15} />
              System
            </div>

            {appearance === 'system' && (
              <span className="appearance-check">
                <Check size={11} />
              </span>
            )}
          </button>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">
              REGIONAL
            </span>
            <h2>Localization</h2>
            <p>
              Set how currencies, language and time are displayed. Currency conversions use preview exchange rates.
            </p>
          </div>
        </div>

        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Display currency</span>
            <div className="settings-input-wrap select-wrap">
              <CreditCard size={16} />
              <select
                value={currency}
                onChange={(event) =>
                  setCurrency(event.target.value)
                }
              >
                <option value="USD">USD — US Dollar</option>
                <option value="NGN">NGN — Nigerian Naira</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
              </select>
            </div>
          </label>

          <label className="settings-field">
            <span>Language</span>
            <div className="settings-input-wrap select-wrap">
              <Globe2 size={16} />
              <select
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value)
                }
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </div>
          </label>

          <label className="settings-field full">
            <span>Time zone</span>
            <div className="settings-input-wrap select-wrap">
              <Globe2 size={16} />
              <select
                value={timezone}
                onChange={(event) =>
                  setTimezone(event.target.value)
                }
              >
                <option value="Africa/Lagos">
                  Africa/Lagos — WAT (UTC+1)
                </option>
                <option value="UTC">UTC — Coordinated Universal Time</option>
                <option value="Europe/London">
                  Europe/London — GMT / BST
                </option>
              </select>
            </div>
          </label>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">
              PORTFOLIO DISPLAY
            </span>
            <h2>Dashboard behavior</h2>
            <p>Control how portfolio information appears.</p>
          </div>
        </div>

        <div className="settings-list">
          <div className="settings-list-item">
            <div className="settings-list-icon green">
              <Eye size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Show balances</strong>
              <span>
                Display portfolio values instead of masking them.
              </span>
            </div>

            <Toggle
              checked={showBalances}
              onChange={() =>
                setShowBalances((value) => !value)
              }
              label="Toggle visible balances"
            />
          </div>

          <div className="settings-list-item">
            <div className="settings-list-icon blue">
              <Monitor size={17} />
            </div>

            <div className="settings-list-copy">
              <strong>Compact mode</strong>
              <span>
                Reduce spacing across tables and portfolio lists.
              </span>
            </div>

            <Toggle
              checked={compactMode}
              onChange={() =>
                setCompactMode((value) => !value)
              }
              label="Toggle compact mode"
            />
          </div>
        </div>
      </section>
    </motion.div>
  )

  const renderSessions = () => (
    <motion.div
      className="settings-content-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="settings-card">
        <div className="settings-card-heading compact">
          <div>
            <span className="settings-card-eyebrow">
              ACTIVE DEVICES
            </span>
            <h2>Session management</h2>
            <p>
              Review where your account is currently signed in.
            </p>
          </div>

          <button className="session-action" type="button">
            <LogOut size={14} />
            Sign out all
          </button>
        </div>

        <div className="session-list">
          {sessions.map((session) => (
            <div className="session-item" key={session.id}>
              <div className="session-device-icon">
                {session.icon === 'desktop' ? (
                  <Laptop size={19} />
                ) : (
                  <Smartphone size={19} />
                )}
              </div>

              <div className="session-copy">
                <div className="session-title-row">
                  <strong>{session.device}</strong>

                  {session.current && (
                    <span className="current-session">
                      Current device
                    </span>
                  )}
                </div>

                <span>{session.location}</span>
                <small>{session.lastActive}</small>
              </div>

              {!session.current && (
                <button
                  type="button"
                  className="session-more"
                  aria-label={`Manage ${session.device} session`}
                >
                  <MoreHorizontal size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="trusted-device-card">
        <div className="trusted-device-icon">
          <Shield size={20} />
        </div>

        <div>
          <strong>Recognize your devices</strong>
          <span>
            Review unfamiliar sessions immediately. Never share
            verification codes with anyone.
          </span>
        </div>

        <button type="button">
          <CircleHelp size={15} />
          Security help
        </button>
      </section>
    </motion.div>
  )

  return (
    <main className="settings-page">
      <div className="settings-shell">
        <motion.header
          className="settings-page-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <span className="settings-page-eyebrow">
              ACCOUNT CENTER
            </span>
            <h1>Settings</h1>
            <p>
              Manage your account and experience. Changes persist on this device and sync across open tabs.
            </p>
          </div>

          <button
            type="button"
            className={`settings-save-button ${
              saveState === 'saved' ? 'saved' : ''
            }`}
            onClick={handleSave}
            disabled={saveState === 'saving'}
          >
            {saveState === 'saved' ? (
              <>
                <Check size={16} />
                Saved
              </>
            ) : saveState === 'saving' ? (
              <>
                <span className="save-spinner" />
                Saving
              </>
            ) : (
              <>
                <Save size={16} />
                Save changes
              </>
            )}
          </button>
          {saveError && <p className="settings-save-error" role="alert">{saveError}</p>}
        </motion.header>

        <div className="settings-layout">
          <aside className="settings-navigation">
            <div className="settings-profile-mini">
              <div className="settings-profile-avatar">{fullName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div>

              <div>
                <strong>{fullName}</strong>
                <span>{username}</span>
              </div>
            </div>

            <div className="settings-nav-group">
              <span>ACCOUNT</span>

              <button
                type="button"
                className={
                  activeSection === 'profile' ? 'active' : ''
                }
                onClick={() => setActiveSection('profile')}
              >
                <UserRound size={16} />
                Profile
                <ChevronRight size={14} />
              </button>

              <button
                type="button"
                className={
                  activeSection === 'security' ? 'active' : ''
                }
                onClick={() => setActiveSection('security')}
              >
                <ShieldCheck size={16} />
                Security
                <ChevronRight size={14} />
              </button>

              <button
                type="button"
                className={
                  activeSection === 'notifications'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setActiveSection('notifications')
                }
              >
                <Bell size={16} />
                Notifications
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="settings-nav-group">
              <span>EXPERIENCE</span>

              <button
                type="button"
                className={
                  activeSection === 'preferences' ? 'active' : ''
                }
                onClick={() => setActiveSection('preferences')}
              >
                <Monitor size={16} />
                Preferences
                <ChevronRight size={14} />
              </button>

              <button
                type="button"
                className={
                  activeSection === 'sessions' ? 'active' : ''
                }
                onClick={() => setActiveSection('sessions')}
              >
                <Laptop size={16} />
                Sessions
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="settings-nav-footer">
              <div className="settings-nav-security">
                <LockKeyhole size={15} />
                <span>
                  Settings are saved on this device.
                </span>
              </div>
            </div>
          </aside>

          <section className="settings-main">
            <div className="mobile-settings-tabs">
              {Object.keys(sectionMeta).map((section) => (
                <button
                  type="button"
                  key={section}
                  className={
                    activeSection === section ? 'active' : ''
                  }
                  onClick={() => setActiveSection(section)}
                >
                  {sectionMeta[section].title}
                </button>
              ))}
            </div>

            <div className="settings-main-heading">
              <div>
                <span className="settings-page-eyebrow">
                  {sectionMeta[activeSection].eyebrow}
                </span>
                <h2>{sectionMeta[activeSection].title}</h2>
                <p>
                  {sectionMeta[activeSection].description}
                </p>
              </div>
            </div>

            {activeSection === 'profile' && renderProfile()}
            {activeSection === 'security' && renderSecurity()}
            {activeSection === 'notifications' &&
              renderNotifications()}
            {activeSection === 'preferences' &&
              renderPreferences()}
            {activeSection === 'sessions' && renderSessions()}
          </section>
        </div>
      </div>
    </main>
  )
}

export default Settings