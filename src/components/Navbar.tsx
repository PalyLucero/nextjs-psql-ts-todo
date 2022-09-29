import { Menu, Container, Button } from 'semantic-ui-react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter()

    return (
        <Menu inverted attached style={{ padding: '1.5rem' }}>
            <Container>
                <Menu.Item onClick={() => router.push('/')}>
                    <Menu.Header style={{ fontSize: '1.5rem', paddingRight: '1rem' }}>
                        TS/NextJS Todo
                    </Menu.Header>
                    <Image
                        src='http://react.semantic-ui.com/logo.png'
                        width={30}
                        height={30}
                        alt='logo'
                    />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button onClick={() => router.push('/tasks/new')}>
                            New Task
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}
