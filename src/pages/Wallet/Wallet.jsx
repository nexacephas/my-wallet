import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Filter,
  Plus,
  Search,
  ShieldCheck,
  WalletCards,
  X,
} from 'lucide-react'
import { useAppSettings } from '../../context/useAppSettings'
import {
  availableBalance,
  formatCurrency,
  lockedBalance,
  portfolioAssets,
  portfolioTotal,
} from '../../data/portfolio'
import './Wallet.css'

const activities = [
  {
    id: 'WA-2048',
    type: 'deposit',
    asset: 'USD',
    description: 'Cash deposit',
    amount: '+$12,000.00',
    date: 'Sep 28, 2026 · 09:42',
    status: 'completed',
  },
  {
    id: 'WA-2039',
    type: 'purchase',
    asset: 'BTC',
    description: 'Bitcoin purchase',
    amount: '+0.42 BTC',
    date: 'Sep 27, 2026 · 18:10',
    status: 'completed',
  },
  {
    id: 'WA-2018',
    type: 'withdrawal',
    asset: 'USDT',
    description: 'USDT withdrawal',
    amount: '-$4,500.00',
    date: 'Sep 26, 2026 · 11:06',
    status: 'pending',
  },
  {
    id: 'WA-1994',
    type: 'sale',
    asset: 'ETH',
    description: 'Ethereum sale',
    amount: '-1.80 ETH',
    date: 'Sep 25, 2026 · 14:16',
    status: 'completed',
  },
]

const networks = {
  BTC: ['Bitcoin'],
  ETH: ['Ethereum', 'Arbitrum', 'Base'],
  SOL: ['Solana'],
  USDT: ['Ethereum', 'Tron', 'BSC'],
  USD: ['Bank transfer'],
}

const assets = portfolioAssets

function formatBalance(asset) {
  if (asset.symbol === 'USD' || asset.symbol === 'USDT') {
    return asset.balance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return asset.balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  })
}

function activityIcon(type) {
  if (type === 'deposit' || type === 'purchase') {
    return <ArrowDownLeft size={15} />
  }

  return <ArrowUpRight size={15} />
}

function getActivityLabel(type) {
  const labels = {
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
    purchase: 'Purchase',
    sale: 'Sale',
  }

  return labels[type]
}

