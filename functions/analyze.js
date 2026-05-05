export async function onRequestPost(context) {
  const { env, request } = context;
  const apiKey = env.GEMINI_API_KEY; // 這裡會自動對齊你在 Cloudflare 設定的環境變數
  const body = await request.json();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
