---
title: "Middleware is not your auth layer (a Next.js footgun I keep finding)"
category: "Tools"
date: "Oct 30, 2026"
excerpt: "<p>When I audit Next.js apps built quickly (often with AI tools), one pattern shows up more than any other: routes are protected in <code>middleware.ts</code>, and the API route handlers trust that.<b"
icon: "🛠️"
link: "https://dev.to/somnath_khadanga_2e5c2364/middleware-is-not-your-auth-layer-a-nextjs-footgun-i-keep-finding-2n31"
---

<p>When I audit Next.js apps built quickly (often with AI tools), one pattern shows up more than any other: routes are protected in <code>middleware.ts</code>, and the API route handlers trust that.<br> </p> <div class="highlight js-code-highlight"> <pre class="highlight typescript"><code><span class="c1">// app/api/admin/users/route.ts</span> <span class="k">export</span> <span class="k">async</s

## Read More

[Read the full article](https://dev.to/somnath_khadanga_2e5c2364/middleware-is-not-your-auth-layer-a-nextjs-footgun-i-keep-finding-2n31)
