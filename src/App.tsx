import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Intro from './components/Intro/Intro'
import Auth from './pages/Auth/Auth.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import AIInsights from './pages/AIInsights/AIInsights.jsx'
import HelpSupport from './pages/HelpSupport/HelpSupport.jsx'
import Convert from './pages/Convert/Convert.jsx'
import Markets from './pages/Markets/Markets.jsx'
import Settings from './pages/Settings/Settings.jsx'
import Trade from './pages/Trade/Trade.jsx'
import Transactions from './pages/Transactions/Transactions.jsx'
import Wallet from './pages/Wallet/Wallet.jsx'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout.tsx'
import { AppSettingsProvider } from './context/AppSettingsContext'

function ScrollToTop() {
	const { pathname } = useLocation()

	useLayoutEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

function App() {
	return (
		<AppSettingsProvider>
			<>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Navigate to="/auth" replace />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/intro" element={<Intro />} />
					<Route element={<DashboardLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/ai-insights" element={<AIInsights />} />
						<Route path="/help-support" element={<HelpSupport />} />
						<Route path="/convert" element={<Convert />} />
						<Route path="/markets" element={<Markets />} />
						<Route path="/markets/:symbol" element={<Markets />} />
						<Route path="/trade" element={<Trade />} />
						<Route path="/wallet" element={<Wallet />} />
						<Route path="/transactions" element={<Transactions />} />
						<Route path="/settings" element={<Settings />} />
					</Route>
					<Route path="*" element={<Navigate to="/auth" replace />} />
				</Routes>
			</>
		</AppSettingsProvider>
	)
}

export default App
