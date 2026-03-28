# Keycloak Authentication

Keycloak is an open-source Identity and Access Management solution that provides Single Sign-On (SSO) capabilities.

## Prerequisites

1. A running Keycloak server
2. Admin access to create clients

## Configuration Steps

### 1. Create a Client in Keycloak

1. Log in to Keycloak Admin Console
2. Select your realm (or create a new one)
3. Go to **Clients** → **Create client**
4. Configure:
   - **Client ID**: `remnawave` (or your preferred name)
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. Set **Valid redirect URIs**: `https://your-panel-domain.com/oauth2/callback/keycloak`
6. Set **Web Origins**: `https://your-panel-domain.com`
7. Save the client

### 2. Get Client Credentials

1. Go to **Clients** → your client → **Credentials** tab
2. Copy the **Client secret**

### 3. Configure Access Control

You can control access using **one of two methods** (or both):

#### Option A: Using Claim (Recommended)

Add a custom claim `remnawaveAccess: true` to the token:

1. Go to **Clients** → your client → **Client scopes** tab
2. Click on `<your-client-id>-dedicated`
3. Go to **Mappers** tab → **Add mapper** → **By configuration**
4. Select **Hardcoded claim**
5. Configure:
   - **Name**: `remnawaveAccess`
   - **Token Claim Name**: `remnawaveAccess`
   - **Claim value**: `true`
   - **Claim JSON Type**: `boolean`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. Save

#### Option B: Using Allowed Emails

Instead of configuring a claim, you can specify a list of allowed email addresses in the Remnawave settings. Only users with emails in this list will be able to log in.

## Remnawave Configuration

| Field | Description |
|-------|-------------|
| **Keycloak Domain** | Your Keycloak server domain without `https://` (e.g., `keycloak.example.com`) |
| **Frontend Domain** | Your Remnawave panel domain without `https://` (e.g., `panel.example.com`) |
| **Realm** | The Keycloak realm name (e.g., `master`) |
| **Client ID** | The client ID you created |
| **Client Secret** | The client secret from Credentials tab |
| **Allowed Emails** | List of email addresses allowed to log in (optional if using claim) |

## Troubleshooting

### "Email is not in the allowed list and remnawaveAccess claim is not present"
Make sure either:
- The user has the `remnawaveAccess: true` claim configured via mapper, OR
- The user's email is added to the Allowed Emails list in Remnawave settings

### "Invalid redirect URI"
Verify that the redirect URI in Keycloak matches exactly: `https://your-panel-domain.com/oauth2/callback/keycloak`

### "State mismatch"
Clear browser cookies and try again. This can happen if the authentication flow was interrupted.

### "Invalid or missing email claim"
Make sure the user has an email address set in Keycloak and email scope is enabled.
