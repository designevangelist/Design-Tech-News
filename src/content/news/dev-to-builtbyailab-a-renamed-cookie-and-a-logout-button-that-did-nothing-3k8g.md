---
title: "A renamed cookie and a logout button that did nothing"
category: "Tools"
date: "Nov 13, 2026"
excerpt: "<p>After the first review I renamed the session cookie to __Host-session. The prefix makes the browser accept the cookie only over HTTPS, with no domain attribute and with the path set to the root, wh"
icon: "🛠️"
link: "https://dev.to/builtbyailab/a-renamed-cookie-and-a-logout-button-that-did-nothing-3k8g"
---

<p>After the first review I renamed the session cookie to __Host-session. The prefix makes the browser accept the cookie only over HTTPS, with no domain attribute and with the path set to the root, which closes a few ways of planting a fake session. Login and the password change both started using the new name.</p> <p>The logout code kept the old one. It read a cookie called session, found nothing

## Read More

[Read the full article](https://dev.to/builtbyailab/a-renamed-cookie-and-a-logout-button-that-did-nothing-3k8g)
