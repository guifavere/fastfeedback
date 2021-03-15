import Head from 'next/head';
import { Button, Flex, Icon, Stack } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100vh">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `
          }}
        />
      </Head>
      <Icon color="black" name="logo" size="64px" />

      {auth.user ? (
        <Button onClick={auth.signout}>Sign out</Button>
      ): (
        <Stack>
          <Button
            bg="gray.900"
            color="white"
            leftIcon="github"
            mt={4}
            size="lg"
            fontWeight="medium"
            onClick={auth.signinWithGithub}
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Sign in with Github
          </Button>

          <Button
            bg="white"
            color="gray.900"
            variant="outline"
            leftIcon="google"
            mt={4}
            size="lg"
            fontWeight="medium"
            onClick={auth.signinWithGoogle}
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            Sign in with Google
          </Button>
        </Stack>
      )}
    </Flex>
  )
}
