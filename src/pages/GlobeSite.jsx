import { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'

export default function GlobeSite(){
  const globeEl = useRef(null)
  const [polygons, setPolygons] = useState([])
  const [hoverD, setHoverD] = useState(null)

  useEffect(() => {
    // Load world countries GeoJSON (lightweight public source)
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(geo => {
        // features array
        setPolygons(geo.features)
      })
      .catch(() => setPolygons([]))
  }, [])

  useEffect(() => {
    if(!globeEl.current) return
    // Basic camera setup
    const globe = globeEl.current
    globe.pointOfView({ altitude: 2.2 }, 500)
    // Atmosphere
    globe.atmosphereColor('#60a5fa')
    globe.atmosphereAltitude(0.18)
  }, [polygons])

  const getName = f => f?.properties?.name || 'Unknown'

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <div className="fixed inset-0">
        <Globe
          ref={globeEl}
          backgroundColor="rgba(2,6,23,1)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          polygonsData={polygons}
          polygonCapColor={d => (hoverD === d ? 'rgba(99,102,241,0.7)' : 'rgba(30,58,138,0.6)')}
          polygonSideColor={() => 'rgba(30,58,138,0.25)'}
          polygonStrokeColor={() => 'rgba(148,163,184,0.6)'}
          polygonAltitude={d => (hoverD === d ? 0.02 : 0.005)}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={200}
          onPolygonClick={d => {
            const name = getName(d)
            // Route to country page within main app
            const slug = encodeURIComponent(name.toLowerCase().replace(/\s+/g,'-'))
            window.location.href = `/country/${slug}`
          }}
          labelsData={hoverD ? [hoverD] : []}
          labelText={d => getName(d)}
          labelSize={1.2}
          labelDotRadius={0.2}
          labelColor={() => 'rgba(255,255,255,0.95)'}
          labelAltitude={0.02}
        />
      </div>

      <div className="pointer-events-none fixed top-0 left-0 right-0 p-6 flex items-center justify-between">
        <div className="backdrop-blur bg-slate-900/40 border border-white/10 rounded-2xl px-4 py-2 text-sm">
          Drag to rotate • Scroll to zoom • Hover for name • Click a country to open details
        </div>
        <div className="backdrop-blur bg-slate-900/40 border border-white/10 rounded-2xl px-4 py-2 text-sm hidden sm:block">
          Separate Globe Site
        </div>
      </div>

      <a href="/" className="pointer-events-auto fixed bottom-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/70 border border-white/10 hover:bg-slate-800/80 transition">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="M10 20v-6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v6"/><path d="M2 10.5 12 2l10 8.5"/><path d="M20 10.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9.5"/></svg>
        Home
      </a>
    </div>
  )
}
