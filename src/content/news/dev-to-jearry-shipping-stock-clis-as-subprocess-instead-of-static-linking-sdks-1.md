---
title: "Shipping Stock CLIs as Subprocess Instead of Static-Linking SDKs"
category: "Tools"
date: "Aug 23, 2026"
excerpt: "<p>I'm building yyzTools, which bundles 9 third-party engines (OpenSSL, FFmpeg, ImageMagick, pdfcpu, Aria2, 7-Zip, RapidOCR, Everything...). I chose to spawn them as subprocesses rather than static-li"
icon: "🛠️"
link: "https://dev.to/jearry/shipping-stock-clis-as-subprocess-instead-of-static-linking-sdks-1jl8"
---

<p>I'm building yyzTools, which bundles 9 third-party engines (OpenSSL, FFmpeg, ImageMagick, pdfcpu, Aria2, 7-Zip, RapidOCR, Everything...). I chose to spawn them as subprocesses rather than static-link their SDKs. Here's why—and the cost.</p> <p>The conventional approach<br> When your app needs OpenSSL crypto, FFmpeg video processing, ImageMagick image ops—you reach for the SDK. Link libssl, link

## Read More

[Read the full article](https://dev.to/jearry/shipping-stock-clis-as-subprocess-instead-of-static-linking-sdks-1jl8)
