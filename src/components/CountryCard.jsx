import { Star } from 'lucide-react'

export default function CountryCard({ flag, name, rating, onClick }){
  return (
    <button onClick={onClick} className="w-full text-left rounded-2xl bg-white/10 border border-white/10 backdrop-blur p-4 hover:translate-y-[-2px] transition shadow">
      <div className="flex items-center gap-3">
        <img src={flag} alt="flag" className="w-8 h-6 rounded object-cover" />
        <div>
          <p className="text-white font-semibold">{name}</p>
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.round(rating) ? 'fill-yellow-400' : ''} />
            ))}
            <span className="text-xs text-white/70 ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
