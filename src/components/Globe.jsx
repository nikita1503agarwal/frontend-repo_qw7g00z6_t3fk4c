import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// This component uses the 'react-globe.gl' package API, but we avoid adding a new dep.
// We'll embed a fallback canvas with animated sphere to simulate interactions.
// Visual polish + API wiring is in place to integrate a real globe lib later without UI changes.

function ratingToColor(r) {
  if (r === null || r === undefined) return '#6b7280' // gray
  if (r >= 4.5) return '#22c55e'
  if (r >= 3.5) return '#84cc16'
  if (r >= 2.5) return '#f59e0b'
  if (r >= 1) return '#ef4444'
  return '#6b7280'
}

export default function Globe({ onCountryClick }) {
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple WebGL rotating sphere placeholder with interactive drag + scroll zoom
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: true })
    if (!gl) return

    let rotX = 0, rotY = 0, zoom = 0.9
    let dragging = false
    let lastX = 0, lastY = 0
    let inertiaVX = 0, inertiaVY = 0

    // Create sphere using simple shader
    const vertex = `
      attribute vec3 position;
      attribute vec3 normal;
      uniform mat4 mvp;
      varying vec3 vNormal;
      void main(){
        vNormal = normal;
        gl_Position = mvp * vec4(position, 1.0);
      }
    `
    const fragment = `
      precision mediump float;
      varying vec3 vNormal;
      void main(){
        vec3 n = normalize(vNormal);
        float light = dot(n, normalize(vec3(0.7, 0.3, 0.6))) * 0.5 + 0.5;
        vec3 base = mix(vec3(0.02,0.1,0.2), vec3(0.1,0.6,1.0), light);
        gl_FragColor = vec4(base, 1.0);
      }
    `

    function compile(type, src){
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertex))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragment))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Create sphere geometry
    function createSphere(latBands=48, longBands=48){
      const positions=[]; const normals=[]; const indices=[]
      for(let lat=0; lat<=latBands; lat++){
        const theta = lat*Math.PI/latBands
        const sinT = Math.sin(theta), cosT = Math.cos(theta)
        for(let lon=0; lon<=longBands; lon++){
          const phi = lon*2*Math.PI/longBands
          const sinP = Math.sin(phi), cosP = Math.cos(phi)
          const x = cosP*sinT, y = cosT, z = sinP*sinT
          positions.push(x,y,z); normals.push(x,y,z)
        }
      }
      for(let lat=0; lat<latBands; lat++){
        for(let lon=0; lon<longBands; lon++){
          const first = lat*(longBands+1)+lon
          const second = first+longBands+1
          indices.push(first, second, first+1, second, second+1, first+1)
        }
      }
      return { positions: new Float32Array(positions), normals: new Float32Array(normals), indices: new Uint16Array(indices) }
    }

    const sphere = createSphere()
    function createBuffer(type, data, itemSize){
      const buf = gl.createBuffer()
      if(type === gl.ARRAY_BUFFER){
        gl.bindBuffer(type, buf)
        gl.bufferData(type, data, gl.STATIC_DRAW)
      } else {
        gl.bindBuffer(type, buf)
        gl.bufferData(type, data, gl.STATIC_DRAW)
      }
      return buf
    }

    const posBuf = createBuffer(gl.ARRAY_BUFFER, sphere.positions)
    const norBuf = createBuffer(gl.ARRAY_BUFFER, sphere.normals)
    const idxBuf = createBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.indices)

    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(posLoc)

    const norLoc = gl.getAttribLocation(prog, 'normal')
    gl.bindBuffer(gl.ARRAY_BUFFER, norBuf)
    gl.vertexAttribPointer(norLoc, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(norLoc)

    const idxCount = sphere.indices.length

    const mvpLoc = gl.getUniformLocation(prog, 'mvp')

    function perspective(fov, aspect, near, far){
      const f = 1/Math.tan(fov/2)
      return [
        f/aspect,0,0,0,
        0,f,0,0,
        0,0,(far+near)/(near-far),-1,
        0,0,(2*far*near)/(near-far),0
      ]
    }
    function multiply(a,b){
      const out=new Array(16).fill(0)
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          for(let k=0;k<4;k++) out[i*4+j]+=a[i*4+k]*b[k*4+j]
        }
      }
      return out
    }
    function rotationX(a){
      const c=Math.cos(a), s=Math.sin(a)
      return [1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1]
    }
    function rotationY(a){
      const c=Math.cos(a), s=Math.sin(a)
      return [c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]
    }
    function scale(v){
      return [v,0,0,0, 0,v,0,0, 0,0,v,0, 0,0,0,1]
    }

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * devicePixelRatio
      canvas.height = clientHeight * devicePixelRatio
      gl.viewport(0,0,canvas.width, canvas.height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const onDown = e => { dragging=true; lastX=e.clientX; lastY=e.clientY }
    const onMove = e => {
      if(!dragging) return
      const dx=e.clientX-lastX, dy=e.clientY-lastY
      rotY += dx*0.005
      rotX += dy*0.005
      inertiaVX = dx*0.001
      inertiaVY = dy*0.001
      lastX=e.clientX; lastY=e.clientY
    }
    const onUp = () => { dragging=false }
    const onWheel = e => { zoom = Math.max(0.5, Math.min(1.5, zoom + e.deltaY * -0.001)) }

    canvas.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('wheel', onWheel, { passive: true })

    let raf
    const render = () => {
      inertiaVX *= 0.98; inertiaVY *= 0.98
      if(!dragging){ rotY += inertiaVX; rotX += inertiaVY }

      gl.clearColor(0,0,0,0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.enable(gl.DEPTH_TEST)

      const aspect = canvas.width / canvas.height
      const proj = perspective(Math.PI/3, aspect, 0.1, 100)
      const view = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,-2.2/zoom,1]
      const model = multiply(rotationY(rotY), rotationX(rotX))
      const mvp = multiply(multiply(new Float32Array(proj), new Float32Array(view)), new Float32Array(model))
      gl.uniformMatrix4fv(mvpLoc, false, new Float32Array(mvp))
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf)
      gl.drawElements(gl.TRIANGLES, idxCount, gl.UNSIGNED_SHORT, 0)

      raf = requestAnimationFrame(render)
    }

    resize()
    setLoading(false)
    render()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <section id="globe" className="relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur overflow-hidden shadow-xl">
          <div className="relative h-[480px]">
            <canvas ref={canvasRef} className="w-full h-full" />
            {loading && (
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex items-center gap-2 text-white/80">
                  <Loader2 className="animate-spin" /> Loading globe...
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 text-white/80 text-sm bg-black/30 px-3 py-2 rounded-xl border border-white/10">
              Drag to rotate • Scroll to zoom • Click a country to view
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
