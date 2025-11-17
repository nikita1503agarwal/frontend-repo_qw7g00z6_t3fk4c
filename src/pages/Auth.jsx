import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, Mail, Github, ShieldCheck, Fingerprint } from 'lucide-react'

export default function Auth(){
  const { setUser } = useOutletContext()

  const fakeLogin = (provider) => {
    setUser({ id:'u1', username:'@wanderlust', avatar:'https://i.pravatar.cc/80?img=5', role: provider === 'admin' ? 'admin' : 'user' })
    history.back()
  }

  return (
    <div className="relative min-h-[70vh] grid place-items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-cyan-400/20 blur-3xl" />
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="w-full max-w-md rounded-3xl bg-white/10 border border-white/10 backdrop-blur p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Fingerprint className="text-cyan-300" />
          <h1 className="text-2xl font-bold">Sign in to Rate the World</h1>
        </div>
        <p className="text-white/70 text-sm">Choose a method to continue</p>
        <div className="mt-6 space-y-3">
          <button onClick={() => fakeLogin('google')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-slate-900 font-semibold">Continue with Google</button>
          <button onClick={() => fakeLogin('apple')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20"> <Apple/> Continue with Apple</button>
          <button onClick={() => fakeLogin('email')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20"> <Mail/> Continue with Email</button>
          <button onClick={() => fakeLogin('github')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20"> <Github/> Continue with GitHub</button>
          <button onClick={() => fakeLogin('admin')} className="w-full text-xs text-white/60 underline">Sign in as admin (demo)</button>
        </div>
        <div className="mt-6 flex items-start gap-2 text-xs text-white/60">
          <ShieldCheck size={14} className="text-emerald-300" />
          <p>We never post without permission. This demo uses a temporary session.</p>
        </div>
      </motion.div>
    </div>
  )
}
