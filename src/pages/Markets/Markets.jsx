import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bitcoin,
  ChevronDown,
  CircleDollarSign,
  Eye,
  Search,
  Star,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import './Markets.css'

const markets = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 68240,
    change24h: 4.8,
    change7d: 8.2,
    marketCap: '$1.35T',
    volume: '$38.4B',
    icon: Bitcoin,
    accent: 'btc',
    favorite: true,
    trend: [42, 45, 43, 48, 46, 52, 55, 53, 58, 62, 60, 68],
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3480,
    change24h: 3.2,
    change7d: 6.4,
    marketCap: '$419.2B',
    volume: '$18.7B',
    icon: CircleDollarSign,
    accent: 'eth',
    favorite: true,
    trend: [48, 46, 50, 49, 53, 51, 56, 55, 59, 57, 62, 66],
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    price: 162,
    change24h: 6.5,
    change7d: 12.1,
    marketCap: '$76.1B',
    volume: '$5.8B',
    icon: TrendingUp,
    accent: 'sol',
    favorite: true,
    trend: [34, 37, 35, 42, 40, 46, 45, 51, 54, 52, 60, 67],
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    price: 612.84,
    change24h: 1.9,
    change7d: 4.1,
    marketCap: '$89.4B',
    volume: '$1.9B',
    icon: BarChart3,
    accent: 'bnb',
    favorite: false,
    trend: [52, 51, 54, 53, 55, 56, 54, 58, 59, 61, 60, 63],
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.5842,
    change24h: -1.4,
    change7d: 2.8,
    marketCap: '$32.8B',
    volume: '$1.7B',
    icon: CircleDollarSign,
    accent: 'xrp',
    favorite: false,
    trend: [62, 64, 60, 61, 57, 59, 55, 56, 53, 55, 52, 51],
  },
  {
    id: 'avax',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 28.74,
    change24h: -2.6,
    change7d: -4.2,
    marketCap: '$11.3B',
    volume: '$486M',
    icon: TrendingUp,
    accent: 'avax',
    favorite: false,
    trend: [68, 66, 64, 65, 60, 62, 57, 55, 56, 52, 49, 46],
  },
]

const categories = [
  { label: 'All markets', value: 'all' },
  { label: 'Favorites', value: 'favorites' },
  { label: 'Spot', value: 'spot' },
  { label: 'Top gainers', value: 'gainers' },
  { label: 'Top losers', value: 'losers' },
]

