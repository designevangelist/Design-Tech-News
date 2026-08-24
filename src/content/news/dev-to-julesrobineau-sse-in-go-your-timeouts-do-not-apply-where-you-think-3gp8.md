---
title: "SSE in Go: Your Timeouts Do Not Apply Where You Think"
category: "Tools"
date: "Aug 24, 2026"
excerpt: "<p>An SSE stream is an HTTP request that never ends. Every default you did not touch is working against it.</p> <blockquote> <p><strong>TL;DR</strong>: your SSE endpoint breaks twice before it reaches"
icon: "🛠️"
link: "https://dev.to/julesrobineau/sse-in-go-your-timeouts-do-not-apply-where-you-think-3gp8"
---

<p>An SSE stream is an HTTP request that never ends. Every default you did not touch is working against it.</p> <blockquote> <p><strong>TL;DR</strong>: your SSE endpoint breaks twice before it reaches your logic. Once because the <code>Connection</code> header is illegal in HTTP/2. Once because your Go server's default timeouts cut the stream at 30 seconds. And if you stay on HTTP/1.1, a permanent

## Read More

[Read the full article](https://dev.to/julesrobineau/sse-in-go-your-timeouts-do-not-apply-where-you-think-3gp8)
