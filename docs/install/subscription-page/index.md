---
sidebar_position: 5
sidebar_label: Subscription Page
title: Subscription Page
hide_table_of_contents: true
slug: /install/remnawave-subscription-page
---

# Subscription Page

Remnawave Subscription Page is lightweight and secure way to hide your Remnawave Panel domain from end users. You can use it as a simple and beautiful subscription page for your users.

![Page screenshot](/install/subscription-page.webp)

---

You can install subscription page on the same server as Remnawave Panel or on a different server. Select the appropriate guide below.

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';


<DocCardList items={[...[...useCurrentSidebarCategory().items].map((_,i)=>i<2?_:null).filter(Boolean)]} />
```

After you install subscription page, you can customize it by following the guide below.

```mdx-code-block

<DocCardList items={[...[...useCurrentSidebarCategory().items].map((_,i)=>i>=useCurrentSidebarCategory().items.length-2?_:null).filter(Boolean)]} />

```
