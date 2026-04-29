export default async (request, context) => {
  const apiKey = Netlify.env.get("GEMINI_API_KEY");
  const body = await request.json();

  // 指向目前最穩定的 Gemini 2.0 Flash 節點
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return new Response(response.body, response);
};

export const config = { path: "/api/analyze" };
