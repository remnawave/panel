import React from 'react'

import ClientCard from '@site/src/components/ClientCard'
import type { Client, Platform } from '@site/src/data/clients'
import { getClientsByPlatform } from '@site/src/data/clients'

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
                        key={`${client.id}-${platform}`}
                        id={`${client.id}-${platform}`}
                        title={client.name}
                        description={client.description}
                        core={client.core}
                        coreIcon={client.badges?.coreIcon}
                        logo={client.logo}
                        author={client.author}
                        authorLink={client.authorLink}
                        githubRepo={client.githubRepo}
                        featured={client.badges?.featured}
                        hwidSupported={client.badges?.hwid}
                        links={links}
                    />
                )
            })}
        </>
    )
}
