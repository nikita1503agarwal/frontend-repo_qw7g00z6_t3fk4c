import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'

function slugify(name){
  if(!name) return ''
  return String(name)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function colorFor(avg){
  // 0 (gray) -> 2.5 (teal) -> 5 (emerald)
  if(avg == null) return 'rgba(100,116,139,0.45)'
  const t = Math.max(0, Math.min(1, avg / 5))
  // interpolate between rgb(71,85,105) slate-600 and rgb(16,185,129) emerald-500 via teal midpoint
  const c0 = [71,85,105]
  const c1 = [13,148,136] // teal-500
  const c2 = [16,185,129] // emerald-500
  const mid = 0.5
  let r,g,b
  if(t < mid){
    const tt = t / mid
    r = Math.round(c0[0] + (c1[0]-c0[0])*tt)
    g = Math.round(c0[1] + (c1[1]-c0[1])*tt)
    b = Math.round(c0[2] + (c1[2]-c0[2])*tt)
  } else {
    const tt = (t - mid) / (1 - mid)
    r = Math.round(c1[0] + (c2[0]-c1[0])*tt)
    g = Math.round(c1[1] + (c2[1]-c1[1])*tt)
    b = Math.round(c1[2] + (c2[2]-c1[2])*tt)
  }
  return `rgba(${r},${g},${b},0.75)`
}

export default function GlobeSite(){
  const globeEl = useRef(null)
  const [polygons, setPolygons] = useState([])
  const [hoverD, setHoverD] = useState(null)
  const [ratingsMap, setRatingsMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    let cancelled = false
    async function load(){
      try {
        setLoading(true)
        setError(null)
        const [geoRes, ratingRes] = await Promise.all([
          fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson', { cache: 'force-cache' }),
          fetch(`${backend}/api/ratings/summary`).catch(()=>null)
        ])
        const geo = await geoRes.json()
        if(cancelled) return
        setPolygons(geo.features)
        if(ratingRes && ratingRes.ok){
          const data = await ratingRes.json()
          const map = {}
          data.forEach(d => { map[d.country_slug] = d })
          setRatingsMap(map)
        } else {
          setRatingsMap({})
        }
      } catch(e){
        if(!cancelled){
          setError('Failed to load globe data')
        }
      } finally {
        if(!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [backend])

  useEffect(() => {
    if(!globeEl.current) return
    const globe = globeEl.current
    globe.pointOfView({ altitude: 2.2 }, 500)
    globe.atmosphereColor('#60a5fa')
    globe.atmosphereAltitude(0.18)
  }, [polygons])

  const getName = f => f?.properties?.name || 'Unknown'
  const getSlug = f => slugify(getName(f))

  const polygonCapColor = useMemo(() => (d) => {
    const slug = getSlug(d)
    const stat = ratingsMap[slug]
    const base = colorFor(stat?.avg)
    return hoverD === d ? 'rgba(99,102,241,0.7)' : base
  }, [ratingsMap, hoverD])

  const polygonAltitude = (d) => (hoverD === d ? 0.02 : 0.006)

  const labelText = d => {
    const slug = getSlug(d)
    const stat = ratingsMap[slug]
    const nm = getName(d)
    if(stat && stat.count > 0){
      return `${nm} — ${stat.avg.toFixed(2)}★ (${stat.count})`
    }
    return nm
  }

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
          polygonCapColor={polygonCapColor}
          polygonSideColor={() => 'rgba(30,58,138,0.25)'}
          polygonStrokeColor={() => 'rgba(148,163,184,0.6)'}
          polygonAltitude={polygonAltitude}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={200}
          onPolygonClick={d => {
            const slug = getSlug(d)
            window.location.href = `/country/${encodeURIComponent(slug)}`
          }}
          labelsData={hoverD ? [hoverD] : []}
          labelText={labelText}
          labelSize={1.2}
          labelDotRadius={0.2}
          labelColor={() => 'rgba(255,255,255,0.95)'}
          labelAltitude={0.02}
        />
      </div>

      <div className="pointer-events-none fixed top-0 left-0 right-0 p-6 flex items-center justify-between">
        <div className="backdrop-blur bg-slate-900/40 border border-white/10 rounded-2xl px-4 py-2 text-sm">
          Drag to rotate • Scroll to zoom • Hover for info • Click a country to open details
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="pointer-events-auto backdrop-blur bg-slate-900/40 border border-white/10 rounded-2xl px-4 py-2 text-sm">
            {loading ? 'Loading ratings…' : error ? 'Ratings unavailable' : 'Live ratings applied'}
          </div>
          <div className="pointer-events-auto backdrop-blur bg-slate-900/40 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <span>0</span>
              <span className="h-2 w-24 rounded bg-gradient-to-r from-slate-500 via-teal-500 to-emerald-500 block" />
              <span>5</span>
            </div>
          </div>
        </div>
      </div>

      <a href="/" className="pointer-events-auto fixed bottom-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/70 border border-white/10 hover:bg-slate-800/80 transition">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="M10 20v-6a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v6"/><path d="M2 10.5 12 2l10 8.5"/><path d="M20 10.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9.5"/></svg>
        Home
      </a>

      {loading && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 mx-auto w-fit px-3 py-1.5 rounded-full bg-slate-900/70 border border-white/10 text-xs">
          Loading globe…
        </div>
      )}
    </div>
  )
}
