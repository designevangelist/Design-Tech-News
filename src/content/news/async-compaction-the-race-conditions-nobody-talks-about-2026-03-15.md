---
title: "Async compaction: the race conditions nobody talks about"
category: "Tools"
date: "Mar 15, 2026"
excerpt: "<p>Claude Code blocks the agent while compacting. LangGraph runs compaction in the background and silently drops messages. Aider spawns a background thread and hopes for the best. Async compaction sou"
icon: "🛠️"
link: "https://dev.to/openwalrus/async-compaction-the-race-conditions-nobody-talks-about-4ni"
---

<p>Claude Code blocks the agent while compacting. LangGraph runs compaction in the background and silently drops messages. Aider spawns a background thread and hopes for the best. Async compaction sounds like the obvious optimization — until you try to build it.</p> <p>We surveyed how major frameworks handle context compaction timing — synchronous, asynchronous, or not at all — and catalogued the 

## Read More

[Read the full article](https://dev.to/openwalrus/async-compaction-the-race-conditions-nobody-talks-about-4ni)
