import CountUpModule from 'react-countup'
import { motion } from 'framer-motion'

const CountUp = (CountUpModule as any)?.default ?? CountUpModule
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
} from 'lucide-react'
import NexaAI from '../../components/NexaAI/NexaAI'
import './Dashboard.css'

const performanceData = [
  { day: 'Mon', value: 486000 },
  { day: 'Tue', value: 498000 },
  { day: 'Wed', value: 492000 },
  { day: 'Thu', value: 514000 },
  { day: 'Fri', value: 528000 },
  { day: 'Sat', value: 536000 },
  { day: 'Sun', value: 548000 },
]

const assetCards = [
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    price: 68240,
    change: 4.8,
    allocation: '38%',
    icon: Bitcoin,
    accent: 'btc',
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    price: 3480,
    change: 3.2,
    allocation: '27%',
    icon: ShieldCheck,
    accent: 'eth',
  },
  {
    name: 'Solana',
    ticker: 'SOL',
    price: 162,
    change: 6.5,
    allocation: '17%',
    icon: Sparkles,
    accent: 'sol',
  },
]

const recentTransactions = [
  {
    id: 'TX-2048',
    asset: 'BTC',
    action: 'Purchase',
    time: 'Today · 09:42',
    amount: '+0.42 BTC',
    value: '$28,600',
    tone: 'positive',
  },
  {
    id: 'TX-2039',
    asset: 'ETH',
    action: 'Sale',
    time: 'Yesterday · 18:10',
    amount: '-1.80 ETH',
    value: '$6,260',
    tone: 'negative',
  },
  {
    id: 'TX-2031',
    asset: 'USD',
    action: 'Deposit',
    time: 'Yesterday · 10:18',
    amount: '+$12,000',
    value: 'Bank transfer',
    tone: 'positive',
  },
  {
    id: 'TX-2019',
    asset: 'SOL',
    action: 'Purchase',
    time: 'Mon · 15:28',
    amount: '+18 SOL',
    value: '$2,890',
    tone: 'positive',
  },
]

const quickActions = [
  { label: 'Buy', icon: Plus, tone: 'buy' },
  { label: 'Sell', icon: ArrowUpRight, tone: 'sell' },
  { label: 'Deposit', icon: Download, tone: 'deposit' },
  { label: 'Withdraw', icon: ArrowDownRight, tone: 'withdraw' },
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

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{label}</span>
      <strong>${payload[0].value.toLocaleString()}</strong>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="dashboard-page">
      <motion.div
        className="dashboard-shell"
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
            <h2>Welcome back, Alex.</h2>
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
                  <CountUp
                    end={548000}
                    prefix="$"
                    separator=","
                    decimals={0}
                    duration={1.2}
                  />
                </h3>
              </div>

              <div className="metric-chip metric-chip-positive">
                <TrendingUp size={14} />
                <span>+3.42%</span>
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
                  <CountUp
                    end={162400}
                    prefix="$"
                    separator=","
                    decimals={0}
                    duration={1.1}
                  />
                </strong>
              </div>

              <div>
                <small>Invested</small>
                <strong>
                  <CountUp
                    end={228450}
                    prefix="$"
                    separator=","
                    decimals={0}
                    duration={1.1}
                  />
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
              <CountUp
                end={18380}
                prefix="$"
                separator=","
                decimals={0}
                duration={1}
              />
            </h3>
            <p className="metric-footnote">+4.18% vs yesterday</p>
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
              <CountUp
                end={162400}
                prefix="$"
                separator=","
                decimals={0}
                duration={1}
              />
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
              <AreaChart data={performanceData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
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
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(61,220,151,0.5)', strokeWidth: 1 }} />
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
          balance={548000}
          dailyPnl={18380}
          dailyChange={4.18}
          assets={assetCards.map(({ ticker, allocation }) => ({ ticker, allocation }))}
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
                    <strong>${price.toLocaleString()}</strong>
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
                    <strong className={tone === 'negative' ? 'negative' : 'positive'}>{amount}</strong>
                    <span>{value}</span>
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
            <button key={label} className={`action-button ${tone}`} type="button">
              <span className="action-icon">
                <Icon size={18} />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </motion.section>
      </motion.div>
    </div>
  )
}

export default Dashboard
