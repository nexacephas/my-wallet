import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleCheck,
  Clock3,
  CreditCard,
  FileText,
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'
import './HelpSupport.css'

const categories = [
  {
    id: 'account',
    title: 'Account & profile',
    description:
      'Manage your profile, login, verification and account settings.',
    icon: Smartphone,
    articleCount: 12,
    tone: 'green',
  },
  {
    id: 'security',
    title: 'Security',
    description:
      'Protect your account, devices, passwords and authentication.',
    icon: ShieldCheck,
    articleCount: 18,
    tone: 'blue',
  },
  {
    id: 'wallet',
    title: 'Wallet & balances',
    description:
      'Learn about deposits, withdrawals, balances and asset wallets.',
    icon: WalletCards,
    articleCount: 21,
    tone: 'purple',
  },
  {
    id: 'trading',
    title: 'Trading & markets',
    description:
      'Understand markets, orders, fees and trading activity.',
    icon: Zap,
    articleCount: 16,
    tone: 'orange',
  },
  {
    id: 'payments',
    title: 'Payments',
    description:
      'Get help with funding methods, transfers and payment activity.',
    icon: CreditCard,
    articleCount: 14,
    tone: 'cyan',
  },
  {
    id: 'general',
    title: 'General questions',
    description:
      'Find answers about Nexa features and how the platform works.',
    icon: HelpCircle,
    articleCount: 25,
    tone: 'neutral',
  },
]

const articles = [
  {
    id: 1,
    title: 'How do I deposit assets into my Nexa wallet?',
    category: 'Wallet & balances',
    description:
      'Learn how to select an asset and network and locate your deposit address.',
  },
  {
    id: 2,
    title: 'How can I secure my Nexa account?',
    category: 'Security',
    description:
      'Review the security controls available for your account.',
  },
  {
    id: 3,
    title: 'Why is my withdrawal still pending?',
    category: 'Wallet & balances',
    description:
      'Understand common reasons a withdrawal can remain pending.',
  },
  {
    id: 4,
    title: 'How do I change my password?',
    category: 'Account & profile',
    description:
      'Update your account password from Settings.',
  },
  {
    id: 5,
    title: 'How are trading fees calculated?',
    category: 'Trading & markets',
    description:
      'Understand how fees may appear when you place a trade.',
  },
  {
    id: 6,
    title: 'How do I recognize a suspicious login?',
    category: 'Security',
    description:
      'Review sessions and take action when a device looks unfamiliar.',
  },
]

const faqs = [
  {
    id: 1,
    question: 'How long do deposits usually take?',
    answer:
      'Processing time depends on the funding method, asset and network. A deposit may remain pending while the transaction is being confirmed. Always verify the selected network before sending assets.',
  },
  {
    id: 2,
    question: 'Can I cancel a blockchain withdrawal?',
    answer:
      'Once a blockchain withdrawal has been broadcast and confirmed, it generally cannot be reversed. Before confirming a withdrawal, carefully review the destination address and network.',
  },
  {
    id: 3,
    question: 'Why does my available balance differ from my total balance?',
    answer:
      'Total balance represents the value shown across your assets, while available balance excludes funds that are temporarily locked or involved in pending activity.',
  },
  {
    id: 4,
    question: 'How can I protect my account?',
    answer:
      'Use a strong unique password, enable two-factor authentication, review active sessions regularly, and never share passwords or verification codes with another person.',
  },
  {
    id: 5,
    question: 'Where can I find my transaction history?',
    answer:
      'Open Transactions from the main navigation. You can search by asset, transaction ID or reference and filter by transaction type and status.',
  },
]

const quickLinks = [
  {
    title: 'Getting started',
    description: 'Learn the essentials of using Nexa.',
    icon: BookOpen,
  },
  {
    title: 'Security center',
    description: 'Review account protection best practices.',
    icon: ShieldCheck,
  },
  {
    title: 'Trading guide',
    description: 'Understand markets and trading basics.',
    icon: Zap,
  },
]

