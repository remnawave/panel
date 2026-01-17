import Link from '@docusaurus/Link'
import React from 'react'

import { RemnawaveLogo } from './remnawave-logo'
import styles from './styles.module.css'

export default function Logo(props: React.ComponentProps<'a'>) {
    const { ...propsRest } = props

    return (
        <Link className={styles.logoLink} to="https://docs.rw" {...propsRest}>
            <div className={styles.logoContainer}>
                <RemnawaveLogo className={styles.logoImage} />
                <div className={styles.logoText}>
                    <span className={styles.logoTextHighlight}>Remna</span>
                    <span className={styles.logoTextNormal}>wave</span>
                </div>
            </div>
        </Link>
    )
}
