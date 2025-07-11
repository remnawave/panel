## This comparison was created to highlight and compare certain features of Marzban and Remnawave.  
The table is based on the personal experience of former Marzban users who later switched to Remnawave. It does not claim to be the only reliable source of information.

## Feature Comparison Table

| Feature                            | Remnawave                                                  | Marzban                                                     |
|------------------------------------|------------------------------------------------------------|-------------------------------------------------------------|
| Development activity               | Maintained by a single developer, with regular updates related to QoL, community ideas, and security | Developed by a team, development has slowed down|
| System requirements (panel)        | RAM: 2 GB, CPU: 2 cores, Storage: 20 GB                    | RAM: 2 GB, CPU: 1 core, Storage: 10 GB (unofficial, community-sourced)|
| Documentation                      | Contains scripts and community solutions approved by the developer, English only| Official documentation in 3 languages, unofficial includes Linux server setup|
| Modularity                         | Database, panel, and Sub Page can be separated             | Not modular                                                 |
| CLI                                | No                                                         | Yes                                                         |
| Core update method                 | Through volume passthrough in Docker or waiting for official updates | Via CLI                                           |
| Database                           | Single Postgres SQL database                               | Option to choose from available databases                   |
| Node autonomy without panel        | Working                                                    | Stops working(in development)                               |
| Protocol support                   | No WG or VMESS hosts (possible via core-level setup)       | Limited XHTTP (Extra) transport support(in development)     |
| Operation mode                     | Multi-threaded                                             | Single-threaded. Performance decreases with more users      |
| Multi-admin support                | No                                                         | Yes                                                         |
| API keys and headers management    | WEB UI                                                     | CLI                                                         |
| Selecting active inbounds on nodes | Via panel WEB UI                                           | Via environment variables on the node                       |
| XRAY logs viewing                  | Through the server                                         | WEB UI                                                      |
| Post-install setup                 | In WEB UI                                                  | In .env file                                                |
| Subscription Page                  | Built-in subscription module with content configuration + community modules | Simplified built-in module + community modules|
| Built-in Telegram bot              | Notifications and Tg auth authorization                    | Notifications and management                                |
| Discord bot                        | No                                                         | in development                                              |
| Subscription support for different cores and UAs | In WEB UI using GitHub templates             | Via file system                                             |
| Device restriction by HWID         | Supported                                                  | Not supported                                               |
| Built-in metrics in panel          | Yes                                                        | No                                                          |
| Integrations                       | Integration with HAPP, link encoding, and routing setup via WEB UI | No                                                  |
| Separate node configurations       | Supported                                                  | In development or using Marzenshin fork                     |
