---
sidebar_position: 2
title: Common errors
---

## Remnawave Node

### XML-RPC fault: SPAWN_ERROR: xray {#xml-rpc-fault-spawn-error-xray}

#### Problem

If you see the following error:

```title="cd ~/opt/remnanode && docker compose logs -f -t"
remnanode  | ERROR [HttpExceptionFilter]      Failed to get system stats - { stack: [ null ], code: 'A010', path: '/node/stats/get-system-stats' }
remnanode  | LOG [XrayService]      Getting config checksum...
remnanode  | LOG [XrayService]      XTLS config generated in: 1ms
// highlight-next-line-red
remnanode  | ERROR [XrayService]      XML-RPC fault: SPAWN_ERROR: xray - { stack: [ null ] }
remnanode  | LOG [XrayService]      Start XTLS took: 2s 568ms
remnanode  | ERROR [StatsService]     Failed to get system stats: /xray.app.stats.command.StatsService/GetSysStats UNAVAILABLE: No connection established. Last error: connect ECONNREFUSED 127.0.0.1:61000 (2025-05-08T14:36:08.821Z) - { stack: [ null ], isOk: false, code: 'A002' }
```

#### Why this happens

This errors occurs when Xray core failed to start, most likely due to the wrong configuration.

#### Solution

1. Check the **Xray core** logs for more details.

```bash
docker exec -it remnanode tail -n +1 -f /var/log/supervisor/xray.out.log
```

or

```bash
docker exec -it remnanode tail -n +1 -f /var/log/supervisor/xray.err.log
```

2. In most cases, you will see the reason why Xray core fails to start.

3. Fix the issue in Remnawave Panel dashboard under **Xray Config** section. Save the changes.
