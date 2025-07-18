import {
    Box,
    BoxProps,
    Button,
    ElementProps,
    Group,
    Image,
    MantineProvider,
    Stack,
    Text,
    ThemeIcon,
    Title,
    useMantineTheme
} from '@mantine/core'
import { TbArrowRightDashed, TbHeartFilled } from 'react-icons/tb'
import '@mantine/core/styles.css'
import { BiLogoTelegram } from 'react-icons/bi'
import { SiNestjs } from 'react-icons/si'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import React, { JSX } from 'react'

import { theme } from '../theme/mantine-theme/theme'

interface LogoProps
    extends ElementProps<'svg', keyof BoxProps>,
        Omit<BoxProps, 'children' | 'ref'> {
    size?: number | string
}

export function Logo({ size, style, ...props }: LogoProps) {
    return (
        <Box
            component="svg"
            fill="none"
            style={{ width: size, height: size, ...style }}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M8 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.5 0V1.75A.75.75 0 0 1 8 1Zm6 2a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5A.75.75 0 0 1 14 3ZM5 4a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 5 4Zm6 1a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 11 5ZM2 6a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 2 6Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </Box>
    )
}

export function HomePage() {
    const theme = useMantineTheme()

    return (
        <Box
            style={{
                background: 'linear-gradient(135deg, #0a0e14 0%, #121a24 50%, #0a0e14 100%)',
                borderRadius: theme.radius.md,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                padding: '50px'
            }}
        >
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'radial-gradient(circle at 20% 150%, rgba(0, 210, 255, 0.2) 0%, rgba(0, 0, 0, 0) 50%)',
                    zIndex: 0
                }}
            />
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        'radial-gradient(circle at 80% 20%, rgba(0, 140, 255, 0.15) 0%, rgba(0, 0, 0, 0) 50%)',
                    zIndex: 0
                }}
            />

            <Box
                style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%'
                }}
            >
                <Stack align="center" gap={4} justify="center" mb={0} w="100%">
                    <ThemeIcon radius="xl" size={100} variant="outline">
                        <Logo size={60} />
                    </ThemeIcon>
                </Stack>

                <Box mb={50} ta="center" w="100%">
                    <Title order={1} pos="relative">
                        <Text c="cyan" component="span" fw="inherit" fz="inherit" pos="relative">
                            Remna
                        </Text>
                        <Text c="white" component="span" fw="inherit" fz="inherit" pos="relative">
                            wave
                        </Text>
                    </Title>

                    <Title mb={10} order={1}>
                        {' '}
                        <Text
                            component="span"
                            gradient={{ from: 'blue', to: 'cyan' }}
                            inherit
                            variant="gradient"
                        >
                            Proxy and user management
                        </Text>{' '}
                        <Text component="span" inherit>
                            solution
                        </Text>
                    </Title>

                    <Text c="dimmed" maw={800} mt="xl" mx="auto" size="lg">
                        Built on top of{' '}
                        <Text
                            c="cyan"
                            component="a"
                            href="https://github.com/XTLS/Xray-core"
                            inherit
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Xray Core,
                        </Text>{' '}
                        Remnawave provides a rich functionality for user and proxy management.
                        <br />
                        Easily add users, nodes, configure Xray and much more.
                        <br />
                        Enjoy feature rich and well typed Rest API powered by{' '}
                        <Text
                            c="cyan"
                            component="a"
                            href="https://nestjs.com"
                            inherit
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <SiNestjs size={20} /> NestJS.
                        </Text>
                    </Text>

                    <Group justify="center" mt={40}>
                        <Button
                            component={Link}
                            href="/docs/overview/introduction"
                            leftSection={<TbArrowRightDashed size={20} />}
                            radius="md"
                            size="md"
                            style={{
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'none'
                                }
                            }}
                        >
                            Get started
                        </Button>

                        <Button
                            color={'#0088cc'}
                            component="a"
                            href="https://t.me/remnawave"
                            leftSection={<BiLogoTelegram color={'white'} size={20} />}
                            radius={'md'}
                            size="md"
                            style={{
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'none'
                                }
                            }}
                            variant="filled"
                        >
                            Join Community
                        </Button>

                        <Button
                            color={'red'}
                            component="a"
                            href="/docs/donate"
                            leftSection={<TbHeartFilled size={20} />}
                            radius={'md'}
                            size="md"
                            style={{
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'none'
                                }
                            }}
                            variant="filled"
                        >
                            Sponsor
                        </Button>
                    </Group>
                </Box>

                <Box style={{ padding: '0 20px' }} w="100%">
                    <Box
                        style={{
                            maxWidth: '1200px',
                            margin: '0 auto'
                        }}
                    >
                        <Image
                            alt="Remna Wave"
                            radius="md"
                            src="/pages/landing_page.webp"
                            style={{
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default function Home(): JSX.Element {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Layout
                description="Remnawave – user and proxy management solution"
                noFooter={true}
                title="Home"
            >
                <HomePage />
            </Layout>
        </MantineProvider>
    )
}
