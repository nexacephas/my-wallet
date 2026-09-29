import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AppSettingsContext,
  defaultSettings,
  STORAGE_KEY,
  type AppSettings,
} from './appSettings'

function readSettings(): AppSettings {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      const savedTheme = window.localStorage.getItem('nexa-theme')
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return { ...defaultSettings, appearance: savedTheme }
      }

      return defaultSettings
    }

    const parsed: unknown = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') return defaultSettings
    const value = parsed as Record<string, unknown>
    const validEnum = <T extends string>(candidate: unknown, options: readonly T[], fallback: T) =>
      options.find((option) => option === candidate) ?? fallback
    const validBoolean = (candidate: unknown, fallback: boolean) =>
      typeof candidate === 'boolean' ? candidate : fallback
    const validString = (candidate: unknown, fallback: string) =>
      typeof candidate === 'string' ? candidate : fallback

    return {
      fullName: validString(value.fullName, defaultSettings.fullName),
      username: validString(value.username, defaultSettings.username),
      email: validString(value.email, defaultSettings.email),
      phone: validString(value.phone, defaultSettings.phone),
      twoFactor: validBoolean(value.twoFactor, defaultSettings.twoFactor),
      loginAlerts: validBoolean(value.loginAlerts, defaultSettings.loginAlerts),
      transactionAlerts: validBoolean(value.transactionAlerts, defaultSettings.transactionAlerts),
      marketAlerts: validBoolean(value.marketAlerts, defaultSettings.marketAlerts),
      productUpdates: validBoolean(value.productUpdates, defaultSettings.productUpdates),
      newsletter: validBoolean(value.newsletter, defaultSettings.newsletter),
      currency: validEnum(value.currency, ['USD', 'NGN', 'EUR', 'GBP'], defaultSettings.currency),
      language: validEnum(value.language, ['English', 'French'], defaultSettings.language),
      timezone: validEnum(value.timezone, ['Africa/Lagos', 'UTC', 'Europe/London'], defaultSettings.timezone),
      appearance: validEnum(value.appearance, ['light', 'dark', 'system'], defaultSettings.appearance),
      showBalances: validBoolean(value.showBalances, defaultSettings.showBalances),
      compactMode: validBoolean(value.compactMode, defaultSettings.compactMode),
      biometric: validBoolean(value.biometric, defaultSettings.biometric),
    }
  } catch {
    return defaultSettings
  }
}

function getEffectiveTheme(appearance: AppSettings['appearance']) {
  if (appearance !== 'system') return appearance

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(readSettings)

  useEffect(() => {
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return
      setSettings(readSettings())
    }

    window.addEventListener('storage', syncFromStorage)
    return () => window.removeEventListener('storage', syncFromStorage)
  }, [])

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = getEffectiveTheme(settings.appearance)
    if (settings.appearance !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'
    }
    media.addEventListener('change', syncSystemTheme)
    return () => media.removeEventListener('change', syncSystemTheme)
  }, [settings.appearance])

  const updateSettings = (nextSettings: AppSettings) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings))
    setSettings(nextSettings)
  }

  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings],
  )

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  )
}
