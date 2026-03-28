## Telegram OAuth2

> This guide is applicable for version **2.7.0** and above.

To configure the "Login via Telegram" feature, you need a Telegram bot. Additionally, you need to configure the bot for the feature to work correctly.

### Bot Configuration

1. Open @BotFather (https://t.me/botfather)
2. Open the MiniApp by pressing "Open"
3. Select your bot and press `Bot Settings`
4. If there is already a domain specified in the `Web Login` section — delete it.
5. Press the Switch to OpenID Connect Login button.
   `If this button is not available, after deleting the domain go back one menu level and repeat from step 3`
6. Press Add an Allowed URL.
   Specify the following values:

- Trusted Origins: https://panel.domain.com
- Redirect URIs: https://panel.domain.com/oauth2/callback/telegram

### Access Configuration

After filling in `Client ID`, `Client Secret` and `Frontend Domain`, you need to specify a list of administrator IDs who will have access to login.

1. From the required account, launch the bot – https://t.me/Get_myidrobot
2. In response, the bot will send you your ID, enter it in the corresponding field.

---

### Known Error Solutions

###### Various protections installed on top of the panel (such as cookies, etc.) may not work correctly with `Telegram OAuth2`.

Use the /oauth2/ path in your reverse proxy to resolve this issue

###### Error: BOT_DOMAIN_INVALID

This error occurs due to incorrect bot domain configuration – review the "Bot Configuration" section (above). If necessary, repeat this step-by-step process.

###### Error: Telegram confirmation code not received during login

Unfortunately, this issue cannot be resolved from the Remnawave side. Try using a bot that was created a while ago or use a different browser.
Alternatively, you can try logging in on one of the "official" resources – for example, https://fragment.com. Since the Telegram session within the browser will be shared – you can try logging into the panel.
