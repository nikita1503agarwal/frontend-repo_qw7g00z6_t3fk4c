import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Globe, Menu, X, User, LogIn, LogOut, ChevronDown, Sun, Moon, Crown } from 'lucide-react'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') || 'dark'
  })

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const navItem = ({ to, label }) => (
    <NavLink to={to} className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`} onClick={() => setOpen(false)}>
      {label}
    </NavLink>
  )

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
              <Globe size={18} className="text-white" />
            </div>
            <span>Rate the World</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItem({ to: '/', label: 'Home' })}
            {navItem({ to: '/explore', label: 'Explore Globe' })}
            {navItem({ to: '/countries', label: 'Countries' })}
            {navItem({ to: '/leaderboard', label: 'Leaderboard' })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white border border-white/10">
                  <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                  <span className="text-sm">{user.username}</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-white/10 hidden group-hover:block">
                  <Link to={`/user/${user.id}`} className="flex items-center gap-2 px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg">
                    <User size={16} /> My Profile
                  </Link>
                  <Link to="/my-reviews" className="flex items-center gap-2 px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg">
                    <Crown size={16} /> My Reviews
                  </Link>
                  <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-300 hover:bg-white/10 rounded-lg">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate('/auth')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow">
                <LogIn size={16} /> Login
              </button>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg bg-white/10 text-white" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-slate-900/80 backdrop-blur">
          <div className="flex gap-2 flex-wrap">
            <Link className="px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10" to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link className="px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10" to="/explore" onClick={() => setOpen(false)}>Explore Globe</Link>
            <Link className="px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10" to="/countries" onClick={() => setOpen(false)}>Countries</Link>
            <Link className="px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10" to="/leaderboard" onClick={() => setOpen(false)}>Leaderboard</Link>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <ThemeToggle />
            {user ? (
              <>
                <Link to={`/user/${user.id}`} className="px-3 py-2 rounded-lg text-sm text-white/90 hover:bg-white/10" onClick={() => setOpen(false)}>My Profile</Link>
                <button onClick={() => { onLogout(); setOpen(false) }} className="px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-white/10">Logout</button>
              </>
            ) : (
              <button onClick={() => { setOpen(false); navigate('/auth') }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow">Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
