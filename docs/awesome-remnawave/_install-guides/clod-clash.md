* 💻 **Platforms** – Windows, macOS and Linux: [Mrvibecodic/clod-clash](https://github.com/Mrvibecodic/clod-clash). Android 6.0+: [Mrvibecodic/clod-clash-android](https://github.com/Mrvibecodic/clod-clash-android) ([download APK](https://mrvibecodic.github.io/clod-clash-android/en/download/)).
* 🔘 **One button** – Paste the subscription link or open a deeplink and connect. System proxy or TUN on desktop, VPN on Android. The desktop advanced mode keeps the Clash Verge Rev tools: rules, connections, logs, config editors.
* 📋 **Panel data on the home screen** – Plan name, expiry, traffic, announcements, logo, links to the cabinet, support, bot and guide; host `serverDescription` is shown under the server name.
* ⚠️ **Clear states** – "Subscription expired", "Traffic is over", "Device limit reached", "No servers from the provider" are shown in words instead of an empty server list.
* 🌐 **Blocked subscription domain** – The subscription is fetched directly and, if that fails, through the running tunnel. A backup domain can be set with the `clod-new-sub` header.
* 🧩 **Provider headers** – Optional `clod-*` response headers: cabinet / bot / guide buttons, announcements and promo, routing mode lock, ping thresholds, hidden protocol badges, mobile-only servers on Android.
* 🔑 **HWID** – Device headers for the panel device limit; the ID stays the same between updates.
* ⚙️ **Clod Core** – Open fork of stable Mihomo: a node is marked dead only after a second failed check, unstable nodes rank lower in auto-select. Stock Mihomo is bundled on desktop as a fallback core.
* 🔄 **Updates** – Built-in updater with stable and pre-release channels. Open source, GPL-3.0.
* 🛠 **Panel setup** – If your panel's default Response Rules don't list it yet, add a rule for `User-Agent` matching `^ClodClash` with response type **MIHOMO**. Details: [provider docs](https://mrvibecodic.github.io/clod-clash/en/docs/).
