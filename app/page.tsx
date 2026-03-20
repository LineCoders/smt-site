import Navbar from '@/components/Navbar'
import Particles from '@/components/Particles'
import HomeContent from '@/components/HomeContent' // Мы создадим этот файл сейчас
import TwitchSection from '@/components/TwitchSection'
import { getLiveStreams } from '@/lib/twitch'

// ПИШИ ЛОГИНЫ СТРИМЕРОВ ТУТ
const streamerLogins = ['Kapchagin','pulseintothedark','bomiss','niukqlo','bomiss39','MrChebupek'] 

export default async function Home() {
  // Получаем стримы на сервере (безопасно)
  const liveStreams = await getLiveStreams(streamerLogins)

  return (
    <main style={{ background: '#0a0a0c', minHeight: '100vh', color: '#fff' }}>
      {/* Передаем Navbar и другие интерактивные штуки в клиентский компонент, 
         который мы сделаем ниже, чтобы сохранить все твои функции (copyIP, scrollTo)
      */}
      <HomeContent liveStreams={liveStreams} />
    </main>
  )
}