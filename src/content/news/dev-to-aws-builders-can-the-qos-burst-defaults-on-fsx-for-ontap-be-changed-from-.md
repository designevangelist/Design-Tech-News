---
title: "Can the QoS burst defaults on FSx for ONTAP be changed from ONTAP 9.19.1, the same as on-premises? I checked on a live file system"
category: "Tools"
date: "Oct 20, 2026"
excerpt: "<p>Conclusion first: on Amazon FSx for NetApp ONTAP you can change the QoS burst defaults. Not only is the configuration accepted — a brief overshoot above the ceiling (the burst) happened exactly as "
icon: "🛠️"
link: "https://dev.to/aws-builders/can-the-qos-burst-defaults-on-fsx-for-ontap-be-changed-from-ontap-9191-the-same-as-on-premises-2ce7"
---

<p>Conclusion first: on Amazon FSx for NetApp ONTAP you can change the QoS burst defaults. Not only is the configuration accepted — a brief overshoot above the ceiling (the burst) happened exactly as configured. The catch: you cannot change this setting from the AWS Management Console or the AWS CLI (the AWS API). FSx for ONTAP has two ways in — the AWS-side consoles and APIs, and a separate path 

## Read More

[Read the full article](https://dev.to/aws-builders/can-the-qos-burst-defaults-on-fsx-for-ontap-be-changed-from-ontap-9191-the-same-as-on-premises-2ce7)
