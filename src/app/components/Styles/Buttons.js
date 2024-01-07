import styled from "styled-components";
import { textSeperationAnim } from "@/app/config/utilities";

export const ButtonSquare = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.hackerGreen};
  ${props => textSeperationAnim(props.theme.hackerGreen, .5)};
  border: 2px solid ${props => props.theme.hackerGreen};
  text-decoration: none;
  width: fit-content;
  padding: 5px;
  transition: background .1s ease;
  &:hover {
    background: white;
  }
`;

export const ButtonIcon = styled(ButtonSquare)`
  width: 50px;
  height: auto;
  aspect-ratio: 1;
  border: none;
  svg {
    width: 100%;
    height: 100%;
  }
`;
