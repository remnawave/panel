---
title: Server-Side Routing
sidebar_position: 7
---

:::warning Demonstration Only | Not Production-Ready
This guide is meant purely as a demonstration of server-side routing. Do not assume that copying these examples will produce a fully functional setup in a production. It does not cover all capabilities of Xray-core, nor is it guaranteed to work perfectly in every environment.

For full details on configuration syntax and behavior, refer to the [official Xray documentation](https://xtls.github.io/config/).
:::

Some users may have noticed that Remnawave automatically clears the `clients` array from the Node's configuration. This is not a bug, but rather an intended behavior. Remnawave clears it to ensure that only necessary configurations are retained for certain features to function properly.

---

In this guide, we'll walk through setting up server-side traffic routing using two Nodes: `RU` and `DE`. Users will connect to the `RU` Node. From there, the traffic will be routed as follows:

- Traffic to `.ru` websites will be proxied directly through the `RU` Node.
- All other traffic will be routed through the `DE` Node.

To achieve this, we'll create a _service user_ that will facilitate the traffic routing.

As a result, the traffic "flow" could look something like this:

1. The user opens `google.com`.
2. The request first reaches the `RU` Node.
3. The `RU` Node applies the routing rules. Since `google.com` is not a `.ru` domain, the traffic is routed to the `DE` Node.
4. The `DE` Node completes the connection to `google.com`.

This type of server-side routing setup is often referred to as a "bridge".

## Create a Config Profile for DE {#create-de}

Navigate to the Config Profiles section and [create a new Config Profile](/docs/learn-en/config-profiles), e.g. `DE Bridge Profile`.

```json title="DE Bridge Profile"
{
    "log": {
        "loglevel": "warning"
    },
    "dns": {},
    "inbounds": [
        {
            "tag": "BRIDGE_DE_IN",
            "port": 9999,
            "listen": "0.0.0.0",
            "protocol": "shadowsocks",
            "settings": {
                "clients": [],
                "network": "tcp,udp"
            },
            "sniffing": {
                "enabled": true,
                "destOverride": ["http", "tls", "quic"]
            }
        }
    ],
    "outbounds": [
        {
            "tag": "DIRECT",
            "protocol": "freedom"
        },
        {
            "tag": "BLOCK",
            "protocol": "blackhole"
        }
    ],
    "routing": {
        "rules": []
    }
}
```

:::warning Don't Forget to Assign the Profile and Create an Internal Squad
[Assign the newly created Config Profile](/docs/learn-en/nodes#core-configuration) to the `DE` Node. Select the `BRIDGE_DE_IN` Inbound.

---

[Create a new Internal Squad](/docs/learn-en/squads#create-internal-squad), let's call it `Bridge Squad`. Enable the Inbound we created earlier — `BRIDGE_DE_IN`.
:::

## Create a Service User {#create-service-user}

For our bridge to work, we will need to [create a user](/docs/learn-en/users#create-user). Let's call it `bridge_user`.

:::warning Don't Forget to Remove Traffic Limits and Extend the Expiry Date
Since this is a service user, we obviously don't want its subscription to expire or be limited by traffic usage. Set the `Data Limit` to `0` and `Expiry Date` to `year 2099`.
:::

Next, assign the appropriate Squad to this user. In our case, that's `Bridge Squad`.

After the service user is created, we will need to get its password. Open the user card, click on the `More Actions` button, then `Detailed Info`. There you should see `Connection Information` section.

Depending on the Inbound's protocol (Shadowsocks in our case), copy the appropriate value:

| Protocol    | Connection Info Value |
| ----------- | --------------------- |
| Trojan      | Trojan Password       |
| VLESS       | VLESS UUID            |
| Shadowsocks | SS Password           |

## Configure a Public Profile {#create-pub-profile}

Most likely, you already have a Config Profile that your users connect to. If not, refer to [this guide](/docs/learn-en/config-profiles).

For this step, we're not interested in the `"inbounds"` — instead, we'll be modifying the `"outbounds"`, `"routing"`, and `"rules"` arrays of that Profile.

```json title="Public Profile Example"
{
    "log": {
        "loglevel": "none"
    },
    "inbounds": [
        {
            "tag": "PUBLIC_RU_INBOUND",
            "port": 443,
            "listen": "0.0.0.0",
            "protocol": "vless",
            "settings": {
                "clients": [],
                "decryption": "none"
            },
            "sniffing": {
                "enabled": true,
                "destOverride": ["http", "tls", "quic"]
            },
            "streamSettings": {
                "network": "raw",
                "security": "reality",
                "realitySettings": {
                    "target": "USE YOUR OWN VALUE!",
                    "show": false,
                    "xver": 0,
                    "shortIds": [""],
                    "privateKey": "USE YOUR OWN KEY!",
                    "serverNames": ["USE YOUR OWN VALUES!"]
                }
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "tag": "DIRECT"
        },
        {
            "protocol": "blackhole",
            "tag": "BLOCK"
        }
    ],
    "routing": {
        "rules": [
            {
                "ip": ["geoip:private"],
                "outboundTag": "BLOCK"
            },
            {
                "domain": ["geosite:private"],
                "outboundTag": "BLOCK"
            },
            {
                "protocol": ["bittorrent"],
                "outboundTag": "BLOCK"
            }
        ]
    }
}
```

### Outbounds {#outbounds}

First we need to modify the `outbounds` array.

```json title="outbounds"
{
    "tag": "SS_OUTBOUND_TO_DE",
    "protocol": "shadowsocks",
    "settings": {
        "servers": [
            {
                "address": "DE NODE ADDRESS",
                "password": "PASSWORD FROM PREVIOUS STEP",
                "port": 9999,
                "level": 0,
                "method": "chacha20-ietf-poly1305"
            }
        ]
    }
}
```

| Field      | Value                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `address`  | The IP address or domain name of your `DE` Node server.                                          |
| `port`     | The Inbound port, in our case the port of `BRIDGE_DE_IN`.                                        |
| `password` | The password for the service user. Depends on the protocol you are using; see the previous step. |
| `method`   | Encryption method. For Shadowsocks in Remnawave, always use `chacha20-ietf-poly1305`.            |

### Routing and Rules {#routing-rules}

Next, modify the routing rules according to your needs.

Below is the example of a rule that makes the `RU` Node an exit node for Russian IPs and websites, while the rest of the traffic gets sent to `DE` Node.

```json title="rules"
{
    "ip": ["geoip:ru"],
    "outboundTag": "DIRECT"
},
{
    "domain": ["geosite:category-ru"],
    "outboundTag": "DIRECT"
}
```

Below is the example of a rule that proxies _all_ traffic to `SS_OUTBOUND_TO_DE` Outbound.

```json title="rules"
{
    "inboundTag": ["PUBLIC_RU_INBOUND"],
    "outboundTag": "SS_OUTBOUND_TO_DE"
}
```

The complete public Config Profile could look like this:

```json title="Complete Public Config Profile Example"
{
    "log": {
        "loglevel": "none"
    },
    "inbounds": [
        {
            "tag": "PUBLIC_RU_INBOUND",
            "port": 443,
            "listen": "0.0.0.0",
            "protocol": "vless",
            "settings": {
                "clients": [],
                "decryption": "none"
            },
            "sniffing": {
                "enabled": true,
                "destOverride": ["http", "tls", "quic"]
            },
            "streamSettings": {
                "network": "raw",
                "security": "reality",
                "realitySettings": {
                    "target": "USE YOUR OWN VALUE!",
                    "show": false,
                    "xver": 0,
                    "shortIds": [""],
                    "privateKey": "USE YOUR OWN KEY!",
                    "serverNames": ["USE YOUR OWN VALUES!"]
                }
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "tag": "DIRECT"
        },
        {
            "protocol": "blackhole",
            "tag": "BLOCK"
        },
        {
            "tag": "SS_OUTBOUND_TO_DE",
            "protocol": "shadowsocks",
            "settings": {
                "servers": [
                    {
                        "address": "DE NODE ADDRESS",
                        "password": "PASSWORD FROM PREVIOUS STEP",
                        "port": 9999,
                        "level": 0,
                        "method": "chacha20-ietf-poly1305"
                    }
                ]
            }
        }
    ],
    "routing": {
        "rules": [
            {
                "ip": ["geoip:private"],
                "outboundTag": "BLOCK"
            },
            {
                "domain": ["geosite:private"],
                "outboundTag": "BLOCK"
            },
            {
                "protocol": ["bittorrent"],
                "outboundTag": "BLOCK"
            },
            {
                "ip": ["geoip:ru"],
                "outboundTag": "DIRECT"
            },
            {
                "domain": ["geosite:category-ru"],
                "outboundTag": "DIRECT"
            },
            {
                "inboundTag": ["PUBLIC_RU_INBOUND"],
                "outboundTag": "SS_OUTBOUND_TO_DE"
            }
        ]
    }
}
```

:::tip
Xray routing rules are processed in order, from **top to bottom**.  
Here's how the rules in our example work:

1. Private IPs (`geoip:private`) → `BLOCK`  
   Traffic matching this rule is sent to the `BLOCK` Outbound, which is a `blackhole` protocol (completely blocked).

2. Private domains (`geosite:private`) → `BLOCK`  
   Same as above, but for domain names.

3. Bittorrent traffic (`bittorrent`) → `BLOCK`  
   All BitTorrent traffic is blocked.

4. Russian IPs (`geoip:ru`) → `DIRECT`  
   Traffic matching this rule is sent to the `DIRECT` Outbound, which is a `freedom` protocol (`RU` Node acts as an exit node).

5. Russian domains (`geosite:category-ru`) → `DIRECT`  
   Traffic to Russian domains also goes directly out from the RU Node.

6. No rule match (the rest of the traffic) → `SS_OUTBOUND_TO_DE`  
   Any remaining traffic arriving at the `PUBLIC_RU_INBOUND` is routed to the `DE` Node via the `Shadowsocks` Outbound we created earlier.

---

You don't have to use `Shadowsocks` as the transit protocol — you can use `VLESS` instead. Just make sure to update your configuration accordingly.
:::
