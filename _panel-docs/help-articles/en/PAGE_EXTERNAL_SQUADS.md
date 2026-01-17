## External Squads

Using external squads, you can override certain settings or templates that users use when requesting a subscription. _A user cannot have more than one active external squad._

For example, for different user groups, you can set different routing (for Happ, v2rayTUN), and different routing can also be within templates.

Using the additional menu, you can quickly assign an external squad to all users (or conversely remove all users from an external squad).

If a user has no external squad selected – global settings from the "**Subscription**" section are used, as well as the "**Default**" client config template.

---

Let's smoothly move on to reviewing the settings available in the external squad card.

### Template Override

When a user requests a subscription – depending on the client application from which the request came, the user may receive different templates. For example, if the application runs on the Mihomo core – Remnawave will detect this and provide the **Default** template of the **Mihomo** type. (You can manage templates in the corresponding section).

Inside Remnawave, you can create an infinite number of templates for each type (Mihomo, Stash, Xray Json, Singbox, Clash), but by default, the **Default** template will always be provided.

**To override this behavior is exactly what this setting inside the external squad exists for.**

Let's say, for a specific external squad we want to use a _Custom Template_ that belongs to the **Mihomo** type, in this case we select this template in the corresponding section and save the changes. If a request comes from a user who belongs to this external squad – instead of the _Default_ template, they will receive the _Custom Template_.

If you leave the override field empty – the user who is in this squad will receive the _Default_ template.

_Please note, template override in the "Response Rules" section has a higher priority than override in this section._

### Settings (Subscription)

In this section, general settings that are located in the "Subscription" → "Settings" section are overridden. Accordingly, by overriding settings within the squad, you can override many parameters at once for an entire group of users.

Keep in mind, if any of the parameters is explicitly overridden (including an empty value) – it will be overridden. Only deletion of the override (trash icon) will cancel the override.

For example, in general settings my profile header is set as "Remnawave", but for 10 users I want to override it, for example to "Remnawave v.2.x", in this case I override this parameter in this section, and then assign this external squad to the needed 10 users.

### Hosts

Based on the logic from the previous point – in this section you can completely override some parameters that you might have noticed in the card of each **host** you created.

**Values overridden here will be applied to all hosts that the user receives in the subscription.**

For example, by overriding `vlessRouteId` we can assign a specific value and thus "_route_" an entire group of users (those who will be in this squad). Naturally, the other half of such routing settings is located in the server configuration – the Config Profile.
