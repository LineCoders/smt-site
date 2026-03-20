'use client'
import { useState } from 'react'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '', age: '', contact: '', experience: 'Да', 
    gameTime: '2-4 года', contentCreator: 'Нет', 
    onlineTime: '', plans: '', source: ''
  })

  function copyIP() {
    navigator.clipboard.writeText('play.smt-mc.ru')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => { 
          setIsModalOpen(false); 
          setSent(false); 
          setFormData({ name: '', age: '', contact: '', experience: 'Да', gameTime: '2-4 года', contentCreator: 'Нет', onlineTime: '', plans: '', source: '' });
        }, 3000);
      }
    } catch (err) {
      alert("Ошибка при отправке");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar 
  onScrollTo={scrollTo} 
  onOpenApply={() => setIsModalOpen(true)} 
/>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Particles />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 20px', display: 'inline-block' }}>
              Survival · Semi-RP · Community
            </span>
          </div>
         {/* Теперь это правильный заголовок H1 для поисковиков, но выглядит так же круто */}
<h1 style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <span style={{ fontSize: 'clamp(96px, 18vw, 180px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>SMT</span>
  <span style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginTop: -10, marginBottom: 20 }}>
    Ванильный приватный сервер
  </span>
</h1>

{/* Описание с ключевыми словами (Semi-RP, выживание, 1.21) */}
<p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 600, lineHeight: 1.6, marginBottom: 52 }}>
  Приватный сервер на версии 1.21.11 У нас <b>Semi-RP</b> (полу-РП) атмосфера, честная экономика и нет гриферов. Играй свою историю и строй свой мир вместе с нами!
</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setIsModalOpen(true)} style={{ padding: '14px 36px', borderRadius: 10, background: '#fff', color: '#0a0a0c', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              Начать играть
            </button>
            <a href="https://discord.gg/35knDpq4YU" target="_blank" rel="noreferrer" style={{ padding: '14px 36px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none' }}>
              Discord
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '0 60px 80px', maxWidth: 1200, margin: '-60px auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', background: '#0a0a0c' }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{ padding: '48px 32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
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
          {lore.map(({ tag, title, desc }) => (
            <div key={tag} style={{ padding: '52px', background: 'rgba(255,255,255,0.02)' }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: 20 }}>{tag}</span>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 14 }}>{title}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* МОДАЛЬНОЕ ОКНО ЗАЯВКИ */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(8px)' }}>
          <div style={{ background: '#0f0f12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '30px 40px', width: '100%', maxWidth: 550, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 600 }}>Анкета игрока</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 24 }}>✕</button>
            </div>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>Заявка отправлена!</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>Мы изучим её и напишем тебе в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                   <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Имя *
                     <input required style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                   </label>
                   <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Возраст *
                     <input required type="number" style={inputStyle} value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                   </label>
                </div>
                
                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Ваш контакт (Discord / TG) *
                  <input required placeholder="@username" style={inputStyle} value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Опыт на приватах? *
                    <select style={inputStyle} value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
                      <option>Да</option><option>Нет</option>
                    </select>
                  </label>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Знаком с игрой? *
                    <select style={inputStyle} value={formData.gameTime} onChange={e => setFormData({...formData, gameTime: e.target.value})}>
                      <option>0-2 года</option><option>2-4 года</option><option>4-6 лет</option><option>6+ лет</option>
                    </select>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Снимаешь / Стримишь? *
                    <select style={inputStyle} value={formData.contentCreator} onChange={e => setFormData({...formData, contentCreator: e.target.value})}>
                      <option>Нет</option><option>Да</option>
                    </select>
                  </label>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Время игре (д/нед) *
                    <input required style={inputStyle} value={formData.onlineTime} onChange={e => setFormData({...formData, onlineTime: e.target.value})} />
                  </label>
                </div>

                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Чем планируешь заниматься? *
                  <textarea required style={{...inputStyle, height: 70, resize: 'none'}} value={formData.plans} onChange={e => setFormData({...formData, plans: e.target.value})} />
                </label>

                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Откуда узнал о нас? *
                  <input required style={inputStyle} value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
                </label>

                <button type="submit" disabled={loading} style={{ padding: '16px', borderRadius: 12, background: '#fff', color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 10, transition: 'opacity 0.2s' }}>
                  {loading ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 60px', textAlign: 'center' }}>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>SMT 2025</span>
      </footer>
    </>
  )
}