## Config Profiles

A Config Profile, in the context of Remnawave, represents a complete server configuration for the [Xray](https://xtls.github.io/en/config/) core.

In this configuration, you define _inbounds_ that your users will later connect to.

**The details of Xray configuration setup will not be described here, as this is a topic for independent study - use the official [Xray](https://xtls.github.io/en/config/) documentation to learn about all the capabilities of the core.**

When creating a new Config Profile, it is created by default with one _inbound_ of type **Shadowsocks**. After the Config Profile is created - you can modify this or add a new _inbound_.

_Tip: To add a new inbound, for example with the **VLESS** protocol - simply add another object inside the `inbounds:[]` array._

Currently, Remnawave supports protocols such as: `VLESS`, `Trojan`, `Shadowsocks` (`chacha20-ietf-poly1305`). And also the following transports: `RAW (TCP)`, `XHTTP`, `Websocket`, `HTTPUpgrade`, `gRPC`.

It's important to note that Remnawave also supports protocols: `mixed(socks)`, `wireguard`, `http` - however, the panel will completely ignore them and user management for these protocols will be unavailable. These _inbounds_ will be passed to Xray in the exact form you specify them.

For the main protocols (`VLESS`, `Trojan`, `Shadowsocks`), Remnawave will manage the list of users that will be inside the server configuration. No additional actions are required on your part.

---

### Config Profiles List

In the general list of Config Profiles, a brief summary is available for each created Config Profile. Under the Config Profile name, you can see the number of active _inbounds_ within it, as well as the number of active **nodes** on which this Config Profile is active. Both icons are clickable - clicking on them will open the corresponding sections.

When clicking on _inbounds_ - a list of _inbounds_ will open, and for each inbound, it will show on how many internal squads this _inbound_ is activated.
When clicking on _nodes_ - a list of _nodes_ where this specific Config Profile is active will open.

In the additional actions menu (down arrow), options for quick Config Profile viewing, viewing Config Profile with snippets, as well as other service options are available.

---

### Config Profile Editor

The Config Profile editor provides a full-featured JSON editor with syntax checking. Also, when hovering over certain objects, a tooltip with information from the Xray documentation will be available.

With any changes, the entire configuration is immediately validated by running a lightweight version of the core. Such validation helps prevent trivial errors and typos.

In the additional menu (at the very bottom, button with three bars), additional options are available. Let's skip the basic things: copy all, select all, and so on - these options are self-explanatory.

The "**Download from Github**" option will open an additional menu where you can download configuration examples from users. **These examples are not ready-to-use configurations, but are merely examples - keep this in mind.**

The "**Generate Keys**" option allows you to quickly and conveniently generate necessary key pairs right in the browser - for example, in the case of `Reality`, you will definitely need a `privateKey`, which can be generated in this menu. Other generation options are also available there, which will be useful for `Vless Encryption` - `ML-DSA65` and `ML-KEM768`.

---

### Snippets

When you have many Config Profiles - it can be quite difficult to quickly change small details that are present in all Config Profiles but differ in minor aspects.

For example, you have several profiles - let's say 10 pieces. In each of the 10, the routing section is the same and you would like to quickly and conveniently replace the rules in all profiles at once. With the snippets functionality, you only need to change the "rule" or "rules" in one place, and then they will automatically be pulled into the profiles.

Currently, you can predefine array elements for objects such as `outbounds` and `rules`. After creating a snippet, it will be available in one of these objects.

```
{
  "outbounds": [
    {
      "snippet": "snippet-name"
    }
  ]
}
```

Additional information about them is available by clicking on the question mark in the snippets menu.

### Flow Control (VLESS)

_This feature is available only in version 2.3.0 and above._

By default, Remnawave automatically adds the `flow` parameter for the following configurations: VLESS+TLS, REALITY+RAW, or TCP.

If you wish to override this behavior, add the `flow` field to the `settings` object.

```json
"settings": {
  "flow": "",
  "clients": [],
  "decryption": "none"
},
```

Available values for `flow`:

- `xtls-rprx-vision`
- `""`
