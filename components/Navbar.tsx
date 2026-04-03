'use client'
import { useRouter, usePathname } from 'next/navigation'

interface NavbarProps {
  onScrollTo?: (id: string) => void
  onOpenApply: () => void // Добавляем обязательный проп
}

export default function Navbar({ onScrollTo, onOpenApply }: NavbarProps) {
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
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 60px', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', background: 'rgba(10,10,12,0.75)' }}>
      <button onClick={() => router.push('/')} style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        SMT
      </button>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <button onClick={() => handleNav('about')} style={navBtnStyle} className="nav-link">
          О сервере
        </button>
        <button onClick={() => router.push('/rules')} style={{ ...navBtnStyle, color: pathname === '/rules' ? '#fff' : 'rgba(255,255,255,0.4)' }} className="nav-link">
          Правила
        </button>
        <a href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ ...navBtnStyle, textDecoration: 'none' }} className="nav-link">
          Discord
        </a>
        
        {/* Обновленная кнопка */}
        <button 
          onClick={onOpenApply} 
          className="btn-glow"
          style={{ 
            fontSize: 13, 
            fontWeight: 600, 
            padding: '10px 24px', 
            border: '1px solid rgba(255,255,255,0.15)', 
            borderRadius: 10, 
            color: '#000', 
            background: '#fff', 
            cursor: 'pointer', 
            transition: 'all .2s' 
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
          Подать заявку
        </button>
      </div>
    </nav>
  )
}

const navBtnStyle = {
  fontSize: '13px',
  color: 'rgba(255,255,255,0.4)',
  letterSpacing: '0.04em',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  transition: 'color .2s'
}