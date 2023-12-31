'use-client';
import { ThemeProvider } from 'styled-components';
import { textSeperationAnim } from './utilities';

const theme = {
  backgroundBlack: '#1B1B1B',
  foregroundWhite: '#FFFFFF',
  hackerGreen: '#51e251',
  hackerCyan: '#00ffff',
  hackerBlue: '#0000ff',
  hackerOrange: '#FF6542',
};

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Modeseven', sans-serif;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    background: ${props => props.theme.backgroundBlack};
    color: ${props => props.theme.foregroundWhite};
    font-size: 20px;
  }

  main {
    display: flex;
    flex-direction: column;
    width: 100svw;
    height: 100svh;
    overflow: scroll;
    padding: 20px;
  }

  li {
    list-style-type: none;
  }

  p {
    margin: 10px 0px;
    text-align: justify;
    ${props => textSeperationAnim(props.theme.foregroundWhite, .5)};
  }

  em {
    color: $hacker-green;
    font-style: normal;
  }

  a {
    display: block;
    color: ${props => props.theme.hackerOrange};
    ${props => textSeperationAnim(props.theme.hackerOrange, .5)};
    text-decoration: none;
    width: fit-content;
    padding: 5px;
    transition: background .1s ease;
    &:hover {
      background: white;
    }
    &.icon {
      width: 50px;
      height: auto;
      aspect-ratio: 1;
      svg {
        width: 100%;
        height: 100%;
        // object-fit: contain;
      }
    }
  }
`;

const StyledComponentsSetup = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle/>
    {children}
  </ThemeProvider>
);

export default StyledComponentsSetup;
