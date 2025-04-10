---
sidebar_position: 1
slug: /features/hwid-device-limit
title: HWID device limit
---

:::info
This feature currenly in beta and only a few applications currenly support it.

:::

:::tip
**HWID Device Limit** is fully optional and **disabled by default**.

:::

## Overview

HWID Device Limit is a feature that allows you to restrict the number of devices that can request a subscription.

If the `HWID_DEVICE_LIMIT_ENABLED` variable is set to `true`,
Remnawave will use HWID and other headers to limit the number of devices that can request a subscription.

Remnawave will strictly enforce the limit on the number of devices that can request a subscription.

:::danger
If `HWID_DEVICE_LIMIT_ENABLED` is set to `true`, it will be **impossible** to get a subscription if the client application does not send the HWID.

Enable only if you will use only supported applications.

Remnawave will return `404` error if the HWID is not sent.
:::

### .env configuration

```bash
### HWID DEVICE DETECTION AND LIMITATION ###
HWID_DEVICE_LIMIT_ENABLED=true
HWID_FALLBACK_DEVICE_LIMIT=5
HWID_MAX_DEVICES_ANNOUNCE="You have reached the maximum number of devices for your subscription."


### HWID DEVICE DETECTION PROVIDER ID ###
# Apps, which currently support this feature:
# - Happ
PROVIDER_ID="123456"
```

`HWID_DEVICE_LIMIT_ENABLED` - enables device limit restriction.

`HWID_FALLBACK_DEVICE_LIMIT` - device limit that will be used if the user does not have their own limit set.

`HWID_MAX_DEVICES_ANNOUNCE` - message that will be displayed to the user if they exceed the device limit. (Header: `announce`)

### User limits

There is a option to set custom limit for each user. If is no value set, fallback(`HWID_FALLBACK_DEVICE_LIMIT`) limit will be used.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/hwid-device-limit/hwid-user-limits.webp" alt="HWID User Limits" width="800" />
</div>

---

In user card, you can see list of devices, which user used to get the subscription. You can delete any device from the list and simple search for device by HWID is also available.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/features/hwid-device-limit/hwid-user-devices-list.webp" alt="HWID Device Limit Settings" width="800" />
</div>

### Example configuration

```bash
HWID_DEVICE_LIMIT_ENABLED=true
HWID_FALLBACK_DEVICE_LIMIT=1
HWID_MAX_DEVICES_ANNOUNCE="You have reached the maximum number of devices for your subscription."
```

In this case, user will be able to use only one device and only in application, which will send `x-hwid` header.

### Supported applications

:::info
Not all client applications send HWID header. Here is the list of applications, which currently support this feature.
:::

- [Happ](https://happ.su)

## For app developers

:::info
Initial header standart is offered by [Happ](https://happ.su).
:::

Remnawave is using this headers to identify HWID and device.

Your applicatoins should send this headers when user is adding the subscription.

```bash
x-hwid: vfjdhk66csdjhk
x-device-os: iOS
x-ver-os: 18.3
x-device-model: Iphone 14 Pro Max
user-agent: <user_agent>
```

The only required header is `x-hwid`. Other headers are optional and can be used to identify the device more accurately.

If your application use some additonal features, Remnawave will send provider id in the response headers.

```bash
providerid: 12345
```

:::info
Provider ID will be sent only if `PROVIDER_ID` is set in the .env file.
:::
