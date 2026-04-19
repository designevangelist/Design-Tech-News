---
title: "Let's Encrypt short-lived certificates are quite strict, so you should use an ARI-capable client"
category: "Tools"
date: "Apr 19, 2026"
excerpt: "<p>Let's Encrypt short-lived certificates are much harder than they look if you think of them as just a shorter version of 90-day certificates.</p> <p>If you issue and renew multiple certificates for "
icon: "🛠️"
link: "https://dev.to/catatsuy/lets-encrypt-short-lived-certificates-are-quite-strict-so-you-should-use-an-ari-capable-client-j5a"
---

<p>Let's Encrypt short-lived certificates are much harder than they look if you think of them as just a shorter version of 90-day certificates.</p> <p>If you issue and renew multiple certificates for multiple subdomains in a short interval, you can hit certificate issuance rate limits more easily. Short-lived certificates increase the number of renewals, so these limits become much more visible.</

## Read More

[Read the full article](https://dev.to/catatsuy/lets-encrypt-short-lived-certificates-are-quite-strict-so-you-should-use-an-ari-capable-client-j5a)
