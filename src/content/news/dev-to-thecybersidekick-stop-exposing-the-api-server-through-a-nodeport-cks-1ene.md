---
title: "Stop exposing the API server through a NodePort (CKS)"
category: "Tools"
date: "Oct 6, 2026"
excerpt: "<h2> Stop exposing the API server through a NodePort (CKS) </h2> <p>Lesson three of the CKS series. A security review found the Kubernetes API server reachable through a NodePort, and your job is to p"
icon: "🛠️"
link: "https://dev.to/thecybersidekick/stop-exposing-the-api-server-through-a-nodeport-cks-1ene"
---

<h2> Stop exposing the API server through a NodePort (CKS) </h2> <p>Lesson three of the CKS series. A security review found the Kubernetes API server reachable through a NodePort, and your job is to put it back behind a ClusterIP. It is one line in a manifest, plus a second step that trips up most people, because the API server will not fix the Service for you. Let's do it on a real control plane.

## Read More

[Read the full article](https://dev.to/thecybersidekick/stop-exposing-the-api-server-through-a-nodeport-cks-1ene)