function formatPrice(price) {
  if (price < 1) {
    return `$${price.toFixed(4)}`
  }

  return `$${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function MiniChart({ values, negative = false }) {
  const width = 120
  const height = 42
  const padding = 3

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const points = values
    .map((value, index) => {
      const x =
        padding +
        (index / (values.length - 1)) * (width - padding * 2)

      const y =
        height -
        padding -
        ((value - min) / range) * (height - padding * 2)

      return `${x},${y}`
    })
    .join(' ')

  const gradientId = `market-gradient-${negative ? 'negative' : 'positive'}`

  return (
    <svg
      className="market-mini-chart"
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopOpacity="0.22" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Markets() {
  const [activeCategory, setActiveCategory] = useState('all')

  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(
    new Set(markets.filter((market) => market.favorite).map((market) => market.id)),
  )

  const filteredMarkets = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    return markets.filter((market) => {
      const matchesSearch =
        !query ||
        market.name.toLowerCase().includes(query) ||
        market.symbol.toLowerCase().includes(query)

      if (!matchesSearch) return false

      if (activeCategory === 'favorites') {
        return favorites.has(market.id)
      }

      if (activeCategory === 'gainers') {
        return market.change24h > 0
      }

      if (activeCategory === 'losers') {
        return market.change24h < 0
      }

      return true
    })
  }, [activeCategory, favorites, searchQuery])

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = new Set(current)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  return (
    <main className="markets-page">
      <div className="markets-shell">
        <motion.header
          className="markets-header"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div>
            <span className="markets-eyebrow">MARKETPLACE</span>

            <h1>Markets</h1>

            <p>
              Discover market movements, track assets and monitor
              opportunities in real time.
            </p>
          </div>

          <button className="market-overview-button">
            <WalletCards size={17} />
            <span>Portfolio</span>
            <ChevronDown size={15} />
          </button>
        </motion.header>

        <motion.section
          className="market-stats"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="market-stat">
            <span className="market-stat-label">Total market cap</span>
            <strong>$2.41T</strong>
            <span className="market-stat-change positive">
              <ArrowUpRight size={14} />
              2.84%
            </span>
          </div>

          <div className="market-stat">
            <span className="market-stat-label">24h volume</span>
            <strong>$86.7B</strong>
            <span className="market-stat-sub">Across major markets</span>
          </div>

          <div className="market-stat">
            <span className="market-stat-label">BTC dominance</span>
            <strong>54.8%</strong>
            <span className="market-stat-change positive">
              <ArrowUpRight size={14} />
              0.42%
            </span>
          </div>

          <div className="market-stat">
            <span className="market-stat-label">Active markets</span>
            <strong>248</strong>
            <span className="market-stat-sub">Spot markets</span>
          </div>
        </motion.section>

        <motion.section
          className="market-movers"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          <div className="section-heading">
            <div>
              <span className="section-kicker">MARKET PULSE</span>
              <h2>Market movers</h2>
            </div>

            <span className="live-indicator">
              <span />
              Live market data
            </span>
          </div>

          <div className="mover-grid">
            {markets.slice(0, 3).map((market, index) => {
              const Icon = market.icon

              return (
                <motion.article
                  key={market.id}
                  className={`mover-card ${market.accent}`}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mover-top">
                    <div className={`asset-icon ${market.accent}`}>
                      <Icon size={19} />
                    </div>

                    <span className="mover-rank">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="mover-info">
                    <div>
                      <strong>{market.symbol}/USD</strong>
                      <span>{market.name}</span>
                    </div>

                    <div className="mover-price">
                      <strong>{formatPrice(market.price)}</strong>

                      <span
                        className={
                          market.change24h >= 0
                            ? 'positive'
                            : 'negative'
                        }
                      >
                        {market.change24h >= 0 ? '+' : ''}
                        {market.change24h}%
                      </span>
                    </div>
                  </div>

                  <MiniChart
                    values={market.trend}
                    negative={market.change24h < 0}
                  />
                </motion.article>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          className="markets-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
        >
          <div className="markets-panel-header">
            <div>
              <span className="section-kicker">EXPLORE</span>
              <h2>All markets</h2>
            </div>

            <div className="market-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search markets"
              />
            </div>
          </div>

          <div className="market-tabs">
            {categories.map((category) => (
              <button
                key={category.value}
                className={
                  activeCategory === category.value
                    ? 'market-tab active'
                    : 'market-tab'
                }
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="markets-table-wrap">
            <div className="markets-table-head">
              <span>Asset</span>
              <span>Price</span>
              <span>24h</span>
              <span>7d</span>
              <span>Market cap</span>
              <span>Volume</span>
              <span>Trend</span>
              <span />
            </div>

            <div className="markets-list">
              {filteredMarkets.map((market, index) => {
                const Icon = market.icon
                const isPositive = market.change24h >= 0
                const isPositive7d = market.change7d >= 0

                return (
                  <motion.div
                    key={market.id}
                    className="market-row"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.035,
                    }}
                  >
                    <div className="market-asset">
                      <button
                        className={
                          favorites.has(market.id)
                            ? 'favorite-button active'
                            : 'favorite-button'
                        }
                        onClick={() => toggleFavorite(market.id)}
                        aria-label={
                          favorites.has(market.id)
                            ? `Remove ${market.name} from favorites`
                            : `Add ${market.name} to favorites`
                        }
                      >
                        <Star size={15} fill="currentColor" />
                      </button>

                      <div className={`asset-icon ${market.accent}`}>
                        <Icon size={18} />
                      </div>

                      <div className="asset-name">
                        <strong>{market.name}</strong>
                        <span>{market.symbol}</span>
                      </div>
                    </div>

                    <strong className="market-price">
                      {formatPrice(market.price)}
                    </strong>

                    <span
                      className={
                        isPositive
                          ? 'market-change positive'
                          : 'market-change negative'
                      }
                    >
                      {isPositive ? '+' : ''}
                      {market.change24h}%
                    </span>

                    <span
                      className={
                        isPositive7d
                          ? 'market-change positive'
                          : 'market-change negative'
                      }
                    >
                      {isPositive7d ? '+' : ''}
                      {market.change7d}%
                    </span>

                    <span className="market-data">
                      {market.marketCap}
                    </span>

                    <span className="market-data">
                      {market.volume}
                    </span>

                    <div
                      className={
                        isPositive
                          ? 'market-trend positive'
                          : 'market-trend negative'
                      }
                    >
                      <MiniChart
                        values={market.trend}
                        negative={!isPositive}
                      />
                    </div>

                    <button
                      className="market-view-button"
                      aria-label={`View ${market.name} market`}
                    >
                      <Eye size={17} />
                    </button>
                  </motion.div>
                )
              })}
            </div>

            {filteredMarkets.length === 0 && (
              <div className="markets-empty">
                <Search size={24} />
                <strong>No markets found</strong>
                <span>
                  Try searching for another asset or symbol.
                </span>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default Markets