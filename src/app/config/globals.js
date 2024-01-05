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

  html {
    overflow: hidden;
    height: 100%;
  }

  body {
    background: ${props => props.theme.backgroundBlack};
    color: ${props => props.theme.foregroundWhite};
    font-size: 20px;
    overflow: hidden;
  }

  main {
    display: flex;
    flex-direction: column;
    width: 100svw;
    height: 100svh;
    overflow: hidden;
    padding: 20px 0px;
  }

  input, textarea, button {
    font-family: 'Modeseven', sans-serif;
  }

  h1 {
    font-size: 2.5rem;
    @media (min-width: 450px) {
      font-size: 3rem;
    }
  }

  h2 {
    font-weight: 400;
    font-size: 26px;
  }

  h3 {
    font-size: 22px;
    font-weight: 400;
  }

  li {
    list-style-type: none;
  }


  p {
    margin: 10px 0px;
  }

  li, p {
    font-weight: 300;
    font-size: 20px;
  }
`;

export default GlobalStyle;
