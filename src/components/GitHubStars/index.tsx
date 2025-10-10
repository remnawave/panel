import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'

interface GitHubStarsProps {
    repo: string // Format: "owner/repo"
}

export default function GitHubStars({ repo }: GitHubStarsProps) {
    const [stars, setStars] = useState<null | number>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const cacheKey = `github-stars-${repo}`
        const cached = localStorage.getItem(cacheKey)

        if (cached) {
            const { stars: cachedStars, timestamp } = JSON.parse(cached)
            if (Date.now() - timestamp < 3600000) {
                setStars(cachedStars)
                setLoading(false)
                return
            }
        }

        fetch(`https://ungh.cc/repos/${repo}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.repo.stars !== undefined) {
                    setStars(data.repo.stars)
                    localStorage.setItem(
                        cacheKey,
                        JSON.stringify({
                            stars: data.repo.stars,
                            timestamp: Date.now()
                        })
                    )
                }
                setLoading(false)
            })
            .catch(() => {
                // Silently fail - stars are not critical
                setLoading(false)
            })
    }, [repo])

    if (loading || stars === null) {
        return (
            <span className={styles.stars}>
                <svg
                    className={styles.icon}
                    fill="currentColor"
                    height="15"
                    viewBox="0 0 16 16"
                    width="15"
                >
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                </svg>
                <span className={styles.skeleton}>···</span>
            </span>
        )
    }

    const formatStars = (count: number): string => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`
        }
        return count.toString()
    }

    return (
        <span className={styles.stars}>
            <svg
                className={styles.icon}
                fill="currentColor"
                height="15"
                viewBox="0 0 16 16"
                width="15"
            >
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
            </svg>
            <span className={styles.count}>{formatStars(stars)}</span>
        </span>
    )
}
