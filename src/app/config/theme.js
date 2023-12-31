'use-client';
import { ThemeProvider } from 'styled-components';

const theme = {
  backgroundBlack: '#1B1B1B',
  foregroundWhite: '#FFFFFF',
  hackerGreen: '#51e251',
  hackerCyan: '#00ffff',
  hackerBlue: '#0000ff',
  hackerOrange: '#FF6542',
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default Theme;
