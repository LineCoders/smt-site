'use client'
import { useState } from 'react' // Добавили useState
import Navbar from '@/components/Navbar'
import Particles from '@/components/Particles'
import ApplyModal from '@/components/ApplyModal' // Добавили импорт модалки

const rules = [
  // ... твой массив правил (без изменений)
  {
    num: '01',
    title: 'Уважение к игрокам',
    desc: 'Основа любого хорошего сообщества — уважение друг к другу. На SMT мы ценим комфортную атмосферу для всех.',
    items: [
      { label: 'Оскорбления и токсичность', text: 'Запрещены любые оскорбления, токсичное поведение, травля и агрессия в любом виде — в чате, голосе, личных сообщениях.' },
      { label: 'Провокации', text: 'Запрещены провокации и конфликты, выходящие за рамки RP отыгровки. Если это не часть лора — не надо.' },
      { label: 'Запрещённые темы', text: 'Обсуждение политики, жёстких и жестоких тем — вне закона. Сервер для игры, а не для споров.' },
      { label: 'Флуд и спам', text: 'Флуд и спам в чате или каналах, не предназначенных для этого, запрещён. Уважай пространство других.' },
    ],
  },
  {
    num: '02',
    title: 'Честная игра',
    desc: 'SMT — сервер для тех, кто хочет играть честно. Никаких преимуществ за счёт стороннего ПО.',
    items: [
      { label: 'Читы и моды', text: 'Запрещены читы и нелегитимные модификации: X-Ray, автототем, любые моды и текстурпаки, которые дают игроку возможности недостижимые без них. Если мод кардинально меняет игровой процесс в твою пользу — он под запретом.' },
      { label: 'Баги', text: 'Нашёл баг — сообщи администратору в ближайшее время. Использование багов в своих интересах приравнивается к читерству.' },
    ],
  },
  {
    num: '03',
    title: 'Постройки и ресурсы',
    desc: 'Каждый игрок вкладывает время и силы в свои постройки. Относись к чужому труду с уважением.',
    items: [
      { label: 'Гриферинг', text: 'Категорически запрещён гриферинг — любое разрушение, повреждение или нанесение урона постройкам других игроков без их личного согласия. Неважно чем мотивировано — это нарушение.' },
      { label: 'Уважение территории', text: 'Если ты строишься очень близко к другому игроку — обсуди это с ним заранее. Личное пространство важно даже в Minecraft.' },
      { label: 'Крупные фермы', text: 'Очень крупные фермы, особенно на порталах, способны влиять на производительность сервера. Такие постройки желательно согласовывать с администрацией заранее.' },
    ],
  },
  {
    num: '04',
    title: 'Полу-RP и атмосфера',
    desc: 'SMT — Semi-RP сервер. Это значит, что у нас есть живой нарратив и атмосфера, которую мы вместе создаём.',
    items: [
      { label: 'Лор сервера', text: 'На сервере существует Лор — исторические события, происходящие в мире SMT. В ходе лорных событий происходят различные изменения, которые влияют на весь сервер. Участие добровольное, но каждый игрок может повернуть Лор в своё русло.' },
      { label: 'Атмосфера Лора', text: 'Запрещена порча атмосферы лорных событий: абсурдное поведение, токсичный рофл, намеренный срыв событий. Если не хочешь участвовать — просто не участвуй, но не мешай другим.' },
    ],
  },
]

export default function RulesPage() {
  // 1. Создаем состояние для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Функция для скролла (заглушка для правил, так как мы на другой странице)
  const scrollTo = (id: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <main style={{ background: '#0a0a0c', minHeight: '100vh', color: '#fff' }}>
      {/* 3. Передаем функции в Navbar */}
      <Navbar 
        onScrollTo={scrollTo} 
        onOpenApply={() => setIsModalOpen(true)} 
      />

      <section className="hero-glow" style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '160px 60px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span className="animate-fade-up" style={{ fontSize: 11, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', fontFamily: 'monospace', animationDelay: '0.08s' }}>SMT</span>
          </div>
          <h1 className="glow-title glow-animate animate-fade-up" style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 28, animationDelay: '0.14s' }}>
            Правила<br />сервера
          </h1>
          <p className="animate-fade-up" style={{ fontSize: 16, color: 'rgba(255,255,255,0.38)', lineHeight: 1.8, fontWeight: 300, maxWidth: 520, animationDelay: '0.25s' }}>
            SMT — приватное сообщество. Эти правила существуют не для ограничений, а чтобы каждый мог играть в комфортной атмосфере.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(transparent, #0a0a0c)', pointerEvents: 'none' }} />
      </section>

      {/* Секция с правилами (твой код без изменений) */}
      <section style={{ padding: '0 60px 140px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {rules.map(({ num, title, desc, items }, ri) => (
            <div
              key={num}
              className="card-glow animate-fade-up"
              style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', animationDelay: `${ri * 0.12 + 0.08}s` }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ padding: '40px 32px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace', letterSpacing: '0.08em' }}>{num}</span>
                </div>
                <div style={{ padding: '40px 52px' }}>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 10 }}>{title}</div>
                  <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
                </div>
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent', transition: 'background .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.035)')}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent')}>
                  <div style={{ padding: '28px 32px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', fontFamily: 'monospace' }}>{ri + 1}.{i + 1}</span>
                  </div>
                  <div style={{ padding: '28px 52px' }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', marginBottom: 8, letterSpacing: '0.02em' }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, fontWeight: 300 }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, padding: '40px 52px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10, color: 'rgba(255,255,255,0.6)' }}>Нарушение правил</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.75, fontWeight: 300 }}>
            Нарушение правил влечёт предупреждение, временный или постоянный бан в зависимости от тяжести. Администрация оставляет за собой право принимать решения в спорных ситуациях. По всем вопросам — обращайся в <a href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Discord</a>.
          </div>
        </div>
      </section>

      {/* 4. Добавляем саму модалку в конец страницы */}
      <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.2)' }}>SMT</span>
        <a href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', textDecoration: 'none' }}>Discord →</a>
      </footer>
    </main>
  )
}