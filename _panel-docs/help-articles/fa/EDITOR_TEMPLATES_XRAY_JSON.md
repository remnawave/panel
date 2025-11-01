## Xray JSON Subscription Format

The Xray JSON format provides native JSON-based subscription support for compatible clients. Simply append `/json` to your subscription URL to enable this format.

### Supported Applications

- **v2rayNG** — version 1.8.29 or higher
- **V2rayN** — version 6.40 or higher
- **Streisand** — all versions
- **Happ** — all versions
- **V2Box** — all versions
- **ktor-client** — all versions

### Usage Instructions

**Step 1:** Modify your subscription URL

Append `/json` to the end of your subscription link:  
`https://<server>/api/sub/xxxx/json`

**Step 2:** Verify compatibility

Ensure your client application meets the minimum version requirements listed above.

**Alternatively:** Enable JSON At the base path

Enable the "Serve JSON at base subscription" option in the subscription settings. This will serve the JSON subscription at the base subscription path (without having to append /json).

### Fallback Behavior

For clients that don't support the JSON format (such as Base64 or Mihomo-based clients), the subscription will automatically fall back to the standard format compatible with your client.
