---
sidebar_position: 3
title:  WARP outbound over WireGuard (Without warp-cli)
---

## Setting Up WireGuard with Wgcf (Without `warp-cli`)

### Overview

This guide explains how to configure **WireGuard** using **Wgcf**, without relying on `warp-cli`. This method is ideal for VPS, proxy nodes, and traffic routing through **Cloudflare WARP**.

---

### Benefits of this method

- No need to install `warp-cli` on every node.
- Easily scalable across multiple services.

---

### 1. Download Wgcf

Go to: [Releases · ViRb3/wgcf (GitHub)](https://github.com/ViRb3/wgcf/releases)

Choose the version that matches your system. Example for Linux AMD64:
```bash title="Download command"
wget https://github.com/ViRb3/wgcf/releases/download/v2.2.26/wgcf_2.2.26_linux_amd64
```

---

### 2. Move file to system directory

```bash title="Rename and move file"
mv wgcf_2.2.26_linux_amd64 /usr/bin/wgcf
```

---

### 3. Make file executable

```bash title="Set execution permissions"
chmod +x /usr/bin/wgcf
```

---

### 4. Register account

This will generate a configuration file:
```bash title="Register new account"
wgcf register
```
A file named `wgcf-account.toml` will be created.

---

### 5. Generate WireGuard profile

```bash title="Generate config"
wgcf generate
```
A file named `wgcf-profile.conf` will appear.

---

### 6. Extract keys from config

Open the generated file:
```bash title="View config"
cat wgcf-profile.conf
```

You’ll see two important fields:
- `PrivateKey` 
- `PublicKey`

---

### 7. Configure outbound in XRAY

Add the following to your XRAY config under `outbounds`:

```json title="XRAY WireGuard outbound example"
{
  "tag": "warp",
  "protocol": "wireguard",
  "settings": {
    "secretKey": "YOUR_PRIVATE_KEY_FROM_FILE",
    "DNS": "1.1.1.1",
    "kernelMode": false,
    "address": ["172.16.0.2/32"],
    "peers": [
      {
        "publicKey": "YOUR_PUBLIC_KEY_FROM_FILE",
        "endpoint": "engage.cloudflareclient.com:2408"
      }
    ]
  }
}
```

---

### 8. Full `outbounds` block example

```json title="Full outbound list with WARP"
[
  {
    "tag": "DIRECT",
    "protocol": "freedom",
    "settings": {
      "domainStrategy": "ForceIPv4"
    }
  },
  // highlight-next-line-green
  {
  // highlight-next-line-yellow
    "tag": "warp",
  // highlight-next-line-green
    "protocol": "wireguard",
  // highlight-next-line-green
    "settings": {
// highlight-next-line-green
      "secretKey": "MISEK000000000000000000vim6zWY=",
// highlight-next-line-green
      "DNS": "1.1.1.1",
// highlight-next-line-green
      "kernelMode": false,
// highlight-next-line-green
      "address": ["172.16.0.2/32"],
// highlight-next-line-green
      "peers": [
// highlight-next-line-green
        {
// highlight-next-line-green
          "publicKey": "bm00000000000000000Vo510h2wPfgyo=",
// highlight-next-line-green
          "endpoint": "engage.cloudflareclient.com:2408"
// highlight-next-line-green
        }
// highlight-next-line-green
      ]
// highlight-next-line-green
    }
// highlight-next-line-green
  },
  {
    "tag": "BLOCK",
    "protocol": "blackhole"
  }
]
```

---

### 9. Add routing rule for specific domains

To route certain domains through WARP, add the following to the `routing` section:

```json title="Routing rule example"
{
// highlight-next-line-yellow
  "outboundTag": "warp",
  "domain": [
    "geosite:google-gemini",
    "openai.com",
    "ipinfo.io",
    "spotify.com",
    "canva.com"
  ],
  "type": "field"
}
```

---

### ⚠️ Security Tip

> Never publish your `PrivateKey` in public repositories or chat groups — it can compromise your connection.

---

### Conclusion

Using **WireGuard with Wgcf** is a clean and scalable way to connect to **Cloudflare WARP** without installing `warp-cli`. 
