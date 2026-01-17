import type { Client, Platform } from '@site/src/data/clients'

import { getClientsByPlatform } from '@site/src/data/clients'
import ClientCard from '@site/src/components/ClientCard'
import React from 'react'

interface ClientsListProps {
    platform: Platform
}

export default function ClientsList({ platform }: ClientsListProps) {
    const clients = getClientsByPlatform(platform)

    return (
        <>
            {clients.map((client: Client) => {
                const platformDownloadLink = client.downloadLinks?.[platform]
                const links = {
                    ...client.links,
                    ...(platformDownloadLink && { download: platformDownloadLink })
                }

                return (
                    <ClientCard
                        core={client.core}
                        coreIcon={client?.coreIcon}
                        description={client.description}
                        featured={client.badges?.featured}
                        githubRepo={client.githubRepo}
                        hwidSupported={client.badges?.hwid}
                        id={`${client.id}-${platform}`}
                        key={`${client.id}-${platform}`}
                        links={links}
                        logo={client.logo}
                        title={client.name}
                    />
                )
            })}
        </>
    )
}
