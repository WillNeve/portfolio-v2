import { keyframes, css } from 'styled-components';

export const hexToRgba = (hex, alpha) => {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha ? alpha : 1})`;
}

export const responsive = css`
  width: 95%;
  max-width: 1250px;
  @media (min-width: 600px) {
    width: 80%;
  }
  @media (min-width: 1000px) {
    width: 75%;
  }
  margin: 0 auto;
`;

export const textSeperationAnim = (color, alpha) => {
  const anim = keyframes`
    0% {
        text-shadow: 0px 0px 3px ${hexToRgba(color, alpha)};
      }

    33% {
      text-shadow: 1px 0px 3px ${hexToRgba(color, alpha)};
    }

    66% {
      text-shadow: 0px 0px 3px ${hexToRgba(color, alpha)};
    }

    100% {
      text-shadow: -1px 0px 3px ${hexToRgba(color, alpha)};
    }
  `;
  return css`
    /* @media (prefers-reduced-motion: no-preference) {
      animation: 250ms linear 0s infinite alternate running ${anim};
    } */
  `;
}

export const boxSeperationAnim = (color, alpha) => {
  const anim = keyframes`
    0% {
      box-shadow: 0px 0px 3px 0px ${hexToRgba(color, alpha)};
    }

    33% {
      box-shadow: 1px 0px 3px 0px ${hexToRgba(color, alpha)};
    }

    66% {
      box-shadow: 0px 0px 3px 0px ${hexToRgba(color, alpha)};
    }

    100% {
      box-shadow: -1px 0px 3px 0px ${hexToRgba(color, alpha)};
    }
  `;
  return css`
    /* @media (prefers-reduced-motion: no-preference) {
      animation: 250ms linear 0s infinite alternate running ${anim};
    } */
  `;
}
