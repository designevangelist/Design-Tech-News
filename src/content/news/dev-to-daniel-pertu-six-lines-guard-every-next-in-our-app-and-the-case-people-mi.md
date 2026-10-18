---
title: "Six lines guard every ?next= in our app, and the case people miss is a backslash"
category: "Tools"
date: "Oct 18, 2026"
excerpt: "<p>Two places in Munchable read a destination out of a query string. The OAuth callback:<br> </p> <div class='highlight js-code-highlight'> <pre class='highlight typescript'><code><span class='c1'>// "
icon: "🛠️"
link: "https://dev.to/daniel_pertu/six-lines-guard-every-next-in-our-app-and-the-case-people-miss-is-a-backslash-5234"
---

<p>Two places in Munchable read a destination out of a query string. The OAuth callback:<br> </p> <div class="highlight js-code-highlight"> <pre class="highlight typescript"><code><span class="c1">// GET /auth/callback?code=...&amp;next=/...</span> <span class="kd">const</span> <span class="nx">next</span> <span class="o">=</span> <span class="nf">safeReturnPath</span><span class="p">(</span><span

## Read More

[Read the full article](https://dev.to/daniel_pertu/six-lines-guard-every-next-in-our-app-and-the-case-people-miss-is-a-backslash-5234)
