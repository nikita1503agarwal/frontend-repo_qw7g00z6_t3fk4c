import CountryCard from '../components/CountryCard'

const COUNTRIES = [
  { code:'JPN', name:'Japan', flag:'https://flagcdn.com/w40/jp.png', rating:4.8 },
  { code:'ISL', name:'Iceland', flag:'https://flagcdn.com/w40/is.png', rating:4.7 },
  { code:'NZL', name:'New Zealand', flag:'https://flagcdn.com/w40/nz.png', rating:4.7 },
  { code:'CAN', name:'Canada', flag:'https://flagcdn.com/w40/ca.png', rating:4.6 },
  { code:'CHE', name:'Switzerland', flag:'https://flagcdn.com/w40/ch.png', rating:4.6 },
  { code:'PRT', name:'Portugal', flag:'https://flagcdn.com/w40/pt.png', rating:4.5 },
  { code:'SGP', name:'Singapore', flag:'https://flagcdn.com/w40/sg.png', rating:4.5 },
  { code:'AUS', name:'Australia', flag:'https://flagcdn.com/w40/au.png', rating:4.5 },
]

export default function Countries(){
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Countries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {COUNTRIES.map(c => (
          <CountryCard key={c.code} {...c} onClick={() => location.assign(`/country/${c.code}`)} />
        ))}
      </div>
    </div>
  )
}
