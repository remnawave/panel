---
sidebar_position: 1
slug: /features/hwid-device-limit
title: HWID device limit
---

:::info
This feature works only with a few client applications (which currently support sending a HWID header when receiving the subscription content).

:::

:::tip
**HWID Device Limit** is fully optional and **disabled by default**.

:::

## Overview

HWID Device Limit is a feature that allows you to restrict the number of devices that can use a subscription.

If the `HWID_DEVICE_LIMIT_ENABLED` variable is set to `true`,
Remnawave will use HWID and other headers to limit the number of devices that can use a subscription.

Remnawave will strictly enforce the limit on the number of devices that can add the subscription.

:::danger
If `HWID_DEVICE_LIMIT_ENABLED` is set to `true` and you do not disable the HWID limit for a user in the panel, it will be **impossible** for them to get a subscription if their client application does not send a HWID header.

Remnawave will return a `404` error if no HWID header is sent.
:::

### .env configuration

```bash title=".env configuration"
### HWID DEVICE DETECTION AND LIMITATION ###
HWID_DEVICE_LIMIT_ENABLED=true
HWID_FALLBACK_DEVICE_LIMIT=5
HWID_MAX_DEVICES_ANNOUNCE="You have reached the maximum number of allowed devices for your subscription."
```

`HWID_DEVICE_LIMIT_ENABLED` - enables device limit restriction.

`HWID_FALLBACK_DEVICE_LIMIT` - the default device limit that will be used if a user does not have their own limit set.

`HWID_MAX_DEVICES_ANNOUNCE` - the message that will be displayed to the user if they exceed the device limit. (Header: `announce`)

### User limits

You have the option to set a custom limit for each user. If no value is specified, the fallback limit (`HWID_FALLBACK_DEVICE_LIMIT`) will be used.

There is also an option to disable HWID Device Limit for each user.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/hwid-device-limit/hwid-user-limits.webp" alt="HWID User Limits" width="800" />
</div>

---

In the user card, you can see the list of devices that user has added the subscription onto. You have the option to delete devices from the list. Searching for devices by HWID is also available.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/hwid-device-limit/hwid-user-devices-list.webp" alt="HWID Device Limit Settings" width="800" />
</div>

### Example configuration

```bash title="Example configuration"
HWID_DEVICE_LIMIT_ENABLED=true
HWID_FALLBACK_DEVICE_LIMIT=1
HWID_MAX_DEVICES_ANNOUNCE="You have reached the maximum number of allowed devices for your subscription."
```

In this case, the user will be able to use only one device - only in applications that support sending the `x-hwid` header.

### Supported applications

:::info
Not all client applications send a HWID header. Here is the list of applications which currently support this feature.
:::

- [Happ](https://happ.su)
- [v2RayTun](https://docs.v2raytun.com/overview/supported-headers)
- Forks by Remnawave community:
  - [Koala Clash](https://github.com/coolcoala/clash-verge-rev-lite) (Clash Verge Rev fork)
  - [FlClashX](https://github.com/pluralplay/FlClashX) (FlClash fork)

## For app developers

:::info
A standard for providing headers is offered by [Happ](https://happ.su).
:::

Remnawave is using these headers to identify the HWID and the device.

To enable support for the HWID feature in your client, the application should send the following headers when the user is adding the subscription.

```bash
x-hwid: vfjdhk66csdjhk
x-device-os: iOS
x-ver-os: 18.3
x-device-model: Iphone 14 Pro Max
user-agent: <user_agent>
```

The only required item is `x-hwid`. Other headers are optional and can be used to identify the device more accurately.

If your application has the ability to enable additional features based on where the subscription is coming from, Remnawave can send a provider id in the response headers, which you can use to figure out where the subscription is coming from.
