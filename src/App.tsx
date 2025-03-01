import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Auth from './pages/Auth'
import HealthProfile from './pages/HealthProfile'
import InsuranceSelection from './pages/Insurance'
import LocationSelection from './pages/Location'
import PaymentSelection from './pages/Payment'
import { MainContent } from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Navbar /> */}
        <Route path="/" element={<Auth />} />
        <Route path="/health-profile" element={<HealthProfile />} />
        <Route path="/insurance" element={<InsuranceSelection />} />
        <Route path="/location" element={<LocationSelection />} />
        <Route path="/payment" element={<PaymentSelection />} />
        <Route path="/dashboard" element={<MainContent />} />
        {/* 
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
