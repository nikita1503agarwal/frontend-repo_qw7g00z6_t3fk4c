import { useMemo } from 'react'
import { Star } from 'lucide-react'

function Stars({ value }){
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={16} className={i <= Math.round(value) ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'} />
      ))}
      <span className="ml-1 text-xs text-white/60">{value.toFixed(1)}</span>
    </div>
  )
}

export default function TopRated(){
  const data = useMemo(() => [
    { code:'JPN', name:'Japan', flag:'https://flagcdn.com/w40/jp.png', rating:4.8, tagline:'Immaculate culture and food' },
    { code:'ISL', name:'Iceland', flag:'https://flagcdn.com/w40/is.png', rating:4.7, tagline:'Otherworldly landscapes' },
    { code:'NZL', name:'New Zealand', flag:'https://flagcdn.com/w40/nz.png', rating:4.7, tagline:'Adventure paradise' },
    { code:'CAN', name:'Canada', flag:'https://flagcdn.com/w40/ca.png', rating:4.6, tagline:'Friendly cities and nature' },
    { code:'CHE', name:'Switzerland', flag:'https://flagcdn.com/w40/ch.png', rating:4.6, tagline:'Alpine perfection' },
    { code:'SGP', name:'Singapore', flag:'https://flagcdn.com/w40/sg.png', rating:4.5, tagline:'Clean, green, efficient' },
    { code:'PRT', name:'Portugal', flag:'https://flagcdn.com/w40/pt.png', rating:4.5, tagline:'Sun, surf, and pastéis' },
    { code:'AUS', name:'Australia', flag:'https://flagcdn.com/w40/au.png', rating:4.5, tagline:'Beaches and wildlife' },
    { code:'ESP', name:'Spain', flag:'https://flagcdn.com/w40/es.png', rating:4.4, tagline:'Vibrant and tasty' },
    { code:'ITA', name:'Italy', flag:'https://flagcdn.com/w40/it.png', rating:4.4, tagline:'Art, history, cuisine' },
  ], [])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Top Rated Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.map(item => (
            <div key={item.code} className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur p-4 hover:translate-y-[-2px] transition shadow">
              <div className="flex items-center gap-3">
                <img src={item.flag} alt="flag" className="w-8 h-6 rounded object-cover" />
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <Stars value={item.rating} />
                </div>
              </div>
              <p className="mt-3 text-sm text-white/70">{item.tagline}</p>
              <a href={`/country/${item.code}`} className="mt-4 inline-block text-emerald-300 hover:text-emerald-200 text-sm">View Country →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
