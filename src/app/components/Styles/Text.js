import styled from "styled-components";

export const BodyText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-weight: 200;
`;

export const EmphasisedText = styled.em`
  font-weight: 400;
  font-style: normal;
`;

export const InlineLink = styled.a`
  display: inline;
  text-decoration: none;
  color: ${props => props.theme.hackerGreen};
  cursor: pointer;
`;
