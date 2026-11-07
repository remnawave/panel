* 💻 **Platforms** – Windows, macOS and Linux: [Mrvibecodic/clod-clash](https://github.com/Mrvibecodic/clod-clash). Android 6.0+: [Mrvibecodic/clod-clash-android](https://github.com/Mrvibecodic/clod-clash-android) ([download APK](https://mrvibecodic.github.io/clod-clash-android/en/download/)).
* 🔘 **One button** – Paste the subscription link or open a deeplink and connect. System proxy or TUN on desktop, VPN on Android. The desktop advanced mode keeps the Clash Verge Rev tools: rules, connections, logs, config editors.
* 📋 **Panel data on the home screen** – Plan name, expiry, traffic, announcements, logo, links to the cabinet, support, bot and guide; host `serverDescription` is shown under the server name.
* ⚠️ **Clear states** – An expired subscription, used-up traffic, a reached device limit or no servers from the provider are explained in words instead of an empty server list.
* 🌐 **Blocked subscription domain** – If the subscription can't be fetched one way, the client retries the other: directly or through the running tunnel. A backup domain can be set with the `clod-new-sub` header.
* 🧩 **Provider headers** – Optional `clod-*` response headers: cabinet / bot / guide buttons, announcements and promo, routing mode lock, ping thresholds, hidden protocol badges, mobile-only servers on Android.
* 🔑 **HWID** – Device headers for the panel device limit; the ID stays the same between updates.
* ⚙️ **Clod Core** – Open fork of stable Mihomo: a node whose check hangs or drops is checked a second time before it is marked dead, unstable nodes rank lower in auto-select. Stock Mihomo is bundled on desktop as a fallback core.
* 🔄 **Updates** – Built-in updater with stable and pre-release channels. Open source, GPL-3.0.
* 🛠 **Panel setup** – If your panel's default Response Rules don't list it yet, add a rule for `User-Agent` matching `^ClodClash` with response type **MIHOMO**. Details: [provider docs](https://mrvibecodic.github.io/clod-clash/en/docs/).
