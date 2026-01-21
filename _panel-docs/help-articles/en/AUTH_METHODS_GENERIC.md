# Generic OAuth2 Authentication

Generic OAuth2 allows you to connect any OAuth2-compatible identity provider to Remnawave. This is useful when you want to use providers that don't have dedicated integration (like Authentik, Authelia, Zitadel, Google, Microsoft, etc.).

## Prerequisites

1. An OAuth2-compatible identity provider
2. Admin access to create OAuth2 clients/applications
3. Provider must support the `email` claim in tokens

## Configuration Steps

### 1. Create an OAuth2 Application in Your Provider

The exact steps vary by provider, but generally you need to:

1. Log in to your identity provider's admin console
2. Create a new OAuth2/OIDC application
3. Configure:
    - **Application Type**: Web Application
    - **Grant Type**: Authorization Code
    - **Redirect URI**: `https://your-panel-domain.com/oauth2/callback/generic`
4. Note down the **Client ID** and **Client Secret**
5. Find the provider's **Authorization URL** and **Token URL** (usually in documentation or well-known endpoint)

### 2. Find Provider URLs

Most providers have these endpoints documented. Common patterns:

| Provider  | Authorization URL                                                  | Token URL                                                      |
| --------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| Google    | `https://accounts.google.com/o/oauth2/v2/auth`                     | `https://oauth2.googleapis.com/token`                          |
| Microsoft | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize` | `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` |
| Authentik | `https://your-authentik.com/application/o/authorize/`              | `https://your-authentik.com/application/o/token/`              |
| Authelia  | `https://your-authelia.com/api/oidc/authorization`                 | `https://your-authelia.com/api/oidc/token`                     |
| Zitadel   | `https://your-zitadel.com/oauth/v2/authorize`                      | `https://your-zitadel.com/oauth/v2/token`                      |

### 3. PKCE Support

**PKCE (Proof Key for Code Exchange)** adds an extra layer of security to the OAuth2 flow. Enable this option if:

- Your provider supports PKCE (most modern providers do)
- You want enhanced security against authorization code interception attacks
- Your provider requires PKCE for public clients

> **Recommendation**: Enable PKCE if your provider supports it.

## Remnawave Configuration

| Field                 | Description                                                                           |
| --------------------- | ------------------------------------------------------------------------------------- |
| **Client ID**         | The client/application ID from your OAuth2 provider                                   |
| **Client Secret**     | The client secret from your OAuth2 provider                                           |
| **Authorization URL** | The OAuth2 authorization endpoint URL (e.g., `https://provider.com/oauth2/authorize`) |
| **Token URL**         | The OAuth2 token endpoint URL (e.g., `https://provider.com/oauth2/token`)             |
| **Frontend Domain**   | Your Remnawave panel domain without `https://` (e.g., `panel.example.com`)            |
| **With PKCE**         | Enable PKCE (Proof Key for Code Exchange) for enhanced security                       |
| **Allowed Emails**    | List of email addresses allowed to log in                                             |

## Access Control

You can control access using **one of two methods** (or both):

### Option A: Using Allowed Emails

Specify a list of allowed email addresses in the Remnawave settings. Only users with emails in this list will be able to log in.

### Option B: Using Custom Claim

If the **Allowed Emails** list is empty, Remnawave will check for a custom claim in the token:

| Key               | Value  |
| ----------------- | ------ |
| `remnawaveAccess` | `true` |

If the user's token contains `remnawaveAccess: true`, they will be authorized.

> **Note**: You need to configure your identity provider to include this custom claim in the token. The exact steps vary by provider — usually this is done via "mappers", "claims", or "token customization" settings.

## Troubleshooting

### "Invalid redirect URI"

Verify that the redirect URI in your provider matches exactly: `https://your-panel-domain.com/oauth2/callback/generic`

### "Invalid or missing email claim"

Make sure:

- The user has an email address set in your provider
- The `email` scope is requested and granted
- Your provider includes the `email` claim in the token

### "State mismatch"

Clear browser cookies and try again. This can happen if the authentication flow was interrupted.

### "Token exchange failed"

Verify that:

- The **Token URL** is correct
- **Client ID** and **Client Secret** are correct
- Your provider's token endpoint is accessible from your Remnawave server

### "Access denied"

The user's email is not in the **Allowed Emails** list. Add their email address to grant access.

### PKCE-related errors

If you get errors related to `code_verifier` or `code_challenge`:

- Try disabling **With PKCE** if your provider doesn't support it
- Or enable it if your provider requires it
