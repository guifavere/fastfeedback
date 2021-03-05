import Head from 'next/head';
import { Button, Flex, Icon } from '@chakra-ui/core';

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
        <Button mt={4} size="sm" onClick={auth.signinWithGithub}>Sign in</Button>
      )}
    </Flex>
  )
}
