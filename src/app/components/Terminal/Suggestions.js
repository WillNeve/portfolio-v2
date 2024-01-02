import styled, {css} from 'styled-components';

const SuggestionsWrapper = styled.div`
  display: none;
  width: 100%;
  height: fit-content;
  flex-wrap: wrap;
  column-gap: 15px;
  ${props => props.$active ? css`display: flex;` : null};
`;

const Suggestion = styled.p`
  color: cyan;
  animation: $cyanSeperationAnim;
  ${props => props.$highlighted ?
    css`
    color: blue;
    -webkit-text-stroke: 1px black;
    background-color: white;
    animation: $blueSeperationAnim;
    `
  :
  null};
`;

const Suggestions = ({paths, active, highlighted}) => {
  return (
    <SuggestionsWrapper $active={active}>
      {paths.map((path, index) => (
        <Suggestion key={index} $highlighted={index === highlighted}>{path}</Suggestion>
      ))}
    </SuggestionsWrapper>
  );
}

export default Suggestions;
