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

export default function ApplyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '', age: '', contact: '', experience: 'Да', 
    gameTime: '2-4 года', contentCreator: 'Нет', 
    onlineTime: '', plans: '', source: ''
  })

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setSent(true);
      setTimeout(() => { onClose(); setSent(false); }, 3000);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(8px)' }}>
      <div style={{ background: '#0f0f12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '30px 40px', width: '100%', maxWidth: 550, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600 }}>Анкета игрока</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 24 }}>✕</button>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>✅ Заявка отправлена!</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <input required placeholder="Имя" style={inputStyle} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required placeholder="Возраст" type="number" style={inputStyle} onChange={e => setFormData({...formData, age: e.target.value})} />
            <input required placeholder="Discord / TG" style={inputStyle} onChange={e => setFormData({...formData, contact: e.target.value})} />
            <button type="submit" style={{ padding: '16px', borderRadius: 12, background: '#fff', color: '#000', fontWeight: 700, cursor: 'pointer' }}>
              {loading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}