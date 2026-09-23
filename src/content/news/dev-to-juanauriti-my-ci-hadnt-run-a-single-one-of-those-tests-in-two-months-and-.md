---
title: "My CI hadn't run a single one of those tests in two months and stayed green the whole time"
category: "Tools"
date: "Sep 23, 2026"
excerpt: "<p>I added a dependency to a test helper and forgot to declare it in the dev extra. Locally it was already installed, so everything passed. In CI it wasn't, and the tests that needed it did not fail.<"
icon: "🛠️"
link: "https://dev.to/juanauriti/my-ci-hadnt-run-a-single-one-of-those-tests-in-two-months-and-stayed-green-the-whole-time-n15"
---

<p>I added a dependency to a test helper and forgot to declare it in the dev extra. Locally it was already installed, so everything passed. In CI it wasn't, and the tests that needed it did not fail.</p> <p>They skipped.</p> <p>Skips exit 0. The checkmark stayed green for two months.</p> <h2> Why it skips instead of failing </h2> <p>The pattern is one line, it's in every codebase, and it's usually

## Read More

[Read the full article](https://dev.to/juanauriti/my-ci-hadnt-run-a-single-one-of-those-tests-in-two-months-and-stayed-green-the-whole-time-n15)
