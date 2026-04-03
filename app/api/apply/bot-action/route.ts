import { NextResponse } from 'next/server'
import { ApplicationStatus, getApplicationById, updateApplicationStatus } from '@/lib/applyStorage'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, action, reason } = body

    if (!id || !action) {
      return NextResponse.json({ error: 'id и action обязательны' }, { status: 400 })
    }

    const app = getApplicationById(id)
    if (!app) {
      return NextResponse.json({ error: 'Заявка не найдена' }, { status: 404 })
    }

    let status: ApplicationStatus
    let updatedReason = ''

    if (action === 'approve') {
      status = 'approved'
    } else if (action === 'reject') {
      status = 'rejected'
      updatedReason = reason || 'Причина не указана'
    } else if (action === 'reject_reason') {
      if (!reason) {
        return NextResponse.json({ error: 'reason обязательна при reject_reason' }, { status: 400 })
      }
      status = 'rejected'
      updatedReason = reason
    } else {
      return NextResponse.json({ error: 'Неверный action' }, { status: 400 })
    }

    const updated = updateApplicationStatus(id, status, updatedReason)
    if (!updated) {
      return NextResponse.json({ error: 'Не удалось обновить', status: 500 })
    }

    return NextResponse.json({ application: updated })
  } catch (error) {
    console.error('bot-action error', error)
    return NextResponse.json({ error: 'Непредвиденная ошибка' }, { status: 500 })
  }
}
