## Telegram OAuth2

To configure the "Login via Telegram" feature, you need a Telegram bot. Additionally, you need to configure the bot for the feature to work correctly.

### Bot Configuration

1. Open @BotFather (https://t.me/botfather)

2. Send the `/mybots` command and select the required bot

3. Select the option `Bot settings` → `Domain`

4. Select the option `Set domain`

    Now send the bot a message containing the domain name used to access Remnawave.

    ```
    https://panel.domain.com
    ```

### Access Configuration

After entering the bot token, you need to specify a list of administrator IDs who will have access to login.

1. From the required account, launch the bot – https://t.me/Get_myidrobot
2. In response, the bot will send you your ID, enter it in the corresponding field.

---

### Known Error Solutions

###### Error: BOT_DOMAIN_INVALID

This error occurs due to incorrect bot domain configuration – review the "Bot Configuration" section (above). If necessary, repeat this step-by-step process.

###### Error: Telegram confirmation code not received during login

Unfortunately, this issue cannot be resolved from the Remnawave side. Try using a bot that was created a while ago or use a different browser.
Alternatively, you can try logging in on one of the "official" resources – for example, https://fragment.com. Since the Telegram session within the browser will be shared – you can try logging into the panel.
