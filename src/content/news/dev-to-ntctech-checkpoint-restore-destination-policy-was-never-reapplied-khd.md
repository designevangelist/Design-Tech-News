---
title: "Checkpoint Restore: Destination Policy Was Never Reapplied"
category: "Tools"
date: "Sep 30, 2026"
excerpt: "<p>A checkpoint restore can rebuild a process from saved state without passing that state back through the destination's normal policy translation. When it does, the security context on the Pod spec d"
icon: "🛠️"
link: "https://dev.to/ntctech/checkpoint-restore-destination-policy-was-never-reapplied-khd"
---

<p>A checkpoint restore can rebuild a process from saved state without passing that state back through the destination's normal policy translation. When it does, the security context on the Pod spec describes the workload that was approved, and the process on the node is the one that was saved.</p> <p>That is a boundary problem before it is a vulnerability problem. Kubernetes has one place where p

## Read More

[Read the full article](https://dev.to/ntctech/checkpoint-restore-destination-policy-was-never-reapplied-khd)
