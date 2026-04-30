export default async (request, context) => {
  // 1. 定義安全許可證 (CORS Headers)
  const headers = {
    "Access-Control-Allow-Origin": "*", // 允許 Vercel 與其他平台調用大腦
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // 2. 處理瀏覽器的預檢請求 (OPTIONS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const apiKey = Netlify.env.get("GEMINI_API_KEY");
  const body = await request.json();

  // 根據你的最新設定，使用 gemini-flash-latest
  const model = "gemini-flash-latest"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: `模型節點錯誤: ${errorText}` }), { 
        status: response.status,
        headers: { ...headers, "Content-Type": "application/json" }
      });
    }

    // 3. 回傳數據時，同步帶上安全許可證
    return new Response(response.body, {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "通道連接失敗" }), { 
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" }
    });
  }
};

export const config = { path: "/api/analyze" };
