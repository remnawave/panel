## 配置文件（Config Profiles）

在 Remnawave 的配套设置中，配置文件（Config Profile） 代表一份完整的服务器配置， 用于 [Xray](https://xtls.github.io/en/config/) 内核.

在此配置中，你可以定义用户将来要连接的 _入站（inbounds）_ 。

**此处不会详细介绍 Xray 配置的具体结构和语法，因为这是一个需要独立学习的主题。 - 如需了解核心的完整功能，请参阅官方 [Xray文档](https://xtls.github.io/en/config/) 。**

当你创建一个新的配置文件时，系统会默认生成一个类型为**Shadowsocks**的 _入站（inbounds）_。 创建完成后，你可以修改该入站，或添加新的 _入站（inbounds）_。

_如果你想添加一个新的入站（例如使用 **VLESS** 协议），只需在 `inbounds:[]` 数组中添加一个新的对象即可。_

目前，Remnawave 支持以下协议： `VLESS`, `Trojan`, `Shadowsocks` (`chacha20-ietf-poly1305`)。 并支持以下传输方式： `RAW (TCP)`, `XHTTP`, `Websocket`, `HTTPUpgrade`, `gRPC`.

需要注意的是，Remnawave 也支持以下协议： `mixed(socks)`, `wireguard`, `http` - 但面板不会对它们进行任何处理，这些协议的用户管理功能将不可用。 此类 _入站（inbounds）_ 将按原样传递给 Xray，不会被修改。

对于主要协议 (`VLESS`, `Trojan`, `Shadowsocks`), Remnawave 会自动管理服务器配置中的用户列表，无需额外手动操作。

---

### 配置文件列表（Config Profiles List）

在配置文件列表中，每个配置文件都会显示简要概览。 在配置文件名称下方，你可以看到其中活动的 _入站（inbounds）_ 数量， 以及当前使用该配置文件的 **节点（nodes）** 数量。 这两个图标均可点击，点击后会打开对应的详细页面。

点击 _入站（inbounds）_ - 会显示该配置文件中的 _入站_ 列表，并显示每个 _入站_ 在多少个内部分组中被激活。
点击 _节点（nodes）_ - 会显示当前使用此配置文件的所有 _节点_ 列表。

在“更多操作”菜单（向下箭头）中，你还可以快速查看配置文件、查看带有代码片段（snippets）的配置文件，以及其他服务相关选项。

---

### 配置文件编辑器（Config Profile Editor）

配置文件编辑器提供了一个功能完整的 JSON 编辑器，支持语法高亮和结构检查。当鼠标悬停在某些对象上时，还会显示来自 Xray 文档的提示信息。

每当进行更改时，系统会立即运行轻量级的核心实例来验证整个配置。这种实时验证可以有效防止低级错误或拼写问题。

在底部的附加菜单（带三条横线的按钮）中，你可以找到更多选项。像“全选”、“复制全部”等基础功能就不赘述了。

"**从 Github 加载**" 选项会打开一个菜单，允许你下载其他用户分享的配置示例。 **这些示例仅供参考，并非可直接使用的配置。**

"**生成密钥**" 功能可以直接在浏览器中生成所需的密钥对 - 例如，在使用 `Reality` 时, 你需要生成一个 `privateKey`,可以在此处完成。 此外，还支持生成适用于 `Vless Encryption` 的 `ML-DSA65` 和 `ML-KEM768`.

---

### 代码片段（Snippets）

当你拥有多个配置文件时，若需要修改一些在所有配置中都存在但略有不同的细节，手动逐一修改将非常麻烦。

例如，你有 10 个配置文件，它们的路由规则基本一致，只是细节不同。
此时可以使用 Snippets 功能——你只需在一个地方修改“规则（rule）”或“规则集（rules）”，
系统就会自动将这些更改同步到所有配置文件中。

目前，你可以为以下对象预定义数组元素： `outbounds` 和 `rules`。 创建片段后，它将可以在这些对象中被引用，
例如：

```
{
  "outbounds": [
    {
      "snippet": "snippet-name"
    }
  ]
}
```

关于片段的更多信息，可以点击片段菜单中的问号图标查看说明。

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
