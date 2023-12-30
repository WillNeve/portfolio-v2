import styled from 'styled-components';

const PromptWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  strong {
    font-weight: 100;
  }
`;

const Prompt = ({path}) => {
  return (
    <PromptWrapper>
      <p>{'>'}</p>
      <p>{path}</p>
      <strong>$</strong>
    </PromptWrapper>
  );
}

export default Prompt;
