## 认证方式: 密码

### 修改或重置密码

使用 `Rescue CLI` 来重置或修改密码。

```bash
docker exec -it remnawave remnawave
```

进入 `Rescue CLI` 后，选择 `Reset superadmin` 选项。

### 启用紧急密码认证

如果你已禁用“Password”认证方式，但之后又无法通过其他认证方式登录，
可以使用 `Rescue CLI` 重新启用“Password”认证方式。

```bash
docker exec -it remnawave remnawave
```

进入 `Rescue CLI` 后，选择 `Enable password authentication` 选项。
