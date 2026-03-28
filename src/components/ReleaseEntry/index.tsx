import type { ReactNode } from 'react'

import useBrokenLinks from '@docusaurus/useBrokenLinks'

import styles from './styles.module.css'

type Patch = {
    date: string
    version: string
}

type Props = {
    children?: ReactNode
    date?: string
    dev?: boolean
    patches?: Patch[]
    version: string
}

export default function ReleaseEntry({ version, date, children, patches, dev }: Props) {
    const anchor = `v${version.replace(/\./g, '-')}`

    useBrokenLinks().collectAnchor(anchor)

    return (
        <div className={styles.entry} id={anchor}>
            <div className={styles.header}>
                <a className={styles.badgeLink} href={`#${anchor}`}>
                    <code className={styles.badge}>{version}</code>
                </a>
                {dev && <span className={`${styles.tag} ${styles.tagTooltip}`}>development</span>}
                {date && <span className={styles.date}>{date}</span>}
            </div>

            {children && <div className={styles.body}>{children}</div>}

            {patches && patches.length > 0 && (
                <div className={styles.patches}>
                    <div className={styles.patchesTitle}>
                        {version.replace(/\.\d+$/, '.X')} patches:
                    </div>
                    <ul className={styles.patchList}>
                        {patches.map((p) => (
                            <li className={styles.patchItem} key={p.version}>
                                <code className={styles.patchBadge}>{p.version}</code>
                                <span className={styles.patchDate}>– {p.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <hr className={styles.divider} />
        </div>
    )
}
