---
sidebar_position: 3
slug: /installation/node/env
title: Env variables
---
## Node {#node}

### APP_PORT


:::caution  
Ensure that APP_PORT is only accessible from your panel IP!
:::

```bash
APP_PORT=2222
```

### SSL_CERT

You can retrieve it from the main panel when creating a node.

:::warning

Do not share your certificate with anyone.

:::

```bash
SSL_CERT=PUT CERTIFICATE HERE
```