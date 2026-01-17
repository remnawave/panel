---
title: Config Profiles
sidebar_position: 5
---

import DocCard from '@theme/DocCard';

:::warning
This article **does not** cover how to configure Xray-core itself.

For details on configuration syntax and behavior, refer to the [official Xray documentation](https://xtls.github.io/config/).
:::

As mentioned earlier, a Config Profile is essentially a full Xray-core configuration "template" for a Node. Each Profile contains everything the Node needs to run — including all Inbounds and general settings.

---

## Create a Config Profile {#create-profile}

Let's create a new Profile.

Navigate to the `Config Profiles` section and click `Create Config Profile`.

<img src={require('./images/32.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Config Profiles list" />

After entering a name for the Profile, a configuration editor will open.

<img src={require('./images/33.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Create profile" />

Here you can add or remove Inbounds and adjust any other Xray settings.

For demonstration purposes, let’s load a pre-made template using the `Load from GitHub` button.

<img src={require('./images/34.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Load from Github" />

By default, this template only contains one Inbound. Let’s add a second one — `VLESS` — to the Inbounds array.

<img src={require('./images/35.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Add second inbound" />

Once you're done, return to the Config Profile list to confirm our new setup.

<img src={require('./images/36.webp').default} width="100%" style={{borderRadius: '8px'}} alt="New profile in list" />

As you can see, the new profile we just created — `Sample` — has appeared in the list.

Below the profile name, you'll notice two small icons:

- The **left** icon shows the number of **Inbounds** defined in the Profile.
- The **right** icon shows the number of **Nodes** currently using this Profile.

In our case, the `Sample` Profile contains 2 Inbounds and is not yet used by any Node.

Let’s activate this profile on our Node. Go back to the Node’s settings (`Nodes` → `Management` → `Node Card` → `Change Profile`), select the new Profile from the list, and enable both of its Inbounds.
<img src={require('./images/37.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Activate new profile on node" />

Now that the Node is using the updated profile, head over to the `Hosts` page.

Whether you're creating a new Host or editing an existing one, you’ll now be able to assign the new Inbounds from this profile to that Host.

<img src={require('./images/38.webp').default} width="100%" style={{borderRadius: '8px'}} alt="New inbounds available for hosts" />

However, even though the Node is now using the new Profile and Hosts have been configured, users still won’t have access to the new Inbounds — unless they’re enabled in the relevant **Internal Squad**.

Let’s fix that.

Navigate to the `Internal Squads` page and edit the only available squad — `Default-Squad`.

<img src={require('./images/39.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Editing Internal Squad" />

As you can see, only the `Shadowsocks` Inbound is currently enabled.

Let’s enable the remaining Inbounds from the new Profile.

<img src={require('./images/40.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Enable all inbounds in squad" />

Now that everything is set, click `Save` to apply the changes and finish creating your custom Config Profile.

### Use Snippets {#snippets}

Snippets simplify the process of creating Config Profiles by allowing you to predefine some of your settings.

<img src={require('./images/47.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Snippets" />

A snippet should include an array of `"outbounds"` or `"routing"` objects. You can take advantage of autocomplete to quickly insert snippet names, and hover over them in the editor to preview their contents.

:::tip For example
Snippets are applied accross all Profiles.

Assume you have 10 Config Profiles. Each of them uses identical routing rules.  
You can edit these rules through snippets, instead of manually changing each Profile.
:::

---

Let's create a snippet for routing `geoip:private` to `BLOCK`.

First, open the snippets menu by clicking `{ }` at the bottom of the editor. Click `+ New snippet`.  
Let's name it `Block Private` since we are creating a routing rule for private connections.

<img src={require('./images/48.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Snippets" />

We want to send `geoip:private` to `BLOCK`, so your snippet should look like this:

```json title="Block Private"
[
  {
    "ip": [
      "geoip:private"
    ],
    "outboundTag": "BLOCK",
  }
]
```
:::warning
Remember to use square brackets `[]` at the beginning and end of your snippet.
:::

Now that you’ve defined the snippet, reference it in your Xray JSON with `"snippet": "Block Private"`.

<img src={require('./images/49.webp').default} width="100%" style={{borderRadius: '8px'}} alt="Snippets" />

Complete routing object will look like this:

```json title="routing"
"routing": {
  "rules": [
    {
      "snippet": "Block Private"
    }
  ]
}
```

---

```mdx-code-block
<DocCard
  item={{ type: 'link', label: 'Templates', description: 'Define what client applications receive.', href: '/docs/learn-en/templates' }}
/>
```
