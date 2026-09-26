---
title: "Sending a frame (not a byte) is a Kafka API choice. WKafka makes it format='image'"
category: "Tools"
date: "Sep 26, 2026"
excerpt: "<p>Kafka delivers bytes. It does not care if they are a contract, a cat photo or a satellite frame. For a team that streams vision data, 'raw bytes' means every consumer re-implements decoding, shape-"
icon: "🛠️"
link: "https://dev.to/william_rodriguez_65a5898/sending-a-frame-not-a-byte-is-a-kafka-api-choice-wkafka-makes-it-formatimage-4pmn"
---

<p>Kafka delivers bytes. It does not care if they are a contract, a cat photo or a satellite frame. For a team that streams vision data, "raw bytes" means every consumer re-implements decoding, shape-guessing and channel-order handling. WKafka's answer is a contract the library enforces: images are a first-class message.</p> <blockquote> <p>Day 03 of the WKafka open-source series — decorator-based

## Read More

[Read the full article](https://dev.to/william_rodriguez_65a5898/sending-a-frame-not-a-byte-is-a-kafka-api-choice-wkafka-makes-it-formatimage-4pmn)
