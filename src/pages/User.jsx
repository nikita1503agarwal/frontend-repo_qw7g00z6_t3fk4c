import { useParams } from 'react-router-dom'

export default function User(){
  const { id } = useParams()
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="rounded-3xl overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" className="w-full h-40 object-cover" />
        <div className="absolute -bottom-10 left-6">
          <img src={`https://i.pravatar.cc/120?u=${id}`} className="w-24 h-24 rounded-full border-4 border-slate-950" />
        </div>
      </div>
      <div className="mt-12">
        <h1 className="text-3xl font-bold">@wanderlust</h1>
        <p className="text-white/70">Explorer of cultures and cuisines. Camera always ready.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
            <h3 className="font-semibold mb-2">Badges</h3>
            <div className="flex gap-2 text-xs">
              {['First Review','Top Contributor','Explorer','Helpful Member'].map((b,i)=> (
                <span key={i} className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" title={b}>{b}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
            <h3 className="font-semibold mb-2">Stats</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li>Total reviews: 34</li>
              <li>Average rating given: 4.2</li>
              <li>Countries reviewed: 12</li>
              <li>Most reviewed region: Asia</li>
              <li>Total upvotes received: 542</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
            <h3 className="font-semibold mb-2">Recent Reviews</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li>Japan — "Sushi for breakfast is a must"</li>
              <li>Portugal — "Pastéis and sunsets"</li>
              <li>Iceland — "Glaciers and geysers"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
