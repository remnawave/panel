import { Box, Card, Stack, Text, ThemeIcon } from '@mantine/core'
import { motion } from 'framer-motion'
import React from 'react'

interface StatCardProps {
    color: 'blue' | 'cyan' | 'green' | 'violet'
    icon: React.ReactNode
    label: string
    value: number | string
}

const gradients = {
    violet: {
        background:
            'linear-gradient(135deg, rgba(151, 117, 250, 0.1) 0%, rgba(132, 94, 247, 0.05) 100%)',
        border: 'rgba(151, 117, 250, 0.2)',
        radial: 'radial-gradient(circle, rgba(151, 117, 250, 0.15) 0%, transparent 70%)',
        text: 'linear-gradient(135deg, #9775fa 0%, #845ef7 100%)'
    },
    cyan: {
        background:
            'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
        border: 'rgba(34, 211, 238, 0.2)',
        radial: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
        text: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)'
    },
    blue: {
        background:
            'linear-gradient(135deg, rgba(34, 139, 230, 0.1) 0%, rgba(28, 126, 214, 0.05) 100%)',
        border: 'rgba(34, 139, 230, 0.2)',
        radial: 'radial-gradient(circle, rgba(34, 139, 230, 0.15) 0%, transparent 70%)',
        text: 'linear-gradient(135deg, #228be6 0%, #1c7ed6 100%)'
    },
    green: {
        background:
            'linear-gradient(135deg, rgba(64, 192, 87, 0.1) 0%, rgba(55, 178, 77, 0.05) 100%)',
        border: 'rgba(64, 192, 87, 0.2)',
        radial: 'radial-gradient(circle, rgba(64, 192, 87, 0.15) 0%, transparent 70%)',
        text: 'linear-gradient(135deg, #40c057 0%, #37b24d 100%)'
    }
}

export const StatCard = ({ label, value, icon, color }: StatCardProps) => {
    const gradient = gradients[color]

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{
                type: 'spring' as const,
                stiffness: 300,
                damping: 25
            }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
            }}
            whileInView={{ opacity: 1, scale: 1 }}
        >
            <Card
                p={{ base: 'lg', sm: 'xl' }}
                radius="xl"
                style={{
                    background: gradient.background,
                    border: '1px solid',
                    borderColor: gradient.border,
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: '-50%',
                        right: '-50%',
                        width: '200%',
                        height: '200%',
                        background: gradient.radial,
                        pointerEvents: 'none'
                    }}
                />
                <Stack align="center" gap="sm" style={{ position: 'relative', zIndex: 1 }}>
                    <ThemeIcon color={color} radius="xl" size={72} variant="outline">
                        {icon}
                    </ThemeIcon>

                    <Text
                        fw={700}
                        style={{
                            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                            background: gradient.text,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                        ta="center"
                    >
                        {value}
                    </Text>

                    <Text c="dimmed" fw={600} size="md" ta="center">
                        {label}
                    </Text>
                </Stack>
            </Card>
        </motion.div>
    )
}
