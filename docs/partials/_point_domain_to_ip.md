:::warning

You need to have a registered domain name to continue.

:::

## Point domain to your server

Check your server's IP address. It is better to use a static IPv4 address.

Now, you need to point your domain name to this IP address.

For example, it will be `my-super-panel.com` -> `193.122.122.122`.

There are two ways to do this:

1. Use a DNS provider (e.g. Cloudflare, Google Cloud, etc.)
2. Use a registrar (e.g. Namecheap, etc.)

### DNS provider

If you are using Cloudflare, you need to add a A/AAAA record (for IPv4 and IPv6 respectively) to your DNS records.

Log in to your Cloudflare account [here](https://dash.cloudflare.com/login) and select the desired domain.

On the left side of the page, click on `DNS` and then click on `Records`. Click on `Create record`.  
Set the `Type` to `A` and the `Name` to `@`.

:::info

If you want to use subdomains, you should enter the subdomain name (e.g. `panel`) in the `Name` field.

:::

Enter your server's IP address in the `IPv4 address` field. and click on `Save`.

Now you need to wait a while for the DNS records to be updated.

:::info

There is a big difference between yellow cloud (domain is proxied by Cloudflare) and grey cloud (domain is not proxied by Cloudflare) in the Cloudflare control panel.

If Cloudflare works fine in your region, it is better to proxy the domain through Cloudflare. (Yellow cloud)

:::

![static](/reverse-proxies/nginx/cloudflare-dns.webp)

Some DNS providers have a different interface, but the overall process is the same.
