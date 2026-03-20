// lib/twitch.ts
export async function getLiveStreams(logins: string[]) {
  try {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    // Получаем токен
    const tokenRes = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: 'POST', cache: 'no-store' }
    );
    const { access_token } = await tokenRes.json();

    // Проверяем стримы
    const query = logins.map(l => `user_login=${l}`).join('&');
    const res = await fetch(`https://api.twitch.tv/helix/streams?${query}`, {
      headers: {
        'Client-ID': clientId!,
        'Authorization': `Bearer ${access_token}`,
      },
      next: { revalidate: 60 } // Обновляем раз в минуту
    });

    const { data } = await res.json();
    return data || [];
  } catch (e) {
    console.error("Twitch error:", e);
    return [];
  }
}