---
title: "A nightly pg_dump that fails with the reason, not with 'Network is unreachable'"
category: "Tools"
date: "Sep 17, 2026"
excerpt: "<p><a href='https://munchable.app' rel='noopener noreferrer'>Munchable</a>'s Postgres runs on a hosted tier that provides no managed backups. That makes a nightly GitHub Actions job the only line of d"
icon: "🛠️"
link: "https://dev.to/daniel_pertu/a-nightly-pgdump-that-fails-with-the-reason-not-with-network-is-unreachable-4lg8"
---

<p><a href="https://munchable.app" rel="noopener noreferrer">Munchable</a>'s Postgres runs on a hosted tier that provides no managed backups. That makes a nightly GitHub Actions job the only line of defence against data loss, so the workflow is intentionally simple and loud: <code>pg_dump</code> to Cloudflare R2, and if it fails, the platform emails the repo admins. This post is about the checks t

## Read More

[Read the full article](https://dev.to/daniel_pertu/a-nightly-pgdump-that-fails-with-the-reason-not-with-network-is-unreachable-4lg8)
