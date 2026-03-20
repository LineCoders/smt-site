'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; a: number; phase: number
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, raf = 0, t = 0
    const nodes: Particle[] = []

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    function mkNode(): Particle {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .3,
        vy: (Math.random() - .5) * .3,
        r: Math.random() * 1.4 + .4,
        a: Math.random() * .4 + .1,
        phase: Math.random() * Math.PI * 2,
      }
    }

    function init() {
      resize()
      nodes.length = 0
      // Only place particles away from center hero zone
      let attempts = 0
      while (nodes.length < 70 && attempts < 3000) {
        const n = mkNode()
        const inCenter = (n.x > W * .2 && n.x < W * .8) && (n.y > H * .25 && n.y < H * .72)
        if (!inCenter) nodes.push(n)
        attempts++
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      t += .007

      // Move
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }

      // Connections
      const maxD = Math.min(W, H) * .15
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxD) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${((1 - d / maxD) * .08).toFixed(3)})`
            ctx.lineWidth = .6
            ctx.stroke()
          }
        }
      }

      // Dots
      for (const n of nodes) {
        const pulse = Math.sin(t + n.phase) * .28 + .72
        const a = n.a * pulse
        const gn = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7)
        gn.addColorStop(0, `rgba(255,255,255,${(a * .18).toFixed(3)})`)
        gn.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gn
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,${Math.min(a, .8).toFixed(3)})`
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(init)
    ro.observe(canvas)
    init()
    frame()

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}
