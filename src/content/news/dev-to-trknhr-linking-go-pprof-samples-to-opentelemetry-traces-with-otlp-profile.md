---
title: "Linking Go pprof Samples to OpenTelemetry Traces with OTLP Profiles"
category: "Tools"
date: "Aug 10, 2026"
excerpt: "<p>Traces tell us which request was slow. CPU profiles tell us which functions consumed CPU time.</p> <p>Can we start from a slow span and open only the CPU profile samples captured while that span wa"
icon: "🛠️"
link: "https://dev.to/trknhr/linking-go-pprof-samples-to-opentelemetry-traces-with-otlp-profiles-1mf0"
---

<p>Traces tell us which request was slow. CPU profiles tell us which functions consumed CPU time.</p> <p>Can we start from a slow span and open only the CPU profile samples captured while that span was running?</p> <p>This article explores that question by converting Go's built-in pprof data into OTLP Profiles, then linking individual Profile Samples to OpenTelemetry Trace and Span IDs. The final 

## Read More

[Read the full article](https://dev.to/trknhr/linking-go-pprof-samples-to-opentelemetry-traces-with-otlp-profiles-1mf0)
