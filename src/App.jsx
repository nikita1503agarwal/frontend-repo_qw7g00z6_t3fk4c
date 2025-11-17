import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Globe from './components/Globe'
import TopRated from './components/TopRated'
import TrendingReviews from './components/TrendingReviews'
import Footer from './components/Footer'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const globeRef = useRef(null)

  const handleExplore = () => {
    document.getElementById('globe')?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleRate = () => {
    navigate('/countries')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar user={user} onLogout={() => setUser(null)} />
      <main>
        <Hero onExplore={handleExplore} onRate={handleRate} />
        <Globe ref={globeRef} onCountryClick={(code) => navigate(`/country/${code}`)} />
        <TopRated />
        <TrendingReviews />
      </main>
      <Footer />
    </div>
  )
}

export default App
