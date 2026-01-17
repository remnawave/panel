**Script Author:** [distillium](https://github.com/distillium)  
**Ansible Role Author:** [TheMelbine](https://github.com/TheMelbine)

### It automates

- Installing the necessary packages (`wireguard`, `resolvconf`)
- Downloading and configuring `wgcf`
- Generating and modifying the WireGuard configuration
- Connecting and checking status
- Enabling autorun of the `warp` interface

### Installing

#### Option 1: Shell Script (performed on each desired node)

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/distillium/warp-native/main/install.sh)
```

#### Option 2: Ansible Role (Recommended for automation)

```bash
ansible-galaxy install themelbine.warp_native
```

**Example playbook:**

```yaml
- hosts: warp_servers
  become: yes
  roles:
      - themelbine.warp_native
  vars:
      warp_native_state: present
      warp_native_modify_resolv: true
```

[Ansible Role Github Repository](https://github.com/TheMelbine/ansible-role-warp-native)

### Templates for Xray configuration

**Example outbound:**

```json
{
    "tag": "warp-out",
    "protocol": "freedom",
    "settings": {},
    "streamSettings": {
        "sockopt": {
            "interface": "warp",
            "tcpFastOpen": true
        }
    }
}
```

**Example routing rule:**

```json
{
    "type": "field",
    "domain": ["netflix.com", "youtube.com", "twitter.com"],
    "inboundTag": ["Node-1", "Node-2"],
    "outboundTag": "warp-out"
}
```

### Interface management

| Operation             | Command                           |
| --------------------- | --------------------------------- |
| Check service status  | `systemctl status wg-quick@warp`  |
| View interface status | `wg show warp`                    |
| Stop the interface    | `systemctl stop wg-quick@warp`    |
| Start the interface   | `systemctl start wg-quick@warp`   |
| Restart the interface | `systemctl restart wg-quick@warp` |
| Disable autorun       | `systemctl disable wg-quick@warp` |
| Enable autorun        | `systemctl enable wg-quick@warp`  |

### Uninstall

**Shell Script Method:**

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/distillium/warp-native/main/uninstall.sh)
```

**Ansible Role Method:**

```yaml
- hosts: warp_servers
  become: yes
  roles:
      - themelbine.warp_native
  vars:
      warp_native_state: absent
```
