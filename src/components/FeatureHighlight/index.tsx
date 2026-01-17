import React from 'react'

import styles from './styles.module.css'

interface Feature {
    description: string
    icon: string
    title: string
}

interface FeatureHighlightProps {
    features: Feature[]
}

export default function FeatureHighlight({ features }: FeatureHighlightProps) {
    return (
        <div className={styles.featureGrid}>
            {features.map((feature, index) => (
                <div className={styles.featureCard} key={index}>
                    <div className={styles.iconWrapper}>
                        <span className={styles.icon}>{feature.icon}</span>
                    </div>
                    <h3 className={styles.title}>{feature.title}</h3>
                    <p className={styles.description}>{feature.description}</p>
                </div>
            ))}
        </div>
    )
}
