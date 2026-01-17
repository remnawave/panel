## Hosts

In brief, hosts are the client representation of your server configuration. If an **inbound** is required on the server for a successful connection, then on the client side the user needs a **host**.

A group of hosts (or you could say a _list_) represents a subscription. A subscription is a link, and after adding such a link to a client application, the user sees a list of hosts (servers, if you will). The user can then choose any of them.

It's important to note that a **host** is primarily just a client interpretation of your server component. For example, if a user has received a subscription (the list of hosts is already in their hands) and you disable this host - the user will **still be able** to connect to the server that this host points to. But upon updating the subscription - they will no longer have this host.

Since a host is directly bound to an inbound (which is located in the profile) - the host inherits most settings from it. However, in some cases it can be useful to override or supplement these settings - that's what the **advanced** settings section is for.

---

When creating a new host or editing an existing one, you have access to two sections: **Basic** and **Advanced** (settings).

### Basic

#### Remark

In this field, you define how this host will be displayed in the client application. Usually, the name of the country the user will be connecting to is written here.

_Tip: To display a country flag in the client application - add an emoji at the very beginning of the remark._

#### Inbound Selection (and profile)

As mentioned above - a host is just a client representation of your server configuration, so selecting an inbound is a mandatory requirement for creating a host. Depending on the number of inbounds, nodes, and profiles, select the appropriate inbound in the selection menu.

#### Address and Port

The address is a domain or IP address. In most cases, you need to specify the address or domain of the server the user will be connecting to. The port usually corresponds to the **inbound** port, _in some cases it may differ._

_You can also enter multiple domain names in the address field - for example: `node-1.com,node-2.com,node-3.com`. You might think that this could theoretically be used for some load balancing, but it's important to note - the user will receive only one of these addresses when requesting a subscription (which specific one they get is determined randomly and is not tied to any load balancing logic). Consequently - until the user updates the subscription in the client application (or unless auto-update triggers) - the user's address will not change._

#### Tag and Nodes

These parameters are not visible to the end user, they are more for the panel administrator (you) to make it easier to navigate through created hosts in the future if there are many of them.
In particular, selecting a node in this field doesn't play a functional role - **this is only a visual binding for easier navigation in the future.**

---

### Advanced

**In most cases, you don't need to edit anything from this section unless you clearly understand what purposes you're doing it for. Incorrect modification of some parameters may result in your connection not working. Approach editing each item with all seriousness and always double-check settings before applying changes.**

In this section, we won't go through every item - we'll focus on the main ones.

#### SNI (ServerNames)

In some cases, it may be necessary to override the `serverNames` object settings (which are defined within the inbound in the profile) for a specific host.

Keep in mind, `serverNames` in simple terms is the _password_ by which, for example, **Reality** determines the **validity** of the connection. If you specify an **SNI** in this field, for example `example.com`, and within the inbound `serverNames` looks like this:

```json
"serverNames": [
    "example1.com",
    "example2.com"
    ]
```

Such a connection will not work, as `example.com` is not in the list of allowed `SNI`.

#### Override SNI from Address

By default, Remnawave takes the first object from the `serverNames` array (of the inbound) to add SNI to the client host. If you enable this parameter - Remnawave will take the address (which you specified in the **Basic** section) and pass it to the client.

Among other items in this section, the `vlessRouteId` field is also worth noting, which is a small abstraction layer over Xray Core and provides you with a simple way to use the `vlessRoute` functionality that Xray provides. <a href="https://xtls.github.io/en/config/routing.html#ruleobject">Learn more about routing rules.</a>

---
