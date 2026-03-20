'use client'
import { useRouter, usePathname } from 'next/navigation'

interface NavbarProps {
  onScrollTo?: (id: string) => void
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()

  function handleNav(id: string) {
    if (pathname !== '/') {
      router.push(`/#${id}`)
    } else {
      onScrollTo?.(id)
    }
  }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 60px', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', background: 'rgba(10,10,12,0.75)' }}>
      <button onClick={() => router.push('/')} style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        SMT
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <button onClick={() => handleNav('about')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
          О сервере
        </button>
        <button onClick={() => router.push('/rules')} style={{ fontSize: 13, color: pathname === '/rules' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.color = pathname === '/rules' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)')}>
          Правила
        </button>
        <a href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em', textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
          Discord
        </a>
        <button onClick={() => handleNav('cta')} style={{ fontSize: 13, fontWeight: 500, padding: '8px 22px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff', letterSpacing: '0.04em', cursor: 'pointer', transition: 'all .2s', background: 'rgba(255,255,255,0.04)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}>
          Подключиться
        </button>
      </div>
    </nav>
  )
}