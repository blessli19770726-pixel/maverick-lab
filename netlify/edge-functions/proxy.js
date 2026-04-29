export default async (request, context) => {
  const apiKey = Netlify.env.get("GEMINI_API_KEY");
  const body = await request.json();

  // 根據 2026/04 最新清單，Gemini 3 Pro 已停用
  // 我們改用具備進階智慧的 Gemini 3.1 Pro 預覽版
  const model = "gemini-3.1-pro-preview"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: `模型節點錯誤: ${errorText}` }), { status: response.status });
    }

    return new Response(response.body, response);
  } catch (err) {
    return new Response(JSON.stringify({ error: "通道連接失敗" }), { status: 500 });
  }
};

export const config = { path: "/api/analyze" };
