---
title: "Analyzing Wireshark Captures: A Developer's Guide to Reading the Wire"
category: "Tools"
date: "Nov 26, 2026"
excerpt: "<p>The bug was a 200ms latency spike in our API that happened only in production. Logs showed nothing. APM showed nothing. We were about to add <code>time.Sleep(200 * time.Millisecond)</code> to a tes"
icon: "🛠️"
link: "https://dev.to/mango7777/analyzing-wireshark-captures-a-developers-guide-to-reading-the-wire-3i5p"
---

<p>The bug was a 200ms latency spike in our API that happened only in production. Logs showed nothing. APM showed nothing. We were about to add <code>time.Sleep(200 * time.Millisecond)</code> to a test to "make it deterministic" when someone suggested capturing the traffic. Five minutes with tcpdump and ten minutes with Wireshark later, we found it: a TCP retransmission caused by an MTU mismatch b

## Read More

[Read the full article](https://dev.to/mango7777/analyzing-wireshark-captures-a-developers-guide-to-reading-the-wire-3i5p)
