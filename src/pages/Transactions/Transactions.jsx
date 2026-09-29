import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  Filter,
  MoreHorizontal,
  Search,
  XCircle,
} from 'lucide-react'
import { transactions } from '../../data/transactions'
import './Transactions.css'

const typeOptions = [
  { label: 'All transactions', value: 'all' },
  { label: 'Purchases', value: 'purchase' },
  { label: 'Sales', value: 'sale' },
  { label: 'Deposits', value: 'deposit' },
  { label: 'Withdrawals', value: 'withdrawal' },
]

const statusOptions = [
  { label: 'All statuses', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
]

function formatCurrency(value) {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function getTypeLabel(type) {
  const labels = {
    purchase: 'Purchase',
    sale: 'Sale',
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
  }

  return labels[type]
}

function TransactionIcon({ type }) {
  if (type === 'purchase' || type === 'deposit') {
    return <ArrowDownLeft size={16} />
  }

  return <ArrowUpRight size={16} />
}

function StatusIcon({ status }) {
  if (status === 'completed') {
    return <CheckCircle2 size={13} />
  }

  if (status === 'pending') {
    return <Clock3 size={13} />
  }

  return <XCircle size={13} />
}

function Transactions() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase()

    return transactions.filter((transaction) => {
      const matchesSearch =
        !query ||
        transaction.id.toLowerCase().includes(query) ||
        transaction.asset.toLowerCase().includes(query) ||
        transaction.assetName.toLowerCase().includes(query) ||
        transaction.reference.toLowerCase().includes(query)

      const matchesType =
        type === 'all' || transaction.type === type

      const matchesStatus =
        status === 'all' || transaction.status === status

      return matchesSearch && matchesType && matchesStatus
    })
  }, [search, type, status])

  const completedCount = transactions.filter(
    (transaction) => transaction.status === 'completed',
  ).length

  const pendingCount = transactions.filter(
    (transaction) => transaction.status === 'pending',
  ).length

  const failedCount = transactions.filter(
    (transaction) => transaction.status === 'failed',
  ).length

  return (
    <main className="transactions-page">
      <div className="transactions-shell">
        <motion.header
          className="transactions-header"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="transactions-eyebrow">
              ACCOUNT ACTIVITY
            </span>

            <h1>Transactions</h1>

            <p>
              Review your deposits, withdrawals, purchases and
              sales in one place.
            </p>
          </div>

          <button className="export-transactions">
            <Download size={16} />
            Export history
          </button>
        </motion.header>

        <motion.section
          className="transaction-summary"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
        >
          <div className="transaction-summary-card primary">
            <div className="summary-icon">
              <ArrowUpRight size={17} />
            </div>

            <div>
              <span>Total volume</span>
              <strong>$82,640.00</strong>
              <small>Across recent activity</small>
            </div>
          </div>

          <div className="transaction-summary-card">
            <div className="summary-icon completed">
              <CheckCircle2 size={17} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
              <small>Successfully processed</small>
            </div>
          </div>

          <div className="transaction-summary-card">
            <div className="summary-icon pending">
              <Clock3 size={17} />
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingCount}</strong>
              <small>Awaiting confirmation</small>
            </div>
          </div>

          <div className="transaction-summary-card">
            <div className="summary-icon failed">
              <XCircle size={17} />
            </div>

            <div>
              <span>Failed</span>
              <strong>{failedCount}</strong>
              <small>Requires attention</small>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="transactions-panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <div className="transactions-toolbar">
            <div className="transaction-search">
              <Search size={16} />

              <input
                type="search"
                placeholder="Search by asset, ID or reference..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <XCircle size={14} />
                </button>
              )}
            </div>

            <div className="desktop-filters">
              <div className="filter-select">
                <Filter size={14} />

                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                >
                  {typeOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown size={14} />
              </div>

              <div className="filter-select">
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown size={14} />
              </div>
            </div>

            <button
              className="mobile-filter-button"
              onClick={() => setShowFilters((value) => !value)}
            >
              <Filter size={15} />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mobile-filters">
              <label>
                Type
                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                >
                  {typeOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Status
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <div className="transaction-table">
            <div className="transaction-table-head">
              <span>Transaction</span>
              <span>Asset</span>
              <span>Amount</span>
              <span>Value</span>
              <span>Fee</span>
              <span>Status</span>
              <span>Date</span>
              <span />
            </div>

            <div className="transaction-list">
              {filteredTransactions.map(
                (transaction, index) => (
                  <motion.button
                    type="button"
                    className="transaction-row"
                    key={transaction.id}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.035,
                    }}
                    onClick={() =>
                      setSelectedTransaction(transaction)
                    }
                  >
                    <div className="transaction-main">
                      <div
                        className={`transaction-type-icon ${transaction.type}`}
                      >
                        <TransactionIcon
                          type={transaction.type}
                        />
                      </div>

                      <div>
                        <strong>
                          {getTypeLabel(transaction.type)}
                        </strong>

                        <span>{transaction.id}</span>
                      </div>
                    </div>

                    <div className="transaction-asset">
                      <strong>{transaction.asset}</strong>
                      <span>{transaction.assetName}</span>
                    </div>

                    <strong
                      className={
                        transaction.amount.startsWith('-')
                          ? 'amount-negative'
                          : 'amount-positive'
                      }
                    >
                      {transaction.amount}
                    </strong>

                    <span className="transaction-value">
                      {formatCurrency(transaction.value)}
                    </span>

                    <span className="transaction-fee">
                      {transaction.fee
                        ? formatCurrency(transaction.fee)
                        : '—'}
                    </span>

                    <span
                      className={`transaction-status ${transaction.status}`}
                    >
                      <StatusIcon
                        status={transaction.status}
                      />
                      {transaction.status}
                    </span>

                    <div className="transaction-date">
                      <strong>{transaction.date}</strong>
                      <span>{transaction.time}</span>
                    </div>

                    <span
                      className="transaction-more"
                      aria-hidden="true"
                    >
                      <MoreHorizontal size={17} />
                    </span>
                  </motion.button>
                ),
              )}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="transactions-empty">
                <Search size={24} />
                <strong>No transactions found</strong>
                <span>
                  Try adjusting your search or filters.
                </span>
              </div>
            )}
          </div>

          <div className="transactions-footer">
            <span>
              Showing{' '}
              <strong>{filteredTransactions.length}</strong>{' '}
              of <strong>{transactions.length}</strong>{' '}
              transactions
            </span>

            <div className="pagination">
              <button disabled>Previous</button>
              <button className="active">1</button>
              <button>2</button>
              <button>Next</button>
            </div>
          </div>
        </motion.section>
      </div>

      {selectedTransaction && (
        <div
          className="transaction-modal-backdrop"
          onClick={() => setSelectedTransaction(null)}
        >
          <motion.div
            className="transaction-modal"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="transaction-modal-header">
              <div>
                <span>TRANSACTION DETAILS</span>
                <h2>{selectedTransaction.id}</h2>
              </div>

              <button
                onClick={() =>
                  setSelectedTransaction(null)
                }
                aria-label="Close transaction details"
              >
                <XCircle size={18} />
              </button>
            </div>

            <div
              className={`transaction-detail-status ${selectedTransaction.status}`}
            >
              <StatusIcon
                status={selectedTransaction.status}
              />
              {selectedTransaction.status}
            </div>

            <div className="transaction-detail-amount">
              <span>{getTypeLabel(selectedTransaction.type)}</span>
              <strong>{selectedTransaction.amount}</strong>
              <small>
                {formatCurrency(selectedTransaction.value)}
              </small>
            </div>

            <div className="transaction-detail-grid">
              <div>
                <span>Asset</span>
                <strong>
                  {selectedTransaction.asset} ·{' '}
                  {selectedTransaction.assetName}
                </strong>
              </div>

              <div>
                <span>Fee</span>
                <strong>
                  {selectedTransaction.fee
                    ? formatCurrency(
                        selectedTransaction.fee,
                      )
                    : 'No fee'}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {selectedTransaction.date}
                </strong>
              </div>

              <div>
                <span>Time</span>
                <strong>
                  {selectedTransaction.time}
                </strong>
              </div>
            </div>

            <div className="transaction-reference">
              <div>
                <span>Reference</span>
                <strong>
                  {selectedTransaction.reference}
                </strong>
              </div>

              <button
                aria-label="Copy transaction reference"
              >
                <Copy size={14} />
              </button>
            </div>

            <button className="view-explorer">
              <ExternalLink size={14} />
              View transaction details
            </button>
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default Transactions