import { motion } from 'framer-motion'
import { useState } from 'react'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bitcoin,
  BriefcaseBusiness,
  Download,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet2,
  Accessibility,
} from 'lucide-react'
import NexaAI from '../../components/NexaAI/NexaAI'
import type { AppSettings } from '../../context/appSettings'
import { useAppSettings } from '../../context/useAppSettings'
import {
  availableBalance,
  formatCurrency,
  lockedBalance,
  portfolioAssets,
  portfolioTotal,
} from '../../data/portfolio'
import { transactions } from '../../data/transactions'
import './Dashboard.css'

const performanceData = [
  { day: 'Mon', multiplier: 0.8869 },
  { day: 'Tue', multiplier: 0.9088 },
  { day: 'Wed', multiplier: 0.8978 },
  { day: 'Thu', multiplier: 0.9380 },
  { day: 'Fri', multiplier: 0.9635 },
  { day: 'Sat', multiplier: 0.9781 },
  { day: 'Sun', multiplier: 1 },
]

const assetIcons = {
  BTC: Bitcoin,
  ETH: ShieldCheck,
  SOL: Sparkles,
}

const assetCards = [...portfolioAssets]
  .sort((first, second) => second.balance * second.price - first.balance * first.price)
  .slice(0, 3)
  .map((asset) => ({
    name: asset.name,
    ticker: asset.symbol,
    price: asset.price,
    change: asset.change,
    allocation: `${((asset.balance * asset.price / portfolioTotal) * 100).toFixed(1)}%`,
    icon: assetIcons[asset.symbol as keyof typeof assetIcons] ?? Bitcoin,
    accent: asset.colorClass,
  }))

const recentTransactions = transactions.slice(0, 4).map((transaction) => ({
  id: transaction.id,
  asset: transaction.asset,
  action: `${transaction.type[0].toUpperCase()}${transaction.type.slice(1)}`,
  time: `${transaction.date} · ${transaction.time}`,
  amount: transaction.amount,
  value: transaction.value,
  tone: transaction.type === 'sale' || transaction.type === 'withdrawal' ? 'negative' : 'positive',
}))

const quickActions = [
  { label: 'Buy', icon: Plus, tone: 'buy' },
  { label: 'Sell', icon: ArrowUpRight, tone: 'sell' },
  { label: 'Deposit', icon: Download, tone: 'deposit' },
  { label: 'Withdraw', icon: ArrowDownRight, tone: 'withdraw' },
  { label: 'Accessibility', icon: Accessibility, tone: 'accessibility' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: index * 0.08,
    },
  }),
}

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
  currency: AppSettings['currency']
  showBalances: boolean
}

function CustomTooltip({ active, payload, label, currency, showBalances }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{label}</span>
      <strong>{showBalances ? formatCurrency(payload[0].value, currency) : '••••••••'}</strong>
    </div>
  )
}

