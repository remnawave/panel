import type { ReactNode } from 'react'

import HomepageFeatures from '@site/src/components/HomepageFeatures'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import clsx from 'clsx'

import styles from './index.module.css'

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout
            description="Description will go into a meta tag in <head />"
            title={`Hello from ${siteConfig.title}`}
        >
            {/* eslint-disable-next-line no-use-before-define */}
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    )
}

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext()
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link className="button button--secondary button--lg" to="/docs/intro">
                        Docusaurus Tutorial - 5min ⏱️
                    </Link>
                </div>
            </div>
        </header>
    )
}
