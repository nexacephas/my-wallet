import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Coins,
  Info,
  Layers3,
  Lightbulb,
  LoaderCircle,
  MessageCircle,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './AIInsights.css'

const chartData = {
  '24H': [
    { label: '00:00', value: 541200 },
    { label: '04:00', value: 542850 },
    { label: '08:00', value: 544100 },
    { label: '12:00', value: 546200 },
    { label: '16:00', value: 545500 },
    { label: '20:00', value: 548000 },
  ],
  '7D': [
    { label: 'Sep 22', value: 526400 },
    { label: 'Sep 23', value: 531800 },
    { label: 'Sep 24', value: 529900 },
    { label: 'Sep 25', value: 537600 },
    { label: 'Sep 26', value: 540300 },
    { label: 'Sep 27', value: 543800 },
    { label: 'Sep 28', value: 548000 },
  ],
  '30D': [
    { label: 'Aug 30', value: 489200 },
    { label: 'Sep 04', value: 501800 },
    { label: 'Sep 09', value: 512400 },
    { label: 'Sep 14', value: 506900 },
    { label: 'Sep 19', value: 526700 },
    { label: 'Sep 24', value: 529900 },
    { label: 'Sep 28', value: 548000 },
  ],
}

const allocation = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    percentage: 52.4,
    value: 287152,
    className: 'btc',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    percentage: 21.8,
    value: 119464,
    className: 'eth',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    percentage: 11.4,
    value: 62472,
    className: 'sol',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    percentage: 8.9,
    value: 48772,
    className: 'usdt',
  },
  {
    symbol: 'USD',
    name: 'US Dollar',
    percentage: 5.5,
    value: 30140,
    className: 'usd',
  },
]

const insights = [
  {
    id: 1,
    category: 'ALLOCATION',
    title: 'BTC is your largest exposure',
    description:
      'Bitcoin currently represents 52.4% of the tracked portfolio value.',
    detail:
      'More than half of the current portfolio is concentrated in BTC. This is a descriptive observation about the present allocation, not a recommendation to buy or sell.',
    severity: 'attention',
    icon: Layers3,
    metric: '52.4%',
    metricLabel: 'BTC allocation',
  },
  {
    id: 2,
    category: 'MOMENTUM',
    title: 'Portfolio value is trending upward',
    description:
      'Your portfolio increased from $526.4K to $548K across the selected 7-day window.',
    detail:
      'The portfolio snapshot shows a positive net movement across the selected period. This analysis does not attribute the change to a single asset or predict future performance.',
    severity: 'positive',
    icon: TrendingUp,
    metric: '+4.10%',
    metricLabel: '7D change',
  },
  {
    id: 3,
    category: 'LIQUIDITY',
    title: 'Liquid balances are available',
    description:
      'USDT and USD together represent 14.4% of the tracked portfolio.',
    detail:
      'Stablecoin and fiat balances can be useful as readily available balances within an exchange account. The figure here simply describes your current allocation.',
    severity: 'positive',
    icon: WalletCards,
    metric: '14.4%',
    metricLabel: 'Liquid assets',
  },
  {
    id: 4,
    category: 'DISTRIBUTION',
    title: 'Five assets are currently tracked',
    description:
      'The portfolio is distributed across BTC, ETH, SOL, USDT and USD.',
    detail:
      'The current wallet snapshot contains five tracked assets. Asset count alone does not determine diversification quality or risk.',
    severity: 'neutral',
    icon: Coins,
    metric: '5',
    metricLabel: 'Tracked assets',
  },
]

const marketSignals = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$68,100',
    change: '+2.84%',
    direction: 'up',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$3,478',
    change: '+1.72%',
    direction: 'up',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '$161.50',
    change: '-0.84%',
    direction: 'down',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: '$1.00',
    change: '+0.03%',
    direction: 'up',
  },
]

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    text:
      'I can help you understand your current portfolio, allocation, activity and tracked market data. Ask me something about your Nexa account.',
  },
]

