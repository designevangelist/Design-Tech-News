---
title: "Why Hitting Your Server by IP Returns 400 — Testing a New Production Server on the Real Domain Before the DNS Switch"
category: "Tools"
date: "Oct 31, 2026"
excerpt: "<h2> The problem </h2> <p>On a recent server migration, the requirement was clear: 'the DNS change goes last — everything must be verified on the new server before that.' Reasonable. But it raises an "
icon: "🛠️"
link: "https://dev.to/pythona/why-hitting-your-server-by-ip-returns-400-testing-a-new-production-server-on-the-real-domain-134g"
---

<h2> The problem </h2> <p>On a recent server migration, the requirement was clear: "the DNS change goes last — everything must be verified on the new server before that." Reasonable. But it raises an obvious question: <strong>the domain still points at the old server, so how do you test the new one under real production conditions?</strong></p> <p>My first naive attempt was hitting the new server 

## Read More

[Read the full article](https://dev.to/pythona/why-hitting-your-server-by-ip-returns-400-testing-a-new-production-server-on-the-real-domain-134g)
