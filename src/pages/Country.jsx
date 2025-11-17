import { useParams, useOutletContext } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Star, Share2, Plus, ShieldAlert, ThumbsUp, Flag, Camera } from 'lucide-react'

function Badge({ label }){
  return <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" title={label}>{label}</span>
}

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

const DEMO = {
  banner: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1600&auto=format&fit=crop',
  flag: 'https://flagcdn.com/w80/jp.png',
  name: 'Japan',
  code: 'JPN',
  ratings: {
    safety: 4.6, cost: 3.4, culture: 4.9, food: 4.8, friendliness: 4.5, nature: 4.7
  },
  reviews: [
    { id:1, user:'@wanderlust', avatar:'https://i.pravatar.cc/80?img=5', badges:['Top Contributor','Explorer'], text:'Public transport is unbelievably efficient and the food scene blew my mind! Sushi for breakfast is a must.', rating:5, time:'2d', upvotes:124 },
    { id:2, user:'@globetrotter', avatar:'https://i.pravatar.cc/80?img=12', badges:['Helpful Member'], text:'Temples, tech, and tranquility. Crowds can be intense but worth it.', rating:4, time:'5d', upvotes:78 },
  ]
}

export default function Country(){
  const { id } = useParams()
  const { user } = useOutletContext()
  const [filter, setFilter] = useState('recent')
  const [showReport, setShowReport] = useState(null)
  const [showReview, setShowReview] = useState(false)

  const country = useMemo(() => DEMO, [id])

  useEffect(() => {
    const title = `Rate the World — Reviews of ${country.name}`
    document.title = title
    const ensureMeta = (name, attr, content) => {
      let el = document.querySelector(`${name}[${attr}]`)
      if(!el){ el = document.createElement('meta'); el.setAttribute(attr.split('=')[0], attr.split('=')[1].replace(/"/g,'')); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    ensureMeta('meta[property="og:title"]', 'property="og:title"', title)
    ensureMeta('meta[name="twitter:title"]', 'name="twitter:title"', title)
    ensureMeta('meta[name="description"]', 'name="description"', `Read authentic reviews and ratings for ${country.name}.`)
    ensureMeta('meta[property="og:description"]', 'property="og:description"', `Read authentic reviews and ratings for ${country.name}.`)
    ensureMeta('meta[property="og:image"]', 'property="og:image"', country.banner)
    ensureMeta('meta[name="twitter:card"]', 'name="twitter:card"', 'summary_large_image')
    // Basic schema markup
    const scriptId = 'ld-json-country'
    let script = document.getElementById(scriptId)
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Country',
      name: country.name,
      image: country.banner,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.7,
        reviewCount: 28947
      }
    }
    if(!script){
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = scriptId
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
  }, [country])

  return (
    <div>
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={country.banner} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 flex items-center gap-4">
          <img src={country.flag} className="w-14 h-10 rounded shadow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">{country.name}</h1>
            <div className="mt-1"><Stars value={4.7} /></div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white flex items-center gap-2"><Share2 size={16}/> Share</button>
            <button onClick={() => setShowReview(true)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-white font-semibold flex items-center gap-2"><Plus size={16}/> Write a Review</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <select value={filter} onChange={e=>setFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/20">
              <option value="recent">Most recent</option>
              <option value="helpful">Most helpful</option>
              <option value="high">Highest rated</option>
              <option value="low">Lowest rated</option>
              <option value="photos">With photos only</option>
            </select>
          </div>

          {country.reviews.map(r => (
            <div key={r.id} className="rounded-2xl bg-white/10 border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <img src={r.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-semibold">{r.user}</p>
                  <div className="flex gap-1">
                    {r.badges.map((b,i) => <Badge key={i} label={b} />)}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-3 text-sm text-white/70">
                  <Stars value={r.rating} /> <span>• {r.time}</span>
                </div>
              </div>
              <p className="mt-3 text-white/80">{r.text}</p>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white flex items-center gap-2"><ThumbsUp size={16}/> Upvote {r.upvotes}</button>
                <button onClick={()=>setShowReport(r.id)} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-red-300 flex items-center gap-2"><ShieldAlert size={16}/> Report</button>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
            <h3 className="font-semibold mb-3">Overview</h3>
            {Object.entries(country.ratings).map(([k,v]) => (
              <div key={k} className="flex items-center justify-between py-2">
                <span className="capitalize text-white/80">{k}</span>
                <Stars value={v} />
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Flag size={16}/> Details</h3>
            <p className="text-white/70 text-sm">Practical info, tips, and quick facts about {country.name}.
            </p>
          </div>
        </div>
      </div>

      {showReport && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={()=>setShowReport(null)}>
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-4" onClick={e=>e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-2">Why are you reporting this review?</h3>
            <div className="space-y-2">
              {['Hate speech','Spam','Fake review','Incorrect information'].map((r,i)=> (
                <label key={i} className="flex items-center gap-2">
                  <input type="radio" name="reason" /> <span>{r}</span>
                </label>
              ))}
              <textarea placeholder="Other" className="w-full mt-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setShowReport(null)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/20">Cancel</button>
              <button onClick={()=>setShowReport(null)} className="px-3 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-orange-400 text-white">Submit</button>
            </div>
          </div>
        </div>
      )}

      {showReview && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={()=>setShowReview(false)}>
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 p-4" onClick={e=>e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-2">Write a Review</h3>
            {user ? (
              <div className="space-y-3">
                <div className="flex gap-1">{[1,2,3,4,5].map(i=> <Star key={i} className="text-yellow-400" />)}</div>
                <textarea placeholder="Share your experience..." className="w-full mt-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20" />
                <label className="flex items-center gap-2 text-white/80 text-sm">
                  <Camera size={16}/> <span>Upload photos (optional)</span>
                </label>
                <div className="flex justify-end gap-2">
                  <button onClick={()=>setShowReview(false)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/20">Cancel</button>
                  <button onClick={()=>setShowReview(false)} className="px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-400 text-white">Publish Review</button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-white/80">You must sign in to leave a review.</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <a href="/auth" className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">Login with Google</a>
                  <a href="/auth" className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">Login with Apple</a>
                  <a href="/auth" className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">Login with Email</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
