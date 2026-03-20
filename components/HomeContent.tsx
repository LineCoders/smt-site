'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Particles from '@/components/Particles'
import TwitchSection from '@/components/TwitchSection'

const stats = [
  { value: '24/7', label: 'Онлайн' },
  { value: '1.21', label: 'Версия' },
  { value: 'Semi-RP', label: 'Тип' },
]

const lore = [
  { tag: '01 — Лор', title: 'Живой мир со своей историей', desc: 'У сервера есть собственный лор — история мира, которую пишут сами игроки. Каждое построенное здание, каждый альянс и каждый конфликт становится частью летописи SMT.' },
  { tag: '02 — Экономика', title: 'Магазины, торговля, обмен', desc: 'Игроки строят магазины, торгуют ресурсами, договариваются об обменах. Живая экономика без искусственных ограничений — только то, что сами создаёте.' },
  { tag: '03 — Ивенты', title: 'Мероприятия и ивентовые баллы', desc: 'Игроки сами организуют ивенты, турниры и мероприятия. Для стримеров — система ивентовых баллов. Каждую неделю что-то происходит.' },
  { tag: '04 — Инструменты', title: 'Кастомные крафты и механики', desc: 'Debug палочка, невидимый свет, невидимые рамки для декора, динамическая карта мира в реальном времени. Строить удобно и красиво.' },
]

export default function HomeContent({ liveStreams }: { liveStreams: any[] }) {
  const [copied, setCopied] = useState(false)

  function copyIP() {
    navigator.clipboard.writeText('play.smt-mc.ru')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar onScrollTo={scrollTo} />

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Particles />
        <div style={{ position: 'absolute', top: '8%', left: '12%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '8%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 20px', display: 'inline-block' }}>
              Survival · Semi-RP · Community
            </span>
          </div>

          <div style={{ marginBottom: 28, lineHeight: 1 }}>
            <span style={{ fontSize: 'clamp(96px, 18vw, 180px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', fontFamily: 'system-ui, sans-serif', display: 'block', textShadow: '0 0 120px rgba(255,255,255,0.07)' }}>
              SMT
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18))' }} />
            <div style={{ width: 4, height: 4, background: 'rgba(255,255,255,0.4)', transform: 'rotate(45deg)' }} />
            <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.18), transparent)' }} />
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em', fontWeight: 300, textTransform: 'uppercase', marginBottom: 52, fontFamily: 'monospace' }}>
            Играй свою историю. Строй свой мир.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={copyIP} style={{ padding: '14px 36px', borderRadius: 10, fontSize: 14, fontWeight: 500, background: '#fff', color: '#0a0a0c', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', minWidth: 170, transition: 'opacity .2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {copied ? '✓ Скопировано' : 'Начать играть'}
            </button>
            <a href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ padding: '14px 36px', borderRadius: 10, fontSize: 14, background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', letterSpacing: '0.04em', textDecoration: 'none', display: 'inline-block', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
              Discord
            </a>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(transparent, #0a0a0c)', pointerEvents: 'none' }} />
      </section>

      {/* STATS */}
      <section style={{ padding: '0 60px 100px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{ padding: '48px 32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10 }}>{value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'monospace' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TWITCH SECTION */}
      <TwitchSection liveStreams={liveStreams} />

      {/* ABOUT */}
      <section id="about" style={{ padding: '0 60px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
          <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', fontFamily: 'monospace' }}>О сервере</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 0 }}>
              Не просто сервер —<br />живое сообщество<br />с характером
            </h2>
          </div>
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.85, fontWeight: 300, marginBottom: 20 }}>
              SMT — это приватный Minecraft сервер с собственным лором, активными игроками и кучей событий. Сюда не попасть просто так — только по проходкам.
            </p>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.85, fontWeight: 300 }}>
              Поэтому здесь нет случайных людей, зато есть атмосфера, которую сложно найти на публичных серверах.
            </p>
          </div>
        </div>

        {/* Lore 2x2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', marginBottom: 80 }}>
          {lore.map(({ tag, title, desc }, i) => (
            <div key={tag} style={{ padding: '52px 52px', background: 'rgba(255,255,255,0.02)', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', letterSpacing: '0.1em', display: 'block', marginBottom: 20 }}>{tag}</span>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 14, letterSpacing: '-0.01em' }}>{title}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', lineHeight: 1.8, fontWeight: 300 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '0 60px 140px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '80px 80px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 24 }}>Приватный доступ</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16 }}>Хочешь на сервер?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.36)', fontWeight: 300, lineHeight: 1.75, maxWidth: 480, margin: '0 auto 14px' }}>
            Вход только по приглашениям. Напиши нам в Discord — расскажем как получить проходку.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace', margin: '14px auto 48px' }}>play.smt-mc.ru</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={copyIP} style={{ padding: '14px 36px', borderRadius: 10, fontSize: 14, fontWeight: 500, background: '#fff', color: '#0a0a0c', border: 'none', cursor: 'pointer', minWidth: 170, transition: 'opacity .2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {copied ? '✓ Скопировано' : 'Скопировать IP'}
            </button>
            <a href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ padding: '14px 36px', borderRadius: 10, fontSize: 14, background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', display: 'inline-block', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
              Discord
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: '-0.01em' }}>SMT</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', fontFamily: 'monospace' }}>2025</span>
      </footer>
    </>
  )
}