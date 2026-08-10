## Snippets

A snippet is a named piece of Xray configuration that is stored once and injected into any number of profiles by name.

When you have many profiles, every small change turns into a chore: say you have 10 profiles, and the routing section is identical in all of them. Without snippets you have to repeat the edit 10 times. With snippets you change the rule in one place, and it is picked up automatically by every profile that references it.

---

### Snippet format

A snippet is **always a JSON array of objects**, even if there is only one object inside.

```json
[
  {
    "protocol": "freedom",
    "tag": "DIRECT"
  }
]
```

Content requirements:

- it must be an array, not an object;
- the array must contain at least one item;
- empty objects (`{}`) inside the array are not allowed.

---

### Where snippets can be referenced

A snippet can be injected in four places. In three of them the target is an array, and the reference looks like an object `{ "snippet": "name" }`. In the fourth one the target is the configuration root, and the reference looks like an array of names.

#### outbounds\[\]

```json
{
  "outbounds": [
    {
      "snippet": "snippet-name"
    }
  ]
}
```

#### routing.rules\[\]

```json
{
  "routing": {
    "rules": [
      {
        "snippet": "snippet-name"
      }
    ]
  }
}
```

#### routing.balancers\[\]

```json
{
  "routing": {
    "balancers": [
      {
        "snippet": "snippet-name"
      }
    ]
  }
}
```

#### Configuration root

At the configuration root the reference is defined not by an object, but by an array of names in the `snippets` field:

```json
{
  "snippets": ["log-preset", "dns-preset"],
  "inbounds": [],
  "outbounds": []
}
```

Such a snippet must contain **root-level sections**. It is still an array of objects, the keys inside those objects are simply the names of configuration sections:

```json
[
  {
    "log": {
      "loglevel": "debug"
    }
  }
]
```

Sections can either be spread across separate array items or collected into a single object – the result is the same:

```json
[
  {
    "log": {
      "loglevel": "debug"
    },
    "dns": {
      "servers": ["1.1.1.1"]
    }
  }
]
```

---

### How substitution works

#### In arrays

The object holding the reference is replaced by the entire content of the snippet. If the snippet has several items – all of them take the place of that single reference.

Before:

```json
{
  "outbounds": [{ "snippet": "my-outbounds" }]
}
```

The `my-outbounds` snippet:

```json
[
  { "protocol": "freedom", "tag": "DIRECT" },
  { "protocol": "blackhole", "tag": "BLOCK" }
]
```

After:

```json
{
  "outbounds": [
    { "protocol": "freedom", "tag": "DIRECT" },
    { "protocol": "blackhole", "tag": "BLOCK" }
  ]
}
```

**The object holding the reference is replaced entirely.** If you write anything else next to `snippet`, it will be lost – in the example below `tag` will not reach the final configuration:

```json
{
  "snippet": "my-outbounds",
  "tag": "this key will be dropped"
}
```

If a snippet with the given name does not exist, the item holding the reference is simply removed from the array.

#### At the root

All snippets listed in `snippets` are collected into a single set of sections and added to the configuration root. The `snippets` field itself is removed from the final configuration.

Three rules apply here.

**Sections already written in the profile are not overwritten.** If the profile has its own `log`, and a snippet also brings `log` – the one written in the profile stays. This is intentional: what you wrote by hand matters more than what came from a preset.

**Some sections are never injected.** These are `inbounds`, `api`, `stats`, `metrics` and `snippets` – they are managed by Remnawave, and a snippet cannot replace them. If a snippet contains such sections, they are silently skipped, while the rest of its sections are applied as usual. In the snippet editor these sections are unavailable and are highlighted as an error.

**Order matters.** If two snippets in the list bring the same section, the one listed later wins.

If a snippet with the given name does not exist, the name is simply skipped.

#### Processing order

The root is processed first, then the arrays. Thanks to that, a root snippet can bring in, for example, an `outbounds` section that contains references to other snippets – those will be expanded as well.

Nesting works **only one level deep**: a snippet injected from another snippet is not expanded any further. A `snippets` field inside a root snippet is ignored.
