export default async (request, context) => {
  const apiKey = Netlify.env.get("GEMINI_API_KEY");
  const url = new URL(request.url);
  const body = await request.json();

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return new Response(response.body, response);
};

export const config = { path: "/api/analyze" };