function formatCurrency(value) {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

function AIInsights() {
  const [timeframe, setTimeframe] = useState('7D')
  const [selectedInsight, setSelectedInsight] = useState(null)

  const [messages, setMessages] = useState(initialMessages)

  const [query, setQuery] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const currentChart = useMemo(
    () => chartData[timeframe],
    [timeframe],
  )

  const handleRefresh = () => {
    if (isRefreshing) return

    setIsRefreshing(true)

    window.setTimeout(() => {
      setIsRefreshing(false)
    }, 900)
  }

  const handleAsk = () => {
    const cleanQuery = query.trim()

    if (!cleanQuery || isThinking) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: cleanQuery,
    }

    setMessages((current) => [...current, userMessage])
    setQuery('')
    setIsThinking(true)

    window.setTimeout(() => {
      const lowerQuery = cleanQuery.toLowerCase()

      let response =
        'Based on the current Nexa portfolio snapshot, your tracked portfolio is $548,000 with BTC as the largest allocation at 52.4%. I can describe the current data, but I cannot reliably predict future market movements.'

      if (
        lowerQuery.includes('btc') ||
        lowerQuery.includes('bitcoin')
      ) {
        response =
          'BTC currently represents 52.4% of your tracked portfolio, with a displayed market price of $68,100 and a 24h change of +2.84%. The important observation is concentration: BTC is currently your dominant exposure.'
      } else if (
        lowerQuery.includes('balance') ||
        lowerQuery.includes('worth') ||
        lowerQuery.includes('portfolio')
      ) {
        response =
          'Your current tracked portfolio value is $548,000. The largest allocations are BTC at 52.4%, ETH at 21.8% and SOL at 11.4%. USD and USDT together account for 14.4%.'
      } else if (
        lowerQuery.includes('risk') ||
        lowerQuery.includes('concentration')
      ) {
        response =
          'The clearest concentration observation is BTC at 52.4% of the portfolio. That means changes in BTC can have a significant effect on the overall portfolio value. This is an observation, not a personalized risk recommendation.'
      } else if (
        lowerQuery.includes('liquid') ||
        lowerQuery.includes('cash') ||
        lowerQuery.includes('usdt')
      ) {
        response =
          'USD and USDT currently make up 14.4% of the tracked portfolio. Those balances are the main readily available liquidity shown in this wallet snapshot.'
      }

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: response,
        },
      ])

      setIsThinking(false)
    }, 900)
  }

  return (
    <main className="ai-insights-page">
      <div className="ai-insights-shell">
        <motion.header
          className="ai-page-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="ai-page-title">
            <div className="ai-title-icon">
              <BrainCircuit size={20} />
            </div>

            <div>
              <span className="ai-eyebrow">NEXA INTELLIGENCE</span>
              <h1>AI Insights</h1>
              <p>
                Understand your portfolio through data-driven
                observations.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="ai-refresh-button"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <LoaderCircle className="ai-spin" size={15} />
            ) : (
              <RefreshCw size={15} />
            )}
            Refresh analysis
          </button>
        </motion.header>

        <motion.section
          className="ai-intelligence-banner"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.04 }}
        >
          <div className="ai-banner-orbit orbit-one" />
          <div className="ai-banner-orbit orbit-two" />

          <div className="ai-banner-content">
            <div className="ai-banner-badge">
              <span />
              ANALYSIS READY
            </div>

            <h2>
              Your portfolio,
              <br />
              <em>understood.</em>
            </h2>

            <p>
              Nexa Intelligence analyzes your current wallet snapshot,
              portfolio allocation and tracked market data to surface
              useful observations.
            </p>

            <div className="ai-banner-meta">
              <span>
                <Check size={12} />
                Portfolio connected
              </span>
              <span>
                <Activity size={12} />
                Market data available
              </span>
              <span>
                <Clock3 size={12} />
                Updated moments ago
              </span>
            </div>
          </div>

          <div className="ai-banner-visual">
            <div className="ai-brain-glow" />

            <motion.div
              className="ai-brain-node"
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <BrainCircuit size={35} />
            </motion.div>

            <span className="ai-data-line line-one" />
            <span className="ai-data-line line-two" />
            <span className="ai-data-line line-three" />

            <span className="ai-data-dot dot-one" />
            <span className="ai-data-dot dot-two" />
            <span className="ai-data-dot dot-three" />
          </div>
        </motion.section>

        <section className="ai-analysis-grid">
          <motion.div
            className="ai-overview-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="ai-section-heading">
              <div>
                <span className="ai-section-eyebrow">
                  PORTFOLIO SNAPSHOT
                </span>
                <h2>Current analysis</h2>
              </div>

              <div className="ai-confidence">
                <ShieldCheck size={14} />
                Data connected
              </div>
            </div>

            <div className="ai-overview-metrics">
              <div>
                <span>Portfolio value</span>
                <strong>$548,000</strong>
                <small className="positive">
                  <ArrowUpRight size={12} />
                  +1.53% 24h
                </small>
              </div>

              <div>
                <span>Tracked assets</span>
                <strong>5</strong>
                <small>
                  BTC · ETH · SOL · USDT · USD
                </small>
              </div>

              <div>
                <span>Largest exposure</span>
                <strong>BTC</strong>
                <small>52.4% of portfolio</small>
              </div>
            </div>

            <div className="ai-chart-header">
              <div>
                <span>Portfolio movement</span>
                <strong>$548,000</strong>
              </div>

              <div className="ai-timeframe-switcher">
                {['24H', '7D', '30D'].map(
                  (period) => (
                    <button
                      type="button"
                      key={period}
                      className={
                        timeframe === period ? 'active' : ''
                      }
                      onClick={() => setTimeframe(period)}
                    >
                      {period}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="ai-chart">
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={currentChart}>
                  <defs>
                    <linearGradient
                      id="aiPortfolioGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#00C853"
                        stopOpacity={0.22}
                      />
                      <stop
                        offset="100%"
                        stopColor="#00C853"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="var(--border)"
                    vertical={false}
                    strokeDasharray="4 5"
                    opacity={0.55}
                  />

                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: 'var(--text-muted)',
                      fontSize: 9,
                    }}
                  />

                  <YAxis
                    hide
                    domain={['dataMin - 5000', 'dataMax + 5000']}
                  />

                  <Tooltip
                    cursor={{
                      stroke: 'var(--border)',
                    }}
                    contentStyle={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      color: 'var(--text)',
                      fontSize: 10,
                    }}
                    formatter={(value) =>
                      formatCurrency(Number(value))
                    }
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00C853"
                    strokeWidth={2}
                    fill="url(#aiPortfolioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.aside
            className="ai-market-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            <div className="ai-section-heading">
              <div>
                <span className="ai-section-eyebrow">
                  MARKET CONTEXT
                </span>
                <h2>Tracked markets</h2>
              </div>

              <BarChart3 size={17} />
            </div>

            <div className="ai-market-list">
              {marketSignals.map((market) => (
                <div className="ai-market-item" key={market.symbol}>
                  <div className={`ai-market-logo ${market.symbol.toLowerCase()}`}>
                    {market.symbol.slice(0, 1)}
                  </div>

                  <div className="ai-market-name">
                    <strong>{market.symbol}</strong>
                    <span>{market.name}</span>
                  </div>

                  <div className="ai-market-price">
                    <strong>{market.price}</strong>

                    <span
                      className={
                        market.direction === 'up'
                          ? 'positive'
                          : 'negative'
                      }
                    >
                      {market.direction === 'up' ? (
                        <TrendingUp size={10} />
                      ) : (
                        <TrendingDown size={10} />
                      )}
                      {market.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-market-note">
              <Info size={13} />
              Market figures shown here are demo portfolio data.
            </div>
          </motion.aside>
        </section>

        <section className="ai-insight-section">
          <div className="ai-section-header-row">
            <div>
              <span className="ai-section-eyebrow">
                EXPLAINABLE ANALYSIS
              </span>
              <h2>What Nexa noticed</h2>
              <p>
                Observations generated from the current portfolio
                snapshot.
              </p>
            </div>

            <span className="ai-generated-badge">
              <Sparkles size={12} />
              4 insights generated
            </span>
          </div>

          <div className="ai-insights-grid">
            {insights.map((insight, index) => {
              const Icon = insight.icon

              return (
                <motion.button
                  type="button"
                  className={`ai-insight-card ${insight.severity}`}
                  key={insight.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  onClick={() => setSelectedInsight(insight)}
                >
                  <div className="ai-insight-top">
                    <div className="ai-insight-icon">
                      <Icon size={17} />
                    </div>

                    <ChevronRight size={15} />
                  </div>

                  <span className="ai-insight-category">
                    {insight.category}
                  </span>

                  <h3>{insight.title}</h3>

                  <p>{insight.description}</p>

                  <div className="ai-insight-metric">
                    <strong>{insight.metric}</strong>
                    <span>{insight.metricLabel}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </section>

        <section className="ai-lower-grid">
          <motion.div
            className="ai-allocation-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <div className="ai-section-heading">
              <div>
                <span className="ai-section-eyebrow">
                  ALLOCATION ANALYSIS
                </span>
                <h2>Where your portfolio sits</h2>
              </div>
            </div>

            <div className="ai-allocation-visual">
              <div className="ai-allocation-bar">
                {allocation.map((asset) => (
                  <span
                    key={asset.symbol}
                    className={asset.className}
                    style={{
                      width: `${asset.percentage}%`,
                    }}
                  />
                ))}
              </div>

              <div className="ai-allocation-total">
                <div>
                  <span>Current portfolio</span>
                  <strong>$548,000</strong>
                </div>

                <span>100%</span>
              </div>
            </div>

            <div className="ai-allocation-list">
              {allocation.map((asset) => (
                <div
                  className="ai-allocation-item"
                  key={asset.symbol}
                >
                  <div className="ai-allocation-left">
                    <span
                      className={`allocation-dot ${asset.className}`}
                    />
                    <div>
                      <strong>{asset.symbol}</strong>
                      <span>{asset.name}</span>
                    </div>
                  </div>

                  <div className="ai-allocation-right">
                    <strong>{asset.percentage.toFixed(1)}%</strong>
                    <span>{formatCurrency(asset.value)}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="ai-action-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.17 }}
          >
            <div className="ai-action-icon">
              <Lightbulb size={19} />
            </div>

            <span className="ai-section-eyebrow">
              NEXT OBSERVATION
            </span>

            <h2>Monitor concentration changes</h2>

            <p>
              BTC currently makes up more than half of the portfolio.
              Nexa can continue tracking how that proportion changes
              as your balances and market values move.
            </p>

            <div className="ai-action-stat">
              <div>
                <span>BTC allocation</span>
                <strong>52.4%</strong>
              </div>

              <div className="ai-mini-progress">
                <span style={{ width: '52.4%' }} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTimeframe('30D')}
            >
              Inspect longer-term movement
              <ArrowUpRight size={14} />
            </button>
          </motion.div>
        </section>

        <motion.section
          className="ai-assistant-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22 }}
        >
          <div className="ai-assistant-header">
            <div className="ai-assistant-title">
              <div className="ai-assistant-icon">
                <MessageCircle size={18} />
              </div>

              <div>
                <span className="ai-section-eyebrow">
                  ASK NEXA
                </span>
                <h2>Portfolio assistant</h2>
                <p>
                  Ask questions about the data currently available
                  to Nexa.
                </p>
              </div>
            </div>

            <div className="ai-assistant-status">
              <span />
              Ready
            </div>
          </div>

          <div className="ai-chat-window">
            {messages.map((message) => (
              <div
                className={`ai-chat-message ${message.role}`}
                key={message.id}
              >
                {message.role === 'assistant' && (
                  <div className="ai-chat-avatar">
                    <Sparkles size={13} />
                  </div>
                )}

                <div className="ai-chat-bubble">
                  {message.text}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="ai-chat-message assistant">
                <div className="ai-chat-avatar">
                  <Sparkles size={13} />
                </div>

                <div className="ai-chat-bubble ai-thinking">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <div className="ai-suggestions">
            <button
              type="button"
              onClick={() =>
                setQuery('What is my current portfolio allocation?')
              }
            >
              Portfolio allocation
            </button>

            <button
              type="button"
              onClick={() =>
                setQuery('What is my biggest concentration?')
              }
            >
              Biggest concentration
            </button>

            <button
              type="button"
              onClick={() =>
                setQuery('How much liquidity do I have?')
              }
            >
              Available liquidity
            </button>
          </div>

          <div className="ai-chat-input">
            <Search size={15} />

            <input
              type="text"
              value={query}
              placeholder="Ask Nexa about your portfolio..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleAsk()
                }
              }}
            />

            <button
              type="button"
              onClick={handleAsk}
              disabled={!query.trim() || isThinking}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>

          <div className="ai-disclaimer">
            <CircleAlert size={13} />
            <span>
              Nexa Insights is an informational interface. The
              current responses use demo portfolio data and are not
              a substitute for independent financial advice.
            </span>
          </div>
        </motion.section>
      </div>

      {selectedInsight && (
        <div
          className="ai-modal-backdrop"
          onClick={() => setSelectedInsight(null)}
        >
          <motion.div
            className="ai-insight-modal"
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="ai-modal-header">
              <div>
                <span className="ai-section-eyebrow">
                  {selectedInsight.category}
                </span>
                <h2>{selectedInsight.title}</h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInsight(null)}
                aria-label="Close insight"
              >
                <X size={17} />
              </button>
            </div>

            <div
              className={`ai-modal-metric ${selectedInsight.severity}`}
            >
              <strong>{selectedInsight.metric}</strong>
              <span>{selectedInsight.metricLabel}</span>
            </div>

            <p className="ai-modal-description">
              {selectedInsight.detail}
            </p>

            <div className="ai-modal-explanation">
              <div>
                <Zap size={15} />
                <strong>Why this matters</strong>
              </div>

              <p>{selectedInsight.description}</p>
            </div>

            <button
              type="button"
              className="ai-modal-close"
              onClick={() => setSelectedInsight(null)}
            >
              Understood
            </button>
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default AIInsights