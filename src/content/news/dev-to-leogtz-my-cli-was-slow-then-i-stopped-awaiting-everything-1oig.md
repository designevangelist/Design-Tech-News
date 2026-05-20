---
title: "My CLI was slow — then I stopped awaiting everything"
category: "Tools"
date: "May 20, 2026"
excerpt: "<p>I build a CLI that scans a directory full of projects and runs npm audit --json on each one to find vulnerabilities. It worked but it felt slow. Every project waited for the previous one to finish "
icon: "🛠️"
link: "https://dev.to/leogtz/my-cli-was-slow-then-i-stopped-awaiting-everything-1oig"
---

<p>I build a CLI that scans a directory full of projects and runs npm audit --json on each one to find vulnerabilities. It worked but it felt slow. Every project waited for the previous one to finish before starting.</p> <p>I was doing something like this (roughly):<br> </p> <div class="highlight js-code-highlight"> <pre class="highlight typescript"><code><span class="k">for </span><span class="p"

## Read More

[Read the full article](https://dev.to/leogtz/my-cli-was-slow-then-i-stopped-awaiting-everything-1oig)
