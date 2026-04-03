'use client'
import { useState } from 'react'

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

const initialData = {
  name: '',
  age: '',
  contact: '',
  experience: 'Да',
  gameTime: '2-4 года',
  contentCreator: 'Нет',
  onlineTime: '',
  plans: '',
  source: ''
}

export default function ApplyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState(initialData)

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const required = ['name', 'age', 'contact', 'onlineTime', 'plans', 'source'];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        alert('Заполните, пожалуйста, все поля в анкете.');
        return;
      }
    }

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
          setSent(false);
          setFormData(initialData);
          onClose();
        }, 2000);
      } else {
        alert('Ошибка отправки заявки');
      }
    } catch (err) {
      alert('Ошибка при отправке данных');
    }

    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(8px)' }}>
      <div style={{ background: '#0f0f12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '30px 40px', width: '100%', maxWidth: 550, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Анкета игрока</h2>
          <button onClick={() => { setFormData(initialData); setSent(false); onClose() }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 24 }}>✕</button>
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
                <input required className="input-glow" style={inputStyle} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </label>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Возраст *
                <input required type="number" className="input-glow" style={inputStyle} value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
              </label>
            </div>

            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Ваш контакт (Discord / TG) *
              <input required placeholder="@username" className="input-glow" style={inputStyle} value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Опыт на приватах? *
                <select required className="input-glow" style={inputStyle} value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })}>
                  <option value="Да">Да</option>
                  <option value="Нет">Нет</option>
                </select>
              </label>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Знаком с игрой? *
                <select required className="input-glow" style={inputStyle} value={formData.gameTime} onChange={e => setFormData({ ...formData, gameTime: e.target.value })}>
                  <option value="0-2 года">0-2 года</option>
                  <option value="2-4 года">2-4 года</option>
                  <option value="4-6 лет">4-6 лет</option>
                  <option value="6+ лет">6+ лет</option>
                </select>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Снимаешь / Стримишь? *
                <select required className="input-glow" style={inputStyle} value={formData.contentCreator} onChange={e => setFormData({ ...formData, contentCreator: e.target.value })}>
                  <option value="Нет">Нет</option>
                  <option value="Да">Да</option>
                </select>
              </label>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Время игре (д/нед) *
                <input required className="input-glow" style={inputStyle} value={formData.onlineTime} onChange={e => setFormData({ ...formData, onlineTime: e.target.value })} />
              </label>
            </div>

            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Чем планируешь заниматься? *
              <textarea required className="input-glow" style={{ ...inputStyle, height: 70, resize: 'none' }} value={formData.plans} onChange={e => setFormData({ ...formData, plans: e.target.value })} />
            </label>

            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Откуда узнал о нас? *
              <input required className="input-glow" style={inputStyle} value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} />
            </label>

            <button type="submit" disabled={loading} className="btn-glow" style={{ padding: '16px', borderRadius: 12, background: '#fff', color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 10, transition: 'opacity 0.2s' }}>
              {loading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}