import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Auth from './pages/Auth'
import HealthProfile from './pages/onboarding/HealthProfile'
import InsuranceSelection from './pages/onboarding/Insurance'
import LocationSelection from './pages/onboarding/Location'
import PaymentSelection from './pages/onboarding/Payment'
import { MainContent } from './pages/dashboard'
import LandingPage from './pages/LandingPage'
import Profile from './pages/dashboard/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Navbar /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/health-profile" element={<HealthProfile />} />
        <Route path="/insurance" element={<InsuranceSelection />} />
        <Route path="/location" element={<LocationSelection />} />
        <Route path="/payment" element={<PaymentSelection />} />
        <Route path="/dashboard" element={<MainContent />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        {/* 
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
