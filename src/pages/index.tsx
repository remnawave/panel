import {
    IconBox,
    IconBrandGithub,
    IconBrandTelegram,
    IconCloudDataConnection,
    IconDevices,
    IconHeart,
    IconRocket,
    IconServer,
    IconShieldCheck,
    IconUsers
} from '@tabler/icons-react'
import '@mantine/core/styles.css'
import {
    Anchor,
    Badge,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Group,
    Image,
    MantineProvider,
    Stack,
    Text,
    ThemeIcon,
    Title
} from '@mantine/core'
import { TbArrowRightDashed, TbCloud, TbHeartFilled } from 'react-icons/tb'
import { BiLogoTelegram } from 'react-icons/bi'
import { SiNestjs } from 'react-icons/si'
import { motion } from 'framer-motion'
import Link from '@docusaurus/Link'
import React, { JSX } from 'react'
import Layout from '@theme/Layout'

import { AnimatedBackground } from '../components/AnimatedBackground'
import { FeatureCard } from '../components/FeatureCard'
import { theme } from '../theme/mantine-theme/theme'
import { StatCard } from '../components/StatCard'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants = {
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

export function HomePage() {
    return (
        <div className="landing-page-wrapper">
            <AnimatedBackground />
            <Container
                maw={1400}
                px={{ base: 'md', sm: 'lg', md: 'xl' }}
                py={{ base: 'xl', sm: '3rem', md: '4rem' }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <motion.div
                    animate="visible"
                    initial="hidden"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--section-gap, 4rem)'
                    }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Stack align="center" gap="xl">
                            <Box ta="center">
                                <Title
                                    c="white"
                                    ff="Unbounded"
                                    mb="md"
                                    order={1}
                                    style={{
                                        fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                                        lineHeight: 1.2
                                    }}
                                    ta="center"
                                >
                                    <Text c="cyan" component="span" fw="inherit" fz="inherit">
                                        Remna
                                    </Text>
                                    <Text c="white" component="span" fw="inherit" fz="inherit">
                                        wave
                                    </Text>
                                </Title>

                                <Title
                                    c="white"
                                    ff="Unbounded"
                                    mb="md"
                                    order={2}
                                    style={{
                                        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                        lineHeight: 1.3
                                    }}
                                    ta="center"
                                >
                                    <Text
                                        component="span"
                                        fw="inherit"
                                        fz="inherit"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        Proxy and user management
                                    </Text>{' '}
                                    <Text component="span" fw="inherit" fz="inherit">
                                        solution
                                    </Text>
                                </Title>

                                <Text
                                    c="dimmed"
                                    ff="Unbounded"
                                    maw={800}
                                    mx="auto"
                                    px={{ base: 'sm', sm: 'sm' }}
                                    style={{
                                        lineHeight: 1.7,
                                        fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)'
                                    }}
                                    ta="center"
                                >
                                    Built on top of{' '}
                                    <Text
                                        c="cyan"
                                        component="a"
                                        fw={600}
                                        fz="inherit"
                                        href="https://github.com/XTLS/Xray-core"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        Xray Core
                                    </Text>
                                    , Remnawave provides rich functionality for user and proxy
                                    management.
                                    <br />
                                    Easily add users, nodes, configure Xray and much more with a
                                    feature-rich{' '}
                                    <Text c="cyan" component="span" fw={600} fz="inherit">
                                        REST API
                                    </Text>{' '}
                                    powered by{' '}
                                    <Text
                                        c="cyan"
                                        component="a"
                                        fw={600}
                                        fz="inherit"
                                        href="https://nestjs.com"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <SiNestjs size={20} style={{ verticalAlign: 'middle' }} />{' '}
                                        NestJS
                                    </Text>
                                    .
                                </Text>
                            </Box>
                        </Stack>
                    </motion.div>

                    <Stack justify="center">
                        <motion.div variants={itemVariants}>
                            <Group justify="center" wrap="wrap">
                                <Button
                                    component={Link}
                                    href="/docs/overview/quick-start"
                                    leftSection={<TbArrowRightDashed size={20} />}
                                    radius="md"
                                    size="md"
                                    td="none"
                                >
                                    Get started
                                </Button>

                                <Button
                                    component={Link}
                                    href="https://try.tg"
                                    leftSection={<TbCloud size={20} />}
                                    radius="md"
                                    size="md"
                                    td="none"
                                    variant="light"
                                >
                                    Try risk-free
                                </Button>
                            </Group>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Group justify="center" wrap="wrap">
                                <Button
                                    color="#0088cc"
                                    component="a"
                                    href="https://t.me/remnawave"
                                    leftSection={<BiLogoTelegram color="white" size={20} />}
                                    radius="md"
                                    size="md"
                                    td="none"
                                    variant="filled"
                                >
                                    Join Community
                                </Button>

                                <Button
                                    color="red"
                                    component="a"
                                    href="/docs/donate"
                                    leftSection={<TbHeartFilled size={20} />}
                                    radius="md"
                                    size="md"
                                    td="none"
                                    variant="filled"
                                >
                                    Sponsor
                                </Button>
                            </Group>
                        </motion.div>
                    </Stack>

                    <motion.div variants={itemVariants}>
                        <Box
                            px={{ base: 'xs', sm: 'md' }}
                            style={{
                                maxWidth: '1500px',
                                margin: '0 auto'
                            }}
                        >
                            <Image
                                alt="Remnawave Panel"
                                radius="md"
                                src="/pages/landing_page.webp"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    position: 'relative',
                                    zIndex: 0
                                }}
                            />
                        </Box>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Grid gutter="xl" justify="center">
                            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                                <StatCard
                                    color="violet"
                                    icon={<IconUsers size={32} />}
                                    label="Active community members"
                                    value="3K+"
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
                                <StatCard
                                    color="cyan"
                                    icon={<IconRocket size={32} />}
                                    label="DockerHub pulls"
                                    value="40K+"
                                />
                            </Grid.Col>
                        </Grid>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Stack gap="xl">
                            <Box ta="center">
                                <Badge
                                    mb="md"
                                    size="lg"
                                    style={{
                                        background: 'rgba(34, 211, 238, 0.1)',
                                        border: '1px solid rgba(34, 211, 238, 0.3)',
                                        color: '#22d3ee'
                                    }}
                                    variant="dot"
                                >
                                    KEY FEATURES
                                </Badge>
                                <Title
                                    c="white"
                                    order={2}
                                    px={{ base: 'sm', sm: 'md' }}
                                    style={{
                                        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)'
                                    }}
                                >
                                    Everything You Need
                                </Title>
                            </Box>

                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FeatureCard
                                        color="cyan"
                                        description="Connect as many nodes as you want, and manage them all in one place."
                                        icon={<IconServer size={24} />}
                                        title="Multiple nodes support"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FeatureCard
                                        color="violet"
                                        description="Create and manage users with flexible settings."
                                        icon={<IconUsers size={24} />}
                                        title="User Management"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FeatureCard
                                        color="blue"
                                        description="Full-featured REST API with comprehensive documentation for easy integration."
                                        icon={<IconCloudDataConnection size={24} />}
                                        title="REST API"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FeatureCard
                                        color="green"
                                        description="Support for all major protocols: VLESS, Trojan, Shadowsocks."
                                        icon={<IconBox size={24} />}
                                        title="Protocols support"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FeatureCard
                                        color="cyan"
                                        description="Remnawave providers for your users to connect to. Supports all major client applications."
                                        icon={<IconDevices size={24} />}
                                        title="Subscription Links"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FeatureCard
                                        color="violet"
                                        description="Auth with Passkeys, GitHub, and more. Connections to nodes are secured with mTLS."
                                        icon={<IconShieldCheck size={24} />}
                                        title="Security First"
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </motion.div>

                    <Container maw={800}>
                        <motion.div animate="visible" initial="hidden" variants={itemVariants}>
                            <Stack gap="lg" pb={0} py="xl">
                                <Divider opacity="0.5" />
                                <Group gap="xl" justify="center" wrap="wrap">
                                    <Anchor
                                        href="https://github.com/remnawave"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                        target="_blank"
                                    >
                                        <Group gap="xs">
                                            <ThemeIcon
                                                color="gray"
                                                radius="md"
                                                size="lg"
                                                variant="light"
                                            >
                                                <IconBrandGithub size={18} />
                                            </ThemeIcon>
                                            <Text c="dimmed" fw={500} size="sm">
                                                GitHub
                                            </Text>
                                        </Group>
                                    </Anchor>

                                    <Anchor
                                        href="https://t.me/remnawave"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                        target="_blank"
                                    >
                                        <Group gap="xs">
                                            <ThemeIcon
                                                color="blue"
                                                radius="md"
                                                size="lg"
                                                variant="light"
                                            >
                                                <IconBrandTelegram size={18} />
                                            </ThemeIcon>
                                            <Text c="dimmed" fw={500} size="sm">
                                                Telegram
                                            </Text>
                                        </Group>
                                    </Anchor>
                                </Group>

                                <Divider />

                                <Stack align="center" gap="xs" px="sm">
                                    <Group
                                        align="center"
                                        gap={6}
                                        justify="center"
                                        style={{ flexWrap: 'wrap' }}
                                    >
                                        <Text c="dimmed" ff="Unbounded" size="sm" ta="center">
                                            Created by{' '}
                                            <Anchor
                                                c="cyan"
                                                fw={600}
                                                href="https://github.com/kastov"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                td="none"
                                            >
                                                kastov
                                            </Anchor>{' '}
                                            and{' '}
                                            <Anchor
                                                c="cyan"
                                                fw={600}
                                                href="https://t.me/remnawave"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                td="none"
                                            >
                                                <IconHeart
                                                    color="#ef4444"
                                                    fill="#ef4444"
                                                    size={20}
                                                    style={{ verticalAlign: 'middle' }}
                                                />{' '}
                                                community
                                            </Anchor>
                                        </Text>
                                    </Group>
                                </Stack>
                            </Stack>
                        </motion.div>
                    </Container>
                </motion.div>
            </Container>
        </div>
    )
}

export default function Home(): JSX.Element {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Layout
                description="Remnawave – user and proxy management solution"
                noFooter={true}
                wrapperClassName="landing-page-layout"
            >
                <HomePage />
            </Layout>
        </MantineProvider>
    )
}
