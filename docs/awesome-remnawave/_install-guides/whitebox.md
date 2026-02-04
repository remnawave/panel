### 📦 Key Features

- **Multi-protocol VPN Probing**: Supports probing of external VPN services including VMESS, VLESS, Trojan, Wireguard, AmneziaWG and Shadowsocks.
- **RESTful API Service**: Exposes HTTP endpoints for on-demand or scheduled connectivity checks.
- **Custom Probe Configuration**: Accepts probe parameters such as connection details, target URLs, response validation rules, and configurable timeouts.
- **Prometheus Metrics Integration**: Exposes key probe results as Prometheus metrics.

### Getting Started

```shell
git clone -b main https://github.com/quyxishi/whitebox
cd ./whitebox
```

#### via `docker-compose.yaml`

```shell
sudo docker compose up --build -d
```

#### via `Dockerfile`

###### Build
```shell
sudo docker build --tag whitebox .
```

###### Running
```shell
sudo docker run --rm -d -p 9116:9116 whitebox
```

### Checking the results

After deploying, you can validate VPN tunnel probing by visiting:
```url
http://localhost:9116/probe?ctx=<urlencoded_vpn_uri>&target=google.com
```

After that, you will see a Prometheus-style metrics page showing the results of the probe.

For example, the output may look like:
```md
# HELP tun_probe_duration_seconds Returns how long the probe took to complete in seconds
# TYPE tun_probe_duration_seconds gauge
tun_probe_duration_seconds 1.554994
# HELP tun_probe_http_content_length_bytes Length of HTTP content response in bytes
# TYPE tun_probe_http_content_length_bytes gauge
tun_probe_http_content_length_bytes -1
# HELP tun_probe_http_duration_seconds Duration of HTTP request by phase, summed over all traces
# TYPE tun_probe_http_duration_seconds gauge
tun_probe_http_duration_seconds{phase="connect"} 0.1998826
tun_probe_http_duration_seconds{phase="processing"} 0.3262475
tun_probe_http_duration_seconds{phase="resolve"} 0
tun_probe_http_duration_seconds{phase="tls"} 1.2223279
tun_probe_http_duration_seconds{phase="transfer"} 0.0064185
# HELP tun_probe_http_redirects The number of redirects
# TYPE tun_probe_http_redirects gauge
tun_probe_http_redirects 1
# HELP tun_probe_http_ssl Indicates if SSL was used for the final trace
# TYPE tun_probe_http_ssl gauge
tun_probe_http_ssl 1
# HELP tun_probe_http_status_code Response HTTP status code
# TYPE tun_probe_http_status_code gauge
tun_probe_http_status_code 200
# HELP tun_probe_http_uncompressed_body_length_bytes Length of uncompressed response body in bytes
# TYPE tun_probe_http_uncompressed_body_length_bytes gauge
tun_probe_http_uncompressed_body_length_bytes 17650
# HELP tun_probe_success Displays whether or not the probe over tunnel was a success
# TYPE tun_probe_success gauge
tun_probe_success 1
```

### Whitebox Configuration

