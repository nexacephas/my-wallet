import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  CircleDollarSign,
  Coins,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import './Intro.css'

const introText = {
  eyebrow: 'Welcome back',
  headline: 'Your assets. Your market. Your move.',
}

const particles = [
  { x: '-150px', y: '-105px', delay: 0.2, duration: 4.5, size: 28 },
  { x: '155px', y: '-75px', delay: 0.8, duration: 5, size: 22 },
  { x: '-170px', y: '90px', delay: 1.2, duration: 5.5, size: 20 },
  { x: '165px', y: '105px', delay: 0.5, duration: 4.8, size: 26 },
]

function Intro() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 3200)

    return () => window.clearTimeout(timeoutId)
  }, [navigate])

  return (
    <main
      className="intro-screen"
      aria-live="polite"
      aria-label="Nexa welcome intro"
    >
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />

      <motion.div
        className="intro-glow"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        aria-hidden="true"
      />

      <div className="intro-scene" aria-hidden="true">
        <motion.div
          className="intro-orbit intro-orbit-one"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 18,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <span className="orbit-dot orbit-dot-one" />
        </motion.div>

        <motion.div
          className="intro-orbit intro-orbit-two"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  rotate: -360,
                }
          }
          transition={{
            duration: 25,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <span className="orbit-dot orbit-dot-two" />
        </motion.div>

        <motion.div
          className="intro-ring"
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.65 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="intro-particle"
            style={{
              width: particle.size,
              height: particle.size,
            }}
            initial={
              prefersReducedMotion
                ? {
                    opacity: 0.7,
                    x: particle.x,
                    y: particle.y,
                  }
                : {
                    opacity: 0,
                    x: '0px',
                    y: '0px',
                    scale: 0.4,
                  }
            }
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: [0, 0.9, 0.55],
                    x: particle.x,
                    y: particle.y,
                    scale: [0.4, 1, 0.85],
                  }
            }
            transition={{
              duration: 1.2,
              delay: particle.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {index % 2 === 0 ? (
              <CircleDollarSign size={particle.size * 0.65} />
            ) : (
              <Coins size={particle.size * 0.65} />
            )}
          </motion.div>
        ))}

        <motion.div
          className="intro-wallet"
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: 0,
                  scale: 0.72,
                  rotateX: 20,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            className="intro-wallet-glow"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: [0.25, 0.55, 0.25],
                    scale: [0.9, 1.08, 0.9],
                  }
            }
            transition={{
              duration: 2.4,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />

          <div className="intro-wallet-core">
            <WalletCards size={44} strokeWidth={1.45} />
          </div>

          <motion.div
            className="intro-wallet-spark"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    rotate: [0, 90, 180, 270, 360],
                    opacity: [0.4, 1, 0.4],
                  }
            }
            transition={{
              duration: 5,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <Sparkles size={15} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="intro-content"
        initial={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 22 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="intro-brand"
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 10 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.75,
          }}
        >
          <span className="intro-brand-mark">
            <Sparkles size={15} strokeWidth={2.4} />
          </span>

          <span>Nexa</span>
        </motion.div>

        <div className="intro-text-stack">
          <motion.p
            className="intro-line intro-line-one"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {introText.eyebrow}
          </motion.p>

          <motion.h1
            className="intro-line intro-line-two"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    y: 20,
                    filter: 'blur(12px)',
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.9,
              delay: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {introText.headline}
          </motion.h1>
        </div>

        <motion.div
          className="intro-status"
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.45,
          }}
        >
          <span className="intro-status-dot" />
          <span>Securing your session</span>
        </motion.div>

        <div className="intro-progress-wrap" aria-hidden="true">
          <div className="intro-progress-track">
            <motion.div
              className="intro-progress-bar"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 3,
                ease: 'linear',
              }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="intro-corner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <ArrowUpRight size={14} />
      </motion.div>
    </main>
  )
}

export default Intro