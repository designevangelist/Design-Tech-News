---
title: "Validate JWTs from Multiple Issuers in kgateway"
category: "Tools"
date: "May 17, 2026"
excerpt: "<p>Production APIs often need to accept tokens from more than one identity provider for example, a tenant's own Auth0 tenant <em>and</em> Google Workspace for internal tools. kgateway's <code>JWTPolic"
icon: "🛠️"
link: "https://dev.to/emmsddev/validate-jwts-from-multiple-issuers-in-kgateway-561f"
---

<p>Production APIs often need to accept tokens from more than one identity provider for example, a tenant's own Auth0 tenant <em>and</em> Google Workspace for internal tools. kgateway's <code>JWTPolicy</code> resource lets you declare multiple issuers in one policy and attach it to any <code>HTTPRoute</code>, so you don't need a separate gateway per IdP.</p> <p>This guide walks through a working, 

## Read More

[Read the full article](https://dev.to/emmsddev/validate-jwts-from-multiple-issuers-in-kgateway-561f)
