## Internal Squads

The main purpose of internal squads is **access control** for users.

Internal squads are directly linked to **profiles** and their **inbounds**. You can assign them as many active inbounds as needed (which are located inside profiles). And since profiles and their inbounds are directly linked to nodes – using an internal squad, we can finely control which users or groups of users can have access to nodes.

---

In each squad's card (in the general list), you can see the number of active inbounds, as well as the number of members in this squad (users who belong to it).

By clicking on the additional actions button (in the squad card), you can also quickly add or remove all users. If you need to assign a squad to _specific_ users – you can do this in the **"Users"** section.

Managing users and nodes that can be accessible to them can sometimes be very confusing – use the **"Available Nodes"** button to quickly see which nodes are available to this squad. Let me remind you that when creating or modifying a **node**, we also select which **profile** will be used and which **inbounds** from it will be active on the node. And since we also select **inbounds** inside the squad, we can use these relationships to determine specific nodes that this squad (and consequently its members) will have access to.

---

For example, we have two user groups: **free** and **paid**. And we want **free** users to have access to _server group #1_, and paid users to have access to both _server group #1_ and additionally to _server group #2_.

For this purpose, we create two squads: **Free** and **Premium**, and inside each of them we select the corresponding inbounds.

And let's say we're creating a user – in this case, if we have a free user – we simply activate the **Free** internal squad for them. And when we have a paid user – we activate both squads – **Free** and **Premium** (if the user needs access to all nodes/inbounds). But we can also activate only one squad for a paid user – **Premium**, in which case the user will not have access to the nodes/inbounds from the **Free** group.
