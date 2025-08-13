---
sidebar_position: 1
title: Mihomo
---

## Introduction

**Mihomo** (formerly Clash Meta) supports three special Remnawave keys that extend the functionality of proxy groups and providers configuration. These keys allow creating proxy chains, managing server additions, and configuring random connection rotation.

---

## Remnawave Keys

### 1. `include-proxies: true`

**Used only in `proxy-providers`** for automatic proxy addition when creating chains.

#### Example from remnawave.yaml:

```yaml
proxy-providers:
    yournameproxyprovider: # Your proxy-provider name
        type: inline
        remnawave: # Custom field used only in Remnawave
            include-proxies: true # Adds proxies for chain creation
        payload:
```

#### Practical application:

```yaml
# Creating chain through Russian server for access to European servers
proxy-providers:
    russlanddialer: # Chain from Russia to other countries
        type: inline
        exclude-filter: '🇷🇺|🇳🇱' # Filter for proxies that won't be used for chaining
        remnawave: # Custom field used only in Remnawave
            include-proxies: true # Adds proxies for chain creation
        override:
            dialer-proxy: 🇷🇺 Russia # Host name that will be chain for European exit (can also be proxy-group)
            additional-prefix: '🇷🇺➡️' # Prefix for proxy name (indicates bridge from Russia)
        payload:

# Using chain in group
proxy-groups:
    - name: PROXY
      icon: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hijacking.png
      type: select
      proxies:
          - ⚡️ Fastest
          # LEAVE THIS LINE!
      use: # This parameter adds chains to the group
          - russlanddialer
    - name: ⚡️ Fastest
      icon: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png
      type: url-test
      tolerance: 150
      url: https://cp.cloudflare.com/generate_204
      interval: 300
      include-all: true # Core functionality, adds all available proxies to this group
      exclude-filter: '🇷🇺' # Excludes Russia from them
      remnawave: # Custom field used only in Remnawave (disables adding all proxies to this section, except manually specified)
          include-proxies: false
      proxies:
          # LEAVE THIS LINE!
```

---

### 2. `include-proxies: false`

**Used only in `proxy-groups`** to exclude automatic proxy addition to the group.

#### Practical application:

**Fast auto-selection group:**

```yaml
proxy-groups:
    - name: ⚡️ Fastest
      icon: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png
      type: url-test
      tolerance: 150
      url: https://cp.cloudflare.com/generate_204
      interval: 300
      include-all: true # Core functionality, adds all available proxies to this group
      exclude-filter: '🇷🇺' # Excludes Russia from them
      remnawave: # Custom field used only in Remnawave (disables adding all proxies to this section, except manually specified)
          include-proxies: false
      proxies:
          # LEAVE THIS LINE!
```

**Country-specific group for load balancing:**

```yaml
proxy-groups:
    - name: ⚡️ Fastest
      icon: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png
      type: url-test
      tolerance: 150
      url: https://cp.cloudflare.com/generate_204
      interval: 300
      include-all: true # Core functionality, adds all available proxies to this group
      exclude-filter: '^(?!🇫🇮 Finland$).*🇫🇮 Finland.*' # Excludes Finland from them
      remnawave: # Custom field used only in Remnawave (disables adding all proxies to this section, except manually specified)
          include-proxies: false
      proxies: # All available proxies will be added here, except Finland - it will be added as a group (for load balancing)
          - 🇫🇮 Finland
          # LEAVE THIS LINE!
    - name: 🇫🇮 Finland
      icon: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Finland.png
      hidden: true # Hide group from general list
      type: load-balance # Balancing type that distributes load across all working servers in Finland
      lazy: true
      strategy: sticky-sessions
      remnawave: # Custom field used only in Remnawave (disables adding all proxies to this section, except manually specified)
          include-proxies: false
      include-all: true # Core functionality, adds all available proxies to this group
      filter: '🇫🇮 Finland' # Filter connections containing this value (hosts should be named like 🇫🇮 Finland1, 🇫🇮 Finland2, etc.)
      url: https://cp.cloudflare.com/generate_204
      interval: 300
      proxies:
          # LEAVE THIS LINE!
```

**Hidden group for direct connection:**

```yaml
proxy-groups:
    - name: 🔓 No proxy
      remnawave:
          include-proxies: false # Excludes all proxies
      type: select
      hidden: true
      proxies:
          - DIRECT # Direct connection only
```
or
```yaml
proxies:
  - name: "🔓 No proxy"
    type: direct
    udp: true
```
---

### 3. `select-random-proxy: true`

**Used only in `proxy-groups`** for random addition of one proxy from the entire array of user connections.

#### Practical application:

```yaml
proxy-groups:
    - name: 🎲 Random
      icon: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Round_Robin.png
      type: select
      remnawave: # Custom field used only in Remnawave
          select-random-proxy: true # Adds one random user host to this group
      proxies:
          # LEAVE THIS LINE!
```

### 4. `shuffle-proxies-order: true`

**Used only in `proxy-groups`** to randomly shuffle and add all user hosts to the group. The host order does not depend on the sorting in the Hosts panel section and changes every time the subscription is updated. If the first server in the shuffled list becomes unavailable, it will automatically switch to the next one.

#### Practical application:

```yaml
proxy-groups:
    - name: 🎲 Random
      icon: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Round_Robin.png
      type: fallback
      url: https://cp.cloudflare.com/generate_204
      interval: 300
      remnawave: # Custom field used only in Remnawave
          shuffle-proxies-order: true # Enables random shuffling of user hosts for this group
      proxies:
          # LEAVE THIS LINE!
```

---

## Additional capabilities

You can learn about all core capabilities in the official documentation: [https://wiki.metacubex.one/](https://wiki.metacubex.one/)
