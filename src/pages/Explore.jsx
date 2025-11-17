import Globe from '../components/Globe'

export default function Explore(){
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Explore the Globe</h1>
        <p className="text-white/70">Interact with the world and discover ratings by country.</p>
      </div>
      <Globe />
    </div>
  )
}
