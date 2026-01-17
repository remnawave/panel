## Метод входа: пароль

### Изменение или сброс пароля

Используйте `Rescue CLI` для сброса или изменения пароля.

```bash
docker exec -it remnawave remnawave
```

После входа в `Rescue CLI` выберите пункт `Reset superadmin`.

### Экстренное включение входа по паролю

Если вы отключили метод входа "Пароль", но в дальнейшем потеряли доступ к одному из других методов входа – вы можете включить метод входа "Пароль" с помощью `Rescue CLI`

```bash
docker exec -it remnawave remnawave
```

После входа в `Rescue CLI` выберите пункт `Enable password authentication `.
