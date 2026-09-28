import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUp,
  BarChart3,
  ChevronDown,
  Clock3,
  Info,
  Settings2,
  Star,
  Wallet2,
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
import './Trade.css'

const chartData = [
  { time: '09:00', price: 67520 },
  { time: '10:00', price: 67880 },
  { time: '11:00', price: 67640 },
  { time: '12:00', price: 68120 },
  { time: '13:00', price: 67980 },
  { time: '14:00', price: 68420 },
  { time: '15:00', price: 68280 },
  { time: '16:00', price: 68640 },
  { time: '17:00', price: 68480 },
  { time: '18:00', price: 68240 },
]

const orderBookAsks = [
  { price: 68320, amount: 0.184, total: 12571 },
  { price: 68290, amount: 0.092, total: 6271 },
  { price: 68270, amount: 0.241, total: 16447 },
  { price: 68255, amount: 0.137, total: 9341 },
  { price: 68248, amount: 0.083, total: 5663 },
]

const orderBookBids = [
  { price: 68240, amount: 0.214, total: 14583 },
  { price: 68225, amount: 0.126, total: 8596 },
  { price: 68210, amount: 0.308, total: 21009 },
  { price: 68190, amount: 0.094, total: 6409 },
  { price: 68165, amount: 0.187, total: 12737 },
]

const recentTrades = [
  { time: '18:42:18', price: 68240, amount: '0.084', side: 'buy' },
  { time: '18:42:03', price: 68235, amount: '0.031', side: 'sell' },
  { time: '18:41:46', price: 68244, amount: '0.127', side: 'buy' },
  { time: '18:41:21', price: 68238, amount: '0.052', side: 'buy' },
  { time: '18:40:58', price: 68230, amount: '0.091', side: 'sell' },
  { time: '18:40:32', price: 68227, amount: '0.044', side: 'sell' },
]

const chartRanges = ['1H', '4H', '1D', '1W', '1M']

function formatPrice(value) {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="trade-chart-tooltip">
      <span>{label}</span>
      <strong>{formatPrice(Number(payload[0]?.value ?? 0))}</strong>
    </div>
  )
}

