# Keycloak Authentication

Keycloak is an open-source Identity and Access Management solution that provides Single Sign-On (SSO) capabilities.

## Prerequisites

1. A running Keycloak server
2. Admin access to create clients and roles

## Configuration Steps

### 1. Create a Client in Keycloak

1. Log in to Keycloak Admin Console
2. Select your realm (or create a new one)
3. Go to **Clients** → **Create client**
4. Configure:
   - **Client ID**: `remnawave` (or your preferred name)
   - **Client Protocol**: `openid-connect`
   - **Client authentication**: `ON`
5. Set **Valid redirect URIs**: `https://your-domain.com/oauth2/callback/keycloak`
6. Set **Web Origins**: `https://your-domain.com`
7. Save the client

### 2. Get Client Credentials

1. Go to **Clients** → your client → **Credentials** tab
2. Copy the **Client secret**

### 3. Create the Admin Role

1. Go to **Clients** → your client → **Roles** tab
2. Click **Create role**
3. Name: `admin`
4. Save

### 4. Assign Role to Users

1. Go to **Users** → select a user
2. Go to **Role mapping** tab
3. Click **Assign role**
4. Filter by clients and select your client
5. Assign the `admin` role

### 5. Configure Role Mapper (Important!)

By default, client roles are not included in the ID token. You need to add a mapper:

1. Go to **Clients** → your client → **Client scopes** tab
2. Click on `<your-client-id>-dedicated`
3. Go to **Mappers** tab → **Add mapper** → **By configuration**
4. Select **User Client Role**
5. Configure:
   - **Name**: `client-roles`
   - **Client ID**: select your client
   - **Token Claim Name**: `resource_access.${client_id}.roles`
   - **Add to ID token**: `ON`
   - **Add to access token**: `ON`
6. Save

## Remnawave Configuration

| Field | Description |
|-------|-------------|
| **Domain** | Your Keycloak server domain without `https://` (e.g., `keycloak.example.com`) |
| **Realm** | The Keycloak realm name (e.g., `master`) |
| **Client ID** | The client ID you created |
| **Client Secret** | The client secret from Credentials tab |
| **Seamless Authentication** | Enable to automatically redirect to Keycloak on login page |

## Seamless Authentication

When enabled, users will be automatically redirected to Keycloak when visiting the login page. If they have an active Keycloak session, they'll be logged in automatically without seeing the Remnawave login form.

## Troubleshooting

### "User does not have admin role"
Make sure the user has the `admin` role assigned in the client's role mappings, not in realm roles.

### "Invalid redirect URI"
Verify that the redirect URI in Keycloak matches exactly: `https://your-domain.com/oauth2/callback/keycloak`

### "State mismatch"
Clear browser cookies and try again. This can happen if the authentication flow was interrupted.
