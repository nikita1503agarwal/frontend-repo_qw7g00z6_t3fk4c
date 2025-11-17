import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Layout from './components/Layout'
import App from './App'
import Explore from './pages/Explore'
import Countries from './pages/Countries'
import Leaderboard from './pages/Leaderboard'
import Country from './pages/Country'
import User from './pages/User'
import Auth from './pages/Auth'
import AdminModeration from './pages/AdminModeration'
import Test from './Test'

function NotFound(){
  return (
    <div className="min-h-[60vh] grid place-items-center text-center text-white/80">
      <div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <a href="/" className="text-cyan-300">Go home</a>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/country/:id" element={<Country />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin/moderation" element={<AdminModeration />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
