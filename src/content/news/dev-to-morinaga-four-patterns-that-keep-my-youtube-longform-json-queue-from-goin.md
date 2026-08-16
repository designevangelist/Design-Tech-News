---
title: "Four patterns that keep my YouTube longform JSON queue from going stale"
category: "Tools"
date: "Aug 16, 2026"
excerpt: "<p>I manage the YouTube longform queue for my BuilderStack channel as JSON files in <code>content/yt-longform-queue/</code>. A spec file lands there when a generator script commits a new dialogue; the"
icon: "🛠️"
link: "https://dev.to/morinaga/four-patterns-that-keep-my-youtube-longform-json-queue-from-going-stale-2750"
---

<p>I manage the YouTube longform queue for my BuilderStack channel as JSON files in <code>content/yt-longform-queue/</code>. A spec file lands there when a generator script commits a new dialogue; the publish workflow picks the file, renders it to MP4, uploads it, then moves the file to <code>uploaded/</code>. No external queue service, no database rows, no management dashboard.</p> <p>This has wo

## Read More

[Read the full article](https://dev.to/morinaga/four-patterns-that-keep-my-youtube-longform-json-queue-from-going-stale-2750)
