import { Github, Twitter, Mail, Shield, FileText, Info } from 'lucide-react'

export default function Footer(){
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/80">
        <div>
          <h4 className="text-white font-semibold mb-3">About</h4>
          <p className="text-sm">A community to share real experiences and rate countries around the world.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Shield size={14}/> Privacy Policy</li>
            <li className="flex items-center gap-2"><FileText size={14}/> Terms</li>
            <li className="flex items-center gap-2"><Info size={14}/> Contact</li>
          </ul>
        </div>
        <div className="col-span-2">
          <h4 className="text-white font-semibold mb-3">Follow</h4>
          <div className="flex gap-3">
            <a href="#" className="p-2 rounded-lg bg-white/10 text-white"><Github size={18}/></a>
            <a href="#" className="p-2 rounded-lg bg-white/10 text-white"><Twitter size={18}/></a>
            <a href="#" className="p-2 rounded-lg bg-white/10 text-white"><Mail size={18}/></a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-white/50 py-4">© {new Date().getFullYear()} Rate the World</div>
    </footer>
  )
}
