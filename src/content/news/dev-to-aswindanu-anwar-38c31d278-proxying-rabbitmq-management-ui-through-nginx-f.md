---
title: "Proxying RabbitMQ Management UI Through Nginx (Fixing the %2F Problem)"
category: "Tools"
date: "Jul 1, 2026"
excerpt: "<h2> The Problem </h2> <p>When you put RabbitMQ's Management UI behind an nginx reverse proxy under a<br> sub-path like <code>/rabbitmq/</code>, queue detail pages and many API calls break silently.</"
icon: "🛠️"
link: "https://dev.to/aswindanu_anwar_38c31d278/proxying-rabbitmq-management-ui-through-nginx-fixing-the-2f-problem-3dj0"
---

<h2> The Problem </h2> <p>When you put RabbitMQ's Management UI behind an nginx reverse proxy under a<br> sub-path like <code>/rabbitmq/</code>, queue detail pages and many API calls break silently.</p> <p>The root cause: nginx normalizes the request URI before proxying. It decodes<br> <code>%2F</code> (the URL-encoded forward slash) into a literal <code>/</code>. RabbitMQ's Management<br> API use

## Read More

[Read the full article](https://dev.to/aswindanu_anwar_38c31d278/proxying-rabbitmq-management-ui-through-nginx-fixing-the-2f-problem-3dj0)
