import { keyframes } from 'styled-components';

export const hexToRgba = (hex, alpha) => {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha ? alpha : 1})`;
}

export const textSeperation = (color, alpha) => {
  return keyframes`
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
}

export const boxSeperation = (color, alpha) => {
  return keyframes`
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
}
