import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './components/pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Navbar /> */}
        <Route path="/" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
