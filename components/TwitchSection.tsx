'use client'
import { TwitchPlayer } from 'react-twitch-embed'

export default function TwitchSection({ liveStreams }: { liveStreams: any[] }) {
  // Если никто не стримит, этот блок вообще не будет отображаться на сайте
  if (!liveStreams || liveStreams.length === 0) return null;

  return (
    <section style={{ padding: '0 60px 100px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Заголовок секции в твоем стиле */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        <span style={{ fontSize: 11, letterSpacing: '0.28em', color: '#ff4b4b', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          ● ПРЯМОЙ ЭФИР
        </span>
      </div>

      {/* СЕТКА СТРИМЕРОВ (Исправленная) */}
      <div style={{ 
        display: 'grid', 
        // Тут магия: карточка не будет шире 500px, поэтому черных полос не будет
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 500px))', 
        gap: '24px',
        justifyContent: 'start' // Карточки будут прижаты к левому краю
      }}>
        {liveStreams.map((stream) => (
          <div key={stream.id} style={{ 
            border: '1px solid rgba(255,255,255,0.07)', 
            borderRadius: 16, 
            overflow: 'hidden', 
            background: 'rgba(255,255,255,0.02)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Шапка карточки с ником */}
            <div style={{ 
              padding: '16px 20px', 
              borderBottom: '1px solid rgba(255,255,255,0.05)', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
               <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{stream.user_name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                    {stream.title.length > 45 ? stream.title.slice(0, 45) + '...' : stream.title}
                  </div>
               </div>
               <div style={{ fontSize: 10, background: '#ff4b4b', padding: '2px 8px', borderRadius: 4, fontWeight: 700, color: '#fff' }}>LIVE</div>
            </div>

            {/* КОНТЕЙНЕР ПЛЕЕРА */}
            <div style={{ aspectRatio: '16/9', width: '100%', background: '#000' }}>
<TwitchPlayer 
  id={`twitch-player-${stream.user_login}`} // Добавляем уникальный ID
  key={stream.user_login} // И ключ для React
  channel={stream.user_login} 
  width="100%" 
  height="100%" 
  muted 
  autoplay={false}
/>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}