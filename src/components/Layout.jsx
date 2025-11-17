import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout(){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('rtw_user')
    return raw ? JSON.parse(raw) : null
  })
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('rtw_user', JSON.stringify(user))
  }, [user])

  // Simple theme bootstrap
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar user={user} onLogout={() => setUser(null)} />
      <div className="pt-16">
        <Outlet context={{ user, setUser }} />
      </div>
      <Footer />
    </div>
  )
}
