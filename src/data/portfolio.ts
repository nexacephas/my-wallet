export const portfolioAssets = [
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 2.84,
    price: 68100,
    change: 2.84,
    colorClass: 'btc',
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 15.42,
    price: 3478,
    change: 1.72,
    colorClass: 'eth',
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    balance: 184.6,
    price: 161.5,
    change: -0.84,
    colorClass: 'sol',
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether',
    balance: 18450,
    price: 1,
    change: 0.03,
    colorClass: 'usdt',
  },
  {
    id: 'usd',
    symbol: 'USD',
    name: 'US Dollar',
    balance: 12640,
    price: 1,
    change: 0,
    colorClass: 'usd',
  },
] as const

export const portfolioTotal = portfolioAssets.reduce(
  (total, asset) => total + asset.balance * asset.price,
  0,
)

export const lockedBalance = 18450
export const availableBalance = portfolioTotal - lockedBalance

const usdExchangeRates = {
  USD: 1,
  NGN: 1500,
  EUR: 0.92,
  GBP: 0.79,
} as const

export function formatCurrency(value: number, currency: keyof typeof usdExchangeRates = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value * usdExchangeRates[currency])
}
