import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SMT — Ванильный приватный Semi-RP сервер Minecraft',
  description: 'Присоединяйся к SMT — ванильному приватному серверу Майнкрафт с элементами полу-РП (Semi-RP). Честная игра, адекватное комьюнити, лор и интересные ивенты. Подавай заявку!',
  keywords: [
    'ванильный сервер майнкрафт', 
    'приватный сервер', 
    'SMT', 
    'SMT сервер', 
    'полурп', 
    'semi-rp', 
    'майнкрафт выживание', 
    'сервер без грифа',
    'проходка',
    'СМТ',
    'СШМ'
  ],
  openGraph: {
    title: 'SMT — Ванильный приватный Semi-RP сервер',
    description: 'Частный Майнкрафт сервер для комфортной игры. Без читов, без грифа, с упором на лор и экономику.',
    url: 'https://твой-домен.ru', // Замени на свой реальный домен!
    siteName: 'SMT Minecraft',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
