import React from 'react'

import styles from './styles.module.css'

interface Category {
    icon: string
    id: string
    title: string
}

interface CategoryNavProps {
    categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className={styles.categoryNav}>
            <h3 className={styles.navTitle}>📚 Browse by Category</h3>
            <div className={styles.categories}>
                {categories.map((category) => (
                    <button
                        className={styles.categoryButton}
                        key={category.id}
                        onClick={() => scrollToCategory(category.id)}
                        type="button"
                    >
                        <span className={styles.categoryIcon}>{category.icon}</span>
                        <span className={styles.categoryTitle}>{category.title}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
