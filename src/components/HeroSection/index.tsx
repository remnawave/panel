import React from 'react'

import styles from './styles.module.css'

interface HeroSectionProps {
    gradient?: boolean
    subtitle?: string
    title: string
}

export default function HeroSection({ title, subtitle, gradient = true }: HeroSectionProps) {
    return (
        <div className={`${styles.hero} ${gradient ? styles.gradient : ''}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            <div className={styles.decoration}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
            </div>
        </div>
    )
}
