import { createContext } from 'react'

export type AppSettings = {
  fullName: string
  username: string
  email: string
  phone: string
  twoFactor: boolean
  loginAlerts: boolean
  transactionAlerts: boolean
  marketAlerts: boolean
  productUpdates: boolean
  newsletter: boolean
  currency: 'USD' | 'NGN' | 'EUR' | 'GBP'
  language: 'English' | 'French'
  timezone: 'Africa/Lagos' | 'UTC' | 'Europe/London'
  appearance: 'light' | 'dark' | 'system'
  showBalances: boolean
  compactMode: boolean
  biometric: boolean
}

export const STORAGE_KEY = 'nexa-settings'

export const defaultSettings: AppSettings = {
  fullName: 'Cephas Adekeye',
  username: 'nexa.cephas',
  email: 'cephas@nexa.com',
  phone: '+234 801 234 5678',
  twoFactor: true,
  loginAlerts: true,
  transactionAlerts: true,
  marketAlerts: false,
  productUpdates: true,
  newsletter: false,
  currency: 'USD',
  language: 'English',
  timezone: 'Africa/Lagos',
  appearance: 'dark',
  showBalances: true,
  compactMode: false,
  biometric: true,
}

export type AppSettingsContextValue = {
  settings: AppSettings
  updateSettings: (settings: AppSettings) => void
}

export const AppSettingsContext = createContext<AppSettingsContextValue | null>(null)
