import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftRight, Check, Clock3, Coins, Info, Sparkles } from 'lucide-react'
import './Convert.css'

const currencies = [
  { code: 'BTC', name: 'Bitcoin', type: 'crypto', usdRate: 68240 },
  { code: 'ETH', name: 'Ethereum', type: 'crypto', usdRate: 3480 },
  { code: 'SOL', name: 'Solana', type: 'crypto', usdRate: 162 },
  { code: 'BNB', name: 'BNB', type: 'crypto', usdRate: 612.84 },
  { code: 'XRP', name: 'XRP', type: 'crypto', usdRate: 0.5842 },
  { code: 'AVAX', name: 'Avalanche', type: 'crypto', usdRate: 28.74 },
  { code: 'ADA', name: 'Cardano', type: 'crypto', usdRate: 0.4521 },
  { code: 'DOGE', name: 'Dogecoin', type: 'crypto', usdRate: 0.1642 },
  { code: 'DOT', name: 'Polkadot', type: 'crypto', usdRate: 4.21 },
  { code: 'LINK', name: 'Chainlink', type: 'crypto', usdRate: 14.35 },
  { code: 'USDC', name: 'USD Coin', type: 'stablecoin', usdRate: 1 },
  { code: 'USDT', name: 'Tether', type: 'stablecoin', usdRate: 1 },
  { code: 'USD', name: 'US Dollar', type: 'fiat', usdRate: 1 },
  { code: 'EUR', name: 'Euro', type: 'fiat', usdRate: 1.08 },
  { code: 'GBP', name: 'British Pound', type: 'fiat', usdRate: 1.27 },
  { code: 'NGN', name: 'Nigerian Naira', type: 'fiat', usdRate: 0.00065 },
  { code: 'CAD', name: 'Canadian Dollar', type: 'fiat', usdRate: 0.74 },
  { code: 'AUD', name: 'Australian Dollar', type: 'fiat', usdRate: 0.66 },
  { code: 'JPY', name: 'Japanese Yen', type: 'fiat', usdRate: 0.0067 },
  { code: 'CHF', name: 'Swiss Franc', type: 'fiat', usdRate: 1.12 },
  { code: 'SGD', name: 'Singapore Dollar', type: 'fiat', usdRate: 0.74 },
  { code: 'INR', name: 'Indian Rupee', type: 'fiat', usdRate: 0.012 },
]

const currencyByCode = Object.fromEntries(currencies.map((currency) => [currency.code, currency]))

const popularPairs = [
  { from: 'BTC', to: 'USD' },
  { from: 'ETH', to: 'EUR' },
  { from: 'USD', to: 'NGN' },
  { from: 'USDC', to: 'GBP' },
]

function formatAmount(value, currency) {
  if (!Number.isFinite(value)) return '0.00'

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: currency.type === 'crypto' ? 6 : 2,
  }).format(value)
}

function CurrencyOptions({ type }) {
  return currencies
    .filter((currency) => currency.type === type)
    .map((currency) => (
      <option key={currency.code} value={currency.code}>
        {currency.code} · {currency.name}
      </option>
    ))
}

