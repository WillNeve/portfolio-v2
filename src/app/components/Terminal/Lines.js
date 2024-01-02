import styled from "styled-components";
import { textSeperationAnim } from "@/app/config/utilities";

import Prompt from "./Prompt";

const LinesContainer = styled.div`
  font-size: inherit;
  height: fit-content;
  &::-webkit-scrollbar {
    display: none;
  };
`;

const LineWrapper = styled.div`
  display: flex;
  column-gap: 8px;
  ${props => textSeperationAnim(props.theme.hackerGreen, 0.5)};
`;

const Lines = ({lines}) => {
  return (
    <LinesContainer>
    {lines.map((line, index) => (
        <LineWrapper key={index}>
          {line[2] ? ('') : (<Prompt path={line[1]}/>)}
          <p>{line[0]}</p>
        </LineWrapper>
      ))}
    </LinesContainer>
  );
}
export default Lines;
