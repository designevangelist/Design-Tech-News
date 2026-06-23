---
title: "Stop returning the same 'blocked' error from your agent guardrail"
category: "Tools"
date: "Jun 23, 2026"
excerpt: "<p>If you run deny-by-default tool guards on AI agents, your refusal is a security decision — not a logging afterthought.</p> <p>I watched one source mutate a malformed tool call ~1,400 times against "
icon: "🛠️"
link: "https://dev.to/sattyamjjain/stop-returning-the-same-blocked-error-from-your-agent-guardrail-1a53"
---

<p>If you run deny-by-default tool guards on AI agents, your refusal is a security decision — not a logging afterthought.</p> <p>I watched one source mutate a malformed tool call ~1,400 times against a production agent in a weekend. Every identical <code>BLOCKED</code> response was feedback for the attacker's automated search: same input shape → same refusal → "colder," changed shape → changed res

## Read More

[Read the full article](https://dev.to/sattyamjjain/stop-returning-the-same-blocked-error-from-your-agent-guardrail-1a53)
