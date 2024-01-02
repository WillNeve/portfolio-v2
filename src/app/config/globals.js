import { createGlobalStyle } from 'styled-components';
import { textSeperationAnim } from './utilities';
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap');
  
  @font-face {
    font-family: 'Modeseven'; // Specify the font family name
    src: url('fonts/Modeseven-L3n5.ttf') format('truetype');// Specify the path to your font file
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    font-family: 'Modeseven', sans-serif;
  }

  input, textarea, button {
    font-family: 'Modeseven', sans-serif;
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

  h1 {
    font-size: 2.5rem;
    @media (min-width: 450px) {
      font-size: 3rem;
    }
  }
  h2 {
    font-size: 1.1rem;
    @media (min-width: 450px) {
      font-size: 1.17em;
    }
  }

  li {
    list-style-type: none;
  }

  p {
    margin: 10px 0px;
  }
`;

export default GlobalStyle;
