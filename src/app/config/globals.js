import { createGlobalStyle } from 'styled-components';
import { textSeperationAnim } from './utilities';

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
    color: ${props => props.theme.hackerGreen};
    font-style: normal;
  }

  a {
    display: block;
    color: ${props => props.theme.hackerGreen};
    ${props => textSeperationAnim(props.theme.hackerGreen, .5)};
    &:not(.icon) {
      border: 2px solid ${props => props.theme.hackerGreen};
    }
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
      }
    }
  }
`;

export default GlobalStyle;
