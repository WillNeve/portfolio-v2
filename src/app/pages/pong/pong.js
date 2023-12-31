import PongGame from './PongGame/PongGame';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
`;

const Subtle = styled.p`
  font-size: 16px;
`;

const Top = styled.div`
  height: 20%;
`;

const Pong = () => {
  return (
    <Wrapper>
      <Top>
        <h1>Pong</h1>
        <Subtle>My single player take on the classic</Subtle>
        {/* <p>My single player take on Pong</p> */}
      </Top>
      <PongGame/>
    </Wrapper>
  );
}

export default Pong;
