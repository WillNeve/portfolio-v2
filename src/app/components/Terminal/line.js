import styled from "styled-components";

const TerminalLine = styled.p`
  text-align: left;
`;

const Line = ({content}) => {
  return (
    <TerminalLine>{content}</TerminalLine>
  );
}

export default Line;
