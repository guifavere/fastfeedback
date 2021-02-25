import { AuthProvider } from '@/lib/auth';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import theme from '@/styles/theme';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