function Dashboard() {
  const { settings } = useAppSettings()
  const { currency, fullName, showBalances, compactMode } = settings
  const [showAccessibilityModal, setShowAccessibilityModal] = useState(false)
  const dailyPnl = 8240.4
  const dailyChange = 1.53
  const displayBalance = (amount: number) =>
    showBalances ? formatCurrency(amount, currency) : '••••••••'
  const chartData = performanceData.map(({ day, multiplier }) => ({
    day,
    value: portfolioTotal * multiplier,
  }))

  return (
    <div className="dashboard-page">
      <motion.div
        className={`dashboard-shell${compactMode ? ' compact' : ''}`}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="dashboard-header"
          variants={fadeUp}
          custom={0}
        >
          <div className="dashboard-greeting">
            <p className="dashboard-kicker">Portfolio overview</p>
            <h2>Welcome back, {fullName.split(/\s+/)[0]}.</h2>
          </div>

          <button className="ghost-button" type="button">
            <BriefcaseBusiness size={18} />
            <span>Export report</span>
          </button>
        </motion.header>

        <section className="dashboard-metrics">
          <motion.article
            className="metric-card metric-card-primary"
            variants={fadeUp}
            custom={1}
          >
            <div className="metric-header-row">
              <div>
                <p className="metric-label">Total portfolio balance</p>
                <h3>
                  {displayBalance(portfolioTotal)}
                </h3>
              </div>

              <div className="metric-chip metric-chip-positive">
                <TrendingUp size={14} />
                <span>+{dailyChange.toFixed(2)}%</span>
              </div>
            </div>

            <div className="metric-detail-row">
              <span>
                <ShieldCheck size={14} />
                Institutional-grade allocation
              </span>
              <span>Updated 12 min ago</span>
            </div>

            <div className="balance-split">
              <div>
                <small>Available</small>
                <strong>
                  {displayBalance(availableBalance)}
                </strong>
              </div>

              <div>
                <small>Locked</small>
                <strong>
                  {displayBalance(lockedBalance)}
                </strong>
              </div>
            </div>
          </motion.article>

          <motion.article
            className="metric-card"
            variants={fadeUp}
            custom={2}
          >
            <div className="mini-card-top">
              <span className="metric-label">24h P&amp;L</span>
              <div className="mini-icon positive">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <h3 className="metric-number positive">
              {displayBalance(dailyPnl)}
            </h3>
            <p className="metric-footnote">+{dailyChange.toFixed(2)}% vs yesterday</p>
          </motion.article>

          <motion.article
            className="metric-card"
            variants={fadeUp}
            custom={3}
          >
            <div className="mini-card-top">
              <span className="metric-label">Available balance</span>
              <div className="mini-icon neutral">
                <Wallet2 size={16} />
              </div>
            </div>

            <h3 className="metric-number">
              {displayBalance(availableBalance)}
            </h3>
            <p className="metric-footnote">Ready for deployment</p>
          </motion.article>
        </section>

        <motion.section
          className="chart-card"
          variants={fadeUp}
          custom={4}
        >
          <div className="section-header">
            <div>
              <p className="card-kicker">Performance</p>
              <h3>Portfolio trend</h3>
            </div>

            <div className="segmented-control">
              <span className="active">7D</span>
            </div>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="portfolioStroke" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3ddc97" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#3ddc97" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="rgba(136, 152, 145, 0.18)" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8f9a94', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8f9a94', fontSize: 12 }}
                  tickFormatter={(value) => showBalances ? formatCurrency(value, currency) : '•••'}
                />
                <Tooltip content={<CustomTooltip currency={currency} showBalances={showBalances} />} cursor={{ stroke: 'rgba(61,220,151,0.5)', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3ddc97"
                  strokeWidth={3}
                  fill="url(#portfolioStroke)"
                  activeDot={{ r: 4, fill: '#e8fff4', stroke: '#3ddc97', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <NexaAI
          balance={portfolioTotal}
          dailyPnl={dailyPnl}
          dailyChange={dailyChange}
          assets={assetCards.map(({ ticker, allocation }) => ({ ticker, allocation }))}
          currency={currency}
          showBalances={showBalances}
        />

        <section className="dashboard-lower-grid">
          <motion.section
            className="panel-card assets-card"
            variants={fadeUp}
            custom={5}
          >
            <div className="section-header compact-header">
              <div>
                <p className="card-kicker">Allocation</p>
                <h3>Top markets</h3>
              </div>
              <button className="text-button" type="button">
                View all
              </button>
            </div>

            <div className="asset-list">
              {assetCards.map(({ name, ticker, price, change, allocation, icon: Icon, accent }) => (
                <div key={ticker} className={`asset-item asset-${accent}`}>
                  <div className="asset-meta">
                    <div className="asset-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <strong>{name}</strong>
                      <small>{ticker}</small>
                    </div>
                  </div>

                  <div className="asset-values">
                    <strong>{formatCurrency(price, currency)}</strong>
                    <span className={change >= 0 ? 'positive' : 'negative'}>
                      {change >= 0 ? '+' : ''}
                      {change}%
                    </span>
                  </div>

                  <div className="asset-allocation">
                    <span>{allocation}</span>
                    <div className="allocation-track" aria-hidden="true">
                      <div className={`allocation-fill allocation-${accent}`} style={{ width: allocation }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="panel-card transactions-card"
            variants={fadeUp}
            custom={6}
          >
            <div className="section-header compact-header">
              <div>
                <p className="card-kicker">Activity</p>
                <h3>Recent transactions</h3>
              </div>
              <button className="text-button" type="button">
                See all
              </button>
            </div>

            <div className="transaction-list">
              {recentTransactions.map(({ id, asset, action, time, amount, value, tone }) => (
                <div key={id} className="transaction-row">
                  <div className="transaction-badge" aria-hidden="true">
                    {asset.slice(0, 2)}
                  </div>

                  <div className="transaction-copy">
                    <strong>{action}</strong>
                    <span>
                      {asset} · {time}
                    </span>
                  </div>

                  <div className="transaction-amount-wrap">
                    <strong className={tone === 'negative' ? 'negative' : 'positive'}>{showBalances ? amount : '••••••••'}</strong>
                    <span>{showBalances ? formatCurrency(value, currency) : '••••••••'}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </section>

        <motion.section
          className="quick-actions"
          variants={fadeUp}
          custom={7}
        >
          {quickActions.map(({ label, icon: Icon, tone }) => (
            <button
              key={label}
              className={`action-button ${tone}`}
              type="button"
              onClick={() => {
                if (label === 'Accessibility') {
                  setShowAccessibilityModal(true)
                }
              }}
            >
              <span className="action-icon">
                <Icon size={18} />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </motion.section>

        {showAccessibilityModal && (
          <div className="accessibility-modal-overlay" onClick={() => setShowAccessibilityModal(false)}>
            <div className="accessibility-modal" onClick={(e) => e.stopPropagation()}>
              <div className="accessibility-modal-header">
                <h2>Accessibility Settings</h2>
                <button
                  className="close-button"
                  onClick={() => setShowAccessibilityModal(false)}
                  aria-label="Close accessibility settings"
                >
                  ✕
                </button>
              </div>
              <div className="accessibility-modal-content">
                <div className="accessibility-option">
                  <label htmlFor="text-size">
                    <input
                      id="text-size"
                      type="checkbox"
                      defaultChecked={settings.fontSize === 'large'}
                    />
                    <span>Increase text size</span>
                  </label>
                </div>
                <div className="accessibility-option">
                  <label htmlFor="high-contrast">
                    <input
                      id="high-contrast"
                      type="checkbox"
                      defaultChecked={settings.highContrast}
                    />
                    <span>High contrast mode</span>
                  </label>
                </div>
                <div className="accessibility-option">
                  <label htmlFor="reduce-motion">
                    <input
                      id="reduce-motion"
                      type="checkbox"
                      defaultChecked={settings.reduceMotion}
                    />
                    <span>Reduce motion</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard
