import React from 'react'

import styles from './styles.module.css'

interface Stat {
    icon?: string
    label: string
    value: string
}

interface StatsBarProps {
    stats: Stat[]
}

export default function StatsBar({ stats }: StatsBarProps) {
    return (
        <div className={styles.statsBar}>
            {stats.map((stat, index) => (
                <div className={styles.statItem} key={index}>
                    {stat.icon && <span className={styles.icon}>{stat.icon}</span>}
                    <div className={styles.statContent}>
                        <div className={styles.value}>{stat.value}</div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
