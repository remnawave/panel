import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs'
import type { Props } from '@theme/DocCard'

import { findFirstSidebarItemLink, useDocById } from '@docusaurus/plugin-content-docs/client'
import { usePluralForm } from '@docusaurus/theme-common'
import isInternalUrl from '@docusaurus/isInternalUrl'
import { translate } from '@docusaurus/Translate'
import React, { type ReactNode } from 'react'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import clsx from 'clsx'

import styles from './styles.module.css'

function useCategoryItemsPlural() {
    const { selectMessage } = usePluralForm()
    return (count: number) =>
        selectMessage(
            count,
            translate(
                {
                    message: '1 item|{count} items',
                    id: 'theme.docs.DocCard.categoryDescription.plurals',
                    description:
                        'The default description for a category card in the generated index about how many items this category includes'
                },
                { count }
            )
        )
}

function CardContainer({ href, children }: { children: ReactNode; href: string }): ReactNode {
    return (
        <Link className={clsx('card padding--lg', styles.cardContainer)} href={href}>
            {children}
        </Link>
    )
}

function CardLayout({
    href,
    icon,
    title,
    description
}: {
    description?: string
    href: string
    icon: ReactNode
    title: string
}): ReactNode {
    return (
        <CardContainer href={href}>
            <Heading as="h2" className={clsx('text--truncate', styles.cardTitle)} title={title}>
                {icon} {title}
            </Heading>
            {description && (
                <p className={clsx('text--truncate', styles.cardDescription)} title={description}>
                    {description}
                </p>
            )}
        </CardContainer>
    )
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): ReactNode {
    const href = findFirstSidebarItemLink(item)
    const categoryItemsPlural = useCategoryItemsPlural()

    // Unexpected: categories that don't have a link have been filtered upfront
    if (!href) {
        return null
    }

    return (
        <CardLayout
            description={item.description ?? categoryItemsPlural(item.items.length)}
            href={href}
            icon="🗃️"
            title={item.label}
        />
    )
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
    const icon = isInternalUrl(item.href) ? '📄️' : '🔗'
    const doc = useDocById(item.docId ?? undefined)
    return (
        <CardLayout
            description={item.description ?? doc?.description}
            href={item.href}
            icon={icon}
            title={item.label}
        />
    )
}

export default function DocCard({ item }: Props): ReactNode {
    switch (item.type) {
        case 'category':
            return <CardCategory item={item} />
        case 'link':
            return <CardLink item={item} />
        default:
            throw new Error(`unknown item type ${JSON.stringify(item)}`)
    }
}