Refer to the [example configuration](https://github.com/quyxishi/whitebox/blob/main/whitebox.yml) and [code reference](https://github.com/quyxishi/whitebox/blob/main/internal/config/config.go) for implementation details.

### Prometheus Configuration

Whitebox follows the [multi-target exporter pattern](https://prometheus.io/docs/guides/multi-target-exporter/).

###### Example Prometheus configuration:

```yaml
scrape_configs:
  - job_name: 'whitebox'
    metrics_path: /probe
    params:
      max_redirects: [ '0' ]  # Do not follow redirects. (Optional)
      timeout_ms: [ '5000' ]  # Probe timeout in ms. (Optional)
    file_sd_configs:
      - files: [ '/etc/prometheus/whitebox-sd-config.yml' ]  # File service discovery configurations (targets).
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target  # 'target' -> '?target=...'.
      - source_labels: [ctx]
        target_label: __param_ctx     # 'ctx' -> '?ctx=...'.
      - source_labels: [client]
        target_label: client          # Label all probe's with client id.
      - source_labels: [protocol]
        target_label: protocol        # Label all probe's with used protocol.
      - source_labels: [__param_target]
        target_label: target          # Label all probe's with target.
      - target_label: __address__
        replacement: 127.0.0.1:9116   # The whitebox real hostname:port.
```

###### Example file service discovery configuration (targets):

```yaml
- targets: [ "https://google.com" ]
  labels:
    ctx: "vless://c9f5228c-8870-47bd-a92f-9b38c7c02b08@1.2.3.4:443?type=tcp&encryption=none&security=reality&pbk=DF-3KL2W4RuNB2HgsEDmLqHLvvTTN4_QfwUCUn8Uhy0&fp=firefox&sni=web.max.ru&sid=dc8wq0b47450f9&spx=%2F&flow=xtls-rprx-vision#ring0-raii-idx0"
    client: "ring0-raii-idx0"  # Client unique identifier
    protocol: "vless"          # VPN protocol
    # You can also add additional labels here:
    #   sni: "web.max.ru"
    # And then, update relabel_configs in prometheus.yml job's config:
    #   - source_labels: [sni]
    #     target_label: sni
- targets: [ "https://cloudflare.com" ]
  labels:
    # Wireguard connection must be supplied as: base64-encoded peer .ini config prefixed with 'wireguard://'
    ctx: "wireguard://W0ludGVyZmFjZV0KUHJpdmF0ZUtleSA9IFNObk5ON0l4YzV0ekNYS2FJNGZXNnEyOFYzbnhGS2YxcmNoYWt4bWdBbHM9CkFkZHJlc3MgPSAxMC4wLjAuMi8zMgpETlMgPSAxLjEuMS4xLCAxLjAuMC4xCk1UVSA9IDE0MjAKCiMgLTEKW1BlZXJdClB1YmxpY0tleSA9IHk2MTdkQ2dNM1g2bEtEanBkdDVhQ3dIWmROWW5OT0FwMFMyanFUbGpmZzA9CkFsbG93ZWRJUHMgPSAwLjAuMC4wLzAsIDo6LzAKRW5kcG9pbnQgPSAxLjIuMy40OjQ0Mw=="
    client: "wg-raii-idx0"
    protocol: "wireguard"
- targets: [ "https://google.com" ]
  labels:
    # AmneziaWG connection with obfuscation parameters (Jc, Jmin, Jmax, S1, S2, H1-H4)
    # Must be supplied as: base64-encoded peer .ini config prefixed with 'awg://'
    ctx: "awg://W0ludGVyZmFjZV0KUHJpdmF0ZUtleSA9IFNObk5ON0l4YzN0emxYS2FJNGY4NnEyOFYzbnhGS2YzcmNoYWt4bWdCbHM9CkFkZHJlc3MgPSAxMC4wLjAuMi8zMgpETlMgPSAxLjEuMS4xLCAxLjAuMC4xCk1UVSA9IDE0MjAKSmMgPSAzCkptaW4gPSA1MApKbWF4ID0gMTAwMApTMSA9IDIwClMyID0gNzgKSDEgPSAzOTEzMTI3OApIMiA9IDgzMjEzODE4NQpIMyA9IDE0MzY5NTc4NTcKSDQgPSAxNjM1ODc3NzQ2CgpbUGVlcl0KUHVibGljS2V5ID0geTYxN2RDZ00zWDZsS0RqcGR0NWFHY0FaZE5Zbk5PQXAwUzNqYVRsamZnMD0KQWxsb3dlZElQcyA9IDAuMC4wLjAvMCwgOjovMApFbmRwb2ludCA9IDEuMi4zLjQ6Mjc3ODkK"
    client: "awg-raii-idx0"
    protocol: "amneziawg"
```

:::info Tip
After all of that, reload Prometheus, visit http://localhost:9090/targets and check for your `whitebox` job.
:::