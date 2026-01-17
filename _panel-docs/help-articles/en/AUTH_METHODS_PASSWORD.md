## Authentication Method: Password

### Changing or Resetting Password

Use `Rescue CLI` to reset or change the password.

```bash
docker exec -it remnawave remnawave
```

After entering `Rescue CLI`, select the `Reset superadmin` option.

### Emergency Password Authentication Enable

If you have disabled the "Password" authentication method but later lost access to one of the other authentication methods – you can enable the "Password" authentication method using `Rescue CLI`

```bash
docker exec -it remnawave remnawave
```

After entering `Rescue CLI`, select the `Enable password authentication` option.