function HelpSupport() {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showSupportForm, setShowSupportForm] = useState(false)

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [requestSent, setRequestSent] = useState(false)

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return articles
    }

    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
      )
    })
  }, [search])

  const filteredCategories = selectedCategory
    ? categories.filter(
        (category) => category.id === selectedCategory,
      )
    : categories

  const handleSubmitSupport = () => {
    if (!subject.trim() || !message.trim()) return

    setRequestSent(true)

    window.setTimeout(() => {
      setSubject('')
      setMessage('')
    }, 1000)
  }

  const closeSupportForm = () => {
    setShowSupportForm(false)
    setRequestSent(false)
  }

  return (
    <main className="support-page">
      <div className="support-shell">
        <motion.header
          className="support-header"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <span className="support-eyebrow">
              NEXA SUPPORT CENTER
            </span>

            <h1>How can we help?</h1>

            <p>
              Find answers, explore guides or get in touch with the
              Nexa support team.
            </p>
          </div>

          <div className="support-status">
            <span className="support-status-dot" />
            All systems operational
          </div>
        </motion.header>

        <motion.section
          className="support-hero"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="support-hero-content">
            <div className="support-hero-badge">
              <Sparkles size={12} />
              NEXA HELP
            </div>

            <h2>
              Search the
              <br />
              <span>Nexa knowledge base.</span>
            </h2>

            <p>
              Search guides, account help, wallet information and
              answers to common questions.
            </p>

            <div className="support-search">
              <Search size={18} />

              <input
                type="search"
                placeholder="Search for a topic, feature or question..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}

              <kbd>⌘ K</kbd>
            </div>

            <div className="support-search-hints">
              <span>Popular:</span>

              <button
                type="button"
                onClick={() =>
                  setSearch('withdrawal')
                }
              >
                Withdrawal
              </button>

              <button
                type="button"
                onClick={() =>
                  setSearch('security')
                }
              >
                Security
              </button>

              <button
                type="button"
                onClick={() =>
                  setSearch('password')
                }
              >
                Password
              </button>
            </div>
          </div>

          <div className="support-hero-visual">
            <div className="support-visual-grid" />

            <motion.div
              className="support-center-orb"
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <LifeBuoy size={34} />
            </motion.div>

            <div className="support-floating-card card-one">
              <ShieldCheck size={15} />
              <span>Account security</span>
            </div>

            <div className="support-floating-card card-two">
              <WalletCards size={15} />
              <span>Wallet support</span>
            </div>

            <div className="support-floating-card card-three">
              <MessageCircle size={15} />
              <span>Live assistance</span>
            </div>
          </div>
        </motion.section>

        {search ? (
          <motion.section
            className="support-search-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="support-section-heading">
              <div>
                <span className="support-section-eyebrow">
                  SEARCH RESULTS
                </span>

                <h2>
                  {filteredArticles.length}{' '}
                  {filteredArticles.length === 1
                    ? 'result'
                    : 'results'}{' '}
                  for “{search}”
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSearch('')}
              >
                Clear search
              </button>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="support-results-grid">
                {filteredArticles.map((article) => (
                  <button
                    type="button"
                    className="support-result-card"
                    key={article.id}
                  >
                    <div>
                      <span>{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                    </div>

                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="support-no-results">
                <Search size={23} />
                <strong>No articles matched your search.</strong>
                <span>
                  Try another phrase or contact support for help.
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setShowSupportForm(true)
                  }
                >
                  Contact support
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.section>
        ) : (
          <>
            <section className="support-categories-section">
              <div className="support-section-heading">
                <div>
                  <span className="support-section-eyebrow">
                    EXPLORE HELP
                  </span>

                  <h2>What do you need help with?</h2>

                  <p>
                    Start with a category or browse the most common
                    areas of Nexa.
                  </p>
                </div>

                {selectedCategory && (
                  <button
                    type="button"
                    className="support-reset-filter"
                    onClick={() =>
                      setSelectedCategory(null)
                    }
                  >
                    Show all
                  </button>
                )}
              </div>

              <div className="support-category-grid">
                {filteredCategories.map((category, index) => {
                  const Icon = category.icon

                  return (
                    <motion.button
                      type="button"
                      className="support-category-card"
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.045,
                      }}
                      onClick={() =>
                        setSelectedCategory(
                          category.id,
                        )
                      }
                    >
                      <div
                        className={`support-category-icon ${category.tone}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="support-category-content">
                        <h3>{category.title}</h3>

                        <p>{category.description}</p>

                        <span>
                          {category.articleCount} articles
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </section>

            <section className="support-middle-grid">
              <div className="support-articles-card">
                <div className="support-section-heading">
                  <div>
                    <span className="support-section-eyebrow">
                      POPULAR GUIDES
                    </span>

                    <h2>Start here</h2>
                  </div>

                  <button type="button">
                    View all
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="support-article-list">
                  {articles.slice(0, 5).map((article) => (
                    <button
                      type="button"
                      className="support-article-item"
                      key={article.id}
                    >
                      <div className="support-article-icon">
                        <FileText size={15} />
                      </div>

                      <div>
                        <span>{article.category}</span>
                        <strong>{article.title}</strong>
                      </div>

                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
              </div>

              <aside className="support-quick-card">
                <div className="support-quick-top">
                  <div className="support-quick-icon">
                    <LifeBuoy size={18} />
                  </div>

                  <span>NEED MORE HELP?</span>
                </div>

                <h2>Talk to support</h2>

                <p>
                  Couldn’t find what you were looking for? Send us a
                  message and describe what you need help with.
                </p>

                <div className="support-response">
                  <Clock3 size={14} />

                  <div>
                    <strong>Support request</strong>
                    <span>Response time depends on the request.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowSupportForm(true)
                  }
                >
                  Contact support
                  <ArrowRight size={14} />
                </button>
              </aside>
            </section>

            <section className="support-faq-section">
              <div className="support-section-heading">
                <div>
                  <span className="support-section-eyebrow">
                    QUICK ANSWERS
                  </span>

                  <h2>Frequently asked questions</h2>

                  <p>
                    Answers to some of the things users ask most
                    often.
                  </p>
                </div>
              </div>

              <div className="support-faq-list">
                {faqs.map((faq) => {
                  const isOpen = openFaq === faq.id

                  return (
                    <div
                      className={`support-faq-item ${
                        isOpen ? 'open' : ''
                      }`}
                      key={faq.id}
                    >
                      <button
                        type="button"
                        className="support-faq-question"
                        onClick={() =>
                          setOpenFaq(
                            isOpen ? null : faq.id,
                          )
                        }
                      >
                        <span>{faq.question}</span>

                        <ChevronDown
                          size={16}
                          className="support-faq-chevron"
                        />
                      </button>

                      {isOpen && (
                        <motion.div
                          className="support-faq-answer"
                          initial={{
                            opacity: 0,
                            height: 0,
                          }}
                          animate={{
                            opacity: 1,
                            height: 'auto',
                          }}
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="support-bottom-grid">
              {quickLinks.map((link) => {
                const Icon = link.icon

                return (
                  <button
                    type="button"
                    className="support-quick-link"
                    key={link.title}
                  >
                    <div className="support-quick-link-icon">
                      <Icon size={16} />
                    </div>

                    <div>
                      <strong>{link.title}</strong>
                      <span>{link.description}</span>
                    </div>

                    <ArrowRight size={14} />
                  </button>
                )
              })}
            </section>

            <section className="support-contact-strip">
              <div className="support-contact-icon">
                <MessageCircle size={20} />
              </div>

              <div className="support-contact-content">
                <span className="support-section-eyebrow">
                  STILL NEED HELP?
                </span>

                <h2>Our support team is here to help.</h2>

                <p>
                  Give us the details and we’ll have the right
                  context to investigate your request.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowSupportForm(true)
                }
              >
                Open support request
                <Send size={14} />
              </button>
            </section>
          </>
        )}
      </div>

      {showSupportForm && (
        <div
          className="support-modal-backdrop"
          onClick={closeSupportForm}
        >
          <motion.div
            className="support-modal"
            initial={{
              opacity: 0,
              y: 16,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{ duration: 0.25 }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {!requestSent ? (
              <>
                <div className="support-modal-header">
                  <div>
                    <span className="support-section-eyebrow">
                      CONTACT SUPPORT
                    </span>

                    <h2>Tell us what happened</h2>

                    <p>
                      Include as much useful detail as possible.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeSupportForm}
                    aria-label="Close support form"
                  >
                    <X size={17} />
                  </button>
                </div>

                <label className="support-form-field">
                  <span>Subject</span>

                  <input
                    type="text"
                    value={subject}
                    onChange={(event) =>
                      setSubject(event.target.value)
                    }
                    placeholder="e.g. Withdrawal still pending"
                  />
                </label>

                <label className="support-form-field">
                  <span>Message</span>

                  <textarea
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    placeholder="Describe the issue and what you were trying to do..."
                    rows={6}
                  />
                </label>

                <div className="support-form-note">
                  <ShieldCheck size={14} />

                  <span>
                    Never include your password, verification codes
                    or private wallet keys in a support request.
                  </span>
                </div>

                <button
                  type="button"
                  className="support-form-submit"
                  disabled={
                    !subject.trim() || !message.trim()
                  }
                  onClick={handleSubmitSupport}
                >
                  Send support request
                  <Send size={14} />
                </button>
              </>
            ) : (
              <div className="support-success-state">
                <div className="support-success-icon">
                  <CircleCheck size={27} />
                </div>

                <span className="support-section-eyebrow">
                  REQUEST SENT
                </span>

                <h2>We’ve received your request.</h2>

                <p>
                  Your support request has been captured. A future
                  backend can attach a ticket number and route it to
                  the appropriate support queue.
                </p>

                <button
                  type="button"
                  className="support-form-submit"
                  onClick={closeSupportForm}
                >
                  Done
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </main>
  )
}

export default HelpSupport