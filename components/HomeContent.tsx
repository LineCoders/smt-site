'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Particles from '@/components/Particles'
import TwitchSection from '@/components/TwitchSection'

const stats = [
  { value: '24/7', label: 'Онлайн' },
  { value: '1.21.11', label: 'Версия' },
  { value: 'Semi-RP', label: 'Тип' },
]

const lore = [
  { tag: '01 — Лор', title: 'Живой мир со своей историей', desc: 'У сервера есть собственный лор — история мира, которую пишут сами игроки. Каждое построенное здание, каждый альянс и каждый конфликт становится частью летописи SMT.' },
  { tag: '02 — Экономика', title: 'Магазины, торговля, обмен', desc: 'Игроки строят магазины, торгуют ресурсами, договариваются об обменах. Живая экономика без искусственных ограничений — только то, что сами создаёте.' },
  { tag: '03 — Ивенты', title: 'Мероприятия и ивентовые баллы', desc: 'Игроки сами организуют ивенты, турниры и мероприятия. Для стримеров — система ивентовых баллов. Каждую неделю что-то происходит.' },
  { tag: '04 — Инструменты', title: 'Кастомные крафты и механики', desc: 'Debug палочка, невидимый свет, невидимые рамки для декора, динамическая карта мира в реальном времени. Строить удобно и красиво.' },
]

const inputStyle = {
  width: '100%', 
  background: 'rgba(255,255,255,0.03)', 
  border: '1px solid rgba(255,255,255,0.08)', 
  borderRadius: 10, 
  padding: '12px 16px', 
  color: '#fff', 
  marginTop: 8,
  outline: 'none',
  fontSize: '14px'
};

export default function HomeContent({ liveStreams }: { liveStreams: any[] }) {
  const [copied, setCopied] = useState(false)
  const router = useRouter()

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
      <Navbar 
  onScrollTo={scrollTo} 
  onOpenApply={() => router.push('/apply')} 
/>

      {/* HERO */}
      <section className="hero-glow" style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Particles />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: 32, transform: 'translateY(18px)' }}>
            <span className="animate-fade-up" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 20px', display: 'inline-block', animationDelay: '0.08s' }}>
              Survival · Semi-RP · Community
            </span>
          </div>
         {/* Теперь это правильный заголовок H1 для поисковиков, но выглядит так же круто */}
<h1 style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <span className="animate-fade-up glow-title glow-animate" style={{ fontSize: 'clamp(96px, 18vw, 180px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, animationDelay: '0.14s' }}>SMT</span>
  <span className="animate-fade-up" style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginTop: -10, marginBottom: 20, animationDelay: '0.25s' }}>
    Ванильный приватный сервер
  </span>
</h1>

{/* Описание с ключевыми словами (Semi-RP, выживание, 1.21) */}
<p className="animate-fade-up" style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 600, lineHeight: 1.6, marginBottom: 52, animationDelay: '0.35s' }}>
  Приватный сервер на версии 1.21.11 У нас <b>Semi-RP</b> (полу-РП) атмосфера, честная экономика и нет гриферов. Играй свою историю и строй свой мир вместе с нами!
</p>
          <div className="animate-fade-up" style={{ display: 'flex', gap: 12, animationDelay: '0.48s' }}>
            <button className="btn-glow" onClick={() => router.push('/apply')} style={{ padding: '14px 36px', borderRadius: 10, background: '#fff', color: '#0a0a0c', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              Начать играть
            </button>
            <a className="btn-glow" href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ padding: '14px 36px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none' }}>
              Discord
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '0 60px 80px', maxWidth: 1200, margin: '-60px auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', background: '#0a0a0c' }}>
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="card-glow animate-fade-up"
              style={{ padding: '48px 32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', animationDelay: `${i * 0.12}s` }}
            >
              <div style={{ fontSize: 32, fontWeight: 600 }}>{value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <TwitchSection liveStreams={liveStreams} />

      {/* ABOUT */}
      <section id="about" style={{ padding: '80px 60px', maxWidth: 1200, margin: '0 auto' }}>
         {/* Твой блок About с Lore */}
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
          {lore.map(({ tag, title, desc }, ri) => (
            <div
              key={tag}
              className="card-glow animate-fade-up"
              style={{ padding: '52px', background: 'rgba(255,255,255,0.02)', animationDelay: `${ri * 0.12 + 0.08}s` }}
            >
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: 20 }}>{tag}</span>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 14 }}>{title}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 60px', textAlign: 'center' }}>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>SMT 2025</span>
      </footer>
    </>
  )
}