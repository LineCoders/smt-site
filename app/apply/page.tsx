'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Particles from '@/components/Particles'

const DEFAULT_FORM = {
  name: '',
  age: '',
  contact: '',
  experience: 'Да',
  gameTime: '2-4 года',
  contentCreator: 'Нет',
  onlineTime: '',
  plans: '',
  source: '',
  agreeRules: false,
}

type ApplicationStatus = 'pending' | 'approved' | 'rejected'

type ApplicationData = typeof DEFAULT_FORM & {
  status: ApplicationStatus
  reason?: string
  submittedAt: string
}

const STORAGE_KEY = 'smt-apply-application'

export default function ApplyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [application, setApplication] = useState<ApplicationData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchApplication = async (contact: string) => {
    try {
      const res = await fetch(`/api/apply?contact=${encodeURIComponent(contact)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.application) {
          setApplication(data.application)
          setFormData((prev) => ({ ...prev, ...data.application }))
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('smt-apply-contact', contact)
          }
        }
      }
    } catch (e) {
      console.error('fetchApplication error', e)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedContact = window.localStorage.getItem('smt-apply-contact')
    if (savedContact) {
      fetchApplication(savedContact)
    }
  }, [])

  useEffect(() => {
    if (application) {
      setFormData((prev) => ({ ...prev, ...application }))
    }
  }, [application])

  const statusLabel = useMemo(() => {
    if (!application) return null
    if (application.status === 'approved') return 'Одобрена'
    if (application.status === 'rejected') return `Отклонена${application.reason ? `: ${application.reason}` : ''}`
    return 'На рассмотрении'
  }, [application])

  const isFormValid = useMemo(() => {
    const fields = ['name', 'age', 'contact', 'onlineTime', 'plans', 'source'] as const
    const nonEmpty = fields.every((field) => formData[field].toString().trim().length > 0)
    const age = Number(formData.age)
    return nonEmpty && !Number.isNaN(age) && age >= 15 && formData.agreeRules
  }, [formData])

  const validationMessage = useMemo(() => {
    if (!formData.agreeRules) return 'Необходимо согласиться с правилами.'
    const age = Number(formData.age)
    if (!formData.age) return 'Заполните возраст.'
    if (Number.isNaN(age) || age < 15) return 'Возраст должен быть не менее 15 лет.'

    const fields = ['name', 'contact', 'onlineTime', 'plans', 'source'] as const
    for (const field of fields) {
      if (!formData[field].toString().trim()) {
        return 'Заполните все обязательные поля.'
      }
    }

    return ''
  }, [formData])

  const saveApp = (app: ApplicationData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(app))
    }
    setApplication(app)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (application?.status === 'pending') {
      setError('Нельзя отправить новую заявку, пока предыдущая находится на рассмотрении')
      return
    }

    if (!formData.agreeRules) {
      setError('Необходимо согласиться с правилами сервера')
      return
    }

    const age = Number(formData.age)
    if (Number.isNaN(age) || age < 15) {
      setError('Возраст должен быть не менее 15 лет')
      return
    }

    const required = ['name', 'age', 'contact', 'onlineTime', 'plans', 'source'] as const
    for (const f of required) {
      if (!formData[f].toString().trim()) {
        setError('Заполните, пожалуйста, все поля')
        return
      }
    }

    setLoading(true)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Ошибка отправки заявки')
        setLoading(false)
        return
      }

      if (data.application) {
        setApplication(data.application)
        setFormData((prev) => ({ ...prev, ...data.application }))
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('smt-apply-contact', data.application.contact)
        }
      }
    } catch (e) {
      setError('Ошибка сети при отправке заявки')
      console.error(e)
    }

    setLoading(false)
  }

  const handleApprove = () => {
    if (!application) return
    const approved: ApplicationData = { ...application, status: 'approved', reason: '' }
    saveApp(approved)
  }

  const handleReject = () => {
    if (!application) return
    const reason = window.prompt('Укажите причину отклонения')?.trim() || 'Причина не указана'
    const rejected: ApplicationData = { ...application, status: 'rejected', reason }
    saveApp(rejected)
  }

  return (
    <main style={{ background: '#0a0a0c', minHeight: '100vh', color: '#fff' }}>
      <Navbar onScrollTo={() => {}} onOpenApply={() => router.push('/apply')} />

      <section className="hero-glow" style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto', padding: '120px 40px 80px' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 20 }}>Подача заявки</h1>

          {application ? (
            <div style={{ marginBottom: 24, padding: 18, border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, background: 'rgba(255,255,255,0.05)' }}>
              <strong>Ваша последняя заявка</strong>
              <div style={{ marginTop: 10 }}><b>Статус:</b> {statusLabel}</div>
              <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.7)' }}>Дата: {new Date(application.submittedAt).toLocaleString()}</div>
              <div style={{ marginTop: 8, lineHeight: 1.5 }}>
                <div><b>Имя:</b> {application.name}</div>
                <div><b>Возраст:</b> {application.age}</div>
                <div><b>Контакт:</b> {application.contact}</div>
                <div><b>Опыт:</b> {application.experience}</div>
                <div><b>Срок игры:</b> {application.gameTime}</div>
                <div><b>Стрим/съемка:</b> {application.contentCreator}</div>
                <div><b>Время в игре:</b> {application.onlineTime}</div>
                <div><b>Планы:</b> {application.plans}</div>
                <div><b>Откуда узнал:</b> {application.source}</div>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: 24, padding: 18, border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, background: 'rgba(255,255,255,0.03)' }}>
              <i>Заявок пока нет. Заполните форму ниже.</i>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <button onClick={() => router.push('/')} style={{ marginRight: 12, padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff' }}>
              На главную
            </button>
            <button onClick={() => fetchApplication(formData.contact)} style={{ padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(96,165,250,0.6)', background: 'rgba(96,165,250,0.2)', color: '#fff' }}>
              Обновить статус
            </button>
          </div>

          <div style={{ padding: 20, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, background: 'rgba(0,0,0,0.5)' }}>
            <h2 style={{ marginTop: 0 }}>Новая заявка</h2>
            {application?.status === 'pending' ? (
              <div style={{ color: '#facc15', padding: '24px', border: '1px solid rgba(250,204,21,0.5)', borderRadius: 10 }}>Ваша заявка находится на рассмотрении. Новые заявки можно отправлять после решения.</div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input required placeholder="Имя" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
                <input required type="number" min={15} placeholder="Возраст" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} style={inputStyle} />
              </div>

              <input required placeholder="Discord / TG" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} style={inputStyle} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <select required value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={inputStyle}>
                  <option value="Да">Да</option>
                  <option value="Нет">Нет</option>
                </select>
                <select required value={formData.gameTime} onChange={(e) => setFormData({ ...formData, gameTime: e.target.value })} style={inputStyle}>
                  <option value="0-2 года">0-2 года</option>
                  <option value="2-4 года">2-4 года</option>
                  <option value="4-6 лет">4-6 лет</option>
                  <option value="6+ лет">6+ лет</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <select required value={formData.contentCreator} onChange={(e) => setFormData({ ...formData, contentCreator: e.target.value })} style={inputStyle}>
                  <option value="Нет">Нет</option>
                  <option value="Да">Да</option>
                </select>
                <input required placeholder="Время игре (д/нед)" value={formData.onlineTime} onChange={(e) => setFormData({ ...formData, onlineTime: e.target.value })} style={inputStyle} />
              </div>

              <textarea required placeholder="Чем планируешь заниматься?" value={formData.plans} onChange={(e) => setFormData({ ...formData, plans: e.target.value })} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} />
              <input required placeholder="Откуда узнал о нас?" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} style={inputStyle} />

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.agreeRules} onChange={(e) => setFormData({ ...formData, agreeRules: e.target.checked })} />
                Я прочитал(а) и согласен(на) с <a href="/rules" style={{ color: '#93c5fd', textDecoration: 'underline' }} target="_blank" rel="noreferrer">правилами</a> сервера
              </label>

              {error && <div style={{ color: '#fda4af', minHeight: 20 }}>{error}</div>}
              {!isFormValid && validationMessage && <div style={{ color: '#facc15', minHeight: 20 }}>{validationMessage}</div>}

              <button type="submit" disabled={!isFormValid || loading} style={{ padding: '14px 20px', borderRadius: 10, border: 'none', background: isFormValid ? '#fff' : 'rgba(255,255,255,0.3)', color: '#000', fontWeight: 700, cursor: isFormValid ? 'pointer' : 'not-allowed' }}>
                {loading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 10,
  padding: '10px 14px',
  color: '#fff',
  outline: 'none',
  fontSize: '14px',
}
