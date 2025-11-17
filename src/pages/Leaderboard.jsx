export default function Leaderboard(){
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Leaderboards</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
          <h3 className="font-semibold mb-3">Highest Rated Countries</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>🇯🇵 Japan — 4.8</li>
            <li>🇮🇸 Iceland — 4.7</li>
            <li>🇳🇿 New Zealand — 4.7</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
          <h3 className="font-semibold mb-3">Most Active Users</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>@wanderlust — 120 reviews</li>
            <li>@globetrotter — 98 reviews</li>
            <li>@nomadlife — 77 reviews</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
