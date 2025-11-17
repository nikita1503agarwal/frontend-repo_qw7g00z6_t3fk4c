import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onExplore, onRate }) {
  return (
    <section className="relative pt-28 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80 pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-xl">
          Rate the World
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 text-xl md:text-2xl text-white/80">
          Real Opinions. Real People. Real Places.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-10 flex items-center justify-center gap-4">
          <button onClick={onExplore} className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-white font-semibold shadow-lg hover:shadow-emerald-500/30 transition">
            Explore the Globe
          </button>
          <button onClick={onRate} className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold backdrop-blur hover:bg-white/20 transition">
            Rate a Country
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-4 text-left">
            <p className="text-sm text-white/60">Total Reviews</p>
            <p className="text-2xl font-bold text-white">128,947</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-4 text-left">
            <p className="text-sm text-white/60">Countries Rated</p>
            <p className="text-2xl font-bold text-white">194</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-4 text-left">
            <p className="text-sm text-white/60">Trending Today</p>
            <p className="text-2xl font-bold text-white">Japan 🇯🇵</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
