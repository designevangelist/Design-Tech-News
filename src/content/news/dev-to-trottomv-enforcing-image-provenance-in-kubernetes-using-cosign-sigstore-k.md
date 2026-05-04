---
title: "🔐Enforcing image provenance in Kubernetes using Cosign + Sigstore + Kyverno"
category: "Tools"
date: "May 4, 2026"
excerpt: "<p>What if your Kubernetes cluster simply refused to run unsigned images?</p> <p>I spent some time experimenting with enforcing image provenance in a small Kubernetes setup using MicroK8s.</p> <p>The "
icon: "🛠️"
link: "https://dev.to/trottomv/enforcing-image-provenance-in-kubernetes-using-cosign-sigstore-kyverno-kna"
---

<p>What if your Kubernetes cluster simply refused to run unsigned images?</p> <p>I spent some time experimenting with enforcing image provenance in a small Kubernetes setup using MicroK8s.</p> <p>The idea was simple:</p> <blockquote> <p>Only container images with valid cryptographic signatures are allowed to run in the cluster.</p> </blockquote> <p>For this I used:</p> <ul> <li>GitLab CI/CD (build

## Read More

[Read the full article](https://dev.to/trottomv/enforcing-image-provenance-in-kubernetes-using-cosign-sigstore-kyverno-kna)
