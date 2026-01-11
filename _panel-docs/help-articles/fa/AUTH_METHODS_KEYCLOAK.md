# احراز هویت Keycloak

Keycloak یک راه‌حل متن‌باز مدیریت هویت و دسترسی است که قابلیت‌های Single Sign-On (SSO) را فراهم می‌کند.

## پیش‌نیازها

1. سرور Keycloak در حال اجرا
2. دسترسی مدیر برای ایجاد کلاینت‌ها و نقش‌ها

## مراحل پیکربندی

### 1. ایجاد کلاینت در Keycloak

1. وارد کنسول مدیریت Keycloak شوید
2. realm خود را انتخاب کنید (یا یک realm جدید ایجاد کنید)
3. به **Clients** → **Create client** بروید
4. پیکربندی کنید:
   - **Client ID**: `remnawave` (یا نام دلخواه شما)
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. **Valid redirect URIs** را تنظیم کنید: `https://your-domain.com/oauth2/callback/keycloak`
6. **Web Origins** را تنظیم کنید: `https://your-domain.com`
7. کلاینت را ذخیره کنید

### 2. دریافت اعتبارنامه کلاینت

1. به **Clients** → کلاینت شما → تب **Credentials** بروید
2. **Client secret** را کپی کنید

### 3. ایجاد نقش Admin

1. به **Clients** → کلاینت شما → تب **Roles** بروید
2. روی **Create role** کلیک کنید
3. نام: `admin`
4. ذخیره کنید

### 4. تخصیص نقش به کاربران

1. به **Users** → کاربر مورد نظر بروید
2. به تب **Role mapping** بروید
3. روی **Assign role** کلیک کنید
4. بر اساس کلاینت‌ها فیلتر کرده و کلاینت خود را انتخاب کنید
5. نقش `admin` را تخصیص دهید

### 5. پیکربندی Role Mapper (مهم!)

به طور پیش‌فرض، نقش‌های کلاینت در ID token گنجانده نمی‌شوند. شما باید یک mapper اضافه کنید:

1. به **Clients** → کلاینت شما → تب **Client scopes** بروید
2. روی `<your-client-id>-dedicated` کلیک کنید
3. به تب **Mappers** → **Add mapper** → **By configuration** بروید
4. **User Client Role** را انتخاب کنید
5. پیکربندی کنید:
   - **Name**: `client-roles`
   - **Client ID**: کلاینت خود را انتخاب کنید
   - **Token Claim Name**: `resource_access.${client_id}.roles`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. ذخیره کنید

## پیکربندی Remnawave

| فیلد | توضیحات |
|------|---------|
| **Domain** | دامنه سرور Keycloak بدون `https://` (مثلاً `keycloak.example.com`) |
| **Realm** | نام realm در Keycloak (مثلاً `master`) |
| **Client ID** | شناسه کلاینتی که ایجاد کردید |
| **Client Secret** | رمز کلاینت از تب Credentials |
| **Seamless Authentication** | فعال کنید تا در صفحه ورود به طور خودکار به Keycloak هدایت شوید |

## احراز هویت یکپارچه

وقتی فعال باشد، کاربران هنگام بازدید از صفحه ورود به طور خودکار به Keycloak هدایت می‌شوند. اگر آن‌ها یک نشست فعال Keycloak داشته باشند، بدون مشاهده فرم ورود Remnawave به طور خودکار وارد می‌شوند.

## عیب‌یابی

### "User does not have admin role"
مطمئن شوید که کاربر نقش `admin` را در role mapping کلاینت دارد، نه در نقش‌های realm.

### "Invalid redirect URI"
بررسی کنید که redirect URI در Keycloak دقیقاً مطابقت داشته باشد: `https://your-domain.com/oauth2/callback/keycloak`

### "State mismatch"
کوکی‌های مرورگر را پاک کنید و دوباره امتحان کنید. این می‌تواند اتفاق بیفتد اگر جریان احراز هویت قطع شده باشد.
