import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function TrendingReviews(){
  const items = useMemo(() => [
    { id:1, user:'@wanderlust', avatar:'https://i.pravatar.cc/80?img=5', badges:['Top Contributor','Explorer'], country:'Japan', flag:'https://flagcdn.com/w40/jp.png', excerpt:'Public transport is unbelievably efficient and the food scene blew my mind! Sushi for breakfast is a must.' },
    { id:2, user:'@globetrotter', avatar:'https://i.pravatar.cc/80?img=12', badges:['Helpful Member'], country:'Portugal', flag:'https://flagcdn.com/w40/pt.png', excerpt:'Warm people, sunny coasts, and pastel de nata that I will dream about forever.' },
    { id:3, user:'@mountainmike', avatar:'https://i.pravatar.cc/80?img=28', badges:['Explorer'], country:'Iceland', flag:'https://flagcdn.com/w40/is.png', excerpt:'Hiking glaciers felt like stepping on another planet. Bring layers and a camera!' },
  ], [])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Trending Reviews</h2>
        <div className="overflow-hidden">
          <motion.div className="flex gap-4" initial={{ x: 0 }} animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}>
            {[...items, ...items].map((item, idx) => (
              <div key={idx} className="min-w-[320px] rounded-2xl bg-white/10 border border-white/10 backdrop-blur p-4">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-white font-medium">{item.user}</p>
                    <div className="flex gap-1 text-xs">
                      {item.badges.map((b,i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{b}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-white/70 text-sm">
                    <img src={item.flag} className="w-5 h-4 rounded" /> {item.country}
                  </div>
                </div>
                <p className="mt-3 text-white/80 text-sm">{item.excerpt}</p>
                <a href="#" className="mt-3 inline-block text-cyan-300 hover:text-cyan-200 text-sm">Read more</a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
