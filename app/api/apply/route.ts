import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatIdsString = process.env.TELEGRAM_CHAT_ID || '';
    
    // Превращаем строку "ID1,ID2" в массив [ID1, ID2]
    const chatIds = chatIdsString.split(',').map(id => id.trim());

    const text = `
🆕 **НОВАЯ ЗАЯВКА SMT**

👤 **Имя:** ${data.name}
🎂 **Возраст:** ${data.age}
📱 **Контакт:** ${data.contact}

🎮 **Опыт приватных серверов:** ${data.experience}
⏳ **Знаком с игрой:** ${data.gameTime}
🎥 **Контент:** ${data.contentCreator}
🕒 **Онлайн:** ${data.onlineTime}

🛠 **Планы:**
${data.plans}

🔍 **Откуда узнал:** ${data.source}

    `;

    // Запускаем отправку для каждого ID из списка
    const requests = chatIds.map(id => 
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: id,
          text: text,
          parse_mode: 'Markdown',
        }),
      })
    );

    // Ждем, пока все сообщения будут отправлены
    await Promise.all(requests);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('TG Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}