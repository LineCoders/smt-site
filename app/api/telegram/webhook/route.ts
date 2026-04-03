import { NextResponse } from 'next/server'
import { updateApplicationStatus, getApplicationById } from '@/lib/applyStorage'

type TelegramCallback = {
  update_id: number
  callback_query?: {
    id: string
    from: { id: number; username?: string; first_name?: string; last_name?: string }
    message: { message_id: number; chat: { id: number; type: string } }
    data: string
  }
}

async function answerCallback(callbackId: string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return

  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackId, text, show_alert: true }),
  })
}

async function editMessageText(chatId: number, messageId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, message_id: messageId, text, parse_mode: 'Markdown' }),
  })
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as TelegramCallback
    if (!payload.callback_query) {
      return NextResponse.json({ ok: true })
    }

    const { id: callbackId, data, message } = payload.callback_query
    const [action, appId] = data.split(':')
    if (!action || !appId) {
      await answerCallback(callbackId, 'Некорректная команда.')
      return NextResponse.json({ ok: false })
    }

    const existing = getApplicationById(appId)
    if (!existing) {
      await answerCallback(callbackId, 'Заявка не найдена.')
      return NextResponse.json({ ok: false })
    }

    let status: 'pending' | 'approved' | 'rejected' = 'pending'
    let reason = ''

    if (action === 'approve') {
      status = 'approved'
    } else if (action === 'reject') {
      status = 'rejected'
      reason = 'Отклонено администратором без причины'
    } else if (action === 'reject_reason') {
      const ask = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: message.chat.id,
          text: `Введите причину отклонения заявки с ID ${appId} (для ответа в формате: reject_reason:${appId}:ваша причина)`,
        }),
      })
      await answerCallback(callbackId, 'Пожалуйста, введите причину отклонения в ответном сообщении.')
      return NextResponse.json({ ok: true, askResponse: await ask.json() })
    } else {
      await answerCallback(callbackId, 'Неизвестное действие.')
      return NextResponse.json({ ok: false })
    }

    const updated = updateApplicationStatus(appId, status, reason)
    if (!updated) {
      await answerCallback(callbackId, 'Не удалось обновить статус заявки.')
      return NextResponse.json({ ok: false })
    }

    const answer = status === 'approved' ? 'Заявка одобрена.' : `Заявка отклонена. ${reason}`
    await answerCallback(callbackId, answer)

    const messageText = `Заявка *${updated.name}*\nСтатус: *${status.toUpperCase()}*${reason ? `\nПричина: ${reason}` : ''}`
    await editMessageText(message.chat.id, message.message_id, messageText)

    return NextResponse.json({ ok: true, application: updated })
  } catch (error) {
    console.error('Telegram webhook error', error)
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}