function Trade() {
  const [side, setSide] = useState('buy')
  const [orderType, setOrderType] = useState('limit')
  const [chartRange, setChartRange] = useState('1D')
  const [price, setPrice] = useState('68240')
  const [amount, setAmount] = useState('')
  const [total, setTotal] = useState('')
  const [mobilePanel, setMobilePanel] = useState('order')

  const availableBalance = side === 'buy' ? 162400 : 2.84

  const calculatedTotal = useMemo(() => {
    const numericPrice = Number(price)
    const numericAmount = Number(amount)

    if (!numericPrice || !numericAmount) return ''

    return (numericPrice * numericAmount).toFixed(2)
  }, [price, amount])

  const handleAmountChange = (value) => {
    setAmount(value)

    const numericAmount = Number(value)
    const numericPrice = Number(price)

    if (numericAmount && numericPrice) {
      setTotal((numericAmount * numericPrice).toFixed(2))
    } else {
      setTotal('')
    }
  }

  const handleTotalChange = (value) => {
    setTotal(value)

    const numericTotal = Number(value)
    const numericPrice = Number(price)

    if (numericTotal && numericPrice) {
      setAmount((numericTotal / numericPrice).toFixed(6))
    } else {
      setAmount('')
    }
  }

  const handlePercentage = (percentage) => {
    const balance = side === 'buy' ? availableBalance : availableBalance

    if (side === 'buy') {
      const nextTotal = balance * percentage
      setTotal(nextTotal.toFixed(2))
      setAmount((nextTotal / Number(price)).toFixed(6))
    } else {
      const nextAmount = balance * percentage
      setAmount(nextAmount.toFixed(6))
      setTotal((nextAmount * Number(price)).toFixed(2))
    }
  }

  return (
    <main className="trade-page">
      <div className="trade-shell">
        <motion.header
          className="trade-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="trade-pair">
            <button className="trade-pair-selector">
              <span className="trade-coin-icon">₿</span>

              <span className="trade-pair-copy">
                <strong>BTC / USD</strong>
                <small>Bitcoin</small>
              </span>

              <ChevronDown size={15} />
            </button>

            <button
              className="trade-star"
              aria-label="Add BTC to favorites"
            >
              <Star size={17} />
            </button>
          </div>

          <div className="trade-price-summary">
            <div>
              <strong>$68,240.00</strong>
              <span className="trade-positive">+4.80%</span>
            </div>

            <span>24h market price</span>
          </div>

          <div className="trade-header-stats">
            <div>
              <span>24h High</span>
              <strong>$68,920</strong>
            </div>

            <div>
              <span>24h Low</span>
              <strong>$65,480</strong>
            </div>

            <div>
              <span>24h Volume</span>
              <strong>$38.4B</strong>
            </div>
          </div>
        </motion.header>

        <div className="trade-layout">
          <section className="trade-main">
            <motion.div
              className="trade-chart-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <div className="trade-chart-header">
                <div>
                  <div className="trade-chart-title">
                    <BarChart3 size={16} />
                    <strong>BTC / USD</strong>
                    <span className="trade-chart-price">
                      $68,240.00
                    </span>
                    <span className="trade-positive">+4.80%</span>
                  </div>

                  <span className="trade-chart-subtitle">
                    Price performance
                  </span>
                </div>

                <div className="chart-tools">
                  <div className="chart-ranges">
                    {chartRanges.map((range) => (
                      <button
                        key={range}
                        className={
                          chartRange === range
                            ? 'chart-range active'
                            : 'chart-range'
                        }
                        onClick={() => setChartRange(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>

                  <button
                    className="chart-settings"
                    aria-label="Chart settings"
                  >
                    <Settings2 size={16} />
                  </button>
                </div>
              </div>

              <div className="trade-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 12,
                      right: 8,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="tradeAreaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--primary)"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="var(--border)"
                      strokeDasharray="3 4"
                      opacity={0.45}
                    />

                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: 'var(--text-muted)',
                        fontSize: 9,
                      }}
                      tickMargin={10}
                    />

                    <YAxis
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: 'var(--text-muted)',
                        fontSize: 9,
                      }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(1)}k`
                      }
                      domain={['dataMin - 300', 'dataMax + 300']}
                      width={45}
                    />

                    <Tooltip
                      content={<ChartTooltip />}
                      cursor={{
                        stroke: 'var(--border)',
                        strokeDasharray: '3 3',
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="url(#tradeAreaGradient)"
                      dot={false}
                      activeDot={{
                        r: 4,
                        fill: 'var(--primary)',
                        stroke: 'var(--surface)',
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-footer">
                <span>
                  <span className="chart-live-dot" />
                  Market data is simulated
                </span>

                <span>Last update 18:42:18</span>
              </div>
            </motion.div>

            <div className="mobile-trade-tabs">
              <button
                className={mobilePanel === 'order' ? 'active' : ''}
                onClick={() => setMobilePanel('order')}
              >
                Place order
              </button>

              <button
                className={mobilePanel === 'book' ? 'active' : ''}
                onClick={() => setMobilePanel('book')}
              >
                Order book
              </button>
            </div>

            <div className="trade-lower-grid">
              <motion.section
                className={`order-panel ${
                  mobilePanel === 'order' ? 'mobile-visible' : ''
                }`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <div className="panel-header">
                  <div>
                    <span className="panel-kicker">EXECUTION</span>
                    <h2>Place order</h2>
                  </div>

                  <button
                    className="panel-icon-button"
                    aria-label="Order information"
                  >
                    <Info size={15} />
                  </button>
                </div>

                <div className="order-side-tabs">
                  <button
                    className={side === 'buy' ? 'buy active' : 'buy'}
                    onClick={() => setSide('buy')}
                  >
                    Buy BTC
                  </button>

                  <button
                    className={side === 'sell' ? 'sell active' : 'sell'}
                    onClick={() => setSide('sell')}
                  >
                    Sell BTC
                  </button>
                </div>

                <div className="order-type-tabs">
                  {['market', 'limit', 'stop'].map(
                    (type) => (
                      <button
                        key={type}
                        className={
                          orderType === type ? 'active' : ''
                        }
                        onClick={() => setOrderType(type)}
                      >
                        {type === 'market'
                          ? 'Market'
                          : type === 'limit'
                            ? 'Limit'
                            : 'Stop'}
                      </button>
                    ),
                  )}
                </div>

                <div className="available-balance">
                  <span>
                    Available {side === 'buy' ? 'USD' : 'BTC'}
                  </span>

                  <strong>
                    {side === 'buy'
                      ? '$162,400.00'
                      : '2.840000 BTC'}
                  </strong>

                  <Wallet2 size={14} />
                </div>

                {orderType !== 'market' && (
                  <label className="order-field">
                    <span>Price</span>

                    <div className="order-input">
                      <input
                        type="number"
                        value={price}
                        onChange={(event) =>
                          setPrice(event.target.value)
                        }
                        aria-label="Order price"
                      />
                      <em>USD</em>
                    </div>
                  </label>
                )}

                <label className="order-field">
                  <span>Amount</span>

                  <div className="order-input">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(event) =>
                        handleAmountChange(event.target.value)
                      }
                      aria-label="Order amount"
                    />
                    <em>BTC</em>
                  </div>
                </label>

                <div className="percentage-row">
                  {[0.25, 0.5, 0.75, 1].map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() =>
                        handlePercentage(percentage)
                      }
                    >
                      {percentage * 100}%
                    </button>
                  ))}
                </div>

                <label className="order-field">
                  <span>Total</span>

                  <div className="order-input">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={total || calculatedTotal}
                      onChange={(event) =>
                        handleTotalChange(event.target.value)
                      }
                      aria-label="Order total"
                    />
                    <em>USD</em>
                  </div>
                </label>

                <div className="estimated-fee">
                  <span>Estimated fee</span>
                  <strong>0.10%</strong>
                </div>

                <button
                  className={`submit-order ${
                    side === 'buy' ? 'buy' : 'sell'
                  }`}
                >
                  {side === 'buy'
                    ? 'Buy BTC'
                    : 'Sell BTC'}
                </button>
              </motion.section>

              <motion.section
                className={`order-book-panel ${
                  mobilePanel === 'book' ? 'mobile-visible' : ''
                }`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
              >
                <div className="panel-header">
                  <div>
                    <span className="panel-kicker">LIQUIDITY</span>
                    <h2>Order book</h2>
                  </div>

                  <button
                    className="panel-icon-button"
                    aria-label="Order book settings"
                  >
                    <Settings2 size={15} />
                  </button>
                </div>

                <div className="book-columns">
                  <span>Price (USD)</span>
                  <span>Amount (BTC)</span>
                  <span>Total</span>
                </div>

                <div className="order-book">
                  <div className="book-side asks">
                    {orderBookAsks.map((order) => (
                      <div className="book-row" key={order.price}>
                        <span>{order.price.toLocaleString()}</span>
                        <span>{order.amount.toFixed(3)}</span>
                        <span>{order.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="book-spread">
                    <strong>$68,240.00</strong>
                    <span>Spread 0.02%</span>
                  </div>

                  <div className="book-side bids">
                    {orderBookBids.map((order) => (
                      <div className="book-row" key={order.price}>
                        <span>{order.price.toLocaleString()}</span>
                        <span>{order.amount.toFixed(3)}</span>
                        <span>{order.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="depth-summary">
                  <div>
                    <span>Bid depth</span>
                    <strong>52.8%</strong>
                  </div>

                  <div className="depth-bar">
                    <span style={{ width: '52.8%' }} />
                  </div>

                  <div>
                    <span>Ask depth</span>
                    <strong>47.2%</strong>
                  </div>
                </div>
              </motion.section>
            </div>
          </section>

          <motion.aside
            className="recent-trades-panel"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <div className="panel-header">
              <div>
                <span className="panel-kicker">MARKET ACTIVITY</span>
                <h2>Recent trades</h2>
              </div>

              <Clock3 size={16} />
            </div>

            <div className="recent-trades-head">
              <span>Time</span>
              <span>Price</span>
              <span>Amount</span>
            </div>

            <div className="recent-trades-list">
              {recentTrades.map((trade) => (
                <div className="recent-trade" key={`${trade.time}-${trade.price}`}>
                  <span>{trade.time}</span>

                  <strong
                    className={
                      trade.side === 'buy'
                        ? 'trade-positive'
                        : 'trade-negative'
                    }
                  >
                    {trade.price.toLocaleString()}
                  </strong>

                  <span>{trade.amount}</span>
                </div>
              ))}
            </div>

            <div className="market-depth-card">
              <div className="depth-icon">
                <BarChart3 size={17} />
              </div>

              <div>
                <strong>Market depth</strong>
                <span>Balanced liquidity</span>
              </div>

              <ArrowUp size={15} />
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  )
}

export default Trade