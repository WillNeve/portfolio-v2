import { keyframes } from 'styled-components';

export const hexToRgba = (hex, alpha) => {
  // Remove the # character if present
  hex = hex.replace(/^#/, '');

  // Parse the hex color into its RGB components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha ? alpha : 1})`;
}

export const textSeperation = (color) => {
  return keyframes`
  0% {
      text-shadow: 0px 0px 3px ${hexToRgba(color)};
    }

  33% {
    text-shadow: 1px 0px 3px ${hexToRgba(color)};
  }

  66% {
    text-shadow: 0px 0px 3px ${hexToRgba(color)};
  }

  100% {
    text-shadow: -1px 0px 3px ${hexToRgba(color)};
  }
`;
}

export const boxSeperation = (color) => {
  return keyframes`
  0% {
    box-shadow: 0px 0px 3px 0px ${hexToRgba(color)};
  }

  33% {
    box-shadow: 1px 0px 3px 0px ${hexToRgba(color)};
  }

  66% {
    box-shadow: 0px 0px 3px 0px ${hexToRgba(color)};
  }

  100% {
    box-shadow: -1px 0px 3px 0px ${hexToRgba(color)};
  }
`;
}
