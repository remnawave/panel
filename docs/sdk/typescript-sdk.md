---
sidebar_position: 1
title: TypeScript SDK
---

<Admonition type="tip" icon={<FaCheckCircle />} title="Official SDK">
This SDK is official and maintained by the Remnawave team.
</Admonition>

Remnawave TypeScript SDK is a library for convenient interaction with the RestAPI types.

It does not contain http-client, so you need to implement it yourself.

This SDK can be used in backend and frontend.

import Admonition from '@theme/Admonition';
import { FaCheckCircle } from "react-icons/fa";

## Installation

```bash
npm install @remnawave/backend-contract
```

:::warning
Always pick and pin the correct version of the SDK to match the version of the Remnawave backend.
:::

| Contract Version | Remnawave Panel Version                    |
| ---------------- | ------------------------------------------ |
| 2.3.38           | 2.3.2                                      |
| 2.3.35           | 2.3.0,2.3.1                                |
| 2.2.34           | 2.2.6                                      |
| 2.2.32           | 2.2.4,2.2.5                                |
| 2.2.26           | 2.2.1,2.2.2,2.2.3                          |
| 2.2.24           | 2.2.0                                      |
| 2.1.70           | 2.1.19                                     |
| 2.1.68           | 2.1.18                                     |
| 2.1.64           | 2.1.16                                     |
| 2.1.62           | 2.1.15                                     |
| 2.1.57           | 2.1.14                                     |
| 2.1.41           | 2.1.13                                     |
| 2.1.39           | 2.1.12                                     |
| 2.1.33           | 2.1.8, 2.1.9, 2.1.10, 2.1.11               |
| 2.1.26           | 2.1.7                                      |
| 2.1.25           | 2.1.4, 2.1.5, 2.1.6                        |
| 2.1.14           | 2.1.1, 2.1.2, 2.1.3                        |
| 2.1.12           | 2.1.0                                      |
| 2.0.2            | 2.0.6, 2.0.7, 2.0.8                        |
| 2.0.0            | 2.0.0, 2.0.1, 2.0.2, 2.0.3, 2.0.4, 2.0.5   |
| 0.7.26           | 1.6.14, 1.6.15, 1.6.16                     |
| 0.7.21           | 1.6.13                                     |
| 0.7.19           | 1.6.12                                     |
| 0.7.16           | 1.6.6, 1.6.7, 1.6.8, 1.6.9, 1.6.10, 1.6.11 |
| 0.7.13           | 1.6.3, 1.6.4, 1.6.5                        |
| 0.7.1            | 1.6.1, 1.6.2                               |
| 0.7.0            | 1.6.0                                      |
| 0.4.5            | 1.5.7                                      |
| 0.3.71           | 1.5.0                                      |

## Usage

<details>
<summary>Example backend service, using Axios and NestJS</summary>

```typescript
import axios from 'axios'

import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { GetUserByUsernameCommand } from '@remnawave/backend-contract'

import { ICommandResponse } from '../types/command-response.type'

@Injectable()
export class AxiosService {
    public axiosInstance: AxiosInstance
    private readonly logger = new Logger(AxiosService.name)

    constructor(private readonly configService: ConfigService) {
        this.axiosInstance = axios.create({
            baseURL: this.configService.getOrThrow('REMNAWAVE_PANEL_URL'),
            timeout: 45_000,
            headers: {
                // highlight-next-line-green
                'x-forwarded-for': '127.0.0.1', // use this headers to bypass the panel reverse proxy restrictions. So you can access the panel from bridge networks: http://remnawave:3000
                // highlight-next-line-green
                'x-forwarded-proto': 'https', // use this headers to bypass the panel reverse proxy restrictions. So you can access the panel from bridge networks: http://remnawave:3000
                Authorization: `Bearer ${this.configService.get('REMNAWAVE_API_TOKEN')}`
            }
        })

        const caddyAuthApiToken = this.configService.get('CADDY_AUTH_API_TOKEN')

        if (caddyAuthApiToken) {
            this.axiosInstance.defaults.headers.common['X-Api-Key'] = caddyAuthApiToken
        }
    }

    public async getUserByUsername(
        username: string
    ): Promise<ICommandResponse<GetUserByUsernameCommand.Response>> {
        try {
            const response = await this.axiosInstance.request<GetUserByUsernameCommand.Response>({
                method: GetUserByUsernameCommand.endpointDetails.REQUEST_METHOD,
                url: GetUserByUsernameCommand.url(username)
            })

            return {
                isOk: true,
                response: response.data
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                this.logger.error('Error in Axios GetUserByUsername Request:', error.message)

                return {
                    isOk: false
                }
            } else {
                this.logger.error('Error in GetUserByUsername Request:', error)

                return {
                    isOk: false
                }
            }
        }
    }
}
```

</details>

## Full examples

You can find full examples in the [Remnawave Frontend](https://github.com/remnawave/frontend) repository and in the [Remnawave Subscription page](https://github.com/remnawave/subscription-page) repository.
