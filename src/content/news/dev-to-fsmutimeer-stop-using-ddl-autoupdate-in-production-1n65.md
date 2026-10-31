---
title: "Stop using ddl-auto=update in production"
category: "Tools"
date: "Oct 31, 2026"
excerpt: "<p><code>spring.jpa.hibernate.ddl-auto=update</code> is the fastest way to get started: change an entity, restart, and the table follows. It stays in the configuration long after the first demo, and o"
icon: "🛠️"
link: "https://dev.to/fsmutimeer/stop-using-ddl-autoupdate-in-production-1n65"
---

<p><code>spring.jpa.hibernate.ddl-auto=update</code> is the fastest way to get started: change an entity, restart, and the table follows. It stays in the configuration long after the first demo, and one day it runs against a database with real customers in it.</p> <p>This article makes three ordinary entity changes with <code>update</code> switched on and shows what Hibernate does to the database.

## Read More

[Read the full article](https://dev.to/fsmutimeer/stop-using-ddl-autoupdate-in-production-1n65)
