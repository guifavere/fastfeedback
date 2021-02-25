import { Button, Code, Heading, Text } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <main>
        <Heading>Fast feedback</Heading>

        <Text>
          Current user: <Code>{auth.user?.email || 'none'}</Code>
        </Text>

        {auth.user ? (
          <Button onClick={auth.signout}>Sign out</Button>
        ): (
          <Button onClick={auth.signinWithGithub}>Sign in</Button>
        )}
      </main>
    </div>
  )
}
