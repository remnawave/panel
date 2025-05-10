---
sidebar_position: 1
slug: /security/cloudflare-zero-trust
title: Cloudflare ZeroTrust
---

ZeroTrust is a powerful, free, and flexible tool that can be used to protect your Remnawave panel.

## Requirements
- Register an account with Cloudflare
- Purchase your own domain and link it to Cloudflare
- Have a payment card to attach to Cloudflare (any card will do, even with a zero balance, as long as it can be added). Once added, you’ll have access to the free Zero Trust plan.

## Instructions

The first thing we need to do after adding the domain is enable **SSL Strict**:

![SSL Strict](/security/zero-trust/ssl_strict.webp)

Next, we need to enable **Proxied** mode:

![Proxied Mode](/security/zero-trust/proxied.webp)

Go to https://one.dash.cloudflare.com and select your account. Then follow the steps shown in the images below:

![First Step](/security/zero-trust/first_step.webp)
![Second Step](/security/zero-trust/second_step.webp)
![Third Step](/security/zero-trust/third_step.webp)
![Fourth Step](/security/zero-trust/fourth_step.webp)
![Fifth Step](/security/zero-trust/fifth_step.webp)
![Sixth Step](/security/zero-trust/sixth_step.webp)
![Seventh Step](/security/zero-trust/seventh_step.webp)

:::danger
After adding the security settings in step 7, go to **Access → Applications**, click the three dots next to your application (Edit) → **Policies → Select existing policies**, and choose your policy.
:::

Congratulations! You’ve successfully locked down your panel from the outside world!```