function Wallet() {
  const { settings, updateSettings } = useAppSettings()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState('BTC')
  const [selectedNetwork, setSelectedNetwork] = useState('Bitcoin')
  const [copied, setCopied] = useState(false)
  const [balanceSaveError, setBalanceSaveError] = useState('')
  const showBalance = settings.showBalances
  const totalBalance = portfolioTotal

  const toggleBalanceVisibility = () => {
    try {
      updateSettings({ ...settings, showBalances: !showBalance })
      setBalanceSaveError('')
    } catch {
      setBalanceSaveError('Unable to save balance visibility setting.')
    }
  }

  const filteredAssets = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return assets

    return assets.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query),
    )
  }, [search])

  const allocation = assets.map((asset) => ({
    ...asset,
    value: asset.balance * asset.price,
    percentage:
      ((asset.balance * asset.price) / totalBalance) * 100,
  }))

  const getMaskedBalance = () => '••••••••'

  const openModal = (type) => {
    setCopied(false)
    setModal(type)
  }

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        'bc1q9x7w3nexa8m4v9x2q6m4z5u2',
      )
      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      // Clipboard can be unavailable in some browsers.
    }
  }

  return (
    <main className="wallet-page">
      <div className={`wallet-shell${settings.compactMode ? ' compact' : ''}`}>
        <motion.header
          className="wallet-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <span className="wallet-eyebrow">ASSET MANAGEMENT</span>
            <h1>Wallet</h1>
            <p>
              Manage your balances, funding and digital assets from one
              place.
            </p>
          </div>

          <div className="wallet-header-actions">
            <button
              type="button"
              className="wallet-secondary-button"
              onClick={() => openModal('withdraw')}
            >
              <ArrowUpRight size={16} />
              Withdraw
            </button>

            <button
              type="button"
              className="wallet-primary-button"
              onClick={() => openModal('deposit')}
            >
              <Plus size={16} />
              Deposit
            </button>
          </div>
        </motion.header>

        <motion.section
          className="wallet-overview"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="wallet-balance-card">
            <div className="wallet-balance-top">
              <div>
                <span>Total wallet balance</span>

                <button
                  type="button"
                  className="balance-visibility"
                  onClick={toggleBalanceVisibility}
                  aria-label="Toggle balance visibility"
                >
                  {showBalance ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              </div>

              <div className="balance-live-indicator">
                <span />
                Live value
              </div>
            </div>

            <div className="wallet-total-balance">
              {showBalance
                ? formatCurrency(totalBalance, settings.currency)
                : getMaskedBalance()}
            </div>
            {balanceSaveError && <p role="alert" className="wallet-settings-error">{balanceSaveError}</p>}

            <div className="wallet-balance-change">
              <span>{showBalance ? `+${formatCurrency(8240.4, settings.currency)}` : '••••••••'}</span>
              <strong>+1.53%</strong>
              <small>24h</small>
            </div>

            <div className="wallet-balance-divider" />

            <div className="wallet-balance-metrics">
              <div>
                <span>Available</span>
                <strong>
                  {showBalance
                    ? formatCurrency(availableBalance, settings.currency)
                    : getMaskedBalance()}
                </strong>
              </div>

              <div>
                <span>Locked</span>
                <strong>
                  {showBalance
                    ? formatCurrency(lockedBalance, settings.currency)
                    : getMaskedBalance()}
                </strong>
              </div>
            </div>
          </div>

          <div className="wallet-action-card">
            <div className="wallet-action-card-head">
              <div className="wallet-action-icon">
                <WalletCards size={19} />
              </div>

              <div>
                <span>FUND YOUR WALLET</span>
                <h2>Move money when you need it.</h2>
              </div>
            </div>

            <p>
              Deposit funds to buy digital assets, or withdraw your
              available balance to an external destination.
            </p>

            <div className="wallet-funding-actions">
              <button
                type="button"
                onClick={() => openModal('deposit')}
              >
                <ArrowDownLeft size={15} />
                Add funds
              </button>

              <button
                type="button"
                onClick={() => openModal('withdraw')}
              >
                <ArrowUpRight size={15} />
                Send funds
              </button>
            </div>

            <div className="wallet-secure-note">
              <ShieldCheck size={14} />
              <span>Review destination details before confirming.</span>
            </div>
          </div>
        </motion.section>

        <section className="wallet-main-grid">
          <motion.div
            className="wallet-assets-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="wallet-section-heading">
              <div>
                <span className="wallet-section-eyebrow">
                  YOUR PORTFOLIO
                </span>
                <h2>Assets</h2>
              </div>

              <div className="wallet-asset-search">
                <Search size={14} />
                <input
                  type="search"
                  placeholder="Search assets..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            <div className="wallet-asset-table">
              <div className="wallet-asset-table-head">
                <span>Asset</span>
                <span>Price</span>
                <span>Balance</span>
                <span>Value</span>
                <span>24h</span>
                <span />
              </div>

              <div className="wallet-asset-list">
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    className="wallet-asset-row"
                    key={asset.id}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.035,
                    }}
                  >
                    <div className="wallet-asset-name">
                      <div
                        className={`wallet-asset-logo ${asset.colorClass}`}
                      >
                        {asset.symbol.slice(0, 1)}
                      </div>

                      <div>
                        <strong>{asset.symbol}</strong>
                        <span>{asset.name}</span>
                      </div>
                    </div>

                    <div className="wallet-asset-price">
                      {formatCurrency(asset.price, settings.currency)}
                    </div>

                    <div className="wallet-asset-balance">
                      <strong>{showBalance ? formatBalance(asset) : '••••••••'}</strong>
                      <span>{asset.symbol}</span>
                    </div>

                    <strong className="wallet-asset-value">
                      {showBalance
                        ? formatCurrency(asset.balance * asset.price, settings.currency)
                        : '••••••••'}
                    </strong>

                    <span
                      className={`wallet-asset-change ${
                        asset.change >= 0 ? 'positive' : 'negative'
                      }`}
                    >
                      {asset.change >= 0 ? '+' : ''}
                      {asset.change.toFixed(2)}%
                    </span>

                    <button
                      type="button"
                      className="asset-row-action"
                      onClick={() => {
                        setSelectedAsset(asset.symbol)
                        setModal(
                          asset.symbol === 'USD' ||
                            asset.symbol === 'USDT'
                            ? 'withdraw'
                            : 'deposit',
                        )
                      }}
                      aria-label={`Manage ${asset.name}`}
                    >
                      <ChevronDown size={15} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {filteredAssets.length === 0 && (
              <div className="wallet-empty-state">
                <Search size={22} />
                <strong>No assets found</strong>
                <span>Try a different asset name or symbol.</span>
              </div>
            )}
          </motion.div>

          <motion.aside
            className="wallet-allocation-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="wallet-section-heading">
              <div>
                <span className="wallet-section-eyebrow">
                  PORTFOLIO MIX
                </span>
                <h2>Allocation</h2>
              </div>

              <button
                type="button"
                className="wallet-icon-button"
                aria-label="Allocation filter"
              >
                <Filter size={15} />
              </button>
            </div>

            <div className="allocation-visual">
              <div className="allocation-ring">
                <div className="allocation-ring-inner">
                  <CircleDollarSign size={20} />
                  <strong>{assets.length}</strong>
                  <span>assets</span>
                </div>
              </div>
            </div>

            <div className="allocation-list">
              {allocation.map((asset) => (
                <div className="allocation-item" key={asset.id}>
                  <div className="allocation-item-left">
                    <span
                      className={`allocation-dot ${asset.colorClass}`}
                    />
                    <div>
                      <strong>{asset.symbol}</strong>
                      <span>{asset.name}</span>
                    </div>
                  </div>

                  <div className="allocation-item-right">
                    <strong>{asset.percentage.toFixed(1)}%</strong>
                    <span>{showBalance
                      ? formatCurrency(asset.balance * asset.price, settings.currency)
                      : '••••••••'}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </section>

        <motion.section
          className="wallet-activity-panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="wallet-section-heading">
            <div>
              <span className="wallet-section-eyebrow">
                WALLET ACTIVITY
              </span>
              <h2>Recent activity</h2>
            </div>

            <button
              type="button"
              className="wallet-view-all"
            >
              View all
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="wallet-activity-list">
            {activities.map((activity, index) => (
              <motion.div
                className="wallet-activity-item"
                key={activity.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.2 + index * 0.04,
                }}
              >
                <div
                  className={`wallet-activity-icon ${activity.type}`}
                >
                  {activityIcon(activity.type)}
                </div>

                <div className="wallet-activity-main">
                  <div>
                    <strong>
                      {getActivityLabel(activity.type)}
                    </strong>
                    <span>{activity.description}</span>
                  </div>

                  <div className="wallet-activity-asset">
                    {activity.asset}
                  </div>
                </div>

                <div className="wallet-activity-value">
                  <strong
                    className={
                      activity.amount.startsWith('-')
                        ? 'negative'
                        : 'positive'
                    }
                  >
                    {showBalance ? activity.amount : '••••••••'}
                  </strong>

                  <span>{activity.date}</span>
                </div>

                <span
                  className={`wallet-activity-status ${activity.status}`}
                >
                  {activity.status}
                </span>

                <button
                  type="button"
                  className="wallet-activity-arrow"
                  aria-label={`Open ${activity.id}`}
                >
                  <ExternalLink size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section className="wallet-bottom-grid">
          <div className="wallet-info-card">
            <div className="wallet-info-icon">
              <ShieldCheck size={18} />
            </div>

            <div>
              <span>Security reminder</span>
              <strong>Double-check every withdrawal destination.</strong>
              <p>
                Blockchain transfers can be irreversible. Always
                verify the network and destination before confirming.
              </p>
            </div>
          </div>

          <div className="wallet-info-card">
            <div className="wallet-info-icon neutral">
              <Clock3 size={18} />
            </div>

            <div>
              <span>Wallet availability</span>
              <strong>Available balance updates automatically.</strong>
              <p>
                Funds involved in pending transactions may remain
                temporarily unavailable until processing is complete.
              </p>
            </div>
          </div>
        </section>
      </div>

      {modal && (
        <div
          className="wallet-modal-backdrop"
          onClick={() => setModal(null)}
        >
          <motion.div
            className="wallet-modal"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="wallet-modal-header">
              <div>
                <span className="wallet-modal-eyebrow">
                  {modal === 'deposit' ? 'FUND WALLET' : 'SEND FUNDS'}
                </span>

                <h2>
                  {modal === 'deposit'
                    ? 'Deposit assets'
                    : 'Withdraw assets'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="wallet-modal-tabs">
              <button
                type="button"
                className={modal === 'deposit' ? 'active' : ''}
                onClick={() => setModal('deposit')}
              >
                Deposit
              </button>

              <button
                type="button"
                className={modal === 'withdraw' ? 'active' : ''}
                onClick={() => setModal('withdraw')}
              >
                Withdraw
              </button>
            </div>

            <div className="wallet-modal-field">
              <span>Asset</span>

              <div className="wallet-modal-select">
                <select
                  value={selectedAsset}
                  onChange={(event) => {
                    setSelectedAsset(event.target.value)

                    const firstNetwork =
                      networks[event.target.value][0]

                    setSelectedNetwork(firstNetwork)
                  }}
                >
                  {assets.map((asset) => (
                    <option key={asset.symbol} value={asset.symbol}>
                      {asset.symbol} — {asset.name}
                    </option>
                  ))}
                </select>

                <ChevronDown size={15} />
              </div>
            </div>

            <div className="wallet-modal-field">
              <span>Network</span>

              <div className="wallet-modal-select">
                <select
                  value={selectedNetwork}
                  onChange={(event) =>
                    setSelectedNetwork(event.target.value)
                  }
                >
                  {networks[selectedAsset].map((network) => (
                    <option key={network} value={network}>
                      {network}
                    </option>
                  ))}
                </select>

                <ChevronDown size={15} />
              </div>
            </div>

            {modal === 'deposit' ? (
              <>
                <div className="wallet-address-box">
                  <div>
                    <span>Deposit address</span>
                    <strong>
                      bc1q9x7w3nexa8m4v9x2q6m4z5u2
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    aria-label="Copy deposit address"
                  >
                    {copied ? (
                      <span className="copied-text">Copied</span>
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                <div className="wallet-modal-warning">
                  <ShieldCheck size={15} />
                  <span>
                    Only send {selectedAsset} using the selected
                    network. Sending unsupported assets or using the
                    wrong network can result in permanent loss.
                  </span>
                </div>

                <button
                  type="button"
                  className="wallet-modal-primary"
                  onClick={() => setModal(null)}
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <label className="wallet-modal-field">
                  <span>Destination address</span>

                  <input
                    type="text"
                    placeholder="Enter wallet address"
                  />
                </label>

                <label className="wallet-modal-field">
                  <span>Amount</span>

                  <div className="wallet-amount-input">
                    <input
                      type="number"
                      placeholder="0.00"
                    />
                    <strong>{selectedAsset}</strong>
                    <button type="button">Max</button>
                  </div>
                </label>

                <div className="withdraw-summary">
                  <div>
                    <span>Network fee</span>
                    <strong>Calculated at confirmation</strong>
                  </div>

                  <div>
                    <span>Available balance</span>
                    <strong>
                      {selectedAsset === 'USD'
                        ? '$12,640.00'
                        : 'Available balance'}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="wallet-modal-primary"
                  onClick={() => setModal(null)}
                >
                  Review withdrawal
                  <ArrowUpRight size={15} />
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default Wallet