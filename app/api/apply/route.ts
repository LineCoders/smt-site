import { NextResponse } from 'next/server';
import { ApplicationData, ApplicationStatus, getApplicationByContact, saveApplication } from '@/lib/applyStorage';

export async function GET(req: Request) {
  const url = new URL(req.url)
  const contact = url.searchParams.get('contact')
  if (!contact) {
    return NextResponse.json({ error: 'contact is required' }, { status: 400 })
  }

  const application = getApplicationByContact(contact)
  if (!application) {
    return NextResponse.json({ application: null })
  }

  return NextResponse.json({ application })
}

function createTelegramKeyboard(id: string) {
  return {
    inline_keyboard: [
      [{ text: 'Одобрить', callback_data: `approve:${id}` }, { text: 'Отклонить', callback_data: `reject:${id}` }],
      [{ text: 'Отклонить с причиной', callback_data: `reject_reason:${id}` }],
    ],
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const requiredFields = ['name', 'age', 'contact', 'experience', 'gameTime', 'contentCreator', 'onlineTime', 'plans', 'source', 'agreeRules']
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field].toString().trim() === '') {
        return NextResponse.json({ error: `Поле ${field} обязательно` }, { status: 400 })
      }
    }

    if (Number.isNaN(Number(data.age)) || Number(data.age) < 15) {
      return NextResponse.json({ error: 'Возраст должен быть не менее 15' }, { status: 400 })
    }

    const existing = getApplicationByContact(data.contact)
    if (existing && existing.status === 'pending') {
      return NextResponse.json({ error: 'Заявка уже находится на рассмотрении' }, { status: 409 })
    }
    if (existing && existing.status === 'approved') {
      return NextResponse.json({ error: 'Ваша заявка уже одобрена, повторная подача не разрешена' }, { status: 409 })
    }

    const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const application: ApplicationData = {
      id,
      name: data.name,
      age: data.age,
      contact: data.contact,
      experience: data.experience,
      gameTime: data.gameTime,
      contentCreator: data.contentCreator,
      onlineTime: data.onlineTime,
      plans: data.plans,
      source: data.source,
      agreeRules: Boolean(data.agreeRules),
      status: 'pending',
      reason: '',
      submittedAt: new Date().toISOString(),
    }

    saveApplication(application)

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatIdsString = process.env.TELEGRAM_CHAT_ID || ''
    const chatIds = chatIdsString.split(',').map((id) => id.trim()).filter(Boolean)

    const text = `🆕 *НОВАЯ ЗАЯВКА SMT*

👤 *Имя:* ${application.name}
🎂 *Возраст:* ${application.age}
📱 *Контакт:* ${application.contact}

🎮 *Опыт приватных серверов:* ${application.experience}
⏳ *Знаком с игрой:* ${application.gameTime}
🎥 *Контент:* ${application.contentCreator}
🕒 *Онлайн:* ${application.onlineTime}

🛠 *Планы:*
${application.plans}

🔍 *Откуда узнал:* ${application.source}

ID: ${application.id}
`;

    const keyboard = createTelegramKeyboard(application.id)

    const promises = chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          reply_markup: keyboard,
        }),
      })
    )

    await Promise.all(promises)

    return NextResponse.json({ application })
  } catch (error) {
    console.error('TG Error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
