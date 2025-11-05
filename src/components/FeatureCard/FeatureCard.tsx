import { Card, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { motion } from 'framer-motion'
import React from 'react'

interface FeatureCardProps {
    color?: string
    description: string
    icon: React.ReactNode
    title: string
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 80,
            damping: 15
        }
    }
}

export const FeatureCard = ({ title, description, icon, color = 'cyan' }: FeatureCardProps) => {
    return (
        <motion.div
            initial="hidden"
            style={{ height: '100%' }}
            variants={cardVariants}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.03,
                y: -4,
                transition: { duration: 0.2 }
            }}
            whileInView="visible"
        >
            <Card
                p={{ base: 'md', sm: 'lg', md: 'xl' }}
                radius="lg"
                style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Stack gap="md">
                    <Group gap="md" wrap="nowrap">
                        <ThemeIcon color={color} radius="md" size="xl" variant="outline">
                            {icon}
                        </ThemeIcon>
                    </Group>
                    <Title
                        c="white"
                        order={3}
                        style={{
                            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)'
                        }}
                    >
                        {title}
                    </Title>
                    <Text c="dimmed" size="sm" style={{ lineHeight: 1.6 }}>
                        {description}
                    </Text>
                </Stack>
            </Card>
        </motion.div>
    )
}
