# احراز هویت Generic OAuth2

Generic OAuth2 به شما امکان می‌دهد هر ارائه‌دهنده هویت سازگار با OAuth2 را به Remnawave متصل کنید. این زمانی مفید است که می‌خواهید از ارائه‌دهندگانی استفاده کنید که یکپارچگی اختصاصی ندارند (مانند Authentik، Authelia، Zitadel، Google، Microsoft و غیره).

## پیش‌نیازها

1. یک ارائه‌دهنده هویت سازگار با OAuth2
2. دسترسی مدیریتی برای ایجاد کلاینت‌ها/برنامه‌های OAuth2
3. ارائه‌دهنده باید از claim مربوط به `email` در توکن‌ها پشتیبانی کند

## مراحل پیکربندی

### 1. ایجاد برنامه OAuth2 در ارائه‌دهنده شما

مراحل دقیق بسته به ارائه‌دهنده متفاوت است، اما به طور کلی باید:

1. به کنسول مدیریت ارائه‌دهنده هویت خود وارد شوید
2. یک برنامه OAuth2/OIDC جدید ایجاد کنید
3. پیکربندی کنید:
    - **نوع برنامه**: Web Application
    - **نوع Grant**: Authorization Code
    - **Redirect URI**: `https://your-panel-domain.com/oauth2/callback/generic`
4. **Client ID** و **Client Secret** را یادداشت کنید
5. **Authorization URL** و **Token URL** ارائه‌دهنده را پیدا کنید (معمولاً در مستندات یا well-known endpoint)

### 2. یافتن URL‌های ارائه‌دهنده

اکثر ارائه‌دهندگان این endpointها را مستند کرده‌اند. الگوهای رایج:

| ارائه‌دهنده | Authorization URL                                                  | Token URL                                                      |
| ----------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| Google      | `https://accounts.google.com/o/oauth2/v2/auth`                     | `https://oauth2.googleapis.com/token`                          |
| Microsoft   | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize` | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` |
| Authentik   | `https://your-authentik.com/application/o/authorize/`              | `https://your-authentik.com/application/o/token/`              |
| Authelia    | `https://your-authelia.com/api/oidc/authorization`                 | `https://your-authelia.com/api/oidc/token`                     |
| Zitadel     | `https://your-zitadel.com/oauth/v2/authorize`                      | `https://your-zitadel.com/oauth/v2/token`                      |

### 3. پشتیبانی از PKCE

**PKCE (Proof Key for Code Exchange)** یک لایه امنیتی اضافی به جریان OAuth2 اضافه می‌کند. این گزینه را فعال کنید اگر:

- ارائه‌دهنده شما از PKCE پشتیبانی می‌کند (اکثر ارائه‌دهندگان مدرن پشتیبانی می‌کنند)
- می‌خواهید امنیت بیشتری در برابر حملات رهگیری کد احراز هویت داشته باشید
- ارائه‌دهنده شما برای کلاینت‌های عمومی PKCE را الزامی کرده است

> **توصیه**: اگر ارائه‌دهنده شما از آن پشتیبانی می‌کند، PKCE را فعال کنید.

## پیکربندی Remnawave

| فیلد                  | توضیحات                                                                        |
| --------------------- | ------------------------------------------------------------------------------ |
| **Client ID**         | شناسه کلاینت/برنامه از ارائه‌دهنده OAuth2 شما                                  |
| **Client Secret**     | رمز کلاینت از ارائه‌دهنده OAuth2 شما                                           |
| **Authorization URL** | URL endpoint احراز هویت OAuth2 (مثلاً `https://provider.com/oauth2/authorize`) |
| **Token URL**         | URL endpoint توکن OAuth2 (مثلاً `https://provider.com/oauth2/token`)           |
| **Frontend Domain**   | دامنه پنل Remnawave شما بدون `https://` (مثلاً `panel.example.com`)            |
| **With PKCE**         | فعال‌سازی PKCE (Proof Key for Code Exchange) برای امنیت بیشتر                  |
| **Allowed Emails**    | لیست آدرس‌های ایمیل مجاز برای ورود                                             |

## کنترل دسترسی

می‌توانید دسترسی را با **یکی از دو روش** (یا هر دو) کنترل کنید:

### گزینه A: استفاده از Allowed Emails

لیستی از آدرس‌های ایمیل مجاز را در تنظیمات Remnawave مشخص کنید. فقط کاربرانی که ایمیل آن‌ها در این لیست است می‌توانند وارد شوند.

### گزینه B: استفاده از Custom Claim

اگر لیست **Allowed Emails** خالی باشد، Remnawave یک claim سفارشی را در توکن بررسی می‌کند:

| کلید              | مقدار  |
| ----------------- | ------ |
| `remnawaveAccess` | `true` |

اگر توکن کاربر حاوی `remnawaveAccess: true` باشد، احراز هویت می‌شود.

> **توجه**: باید ارائه‌دهنده هویت خود را برای اضافه کردن این claim سفارشی به توکن پیکربندی کنید. مراحل دقیق بسته به ارائه‌دهنده متفاوت است — معمولاً این کار از طریق تنظیمات "mappers"، "claims" یا "token customization" انجام می‌شود.

## عیب‌یابی

### "Invalid redirect URI"

مطمئن شوید که redirect URI در ارائه‌دهنده شما دقیقاً مطابقت دارد: `https://your-panel-domain.com/oauth2/callback/generic`

### "Invalid or missing email claim"

اطمینان حاصل کنید:

- کاربر یک آدرس ایمیل در ارائه‌دهنده شما تنظیم کرده است
- scope مربوط به `email` درخواست و اعطا شده است
- ارائه‌دهنده شما claim مربوط به `email` را در توکن قرار می‌دهد

### "State mismatch"

کوکی‌های مرورگر را پاک کنید و دوباره امتحان کنید. این می‌تواند در صورت قطع شدن جریان احراز هویت رخ دهد.

### "Token exchange failed"

بررسی کنید:

- **Token URL** صحیح است
- **Client ID** و **Client Secret** صحیح هستند
- endpoint توکن ارائه‌دهنده شما از سرور Remnawave قابل دسترسی است

### "Access denied"

ایمیل کاربر در لیست **Allowed Emails** نیست. آدرس ایمیل او را برای اعطای دسترسی اضافه کنید.

### خطاهای مربوط به PKCE

اگر خطاهای مربوط به `code_verifier` یا `code_challenge` دریافت می‌کنید:

- سعی کنید **With PKCE** را غیرفعال کنید اگر ارائه‌دهنده شما از آن پشتیبانی نمی‌کند
- یا اگر ارائه‌دهنده شما آن را الزامی کرده، فعالش کنید
