---
sidebar_position: 4
title: Comparison of functions
---

## This comparison was created to highlight and compare certain features of Marzban and Remnawave.  
The table is based on the personal experience of former Marzban users who later switched to Remnawave. It does not claim to be the only reliable source of information.

## Feature Comparison Table

| Feature                            | Remnawave                                                  | Marzban                                                     |
|------------------------------------|------------------------------------------------------------|-------------------------------------------------------------|
| Development activity               | Maintained by a single developer, with regular updates related to QoL, community ideas, and security | Developed by a team, development has slowed down|
| System requirements (panel)        | RAM: 2 GB, CPU: 2 cores, Storage: 20 GB                    | RAM: 1 GB, CPU: 1 core, Storage: 10 GB (unofficial, community-sourced)|
| Operating mode                     | Multi-threaded gives greater performance                   | Single-threaded, performance decreases with increasing number of users |
| Documentation                      | Contains scripts and community solutions approved by the developer, English only| Official documentation in 3 languages, unofficial includes Linux server setup|
| Automatic installation scripts     | Community tools                                            | Community tools                                             |
| Modularity                         | Database, panel, and Sub Page can be separated             | Not modular                                                 |
| Security measures in documentation | CF zero trust, custom path, 2FA                            | No                                                          |
| CLI                                | Yes (inside a docker container)                            | Yes                                                         |
| Admin Password Change              | Docker container or community script                       | .env file                                                   |
| Core update method                 | Through volume passthrough in Docker or rebuild image      | Via CLI                                                     |
| Host Sorting                       | Managed via Web UI                                         | Managed via XRAY configuration                              |
| Database                           | Postgres SQL database                                      | Option to choose from available databases                   |
| Configuration Storage              | Database                                                   | Files                                                       |
| Configuration Validator            | Full-featured with XRAY support                            | JSON syntax only                                            |
| Backup & Restore                   | Community tools                                            | Community tools                                             |
| User Status "On Hold"              | No                                                         | Yes                                                         |
| Node autonomy without panel        | Working                                                    | Stops working (in development)                              |
| Protocol support                   | No WG or VMESS hosts (possible via core-level setup)       | Limited XHTTP (Extra) transport support(in development)     |
| Easter eggs                        | Yes                                                        | No                                                          |
| Multi-admin support                | No                                                         | Yes                                                         |
| User Management Filters            | Extended selection                                         | Minimal options                                             |
| API keys and headers management    | WEB UI                                                     | CLI                                                         |
| Webhook event support              | Users + nodes                                              | Users                                                       |
| Selecting active inbounds on nodes | Via panel WEB UI                                           | Via environment variables on the node (in development)      |
| XRAY logs viewing                  | Through the server                                         | WEB UI                                                      |
| Post-install setup                 | In WEB UI                                                  | In .env file                                                |
| Subscription page                  | Built-in subscription module with content configuration + community modules | Simplified built-in module + community modules|
| Multiple subscription pages        | Possible to install many different pages due to modularity | No                                                          |
| Built-in Telegram bot              | Notifications and Tg auth authorization                    | Notifications and management                                |
| Discord bot                        | No                                                         | in development                                              |
| Support for various clients        | In the WEB UI with the ability to upload sub templates     | Through the file system                                     |
| Device restriction by HWID         | Supported                                                  | Not supported                                               |
| Built-in metrics in panel          | Nodes, users, inbounds, outbounds, traffic                 | No                                                          |
| Integrations                       | Integration with HAPP, link encoding, and routing setup via WEB UI | No                                                  |
| Separate node configurations       | Supported                                                  | In development or using Marzenshin fork                     |
| Аutomated billing alerts per node  | Yes                                                        | No                                                          |
| Mux in Host Settings               | No                                                         | Yes                                                         |