function Convert() {
  const [fromCurrency, setFromCurrency] = useState('BTC')
  const [toCurrency, setToCurrency] = useState('USD')
  const [amount, setAmount] = useState('1')
  const [previewReady, setPreviewReady] = useState(false)

  const source = currencyByCode[fromCurrency]
  const target = currencyByCode[toCurrency]
  const numericAmount = Number(amount)
  const convertedAmount = Number.isFinite(numericAmount) && numericAmount > 0
    ? numericAmount * source.usdRate / target.usdRate
    : 0
  const exchangeRate = source.usdRate / target.usdRate

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setPreviewReady(false)
  }

  const choosePair = (pair) => {
    setFromCurrency(pair.from)
    setToCurrency(pair.to)
    setPreviewReady(false)
  }

  const selectCurrency = (setter) => (event) => {
    setter(event.target.value)
    setPreviewReady(false)
  }

  return (
    <main className="convert-page">
      <div className="convert-shell">
        <motion.header
          className="convert-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <span className="convert-eyebrow">CURRENCY EXCHANGE</span>
            <h1>Convert assets</h1>
            <p>Preview a conversion across digital assets and global currencies.</p>
          </div>
          <div className="convert-rate-status"><span /> Sample rates</div>
        </motion.header>

        <div className="convert-layout">
          <motion.section
            className="convert-card"
            aria-labelledby="convert-card-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 }}
          >
            <div className="convert-card-heading">
              <div className="convert-card-icon"><ArrowLeftRight size={18} /></div>
              <div>
                <span className="convert-section-label">CONVERSION PREVIEW</span>
                <h2 id="convert-card-title">Choose your currencies</h2>
              </div>
            </div>

            <div className="convert-fields">
              <label className="convert-field">
                <span className="convert-field-label">You send</span>
                <span className="convert-field-controls">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={amount}
                    onChange={(event) => {
                      setAmount(event.target.value)
                      setPreviewReady(false)
                    }}
                    aria-label="Amount to convert"
                  />
                  <select value={fromCurrency} onChange={selectCurrency(setFromCurrency)} aria-label="Currency to convert from">
                    <optgroup label="Crypto"><CurrencyOptions type="crypto" /></optgroup>
                    <optgroup label="Stablecoins"><CurrencyOptions type="stablecoin" /></optgroup>
                    <optgroup label="Fiat"><CurrencyOptions type="fiat" /></optgroup>
                  </select>
                </span>
                <span className="convert-field-caption">{source.name}</span>
              </label>

              <div className="convert-swap-row">
                <span />
                <button type="button" className="convert-swap-button" onClick={swapCurrencies} aria-label="Swap currencies">
                  <ArrowLeftRight size={17} />
                </button>
                <span />
              </div>

              <div className="convert-field convert-field-output" aria-live="polite">
                <span className="convert-field-label">You receive (estimated)</span>
                <div className="convert-field-controls">
                  <output className="convert-output-value">{formatAmount(convertedAmount, target)}</output>
                  <select value={toCurrency} onChange={selectCurrency(setToCurrency)} aria-label="Currency to convert to">
                    <optgroup label="Crypto"><CurrencyOptions type="crypto" /></optgroup>
                    <optgroup label="Stablecoins"><CurrencyOptions type="stablecoin" /></optgroup>
                    <optgroup label="Fiat"><CurrencyOptions type="fiat" /></optgroup>
                  </select>
                </div>
                <span className="convert-field-caption">{target.name}</span>
              </div>
            </div>

            <div className="convert-rate-row">
              <span>Indicative exchange rate</span>
              <strong>1 {fromCurrency} = {formatAmount(exchangeRate, target)} {toCurrency}</strong>
            </div>

            <button
              className="convert-preview-button"
              type="button"
              disabled={!Number.isFinite(numericAmount) || numericAmount <= 0}
              onClick={() => setPreviewReady(true)}
            >
              <Sparkles size={16} /> Preview conversion
            </button>

            {previewReady && (
              <div className="convert-confirmation" role="status">
                <span><Check size={16} /></span>
                <div>
                  <strong>Preview ready</strong>
                  <p>{formatAmount(numericAmount, source)} {fromCurrency} is approximately {formatAmount(convertedAmount, target)} {toCurrency}.</p>
                </div>
              </div>
            )}

            <div className="convert-disclaimer"><Info size={14} /> Sample rates are for estimation only. No transaction is submitted.</div>
          </motion.section>

          <aside className="convert-side-column">
            <section className="convert-side-panel">
              <div className="convert-side-heading">
                <div className="convert-side-icon"><Coins size={17} /></div>
                <div><span className="convert-section-label">POPULAR PAIRS</span><h2>Quick convert</h2></div>
              </div>
              <div className="convert-pair-list">
                {popularPairs.map((pair) => (
                  <button className="convert-pair" type="button" key={`${pair.from}-${pair.to}`} onClick={() => choosePair(pair)}>
                    <span><strong>{pair.from}</strong><ArrowLeftRight size={13} /><strong>{pair.to}</strong></span>
                    <span className="convert-pair-arrow" aria-hidden="true">›</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="convert-info-panel">
              <div className="convert-info-icon"><Clock3 size={16} /></div>
              <div>
                <strong>Rates are indicative</strong>
                <p>Exchange values use local sample rates and may differ from live market prices.</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Convert