---
title: "Replace Semgrep, Trivy, and Gitleaks scripts with one scan gate"
category: "Tools"
date: "Oct 19, 2026"
excerpt: "<p>The merge request is green, then release is blocked by a secret or dependency CVE—usually because Semgrep, Trivy, and Gitleaks each own a job: three logs, three exit codes, no shared Finding, no sh"
icon: "🛠️"
link: "https://dev.to/wenping/replace-semgrep-trivy-and-gitleaks-scripts-with-one-scan-gate-4pnb"
---

<p>The merge request is green, then release is blocked by a secret or dependency CVE—usually because Semgrep, Trivy, and Gitleaks each own a job: three logs, three exit codes, no shared Finding, no shared suppressions.</p> <blockquote> <p><strong>Takeaway:</strong> Put SAST (static application security testing), secret scanning, and SCA (software composition analysis for deps/artifacts/images) int

## Read More

[Read the full article](https://dev.to/wenping/replace-semgrep-trivy-and-gitleaks-scripts-with-one-scan-gate-4pnb)
