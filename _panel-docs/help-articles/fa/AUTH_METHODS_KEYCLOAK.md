# احراز هویت Keycloak

Keycloak یک راه‌حل متن‌باز مدیریت هویت و دسترسی است که قابلیت‌های Single Sign-On (SSO) را فراهم می‌کند.

## پیش‌نیازها

1. سرور Keycloak در حال اجرا
2. دسترسی مدیر برای ایجاد کلاینت‌ها

## مراحل پیکربندی

### 1. ایجاد کلاینت در Keycloak

1. وارد کنسول مدیریت Keycloak شوید
2. realm خود را انتخاب کنید (یا یک realm جدید ایجاد کنید)
3. به **Clients** → **Create client** بروید
4. پیکربندی کنید:
   - **Client ID**: `remnawave` (یا نام دلخواه شما)
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. **Valid redirect URIs** را تنظیم کنید: `https://your-panel-domain.com/oauth2/callback/keycloak`
6. **Web Origins** را تنظیم کنید: `https://your-panel-domain.com`
7. کلاینت را ذخیره کنید

### 2. دریافت اعتبارنامه کلاینت

1. به **Clients** → کلاینت شما → تب **Credentials** بروید
2. **Client secret** را کپی کنید

### 3. پیکربندی کنترل دسترسی

شما می‌توانید با استفاده از **یکی از دو روش** (یا هر دو) دسترسی را کنترل کنید:

#### گزینه A: استفاده از Claim (توصیه شده)

یک claim سفارشی `remnawaveAccess: true` به توکن اضافه کنید:

1. به **Clients** → کلاینت شما → تب **Client scopes** بروید
2. روی `<your-client-id>-dedicated` کلیک کنید
3. به تب **Mappers** → **Add mapper** → **By configuration** بروید
4. **Hardcoded claim** را انتخاب کنید
5. پیکربندی کنید:
   - **Name**: `remnawaveAccess`
   - **Token Claim Name**: `remnawaveAccess`
   - **Claim value**: `true`
   - **Claim JSON Type**: `boolean`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. ذخیره کنید

#### گزینه B: استفاده از ایمیل‌های مجاز

به جای پیکربندی claim، می‌توانید لیستی از آدرس‌های ایمیل مجاز را در تنظیمات Remnawave مشخص کنید. فقط کاربرانی که ایمیل آن‌ها در این لیست است می‌توانند وارد شوند.

## پیکربندی Remnawave

| فیلد | توضیحات |
|------|---------|
| **Keycloak Domain** | دامنه سرور Keycloak بدون `https://` (مثلاً `keycloak.example.com`) |
| **Frontend Domain** | دامنه پنل Remnawave بدون `https://` (مثلاً `panel.example.com`) |
| **Realm** | نام realm در Keycloak (مثلاً `master`) |
| **Client ID** | شناسه کلاینتی که ایجاد کردید |
| **Client Secret** | رمز کلاینت از تب Credentials |
| **Allowed Emails** | لیست آدرس‌های ایمیل مجاز برای ورود (در صورت استفاده از claim اختیاری است) |

## عیب‌یابی

### "Email is not in the allowed list and remnawaveAccess claim is not present"
مطمئن شوید که یکی از شرایط زیر برقرار است:
- کاربر claim `remnawaveAccess: true` را از طریق mapper پیکربندی کرده است، یا
- ایمیل کاربر به لیست Allowed Emails در تنظیمات Remnawave اضافه شده است

### "Invalid redirect URI"
بررسی کنید که redirect URI در Keycloak دقیقاً مطابقت داشته باشد: `https://your-panel-domain.com/oauth2/callback/keycloak`

### "State mismatch"
کوکی‌های مرورگر را پاک کنید و دوباره امتحان کنید. این می‌تواند اتفاق بیفتد اگر جریان احراز هویت قطع شده باشد.

### "Invalid or missing email claim"
مطمئن شوید که کاربر در Keycloak آدرس ایمیل دارد و email scope فعال است.
