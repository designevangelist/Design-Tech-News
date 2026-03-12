import type { APIRoute } from "astro";

const CLIENT_ID = import.meta.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET;

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const path = params.path;

  if (path === "auth") {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    });
  }

  if (path === "callback") {
    const code = url.searchParams.get("code");
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    });
    const data = await response.json();
    const token = data.access_token;

    const html = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:github:success:{"token":"${token}","provider":"github"}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      </script>
    `;
    return new Response(html, { headers: { "Content-Type": "text/html" } });
  }

  return new Response("Not found", { status: 404 });
};