import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Sparkles, TrendingUp } from 'lucide-react'
import { formatCurrency as formatDisplayCurrency } from '../../data/portfolio'
import './NexaAI.css'

type NexaAIAsset = {
  ticker: string
  allocation: string
}

type NexaAIProps = {
  balance: number
  dailyPnl: number
  dailyChange: number
  assets: NexaAIAsset[]
  currency: 'USD' | 'NGN' | 'EUR' | 'GBP'
  showBalances: boolean
}

const suggestedPrompts = [
  'Analyze my portfolio',
  "Summarize today's performance",
  'Explain my allocation',
]

function NexaAI({ balance, dailyPnl, dailyChange, assets, currency, showBalances }: NexaAIProps) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const prefersReducedMotion = useReducedMotion()
  const rankedAssets = [...assets].sort(
    (first, second) => Number.parseFloat(second.allocation) - Number.parseFloat(first.allocation),
  )
  const leadingAsset = rankedAssets[0]
  const topThreeAllocation = rankedAssets
    .slice(0, 3)
    .reduce((total, asset) => total + Number.parseFloat(asset.allocation), 0)
  const formatCurrency = (amount: number) =>
    showBalances ? formatDisplayCurrency(amount, currency) : '••••••••'
  const signedPnl = `${dailyPnl >= 0 ? '+' : '-'}${formatCurrency(Math.abs(dailyPnl))}`
  const signedChange = `${dailyChange >= 0 ? '+' : ''}${dailyChange.toFixed(2)}%`

  const getLocalResponse = (question: string) => {
    const normalizedQuestion = question.toLowerCase()

    if (normalizedQuestion.includes('performance') || normalizedQuestion.includes('today')) {
      return `Your 24-hour performance is ${signedPnl} (${signedChange}), based on the dashboard snapshot.`
    }

    if (normalizedQuestion.includes('allocation') || normalizedQuestion.includes('holdings')) {
      const allocationSummary = rankedAssets
        .slice(0, 3)
        .map((asset) => `${asset.ticker} at ${asset.allocation}`)
        .join(', ')
      return `${allocationSummary} make up ${topThreeAllocation}% of your portfolio. The remaining ${100 - topThreeAllocation}% is held across other assets.`
    }

    if (normalizedQuestion.includes('portfolio') || normalizedQuestion.includes('analyze')) {
      return `Your portfolio is valued at ${formatCurrency(balance)}. ${leadingAsset?.ticker ?? 'Your largest holding'} leads at ${leadingAsset?.allocation ?? 'the top allocation'}, while your top three positions represent ${topThreeAllocation}% of the portfolio.`
    }

    return `I can review your ${formatCurrency(balance)} portfolio snapshot. Try a suggested question for a focused summary of performance or allocation.`
  }

  const submitPrompt = (question: string) => {
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion) return

    setResponse(getLocalResponse(trimmedQuestion))
    setPrompt('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitPrompt(prompt)
  }

  return (
    <motion.section
      className="nexa-ai"
      aria-labelledby="nexa-ai-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="nexa-ai-heading">
        <span className="nexa-ai-mark" aria-hidden="true">
          <Sparkles size={18} strokeWidth={1.9} />
        </span>
        <div className="nexa-ai-title-copy">
          <div className="nexa-ai-title-row">
            <h3 id="nexa-ai-title">Nexa AI</h3>
            <span className="nexa-ai-local-tag">Local preview</span>
          </div>
          <p>Portfolio intelligence</p>
        </div>
      </div>

      <div className="nexa-ai-insight">
        <span className="nexa-ai-insight-icon" aria-hidden="true">
          <TrendingUp size={17} />
        </span>
        <p>
          Your portfolio is up <strong>{formatCurrency(dailyPnl)}</strong> ({signedChange}) today.
          {leadingAsset && (
            <> {leadingAsset.ticker} is your largest position at {leadingAsset.allocation}.</>
          )}
        </p>
      </div>

      <div className="nexa-ai-prompts" aria-label="Suggested prompts">
        {suggestedPrompts.map((suggestedPrompt) => (
          <button
            className="nexa-ai-prompt"
            key={suggestedPrompt}
            type="button"
            onClick={() => submitPrompt(suggestedPrompt)}
          >
            {suggestedPrompt}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {response && (
          <motion.p
            className="nexa-ai-response"
            key={response}
            role="status"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {response}
          </motion.p>
        )}
      </AnimatePresence>

      <form className="nexa-ai-composer" onSubmit={handleSubmit}>
        <label className="nexa-ai-visually-hidden" htmlFor="nexa-ai-prompt">
          Ask Nexa AI about your portfolio
        </label>
        <input
          id="nexa-ai-prompt"
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask about your portfolio..."
          autoComplete="off"
        />
        <button
          className="nexa-ai-send"
          type="submit"
          aria-label="Send prompt"
          disabled={!prompt.trim()}
        >
          <ArrowUp size={17} strokeWidth={2.2} />
        </button>
      </form>
    </motion.section>
  )
}

export default NexaAI