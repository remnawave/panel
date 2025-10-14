---
title: Templates
sidebar_position: 6
---
import DocCard from '@theme/DocCard';

As mentioned earlier, when you create a user, they’re assigned a Subscription URL.

You probably noticed that when we opened our subscription URL in a browser, we saw a human-readable webpage. But when we added the same URL to a client app, it imported without any issues.

This happens because Remnawave automatically detects who is accessing the URL:

When opened from a browser, Remnawave recognizes it and serves the webpage.

When a request comes from a client application, Remnawave delivers the subscription in the appropriate format based on the client type.

You can customize what the client app receives in the `Templates` section. Since many client apps use different cores under the hood, you will need to configure each of them individually.

Generally, subscription formats fall into four main families:

* **Mihomo**
* **Base64**
* **Xray-json**
* **Sing-box**

```mdx-code-block
<DocCard
  item={{ type: 'link', label: 'Client Apps', description: 'Browse all client applications compatible with Remnawave and the cores they use.', href: '/docs/clients' }}
/>
```
<br></br>
<img src={require('./images/41.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Templates menu" />

### Mihomo {#mihomo}

<img src={require('./images/42.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Mihomo template" />
This format was originally known as Clash. However, the original Clash client and server core are no longer maintained. They’ve since been replaced by Mihomo, which is now the de facto successor.

:::tip Learn More
You can find the Mihomo documentation [here](https://wiki.metacubex.one/config/).

---

Mihomo supports special Remnawave keys. Check out this [article](/docs/guides/templates/mihomo) to learn more.
:::

### Xray-json {#xray-json}

<img src={require('./images/43.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Xray-json template" />

This is one of the newer formats, used in client applications that are based on the Xray core.

:::tip Learn More
You can find the Xray documentation [here](https://xtls.github.io).
:::

### Sing-box {#sing-box}

<img src={require('./images/44.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Sing-box template" />

This format is analogous to Xray-json but is used in client applications based on the Sing-box core.

:::tip Learn More
You can find the Sing-box documentation [here](https://sing-box.sagernet.org/configuration/).
:::

### Base64 {#base64}

There is no template for this format. It is one of the oldest formats and consists of a simple list of server configurations, separated by a `\n` character and encoded in Base64.

This subscription format is used as a fallback when the client application does not match any of the other specific formats.
