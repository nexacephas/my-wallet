import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Coins,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wallet,
} from 'lucide-react'
import './Auth.css'

type AuthMode = 'login' | 'signup'

const fieldMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.18 + index * 0.05,
      duration: 0.45,
    },
  }),
}

/* =========================
   Animated Wallet
========================= */

function WalletAnimation() {
  const coins = [
    {
      icon: CircleDollarSign,
      className: 'coin-one',
      delay: 0,
    },
    {
      icon: Coins,
      className: 'coin-two',
      delay: 0.8,
    },
    {
      icon: CircleDollarSign,
      className: 'coin-three',
      delay: 1.6,
    },
  ]

  return (
    <div className="wallet-animation" aria-hidden="true">
      <motion.div
        className="wallet-glow"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="wallet-object"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Wallet size={92} strokeWidth={1.25} />

        <div className="wallet-slot" />
      </motion.div>

      {coins.map(({ icon: Icon, className, delay }) => (
        <motion.div
          key={className}
          className={`wallet-coin ${className}`}
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            y: [0, -70, -120, -95, -42, 8],
            x: [0, 8, 28, 48, 55, 38],
            opacity: [0, 1, 1, 1, 0.8, 0],
            scale: [0.7, 1, 1, 0.95, 0.8, 0.5],
            rotate: [0, 20, 45, 90, 140, 180],
          }}
          transition={{
            duration: 2.8,
            delay,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Icon size={30} strokeWidth={1.6} />
        </motion.div>
      ))}

      <motion.div
        className="wallet-particle particle-one"
        animate={{
          y: [0, -18, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="wallet-particle particle-two"
        animate={{
          y: [0, 15, 0],
          opacity: [0.15, 0.8, 0.15],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      />
    </div>
  )
}

/* =========================
   Auth Page
========================= */

function Auth() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const navigate = useNavigate()

  const isLogin = mode === 'login'

  return (
    <main className="auth-page">
      {/* =========================
          LEFT VISUAL PANEL
      ========================= */}

      <section
        className="auth-visual"
        aria-label="Crypto exchange introduction"
      >
        <div className="visual-grid" />

        <div className="visual-orbit visual-orbit-one" />
        <div className="visual-orbit visual-orbit-two" />

        <motion.div
          className="visual-spark spark-one"
          animate={{
            y: [0, -14, 0],
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="visual-spark spark-two"
          animate={{
            y: [0, 12, 0],
            opacity: [0.25, 0.9, 0.25],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
        />

        <WalletAnimation />

        <div className="visual-content">
          <a
            className="auth-brand"
            href="/auth"
            aria-label="Nexa home"
          >
            <span className="brand-mark">
              <Sparkles size={17} strokeWidth={2.5} />
            </span>

            <span>Nexa</span>
          </a>

          <motion.div
            className="visual-copy"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          >
            <p className="eyebrow">
              <span />
              The smarter way to move money
            </p>

            <h1>
              Build your future
              <br />
              <em>in motion.</em>
            </h1>

            <p className="visual-description">
              Trade, track, and grow your digital assets with a
              platform designed for the next generation of finance.
            </p>
          </motion.div>

          <div className="visual-footer">
            <div className="trust-mark">
              <ShieldCheck size={17} />

              <span>Bank-grade security</span>
            </div>

            <span className="visual-footer-separator" />

            <span>Secure digital asset management</span>
          </div>
        </div>
      </section>

      {/* =========================
          AUTH PANEL
      ========================= */}

      <section className="auth-panel">
        <motion.div
          className="auth-card"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: 'easeOut',
          }}
        >
          <div className="mobile-brand">
            <span className="brand-mark">
              <Sparkles size={16} strokeWidth={2.5} />
            </span>

            <span>Nexa</span>
          </div>

          <div className="auth-heading">
            <p className="auth-kicker">
              Welcome to Nexa
            </p>

            <h2>
              {isLogin
                ? 'Welcome back'
                : 'Create your account'}
            </h2>

            <p>
              {isLogin
                ? 'Enter your details to access your portfolio.'
                : 'Start your journey into the future of finance.'}
            </p>
          </div>

          {/* Authentication tabs */}

          <div
            className="auth-tabs"
            role="tablist"
            aria-label="Authentication mode"
          >
            <button
              className={isLogin ? 'active' : ''}
              type="button"
              role="tab"
              aria-selected={isLogin}
              onClick={() => setMode('login')}
            >
              Log in
            </button>

            <button
              className={!isLogin ? 'active' : ''}
              type="button"
              role="tab"
              aria-selected={!isLogin}
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </div>

          {/* Form */}

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault()

              if (isLogin) {
                navigate('/intro')
              }
            }}
          >
            {!isLogin && (
              <motion.label
                className="field-group"
                custom={0}
                variants={fieldMotion}
                initial="hidden"
                animate="visible"
              >
                <span>Full name</span>

                <span className="input-wrap">
                  <UserRound
                    size={18}
                    aria-hidden="true"
                  />

                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    autoComplete="name"
                  />
                </span>
              </motion.label>
            )}

            <motion.label
              className="field-group"
              custom={1}
              variants={fieldMotion}
              initial="hidden"
              animate="visible"
            >
              <span>Email address</span>

              <span className="input-wrap">
                <Mail
                  size={18}
                  aria-hidden="true"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </span>
            </motion.label>

            <motion.label
              className="field-group"
              custom={2}
              variants={fieldMotion}
              initial="hidden"
              animate="visible"
            >
              <span>Password</span>

              <span className="input-wrap">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Enter your password"
                  autoComplete={
                    isLogin
                      ? 'current-password'
                      : 'new-password'
                  }
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                  onClick={() =>
                    setShowPassword(
                      (visible) => !visible
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </span>
            </motion.label>

            {!isLogin && (
              <motion.label
                className="field-group"
                custom={3}
                variants={fieldMotion}
                initial="hidden"
                animate="visible"
              >
                <span>Confirm password</span>

                <span className="input-wrap">
                  <LockKeyhole
                    size={18}
                    aria-hidden="true"
                  />

                  <input
                    type="password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                  />
                </span>
              </motion.label>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(
                        event.target.checked
                      )
                    }
                  />

                  <span className="custom-checkbox">
                    <Check size={13} />
                  </span>

                  <span>Remember me</span>
                </label>

                <button
                  className="forgot-link"
                  type="button"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <motion.button
              className="primary-action"
              type="submit"
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>
                {isLogin
                  ? 'Log in to Nexa'
                  : 'Create account'}
              </span>

              <ArrowRight size={18} />
            </motion.button>
          </form>

          {/* Divider */}

          <div className="divider">
            <span />
            <small>or continue with</small>
            <span />
          </div>

          {/* Google */}

          <motion.button
            className="google-action"
            type="button"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <span className="google-mark">
              G
            </span>

            Continue with Google
          </motion.button>

          <p className="terms-copy">
            By continuing, you agree to Nexa&apos;s{' '}
            <a href="/terms">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>

        <p className="support-copy">
          Need help?{' '}
          <a href="mailto:support@nexa.example">
            Contact support
          </a>
        </p>
      </section>
    </main>
  )
}

export default Auth